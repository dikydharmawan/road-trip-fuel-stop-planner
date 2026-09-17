const UNITS = {
  imperial: {
    distance: 'mil',
    tank: 'galon',
    efficiency: 'MPG',
    pricePer: 'galon',
    avgSpeed: 50
  },
  metric: {
    distance: 'km',
    tank: 'liter',
    efficiency: 'L/100km',
    pricePer: 'liter',
    avgSpeed: 80
  }
};

const KM_PER_MILE = 1.60934;
const LITER_PER_GALLON = 3.78541;
const L100KM_PER_MPG = 235.214;
const STORAGE_KEY = 'fuel-trip-planner';
const GAUGE_ARC_LENGTH = Math.PI * 52;

let currentUnit = 'metric';

const $ = (id) => document.getElementById(id);

/* ---------- Input linking ---------- */

function linkInputs(numberId, sliderId) {
  const numEl = $(numberId);
  const sliderEl = $(sliderId);

  numEl.addEventListener('input', () => {
    sliderEl.value = clamp(numEl.value, sliderEl.min, sliderEl.max);
    onAnyChange();
  });

  sliderEl.addEventListener('input', () => {
    numEl.value = sliderEl.value;
    onAnyChange();
  });
}

function clamp(value, min, max) {
  const n = parseFloat(value);
  if (isNaN(n)) return parseFloat(min);
  return Math.min(Math.max(n, parseFloat(min)), parseFloat(max));
}

/* ---------- Unit switching ---------- */

function setUnit(unit) {
  if (currentUnit === unit) return;
  const prevUnit = currentUnit;
  currentUnit = unit;

  $('btnImperial').classList.toggle('active', unit === 'imperial');
  $('btnMetric').classList.toggle('active', unit === 'metric');
  $('btnImperial').setAttribute('aria-selected', unit === 'imperial');
  $('btnMetric').setAttribute('aria-selected', unit === 'metric');

  $('unitDistance').textContent = UNITS[unit].distance;
  $('unitTank').textContent = UNITS[unit].tank;
  $('unitEfficiency').textContent = UNITS[unit].efficiency;
  $('priceUnit').textContent = UNITS[unit].pricePer;

  convertValues(prevUnit, unit);
  onAnyChange();
}

function convertValues(from, to) {
  const distanceEl = $('tripDistance');
  const tankEl = $('tankSize');
  const effEl = $('fuelEfficiency');
  const distSlider = $('tripDistanceSlider');
  const tankSlider = $('tankSizeSlider');
  const effSlider = $('fuelEfficiencySlider');

  if (from === 'imperial' && to === 'metric') {
    distanceEl.value = (parseFloat(distanceEl.value) * KM_PER_MILE).toFixed(1);
    tankEl.value = (parseFloat(tankEl.value) * LITER_PER_GALLON).toFixed(1);
    const mpg = parseFloat(effEl.value) || 1;
    effEl.value = (L100KM_PER_MPG / mpg).toFixed(1);
    distSlider.max = 8000;
    distSlider.value = parseFloat(distanceEl.value);
    tankSlider.max = 800;
    tankSlider.value = parseFloat(tankEl.value);
    effSlider.max = 25;
    effSlider.step = 0.1;
    effSlider.value = parseFloat(effEl.value);
  } else if (from === 'metric' && to === 'imperial') {
    distanceEl.value = (parseFloat(distanceEl.value) / KM_PER_MILE).toFixed(0);
    tankEl.value = (parseFloat(tankEl.value) / LITER_PER_GALLON).toFixed(1);
    const l100 = parseFloat(effEl.value) || 1;
    effEl.value = (L100KM_PER_MPG / l100).toFixed(1);
    distSlider.max = 5000;
    distSlider.value = parseFloat(distanceEl.value);
    tankSlider.max = 200;
    tankSlider.value = parseFloat(tankEl.value);
    effSlider.max = 250;
    effSlider.step = 0.5;
    effSlider.value = parseFloat(effEl.value);
  }
}

/* ---------- Calculations ---------- */

function getRangeForCurrentFuel(tank, eff, fuelPct) {
  if (currentUnit === 'imperial') {
    return (fuelPct / 100) * tank * eff;
  }
  const liters = (fuelPct / 100) * tank;
  return (liters / eff) * 100;
}

function getFullTankRange(tank, eff) {
  if (currentUnit === 'imperial') {
    return tank * eff;
  }
  return (tank / eff) * 100;
}

function getTotalFuelUsed(dist, eff) {
  if (currentUnit === 'imperial') {
    return dist / eff;
  }
  return (eff * dist) / 100;
}

