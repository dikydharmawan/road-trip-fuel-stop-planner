const UNITS = {
  imperial: {
    distance: 'mil',
    tank: 'galon',
    efficiency: 'MPG',
    pricePer: 'galon',
    speed: 'mph'
  },
  metric: {
    distance: 'km',
    tank: 'liter',
    efficiency: 'L/100km',
    pricePer: 'liter',
    speed: 'km/jam'
  }
};

const FUELS = {
  pertalite: { name: 'Pertalite', price: 10000 },
  pertamax: { name: 'Pertamax', price: 15000 },
  solar: { name: 'Solar', price: 5000 }
};

const I18N = {
  id: {
    title: 'Perencana Bahan Bakar Pertalite',
    tagline: 'Simulasikan kebutuhan isi ulang bahan bakar untuk perjalanan darat Anda',
    panelParams: 'Parameter Perjalanan',
    distance: 'Jarak Total Perjalanan',
    tank: 'Ukuran Tangki Bahan Bakar',
    efficiency: 'Efisiensi Bahan Bakar',
    panelFuel: 'Tingkat Bahan Bakar Saat Ini',
    fuelRemaining: 'Bensin tersisa:',
    safeRange: 'Jarak aman (dengan cadangan):',
    panelStrategy: 'Strategi & Pengaturan',
    reserve: 'Cadangan Bahan Bakar Aman',
    reserveHint: 'Minimal sisa bensin sebelum mengisi ulang, agar tak kehabisan di jalan.',
    speed: 'Kecepatan Rata-rata',
    speedHint: 'Dipakai untuk memperkirakan waktu tempuh.',
    panelResults: 'Hasil Perhitungan',
    range: 'Jarak Tempuh Saat Ini',
    stops: 'Pengisian Dibutuhkan',
    interval: 'Interval Pemberhentian',
    cost: 'Perkiraan Biaya',
    consumption: 'Total Bensin Terpakai',
    time: 'Estimasi Waktu Tempuh',
    panelMap: 'Peta Perjalanan',
    panelFuelType: 'Jenis & Harga Bahan Bakar',
    chooseFuel: 'Pilih jenis bahan bakar',
    fuelNote: 'Estimasi biaya dihitung otomatis dari harga jenis bahan bakar yang dipilih. Total bahan bakar ditampilkan di kartu hasil.',
    panelPlan: 'Simpan & Bagikan Rencana',
    tripNamePh: 'Nama perjalanan (opsional)',
    saveTrip: '💾 Simpan Rencana',
    copyPlan: '📋 Salin Ringkasan',
    saved: 'Tersimpan!',
    copied: 'Ringkasan disalin!',
    copiedErr: 'Gagal menyalin ke clipboard.',
    loadTrip: 'Muat',
    delTrip: 'Hapus',
    savedTrips: 'Rencana tersimpan',
    noSavedTrips: 'Belum ada rencana tersimpan.',
    footer: 'Perencana Bahan Bakar — Hitungan bersifat estimasi & untuk referensi saja',
    rangeUnit: '{unit} dengan bahan bakar saat ini',
    noStopsUnit: 'tidak perlu mengisi',
    stopsUnit: 'kali pengisian',
    intervalUnit: '{unit} per pemberhentian',
    costUnit: 'estimasi biaya {fuel}',
    consumptionUnit: '{unit} {fuel}',
    timeUnit: 'estimasi, kecepatan {speed} {speedUnit}',
    bannerLow: '⚠️ Bensin di bawah cadangan {reserve}%. Segera isi penuh sebelum berangkat agar tidak kehabisan di jalan.',
    bannerEnough: '✅ Bahan bakar cukup untuk seluruh perjalanan sejauh {dist} {unit}, dengan cadangan {reserve}% sisa tangki.',
    bannerNeed: '🛢️ Butuh {stops} kali berhenti mengisi — perkiraan biaya {cost}. Berhenti pertama di {first} {unit}.',
    noteEnough: 'Bagus! Bahan bakar saat ini cukup untuk seluruh perjalanan sejauh {dist} {unit}. Tidak perlu berhenti mengisi selama perjalanan.',
    notePlan: 'Rencana: isi penuh saat berangkat. Berhenti {list}. Jaga cadangan {reserve}% sebelum mengisi.',
    stopAT: '#{n} di {pos} {unit}',
    fillAmount: 'isi ± {amt} {unitFuel} (± {cost})',
    summary: [
      '{emoji} Rencana Perjalanan {fuel}',
      'Jarak: {dist} {unit}',
      'Tangki: {tank} {unitTank}',
      'Efisiensi: {eff} {unitEff}',
      'Bensin kini: {pct}% ({rem} {unitTank})',
      'Jarak tempuh: {range} {unit}',
      'Jarak aman (cadangan {reserve}%): {safe} {unit}',
      'Perlu berhenti: {stops}x',
      'Waktu tempuh: ± {time} ({speed} {speedUnit})',
      'Total bahan bakar: {total} {unitTank}',
      'Perkiraan biaya: Rp {cost}'
    ].join('\n'),
    perHour: '{speed} {speedUnit}',
    hours: '{h} jam',
    mins: '{m} menit',
    hoursMins: '{h} jam {m} menit'
  },
  en: {
    title: 'Road Trip Fuel Stop Planner',
    tagline: 'Estimate how often you will need to refuel on your road trip',
    panelParams: 'Trip Parameters',
    distance: 'Total Trip Distance',
    tank: 'Fuel Tank Size',
    efficiency: 'Fuel Efficiency',
    panelFuel: 'Current Fuel Level',
    fuelRemaining: 'Fuel remaining:',
    safeRange: 'Safe range (with reserve):',
    panelStrategy: 'Strategy & Settings',
    reserve: 'Safe Fuel Reserve',
    reserveHint: 'Minimum fuel left before refilling, so you never run out on the road.',
    speed: 'Average Speed',
    speedHint: 'Used to estimate travel time.',
    panelResults: 'Results',
    range: 'Current Range',
    stops: 'Refills Needed',
    interval: 'Stop Interval',
    cost: 'Estimated Cost',
    consumption: 'Total Fuel Used',
    time: 'Estimated Travel Time',
    panelMap: 'Trip Map',
    panelFuelType: 'Fuel Type & Price',
    chooseFuel: 'Choose fuel type',
    fuelNote: 'Cost estimate is calculated automatically from the selected fuel price. Total fuel is shown in the results card.',
    panelPlan: 'Save & Share Plan',
    tripNamePh: 'Trip name (optional)',
    saveTrip: '💾 Save Plan',
    copyPlan: '📋 Copy Summary',
    saved: 'Saved!',
    copied: 'Summary copied!',
    copiedErr: 'Could not copy to clipboard.',
    loadTrip: 'Load',
    delTrip: 'Delete',
    savedTrips: 'Saved plans',
    noSavedTrips: 'No saved plans yet.',
    footer: 'Fuel Planner — Estimates only, for reference purposes',
    rangeUnit: '{unit} with current fuel',
    noStopsUnit: 'no refill needed',
    stopsUnit: 'refill(s)',
    intervalUnit: '{unit} per stop',
    costUnit: '{fuel} estimated cost',
    consumptionUnit: '{unit} of {fuel}',
    timeUnit: 'estimate at {speed} {speedUnit}',
    bannerLow: '⚠️ Fuel is below the {reserve}% reserve. Refill before leaving so you do not run out.',
    bannerEnough: '✅ You have enough fuel for the whole trip ({dist} {unit}), keeping a {reserve}% reserve.',
    bannerNeed: '🛢️ You will need {stops} refill(s) — estimated cost {cost}. First stop at {first} {unit}.',
    noteEnough: 'Great! Your current fuel covers the entire trip of {dist} {unit}. No refueling stops needed.',
    notePlan: 'Plan: start with a full tank. Stop {list}. Keep a {reserve}% reserve before refilling.',
    stopAT: '#{n} at {pos} {unit}',
    fillAmount: 'fill ± {amt} {unitFuel} (± {cost})',
    summary: [
      '{emoji} {fuel} Road Trip Plan',
      'Distance: {dist} {unit}',
      'Tank: {tank} {unitTank}',
      'Efficiency: {eff} {unitEff}',
      'Fuel now: {pct}% ({rem} {unitTank})',
      'Range: {range} {unit}',
      'Safe range ({reserve}% reserve): {safe} {unit}',
      'Refills needed: {stops}',
      'Travel time: ± {time} ({speed} {speedUnit})',
      'Total fuel: {total} {unitTank}',
      'Estimated cost: Rp {cost}'
    ].join('\n'),
    perHour: '{speed} {speedUnit}',
    hours: '{h} h',
    mins: '{m} min',
    hoursMins: '{h} h {m} min'
  }
};

