const DATASETS = {
  energy: {
    unit: 'kWh',
    color: '#f5b014',
    symbol: '⚡',
    macroMultiplier: 1000000,
    macroLabel: '1,000,000 kWh (1 GWh)',
    microRows: [
      { name: 'Average Person (US)', rateHr: 1.2 },
      { name: 'Average Household', rateHr: 3.1 },
      { name: 'Small Town (10k people)', rateHr: 12200 }
    ],
    macroRows: [
      { name: 'Major City (1M people)', rateHr: 1220000 },
      { name: 'United States', rateHr: 468000000 },
      { name: 'Whole Planet (8.1B people)', rateHr: 3240000000 }
    ]
  },
  water: {
    unit: 'L',
    color: '#2b90d9',
    symbol: '💧',
    macroMultiplier: 1000000,
    macroLabel: '1,000,000 Liters',
    microRows: [
      { name: 'Average Person (US)', rateHr: 13 },
      { name: 'Average Household', rateHr: 32 },
      { name: 'Small Town (10k people)', rateHr: 130000 }
    ],
    macroRows: [
      { name: 'Major City (1M people)', rateHr: 13000000 },
      { name: 'United States', rateHr: 4680000000 },
      { name: 'Whole Planet (8.1B people)', rateHr: 450000000000 }
    ]
  },
  co2: {
    unit: 'kg CO₂',
    color: '#555555',
    symbol: '☁️',
    macroMultiplier: 1000000,
    macroLabel: '1,000,000 kg (1 Kiloton)',
    microRows: [
      { name: 'Average Person (US)', rateHr: 1.65 },
      { name: 'Average Household', rateHr: 4.1 },
      { name: 'Small Town (10k people)', rateHr: 16500 }
    ],
    macroRows: [
      { name: 'Major City (1M people)', rateHr: 1650000 },
      { name: 'United States', rateHr: 540000000 },
      { name: 'Whole Planet (8.1B people)', rateHr: 4210000000 }
    ]
  }
};

let currentMetric = 'energy';
let userHourlyRate = 2;
let activeCanvases = [];

function createTileCanvas(color, symbol, isMacro) {
  const tile = document.createElement('canvas');
  const w = isMacro ? 165 : 140;
  const h = 75;
  tile.width = w;
  tile.height = h;
  const ctx = tile.getContext('2d');

  ctx.fillStyle = color;
  ctx.fillRect(4, 5, w - 8, h - 10);

  ctx.strokeStyle = 'rgba(255,255,255,0.65)';
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 11, w - 20, h - 22);

  ctx.fillStyle = '#fff';
  ctx.font = isMacro ? 'bold 20px "PT Serif", serif' : '24px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(isMacro ? `${symbol} 1M` : symbol, w / 2, h / 2 + 1);

  return tile;
}

function formatRate(num, unit) {
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B ${unit}/hr`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M ${unit}/hr`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}k ${unit}/hr`;
  return `${num} ${unit}/hr`;
}

function renderPage(metricKey) {
  currentMetric = metricKey;
  const data = DATASETS[metricKey];
  const container = document.getElementById('stripsContainer');
  container.innerHTML = '';
  activeCanvases = [];

  const microTile = createTileCanvas(data.color, data.symbol, false);
  const macroTile = createTileCanvas(data.color, data.symbol, true);

  const borderDataUrl = microTile.toDataURL();
  document.getElementById('topBorder').style.backgroundImage = `url(${borderDataUrl})`;
  document.getElementById('bottomBorder').style.backgroundImage = `url(${borderDataUrl})`;

  function addTrack(labelHtml, rateHr, tileCanvas, unitValue) {
    const desc = document.createElement('div');
    desc.className = 'description';
    desc.innerHTML = labelHtml;
    container.appendChild(desc);

    const canvas = document.createElement('canvas');
    canvas.height = 75;
    container.appendChild(canvas);

    const trackObj = {
      canvas,
      ctx: canvas.getContext('2d'),
      tile: tileCanvas,
      rateHr,
      unitValue,
      offsetX: 0
    };
    activeCanvases.push(trackObj);
    return trackObj;
  }

  data.microRows.forEach(row => {
    addTrack(
      `${row.name} <span class="per-hour-count">(${formatRate(row.rateHr, data.unit)})</span>`,
      row.rateHr,
      microTile,
      1
    );
  });

  const userTrack = addTrack(
    `<div class="user-row">Your Hourly Usage: <input type="number" min="0" value="${userHourlyRate}" class="hour-input" id="userInput"> <span class="per-hour-count">${data.unit}/hr</span></div>`,
    userHourlyRate,
    microTile,
    1
  );

  document.getElementById('userInput').addEventListener('input', (e) => {
    userHourlyRate = Math.max(0, parseFloat(e.target.value) || 0);
    userTrack.rateHr = userHourlyRate;
  });

  const midDiv = document.createElement('div');
  midDiv.className = 'mid-explanation';
  const macroImg = document.createElement('img');
  macroImg.src = macroTile.toDataURL();
  macroImg.className = 'mid-icon';
  midDiv.appendChild(macroImg);
  midDiv.appendChild(document.createTextNode(` = ${data.macroLabel}`));
  container.appendChild(midDiv);

  data.macroRows.forEach(row => {
    addTrack(
      `${row.name} <span class="per-hour-count">(${formatRate(row.rateHr, data.unit)})</span>`,
      row.rateHr,
      macroTile,
      data.macroMultiplier
    );
  });

  resizeCanvases();
}

function resizeCanvases() {
  activeCanvases.forEach(t => {
    t.canvas.width = window.innerWidth;
  });
}
window.addEventListener('resize', resizeCanvases);

let lastTime = performance.now();
function animate(now) {
  const dt = (now - lastTime) / 1000;
  lastTime = now;

  activeCanvases.forEach(track => {
    const { ctx, canvas, tile, rateHr, unitValue } = track;
    const tileW = tile.width;

    const tilesPerSec = (rateHr / 3600) / unitValue;
    const pxPerSec = tilesPerSec * tileW;

    track.offsetX = (track.offsetX + pxPerSec * dt) % tileW;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (pxPerSec > 2200) {
      ctx.fillStyle = DATASETS[currentMetric].color;
      ctx.globalAlpha = 0.85;
      ctx.fillRect(0, 5, canvas.width, canvas.height - 10);
      ctx.globalAlpha = 1.0;
    }

    for (let x = track.offsetX - tileW; x < canvas.width; x += tileW) {
      ctx.drawImage(tile, Math.floor(x), 0);
    }
  });

  requestAnimationFrame(animate);
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPage(btn.dataset.metric);
  });
});

renderPage('energy');
requestAnimationFrame(animate);
