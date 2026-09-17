const UNITS = {
  imperial: {
    distance: 'mil',
    tank: 'galon',
    efficiency: 'MPG',
    efficiencyDesc: 'mil/galon'
  },
  metric: {
    distance: 'km',
    tank: 'liter',
    efficiency: 'L/100km',
    efficiencyDesc: 'L/100km'
  }
};

const KM_PER_MILE = 1.60934;
const LITER_PER_GALLON = 3.78541;
const L100KM_PER_MPG = 235.214;

let currentUnit = 'imperial';

const $ = (id) => document.getElementById(id);

function linkInputs(numberId, sliderId) {
  const numEl = $(numberId);
  const sliderEl = $(sliderId);

  numEl.addEventListener('input', () => {
    sliderEl.value = clamp(numEl.value, sliderEl.min, sliderEl.max);
    calculate();
  });

  sliderEl.addEventListener('input', () => {
    numEl.value = sliderEl.value;
    calculate();
  });
}

function clamp(value, min, max) {
  const n = parseFloat(value);
  if (isNaN(n)) return parseFloat(min);
  return Math.min(Math.max(n, parseFloat(min)), parseFloat(max));
}

function setUnit(unit) {
  if (currentUnit === unit) return;
  const prevUnit = currentUnit;
  currentUnit = unit;

  $('btnImperial').classList.toggle('active', unit === 'imperial');
  $('btnMetric').classList.toggle('active', unit === 'metric');

  $('unitDistance').textContent = UNITS[unit].distance;
  $('unitTank').textContent = UNITS[unit].tank;
  $('unitEfficiency').textContent = UNITS[unit].efficiency;

  convertValues(prevUnit, unit);
  calculate();
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
    const mpg = parseFloat(effEl.value);
    effEl.value = (L100KM_PER_MPG / mpg).toFixed(1);
    distSlider.max = 8000;
    distSlider.value = parseFloat(distanceEl.value);
    tankSlider.max = 800;
    tankSlider.value = parseFloat(tankEl.value);
    effSlider.max = 20;
    effSlider.step = 0.1;
    effSlider.value = parseFloat(effEl.value);
  } else if (from === 'metric' && to === 'imperial') {
    distanceEl.value = (parseFloat(distanceEl.value) / KM_PER_MILE).toFixed(0);
    tankEl.value = (parseFloat(tankEl.value) / LITER_PER_GALLON).toFixed(1);
    const l100 = parseFloat(effEl.value);
    effEl.value = (L100KM_PER_MPG / l100).toFixed(1);
    distSlider.max = 5000;
    distSlider.value = parseFloat(distanceEl.value);
    tankSlider.max = 200;
    tankSlider.value = parseFloat(tankEl.value);
    effSlider.max = 150;
    effSlider.step = 0.5;
    effSlider.value = parseFloat(effEl.value);
  }
}

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