const KM_PER_MILE = 1.60934;
const LITER_PER_GALLON = 3.78541;
const L100KM_PER_MPG = 235.214;
const STORAGE_KEY = 'fuel-trip-planner';
const SAVED_KEY = 'fuel-trip-saved';
const GAUGE_ARC_LENGTH = Math.PI * 52;

let currentUnit = 'metric';
let currentLang = 'id';
let currentTheme = 'dark';
let lastSummary = '';

const $ = (id) => document.getElementById(id);

const T = (key) => (I18N[currentLang] && I18N[currentLang][key]) || I18N.id[key] || key;

function TF(key, vars) {
  let s = T(key);
  Object.keys(vars || {}).forEach((k) => {
    s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]);
  });
  return s;
}

const num = (v) => parseFloat(String(v)) || 0;

function clamp(value, min, max) {
  const n = parseFloat(value);
  if (isNaN(n)) return parseFloat(min);
  return Math.min(Math.max(n, parseFloat(min)), parseFloat(max));
}

function formatFuel(v) {
  return (Math.round(v * 10) / 10).toLocaleString('id-ID', { maximumFractionDigits: 1 });
}

function formatMoneyRp(v) {
  return Math.round(v).toLocaleString('id-ID');
}

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

/* ---------- Language ---------- */

