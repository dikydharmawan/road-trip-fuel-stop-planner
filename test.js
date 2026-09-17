const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');

const elements = {};
const storage = {};

function makeEl(id, attrs = {}) {
  return {
    id,
    value: attrs.value !== undefined ? attrs.value : '0',
    min: attrs.min || '0',
    max: attrs.max || '100',
    step: attrs.step || '1',
    textContent: '',
    innerHTML: '',
    style: {},
    classList: { toggle() {} },
    setAttribute() {},
    _handlers: {},
    addEventListener(type, fn) {
      this._handlers[type] = fn;
    },
    fire(type) {
      if (this._handlers[type]) this._handlers[type]();
    }
  };
}

function getEl(id) {
  if (!elements[id]) elements[id] = makeEl(id);
  return elements[id];
}

function seedHtmlInputs() {
  const inputRe = /<input\b[^>]*>/g;
  let match;
  while ((match = inputRe.exec(html)) !== null) {
    const tag = match[0];
    const idMatch = tag.match(/id="([^"]+)"/);
    if (!idMatch) continue;
    const id = idMatch[1];
    const attr = (name) => {
      const m2 = tag.match(new RegExp(name + '="([^"]*)"'));
      return m2 ? m2[1] : undefined;
    };
    elements[id] = makeEl(id, { value: attr('value'), min: attr('min'), max: attr('max'), step: attr('step') });
  }
}

const num = (s) => parseFloat(String(s).replace(/,/g, '.')) || 0;

let passed = 0;
let failed = 0;

function expect(label, got, want) {
  if (Math.abs(num(got) - want) > 0.01) {
    failed++;
    console.error('FAIL', label, '- got', got, '- want', want);
  } else {
    passed++;
    console.log('PASS', label, '-', got);
  }
}

function expectTruthy(label, got) {
  if (got) {
    passed++;
    console.log('PASS', label);
  } else {
    failed++;
    console.error('FAIL', label);
  }
}

function expectString(label, got, want) {
  if (got === want) {
    passed++;
    console.log('PASS', label, '-', got);
  } else {
    failed++;
    console.error('FAIL', label, '- got', got, '- want', want);
  }
}

global.document = { getElementById: getEl };
global.localStorage = {
  getItem: (k) => (k in storage ? storage[k] : null),
  setItem: (k, v) => { storage[k] = v; }
};

seedHtmlInputs();
['btnImperial', 'btnMetric', 'unitDistance', 'unitTank', 'unitEfficiency', 'priceUnit',
 'currentRange', 'currentRangeUnit', 'stopsNeeded', 'stopsNeededUnit',
 'stopInterval', 'stopIntervalUnit', 'fuelFill', 'fuelFillText', 'fuelPct',
 'gaugeFill', 'gaugeNeedle', 'gaugeReadout', 'totalFuel', 'totalFuelUnit',
 'fuelCost', 'fuelCostUnit', 'travelTime', 'travelTimeUnit',
 'roadMap', 'pumpSection', 'noteBox'].forEach(getEl);

eval(js);

console.log('\n=== Imperial (default: 500 mi, 15 gal, 30 MPG, 75%, $3.50) ===');
expect('jarak tempuh saat ini (mi)', elements.currentRange.textContent, 337.5);
expect('jumlah pengisian', elements.stopsNeeded.textContent, 1);
expect('interval pemberhentian (mi)', elements.stopInterval.textContent, 162.5);
expectTruthy('peta menampilkan pemberhentian', elements.roadMap.innerHTML.includes('road-stop'));
expectTruthy('petunjuk berisi Berhenti #1', elements.noteBox.innerHTML.includes('Berhenti'));
expect('total bensin terpakai (gal)', elements.totalFuel.textContent, 16.7);
expectTruthy('perkiraan biaya (~$58)', elements.fuelCost.textContent.includes('58'));
expectTruthy('travel time = 10 jam', elements.travelTime.textContent === '10 jam');
expectString('gauge readout', elements.gaugeReadout.textContent, '75%');

console.log('\n=== Konversi ke Metrik ===');
elements.btnMetric.fire('click');
expect('jarak total (km)', elements.tripDistance.value, 804.7);
expect('ukuran tangki (L)', elements.tankSize.value, 56.8);
expect('efisiensi (L/100km)', elements.fuelEfficiency.value, 7.8);
expect('jarak tempuh (km)', elements.currentRange.textContent, 546.2);
expectString('label jarak', elements.unitDistance.textContent, 'km');
expectString('label efisiensi', elements.unitEfficiency.textContent, 'L/100km');
expectString('label harga per liter', elements.priceUnit.textContent, 'liter');

console.log('\n=== Bahan bakar cukup (0 pengisian) ===');
elements.tripDistance.value = '100';
elements.fuelLevel.value = '100';
elements.tripDistance.fire('input');
expect('jumlah pengisian', elements.stopsNeeded.textContent, 0);
expect('interval = jarak total', elements.stopInterval.textContent, 100);
expectTruthy('peta tidak menampilkan pemberhentian', !elements.roadMap.innerHTML.includes('road-stop'));
expectTruthy('pesan bahan bakar cukup', elements.noteBox.innerHTML.includes('cukup'));

console.log('\n=== Kembali ke Imperial ===');
elements.btnImperial.fire('click');
expect('jarak total (mi)', elements.tripDistance.value, 62);
expect('efisiensi (MPG)', elements.fuelEfficiency.value, 30.2);
expectString('label jarak = mil', elements.unitDistance.textContent, 'mil');

console.log('\n=== Persistensi local storage ===');
expectTruthy('state tersimpan', Object.keys(storage).length === 1 && Boolean(storage['fuel-trip-planner']));

console.log('\nHasil: ' + passed + ' lulus, ' + failed + ' gagal');
process.exit(failed > 0 ? 1 : 0);