function calculate() {
  const dist = parseFloat($('tripDistance').value) || 0;
  const tank = parseFloat($('tankSize').value) || 1;
  const eff = parseFloat($('fuelEfficiency').value) || 1;
  const fuelPct = parseFloat($('fuelLevel').value);

  const unit = UNITS[currentUnit];

  updateFuelBar(fuelPct);

  const range = getRangeForCurrentFuel(tank, eff, fuelPct);
  const fullRange = getFullTankRange(tank, eff);

  let stops;
  if (range >= dist) {
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

  $('currentRange').textContent = range.toFixed(1);
  $('currentRangeUnit').textContent = unit.distance + ' dengan bahan bakar saat ini';
  $('stopsNeeded').textContent = stops;
  $('stopsNeededUnit').textContent = stops === 0 ? 'tidak perlu mengisi' : 'kali pengisian';
  $('stopInterval').textContent = interval.toFixed(1);
  $('stopIntervalUnit').textContent = unit.distance + ' per pemberhentian';

  renderTripVisual(dist, range, interval, stops, unit);
}

function renderTripVisual(dist, initialRange, interval, stops, unit) {
  const mapEl = $('roadMap');
  const pumpSection = $('pumpSection');
  const noteBox = $('noteBox');

  if (dist <= 0) {
    mapEl.innerHTML = '';
    pumpSection.innerHTML = '<div class="no-stops-msg">Masukkan jarak perjalanan untuk melihat hasil</div>';
    noteBox.innerHTML = '';
    return;
  }

  const stopsToMake = [];
  let html = '<div class="road-line"></div>';

  if (stops === 0) {
    noteBox.innerHTML = '<strong>Bagus!</strong> Bahan bakar saat ini cukup untuk seluruh perjalanan sejauh '
      + dist.toFixed(1) + ' ' + unit.distance + '. Tidak perlu berhenti mengisi bahan bakar.';
    html += '<div class="road-fill" style="width:100%"></div>';
  } else {
    let pos = initialRange;
    for (let i = 0; i < stops; i++) {
      stopsToMake.push(pos);
      pos += interval;
    }

    noteBox.innerHTML = '<strong>Petunjuk:</strong> Isi penuh saat mulai. Berhenti '
      + stopsToMake.map((s, i) => '<strong>#' + (i + 1) + '</strong> di ' + s.toFixed(0) + ' ' + unit.distance).join(', ')
      + ' dari perjalanan tempuh. Interval selanjutnya bertambah karena tangki penuh.';

    const initialPct = Math.min((initialRange / dist) * 100, 100);
    html += '<div class="road-fill" style="width:' + initialPct + '%"></div>';

    stopsToMake.forEach((stopPos, i) => {
      const pct = (stopPos / dist) * 100;
      html += '<div class="road-stop" style="left:' + pct + '%">'
        + '<div class="pump-icon">⛽</div>'
        + '<div class="stop-label">#' + (i + 1) + ' — ' + stopPos.toFixed(0) + ' ' + unit.distance + '</div>'
        + '</div>';
    });
  }

  html += '<div class="road-marker-end road-start-label">🚗</div>';
  html += '<div class="road-marker-end road-end-label">🏁</div>';

  mapEl.innerHTML = html;

  let pumpsHtml = '<div class="pump-row">';
  if (stops === 0) {
    pumpsHtml += '<div class="pump-icon-standalone active">🚗</div>';
    pumpsHtml += '<div style="color:var(--green);font-size:0.8rem;font-weight:600;">Bahan bakar cukup — tidak perlu berhenti</div>';
  } else {
    pumpsHtml += '<div class="pump-icon-standalone active">🚗</div>';
    for (let i = 0; i < stops; i++) {
      pumpsHtml += '<div class="pump-icon-standalone active">⛽</div>';
    }
    pumpsHtml += '<div class="pump-icon-standalone active">🏁</div>';
  }
  pumpsHtml += '</div>';

  pumpsHtml += '<div class="pump-row-label">Start';
  for (let i = 0; i < stops; i++) {
    pumpsHtml += ' → Isi #' + (i + 1);
  }
  pumpsHtml += ' → Tujuan</div>';

  pumpSection.innerHTML = pumpsHtml;
}

function updateFuelBar(fuelPct) {
  const fill = $('fuelFill');
  fill.style.width = fuelPct + '%';
  $('fuelFillText').textContent = fuelPct + '%';
  $('fuelPct').textContent = fuelPct + '%';

  if (fuelPct > 60) {
    fill.style.background = 'linear-gradient(90deg, #4ade80, #22d3ee)';
  } else if (fuelPct > 25) {
    fill.style.background = 'linear-gradient(90deg, #facc15, #fb923c)';
  } else {
    fill.style.background = 'linear-gradient(90deg, #f87171, #fb923c)';
  }
}

$('btnImperial').addEventListener('click', () => setUnit('imperial'));
$('btnMetric').addEventListener('click', () => setUnit('metric'));

$('fuelLevel').addEventListener('input', calculate);

linkInputs('tripDistance', 'tripDistanceSlider');
linkInputs('tankSize', 'tankSizeSlider');
linkInputs('fuelEfficiency', 'fuelEfficiencySlider');

calculate();