function setLanguage(lang) {
  currentLang = lang === 'en' ? 'en' : 'id';
  $('langId').classList.toggle('active', currentLang === 'id');
  $('langEn').classList.toggle('active', currentLang === 'en');
  applyLanguage();
  onAnyChange();
}

function applyLanguage() {
  if (!document.querySelectorAll) return;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = T(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.placeholder = T(el.getAttribute('data-i18n-placeholder'));
  });
  try { document.title = T('title'); } catch (e) { /* ignore */ }
}

/* ---------- Theme ---------- */

function setTheme(theme) {
  currentTheme = theme === 'light' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', currentTheme);
  $('themeToggle').textContent = currentTheme === 'dark' ? '☀️' : '🌙';
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', currentTheme === 'dark' ? '#0b1120' : '#eef2f7');
  saveState();
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
  $('avgSpeedUnit').textContent = UNITS[unit].speed;

  const speedKmh = currentUnit === 'metric'
    ? num($('avgSpeed').value)
    : num($('avgSpeed').value) * KM_PER_MILE;
  $('avgSpeed').value = currentUnit === 'imperial'
    ? Math.round(speedKmh / KM_PER_MILE)
    : Math.round(speedKmh);

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

  if (from === 'metric' && to === 'imperial') {
    distanceEl.value = (num(distanceEl.value) / KM_PER_MILE).toFixed(0);
    tankEl.value = (num(tankEl.value) / LITER_PER_GALLON).toFixed(1);
    const l100 = num(effEl.value) || 1;
    effEl.value = (L100KM_PER_MPG / l100).toFixed(1);
    distSlider.max = 5000;
    distSlider.value = num(distanceEl.value);
    tankSlider.max = 200;
    tankSlider.value = num(tankEl.value);
    effSlider.max = 250;
    effSlider.step = 0.5;
    effSlider.value = num(effEl.value);
  } else if (from === 'imperial' && to === 'metric') {
    distanceEl.value = (num(distanceEl.value) * KM_PER_MILE).toFixed(1);
    tankEl.value = (num(tankEl.value) * LITER_PER_GALLON).toFixed(1);
    const mpg = num(effEl.value) || 1;
    effEl.value = (L100KM_PER_MPG / mpg).toFixed(1);
    distSlider.max = 8000;
    distSlider.value = num(distanceEl.value);
    tankSlider.max = 800;
    tankSlider.value = num(tankEl.value);
    effSlider.max = 25;
    effSlider.step = 0.1;
    effSlider.value = num(effEl.value);
  }
}