function formatTime(hours) {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (h === 0) return m + ' menit';
  if (m === 0) return h + ' jam';
  return h + ' jam ' + m + ' menit';
}

function formatFuel(v) {
  return (Math.round(v * 10) / 10).toLocaleString('id-ID', { maximumFractionDigits: 1 });
}

function calculate() {
  const dist = parseFloat($('tripDistance').value) || 0;
  const tank = parseFloat($('tankSize').value) || 1;
  const eff = parseFloat($('fuelEfficiency').value) || 1;
  const fuelPct = clamp($('fuelLevel').value, 0, 100);
  const price = parseFloat($('fuelPrice').value) || 0;

  const unit = UNITS[currentUnit];

  updateFuelVisuals(fuelPct);

  const range = getRangeForCurrentFuel(tank, eff, fuelPct);
  const fullRange = getFullTankRange(tank, eff);

  let stops;
  if (range >= dist || dist === 0) {
    stops = 0;
  } else {
    const remaining = dist - range;
    stops = Math.ceil(remaining / fullRange);
  }

  let interval;
  if (stops === 0) {
    interval = dist;
  } else {
    interval = (dist - range) / stops;
  }

  const totalFuel = getTotalFuelUsed(dist, eff);
  const cost = price > 0 ? totalFuel * price : 0;
  const travelHours = dist > 0 ? dist / unit.avgSpeed : 0;

  $('currentRange').textContent = range.toFixed(1);
  $('currentRangeUnit').textContent = unit.distance + ' dengan bahan bakar saat ini';
  $('stopsNeeded').textContent = stops;
  $('stopsNeededUnit').textContent = stops === 0 ? 'tidak perlu mengisi' : 'kali pengisian';
  $('stopInterval').textContent = interval.toFixed(1);
  $('stopIntervalUnit').textContent = unit.distance + ' per pemberhentian';

  $('totalFuel').textContent = formatFuel(totalFuel);
  $('totalFuelUnit').textContent = unit.tank;

  $('fuelCost').textContent = price > 0 ? 'Rp ' + Math.round(cost).toLocaleString('id-ID') : '—';
  $('fuelCostUnit').textContent = price > 0 ? 'estimasi biaya Pertalite' : 'masukkan harga di bawah';

  $('travelTime').textContent = dist > 0 ? formatTime(travelHours) : '—';
  $('travelTimeUnit').textContent = 'dengan kecepatan rata-rata ' + unit.avgSpeed + ' ' + (currentUnit === 'imperial' ? 'mph' : 'km/jam');

  renderTripVisual(dist, range, interval, stops, unit);
}

/* ---------- Fuel visuals: bar + gauge ---------- */

function updateFuelVisuals(fuelPct) {
  const fill = $('fuelFill');
  fill.style.width = fuelPct + '%';
  $('fuelFillText').textContent = Math.round(fuelPct) + '%';
  $('fuelPct').textContent = Math.round(fuelPct) + '%';
  $('gaugeReadout').textContent = Math.round(fuelPct) + '%';

  if (fuelPct > 60) {
    fill.style.background = 'linear-gradient(90deg, #4ade80, #22d3ee)';
  } else if (fuelPct > 25) {
    fill.style.background = 'linear-gradient(90deg, #facc15, #fb923c)';
  } else {
    fill.style.background = 'linear-gradient(90deg, #f87171, #fb923c)';
  }

  const fillOffset = GAUGE_ARC_LENGTH * (1 - fuelPct / 100);
  const fillEl = $('gaugeFill');
  fillEl.style.strokeDasharray = GAUGE_ARC_LENGTH;
  fillEl.style.strokeDashoffset = fillOffset;

  const rotation = 90 - fuelPct * 1.8;
  $('gaugeNeedle').setAttribute('transform', 'rotate(' + rotation + ' 60 92)');
}

/* ---------- Trip visualization ---------- */

