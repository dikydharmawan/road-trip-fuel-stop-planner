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