/* ---------- Calculations ---------- */

function getRangeForCurrentFuel(tank, eff, fuelPct) {
  if (currentUnit === 'imperial') return (fuelPct / 100) * tank * eff;
  return ((fuelPct / 100) * tank) / eff * 100;
}

function getFullTankRange(tank, eff) {
  if (currentUnit === 'imperial') return tank * eff;
  return (tank / eff) * 100;
}

function getTotalFuelUsed(dist, eff) {
  if (currentUnit === 'imperial') return dist / eff;
  return (eff * dist) / 100;
}

function formatTime(hours) {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (h === 0) return TF('mins', { m });
  if (m === 0) return TF('hours', { h });
  return TF('hoursMins', { h, m });
}

function calculate() {
  const dist = num($('tripDistance').value);
  const tank = num($('tankSize').value) || 1;
  const eff = num($('fuelEfficiency').value) || 1;
  const fuelPct = clamp($('fuelLevel').value, 0, 100);
  const reserve = clamp($('reserve').value !== undefined ? $('reserve').value : 10, 0, 25);
  const fuel = FUELS[$('fuelType').value] || FUELS.pertalite;
  const price = fuel.price;
  const speedRaw = num($('avgSpeed').value) || 50;

  const unit = UNITS[currentUnit];
  const speed = currentUnit === 'metric' ? speedRaw : speedRaw * KM_PER_MILE;

  updateFuelVisuals(fuelPct);
  updateReserveDisplay(reserve);

  const range = getRangeForCurrentFuel(tank, eff, fuelPct);
  const fullRange = getFullTankRange(tank, eff);
  const leg1Len = Math.max(0, (fuelPct - reserve) / 100) * fullRange;
  const legLen = ((100 - reserve) / 100) * fullRange;

  $('fuelRemaining').textContent = formatFuel((fuelPct / 100) * tank) + ' ' + unit.tank;
  $('safeRangeLabel').textContent = leg1Len.toFixed(1) + ' ' + unit.distance;

  let stops;
  let interval;
  if (leg1Len >= dist || dist === 0) {
    stops = 0;
    interval = dist;
  } else {
    const remaining = dist - leg1Len;
    stops = Math.ceil(remaining / legLen);
    interval = remaining / stops;
  }

  const totalFuel = getTotalFuelUsed(dist, eff);
  const cost = totalFuel * price;
  const travelHours = dist > 0 ? dist / speed : 0;

  const stopsToMake = [];
  let pos = leg1Len;
  for (let i = 0; i < stops; i++) {
    stopsToMake.push(pos);
    pos += legLen;
  }

  $('currentRange').textContent = range.toFixed(1);
  $('currentRangeUnit').textContent = TF('rangeUnit', { unit: unit.distance });
  $('stopsNeeded').textContent = stops;
  $('stopsNeededUnit').textContent = stops === 0 ? T('noStopsUnit') : stops + ' ' + T('stopsUnit');
  $('stopInterval').textContent = interval.toFixed(1);
  $('stopIntervalUnit').textContent = TF('intervalUnit', { unit: unit.distance });

  $('totalFuel').textContent = formatFuel(totalFuel);
  $('totalFuelUnit').textContent = TF('consumptionUnit', { unit: unit.tank, fuel: fuel.name });

  $('fuelCost').textContent = 'Rp ' + formatMoneyRp(cost);
  $('fuelCostUnit').textContent = TF('costUnit', { fuel: fuel.name });

  $('fuelPriceDisplay').textContent = 'Rp ' + price.toLocaleString('id-ID') + ' / ' + unit.pricePer;

  $('travelTime').textContent = dist > 0 ? formatTime(travelHours) : '—';
  $('travelTimeUnit').textContent = TF('timeUnit', { speed: Math.round(speedRaw), speedUnit: unit.speed });

  renderTripVisual(dist, leg1Len, legLen, stopsToMake, reserve, fuel, price, eff, unit);
  renderRiskBanner(dist, leg1Len, stops, cost, reserve, fuelPct, unit);
  buildSummary(dist, range, leg1Len, stops, totalFuel, cost, reserve, fuel, travelHours, speedRaw, unit, tank, eff);
}