function renderTripVisual(dist, initialRange, interval, stops, unit) {
  const mapEl = $('roadMap');
  const pumpSection = $('pumpSection');
  const noteBox = $('noteBox');

  if (stops === 0) {
    if (dist === 0) {
      mapEl.innerHTML = '';
      pumpSection.innerHTML = '<div class="no-stops-msg">Masukkan jarak perjalanan untuk melihat hasil</div>';
      noteBox.innerHTML = '';
      return;
    }
    noteBox.innerHTML = '<strong>Bagus!</strong> Bahan bakar saat ini cukup untuk seluruh perjalanan sejauh '
      + dist.toFixed(1) + ' ' + unit.distance
      + '. Tidak perlu berhenti mengisi bahan bakar selama perjalanan.';
  }

  let html = '<div class="road-line"></div>';
  let pumpsHtml = '<div class="pump-row">';
  let label = 'Start';

  if (stops === 0) {
    html += '<div class="road-fill" style="width:100%"></div>';
    pumpsHtml += '<div class="pump-icon-standalone active">🚗</div>';
    pumpsHtml += '<div style="color:var(--green);font-size:0.8rem;font-weight:600;">Bahan bakar cukup — tidak perlu berhenti</div>';
    label = 'Start → Tujuan';
  } else {
    const stopsToMake = [];
    let pos = initialRange;
    for (let i = 0; i < stops; i++) {
      stopsToMake.push(pos);
      pos += interval;
    }

    noteBox.innerHTML = '<strong>Rencana:</strong> Isi penuh saat berangkat. Berhenti '
      + stopsToMake.map((s, i) => '<strong>#' + (i + 1) + '</strong> di ' + s.toFixed(0) + ' ' + unit.distance).join(', ')
      + '. Rata-rata setiap ' + interval.toFixed(1) + ' ' + unit.distance
      + '. Tetap jaga cadangan bahan bakar minimal 10% sebelum mengisi.';

    const initialPct = Math.min((initialRange / dist) * 100, 100);
    html += '<div class="road-fill" style="width:' + initialPct + '%"></div>';

    stopsToMake.forEach((stopPos, i) => {
      const pct = (stopPos / dist) * 100;
      html += '<div class="road-stop" style="left:' + pct + '%">'
        + '<div class="pump-icon">⛽</div>'
        + '<div class="stop-label">#' + (i + 1) + ' — ' + stopPos.toFixed(0) + ' ' + unit.distance + '</div>'
        + '</div>';
    });

    pumpsHtml += '<div class="pump-icon-standalone active">🚗</div>';
    for (let i = 0; i < stops; i++) {
      pumpsHtml += '<div class="pump-icon-standalone active">⛽</div>';
    }
    pumpsHtml += '<div class="pump-icon-standalone active">🏁</div>';

    label = 'Start';
    for (let i = 0; i < stops; i++) {
      label += ' → Isi #' + (i + 1);
    }
    label += ' → Tujuan';
  }

  html += '<div class="road-marker-end road-start-label">🚗</div>';
  html += '<div class="road-marker-end road-end-label">🏁</div>';

  mapEl.innerHTML = html;
  pumpsHtml += '</div>';
  pumpSection.innerHTML = pumpsHtml + '<div class="pump-row-label">' + label + '</div>';
}

/* ---------- Persistence ---------- */

function saveState() {
  const state = {
    unit: currentUnit,
    distance: $('tripDistance').value,
    tank: $('tankSize').value,
    efficiency: $('fuelEfficiency').value,
    fuelLevel: $('fuelLevel').value,
    fuelPrice: $('fuelPrice').value
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    /* localStorage mungkin tidak tersedia */
  }
}

function restoreState() {
  let state = null;
  try {
    state = JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch (e) {
    state = null;
  }
  if (!state) return;

  currentUnit = state.unit === 'metric' ? 'metric' : 'imperial';

  $('tripDistance').value = state.distance;
  $('tripDistanceSlider').value = state.distance;
  $('tankSize').value = state.tank;
  $('tankSizeSlider').value = state.tank;
  $('fuelEfficiency').value = state.efficiency;
  $('fuelEfficiencySlider').value = state.efficiency;
  $('fuelLevel').value = state.fuelLevel;
  $('fuelPrice').value = state.fuelPrice;

  $('btnImperial').classList.toggle('active', currentUnit === 'imperial');
  $('btnMetric').classList.toggle('active', currentUnit === 'metric');
  $('btnImperial').setAttribute('aria-selected', currentUnit === 'imperial');
  $('btnMetric').setAttribute('aria-selected', currentUnit === 'metric');

  $('unitDistance').textContent = UNITS[currentUnit].distance;
  $('unitTank').textContent = UNITS[currentUnit].tank;
  $('unitEfficiency').textContent = UNITS[currentUnit].efficiency;
  $('priceUnit').textContent = UNITS[currentUnit].pricePer;
}

function onAnyChange() {
  saveState();
  calculate();
}

/* ---------- Wire up ---------- */

$('btnImperial').addEventListener('click', () => setUnit('imperial'));
$('btnMetric').addEventListener('click', () => setUnit('metric'));
$('fuelLevel').addEventListener('input', onAnyChange);
$('fuelPrice').addEventListener('input', onAnyChange);

linkInputs('tripDistance', 'tripDistanceSlider');
linkInputs('tankSize', 'tankSizeSlider');
linkInputs('fuelEfficiency', 'fuelEfficiencySlider');

restoreState();
calculate();