const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');

const elements = {};

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

let passed = 0;
let failed = 0;

function expect(label, got, want) {
  if (Math.abs(got - want) > 0.01) {
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

global.document = { getElementById: getEl };

seedHtmlInputs();
['btnImperial', 'btnMetric', 'unitDistance', 'unitTank', 'unitEfficiency',
 'currentRange', 'currentRangeUnit', 'stopsNeeded', 'stopsNeededUnit',
 'stopInterval', 'stopIntervalUnit', 'fuelFill', 'fuelFillText', 'fuelPct',
 'roadMap', 'pumpSection', 'noteBox'].forEach(getEl);

eval(js);

console.log('\n=== Imperial (default: 500 mi, 15 gal, 30 MPG, 75%) ===');
expect('jarak tempuh saat ini', parseFloat(elements.currentRange.textContent), 337.5);
expect('jumlah pengisian', parseFloat(elements.stopsNeeded.textContent), 1);
expect('interval pemberhentian', parseFloat(elements.stopInterval.textContent), 162.5);
expectTruthy('peta perjalanan menampilkan pemberhentian', elements.roadMap.innerHTML.includes('road-stop'));
expectTruthy('petunjuk berisi Berhenti #1', elements.noteBox.innerHTML.includes('#1'));

console.log('\n=== Konversi ke Metrik ===');
elements.btnMetric.fire('click');
expect('jarak total (km)', parseFloat(elements.tripDistance.value), 804.7);
expect('ukuran tangki (L)', parseFloat(elements.tankSize.value), 56.8);
expect('efisiensi (L/100km)', parseFloat(elements.fuelEfficiency.value), 7.8);
expect('jarak tempuh (km)', parseFloat(elements.currentRange.textContent), 546.2);
expectTruthy('label satuan = km', elements.unitDistance.textContent === 'km');
expectTruthy('label satuan = liter', elements.unitTank.textContent === 'liter');
expectTruthy('label satuan = L/100km', elements.unitEfficiency.textContent === 'L/100km');

console.log('\n=== Bahan bakar cukup (0 pengisian) ===');
elements.tripDistance.value = '100';
elements.fuelLevel.value = '100';
elements.tripDistance.fire('input');
expect('jumlah pengisian', parseFloat(elements.stopsNeeded.textContent), 0);
expect('interval = jarak total', parseFloat(elements.stopInterval.textContent), 100);
expectTruthy('peta tidak menampilkan pemberhentian', !elements.roadMap.innerHTML.includes('road-stop'));

console.log('\n=== Kembali ke Imperial ===');
elements.btnImperial.fire('click');
expect('jarak total (mi)', parseFloat(elements.tripDistance.value), 62);
expect('efisiensi (MPG)', parseFloat(elements.fuelEfficiency.value), 30.2);
expectTruthy('label satuan = mil', elements.unitDistance.textContent === 'mil');

console.log('\nHasil: ' + passed + ' lulus, ' + failed + ' gagal');
process.exit(failed > 0 ? 1 : 0);