/* ---------- Fuel visuals ---------- */

function updateFuelVisuals(fuelPct) {
  const fill = $('fuelFill');
  fill.style.width = fuelPct + '%';
  $('fuelFillText').textContent = Math.round(fuelPct) + '%';
  $('fuelPct').textContent = Math.round(fuelPct) + '%';
  $('gaugeReadout').textContent = Math.round(fuelPct) + '%';

  if (fuelPct > 60) fill.style.background = 'linear-gradient(90deg, #4ade80, #22d3ee)';
  else if (fuelPct > 25) fill.style.background = 'linear-gradient(90deg, #facc15, #fb923c)';
  else fill.style.background = 'linear-gradient(90deg, #f87171, #fb923c)';

  const fillEl = $('gaugeFill');
  fillEl.style.strokeDasharray = GAUGE_ARC_LENGTH;
  fillEl.style.strokeDashoffset = GAUGE_ARC_LENGTH * (1 - fuelPct / 100);

  const rotation = 90 - fuelPct * 1.8;
  $('gaugeNeedle').setAttribute('transform', 'rotate(' + rotation + ' 60 92)');
}

function updateReserveDisplay(reserve) {
  $('reserveDisplay').textContent = Math.round(reserve) + '%';
}

/* ---------- Trip visualization ---------- */

function renderTripVisual(dist, leg1Len, legLen, stopsToMake, reserve, fuel, price, eff, unit) {
  const mapEl = $('roadMap');
  const pumpSection = $('pumpSection');
  const noteBox = $('noteBox');
  const stopWrap = $('stopTableWrap');

  if (dist === 0) {
    mapEl.innerHTML = '';
    pumpSection.innerHTML = '<div class="no-stops-msg">' + T('panelMap') + '</div>';
    noteBox.innerHTML = '';
    stopWrap.innerHTML = '';
    return;
  }

  let html = '<div class="road-line"></div>';
  let pumpIcons = '';
  let pumpLabel = 'Start → Tujuan';

  if (stopsToMake.length === 0) {
    html += '<div class="road-fill" style="width:100%"></div>';
    pumpIcons = '<div class="pump-icon-standalone active">🚗</div>'
      + '<div style="color:var(--green);font-size:0.8rem;font-weight:600;">' + T('noStopsUnit') + '</div>';
    noteBox.innerHTML = TF('noteEnough', { dist: dist.toFixed(1), unit: unit.distance });
    stopWrap.innerHTML = '';
  } else {
    const leg1Fuel = ((num($('fuelLevel').value) - reserve) / 100) * tankVolume();
    const legFuel = ((100 - reserve) / 100) * tankVolume();
    const fillAmt = (i) => (i === 0 ? leg1Fuel : legFuel);

    const list = stopsToMake.map((s, i) => '<strong>' + TF('stopAT', { n: i + 1, pos: s.toFixed(0), unit: unit.distance }) + '</strong>').join(', ');
    noteBox.innerHTML = TF('notePlan', { list: list, reserve: Math.round(reserve) });

    const initialPct = Math.min((leg1Len / dist) * 100, 100);
    html += '<div class="road-fill" style="width:' + initialPct + '%"></div>';

    stopsToMake.forEach((stopPos, i) => {
      const pct = (stopPos / dist) * 100;
      html += '<div class="road-stop" style="left:' + pct + '%">'
        + '<div class="pump-icon">⛽</div>'
        + '<div class="stop-label">#' + (i + 1) + ' — ' + stopPos.toFixed(0) + ' ' + unit.distance + '</div>'
        + '</div>';
    });

    pumpIcons = '<div class="pump-icon-standalone active">🚗</div>';
    for (let i = 0; i < stopsToMake.length; i++) pumpIcons += '<div class="pump-icon-standalone active">⛽</div>';
    pumpIcons += '<div class="pump-icon-standalone active">🏁</div>';

    pumpLabel = 'Start';
    for (let i = 0; i < stopsToMake.length; i++) pumpLabel += ' → Isi #' + (i + 1);
    pumpLabel += ' → Tujuan';

    stopWrap.innerHTML = buildStopTable(stopsToMake, fillAmt, price, unit);
  }

  html += '<div class="road-marker-end road-start-label">🚗</div>';
  html += '<div class="road-marker-end road-end-label">🏁</div>';

  mapEl.innerHTML = html;
  pumpSection.innerHTML = '<div class="pump-row">' + pumpIcons + '</div>'
    + '<div class="pump-row-label">' + pumpLabel + '</div>';
}

function tankVolume() {
  return num($('tankSize').value);
}

function buildStopTable(stopsToMake, fillAmt, price, unit) {
  const colPos = currentLang === 'id' ? 'Posisi' : 'Position';
  const colFill = currentLang === 'id' ? 'Bensin Diisi' : 'Fuel Added';
  const colCost = currentLang === 'id' ? 'Estimasi Biaya' : 'Est. Cost';
  const hLabel = stopsToMake.map((s, i) => {
    const amt = fillAmt(s, i);
    const cost = amt * price;
    return '<tr>'
      + '<td data-label="Stop">#' + (i + 1) + '</td>'
      + '<td data-label="' + colPos + '">' + s.toFixed(0) + ' ' + unit.distance + '</td>'
      + '<td data-label="' + colFill + '">' + formatFuel(amt) + ' ' + unit.tank + '</td>'
      + '<td data-label="' + colCost + '">Rp ' + formatMoneyRp(cost) + '</td>'
      + '</tr>';
  }).join('');

  return '<div class="stop-table-wrap"><table class="stop-table">'
    + '<thead><tr><th>Stop</th><th>' + colPos + '</th><th>' + colFill + '</th><th>' + colCost + '</th></tr></thead>'
    + '<tbody>' + hLabel + '</tbody></table></div>';
}

/* ---------- Risk banner ---------- */

function renderRiskBanner(dist, leg1Len, stops, cost, reserve, fuelPct, unit) {
  const banner = $('riskBanner');
  let type = '';
  let msg = '';

  if (fuelPct <= reserve) {
    type = 'danger';
    msg = TF('bannerLow', { reserve: Math.round(reserve) });
  } else if (stops === 0 && dist > 0) {
    type = 'success';
    msg = TF('bannerEnough', { dist: dist.toFixed(1), unit: unit.distance, reserve: Math.round(reserve) });
  } else if (dist > 0) {
    const first = Math.round(leg1Len);
    type = 'warn';
    msg = TF('bannerNeed', { stops: stops, cost: 'Rp ' + formatMoneyRp(cost), first: first, unit: unit.distance });
  }

  banner.className = 'risk-banner' + (type ? ' show ' + type : '');
  banner.textContent = msg;
}

/* ---------- Summary ---------- */

function buildSummary(dist, range, leg1Len, stops, totalFuel, cost, reserve, fuel, travelHours, speedRaw, unit, tank, eff) {
  lastSummary = TF('summary', {
    emoji: '⛽',
    fuel: fuel.name,
    dist: dist.toFixed(1),
    unit: unit.distance,
    tank: formatFuel(tank),
    unitTank: unit.tank,
    eff: formatFuel(eff),
    unitEff: unit.efficiency,
    pct: Math.round($('fuelLevel').value),
    rem: formatFuel((num($('fuelLevel').value) / 100) * tank),
    range: range.toFixed(1),
    reserve: Math.round(reserve),
    safe: leg1Len.toFixed(1),
    stops: stops,
    time: formatTime(travelHours),
    speed: Math.round(speedRaw),
    speedUnit: unit.speed,
    total: formatFuel(totalFuel),
    cost: formatMoneyRp(cost)
  });
}

function copySummary() {
  if (!lastSummary) return;
  const feedback = $('copyFeedback');
  const done = () => {
    feedback.textContent = T('copied');
    setTimeout(() => { feedback.textContent = ''; }, 2500);
  };
  const fail = () => {
    feedback.textContent = T('copiedErr');
    setTimeout(() => { feedback.textContent = ''; }, 2500);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(lastSummary).then(done).catch(fail);
  } else {
    fail();
  }
}

/* ---------- Saved trips ---------- */

function getSavedTrips() {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function renderSavedTrips() {
  const list = $('savedTrips');
  const trips = getSavedTrips();
  if (trips.length === 0) {
    list.innerHTML = '<li class="saved-empty">' + T('noSavedTrips') + '</li>';
    return;
  }
  list.innerHTML = trips.map((t, i) =>
    '<li class="saved-item">'
    + '<span class="saved-name">' + escapeHtml(t.name) + '</span>'
    + '<span class="saved-meta">' + escapeHtml(t.meta || '') + '</span>'
    + '<span class="saved-actions">'
    + '<button class="btn btn-primary" type="button" data-action="load" data-idx="' + i + '">↩ ' + T('loadTrip') + '</button>'
    + '<button class="btn btn-danger" type="button" data-action="del" data-idx="' + i + '" title="' + T('delTrip') + '">🗑</button>'
    + '</span></li>'
  ).join('');
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function saveTrip() {
  const trips = getSavedTrips();
  const name = $('tripName').value.trim()
    || (currentLang === 'id' ? 'Perjalanan ' : 'Trip ') + (trips.length + 1);
  const s = currentState();
  trips.push({
    name: name,
    meta: s.distance + ' ' + UNITS[currentUnit].distance,
    state: s
  });
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(trips));
  } catch (e) { /* ignore */ }
  $('tripName').value = '';
  renderSavedTrips();
  const fb = $('copyFeedback');
  fb.textContent = '💾 ' + T('saved');
  setTimeout(() => { fb.textContent = ''; }, 2000);
}

function loadTrip(idx) {
  const trips = getSavedTrips();
  const trip = trips[idx];
  if (!trip || !trip.state) return;
  const s = trip.state;

  currentUnit = s.unit === 'imperial' ? 'imperial' : 'metric';
  applyStoredUnit();

  $('tripDistance').value = s.distance;
  $('tripDistanceSlider').value = s.distance;
  $('tankSize').value = s.tank;
  $('tankSizeSlider').value = s.tank;
  $('fuelEfficiency').value = s.efficiency;
  $('fuelEfficiencySlider').value = s.efficiency;
  $('fuelLevel').value = s.fuelLevel;
  $('fuelType').value = s.fuelType || 'pertalite';
  if (s.reserve !== undefined) $('reserve').value = s.reserve;
  if (s.speed !== undefined) $('avgSpeed').value = s.speed;

  saveState();
  calculate();
}

function deleteTrip(idx) {
  const trips = getSavedTrips();
  trips.splice(idx, 1);
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(trips));
  } catch (e) { /* ignore */ }
  renderSavedTrips();
}

/* ---------- Persistence ---------- */

function currentState() {
  return {
    unit: currentUnit,
    lang: currentLang,
    theme: currentTheme,
    distance: $('tripDistance').value,
    tank: $('tankSize').value,
    efficiency: $('fuelEfficiency').value,
    fuelLevel: $('fuelLevel').value,
    fuelType: $('fuelType').value,
    reserve: $('reserve').value,
    speed: $('avgSpeed').value
  };
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentState()));
  } catch (e) { /* ignore */ }
}

function applyStoredUnit() {
  const unit = currentUnit;
  $('btnImperial').classList.toggle('active', unit === 'imperial');
  $('btnMetric').classList.toggle('active', unit === 'metric');
  $('btnImperial').setAttribute('aria-selected', unit === 'imperial');
  $('btnMetric').setAttribute('aria-selected', unit === 'metric');
  $('unitDistance').textContent = UNITS[unit].distance;
  $('unitTank').textContent = UNITS[unit].tank;
  $('unitEfficiency').textContent = UNITS[unit].efficiency;
  $('avgSpeedUnit').textContent = UNITS[unit].speed;
}

function restoreState() {
  let state = null;
  try {
    state = JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch (e) {
    state = null;
  }
  if (!state) return;

  currentUnit = state.unit === 'imperial' ? 'imperial' : 'metric';
  currentLang = state.lang === 'en' ? 'en' : 'id';
  currentTheme = state.theme === 'light' ? 'light' : 'dark';

  $('tripDistance').value = state.distance;
  $('tripDistanceSlider').value = state.distance;
  $('tankSize').value = state.tank;
  $('tankSizeSlider').value = state.tank;
  $('fuelEfficiency').value = state.efficiency;
  $('fuelEfficiencySlider').value = state.efficiency;
  $('fuelLevel').value = state.fuelLevel;
  $('fuelType').value = state.fuelType || 'pertalite';
  if (state.reserve !== undefined) $('reserve').value = state.reserve;
  if (state.speed !== undefined) $('avgSpeed').value = state.speed;

  applyStoredUnit();
  $('langId').classList.toggle('active', currentLang === 'id');
  $('langEn').classList.toggle('active', currentLang === 'en');
  applyLanguage();
  setTheme(currentTheme);
  renderSavedTrips();
}

function onAnyChange() {
  saveState();
  calculate();
}

/* ---------- Wire up ---------- */

$('langId').addEventListener('click', () => setLanguage('id'));
$('langEn').addEventListener('click', () => setLanguage('en'));
$('themeToggle').addEventListener('click', () => setTheme(currentTheme === 'dark' ? 'light' : 'dark'));
$('btnImperial').addEventListener('click', () => setUnit('imperial'));
$('btnMetric').addEventListener('click', () => setUnit('metric'));
$('fuelLevel').addEventListener('input', onAnyChange);
$('reserve').addEventListener('input', onAnyChange);
$('fuelType').addEventListener('change', onAnyChange);
$('avgSpeed').addEventListener('input', onAnyChange);
$('btnSaveTrip').addEventListener('click', saveTrip);
$('btnCopySummary').addEventListener('click', copySummary);

$('savedTrips').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const idx = parseInt(btn.dataset.idx, 10);
  if (btn.dataset.action === 'load') loadTrip(idx);
  else if (btn.dataset.action === 'del') deleteTrip(idx);
});

linkInputs('tripDistance', 'tripDistanceSlider');
linkInputs('tankSize', 'tankSizeSlider');
linkInputs('fuelEfficiency', 'fuelEfficiencySlider');

restoreState();
applyLanguage();
setTheme(currentTheme);
calculate();