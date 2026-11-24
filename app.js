const DATASETS = {
  energy: {
    unit: 'kWh',
    color: '#f5b014',
    symbol: '⚡',
    macroMultiplier: 100000,
    macroLabel: '100,000 kWh (100 MWh)',
    microRows: [
      {
        name: 'Average Person (US)',
        rateHr: 1.2
      },
      {
        name: 'Average Household',
        rateHr: 3.1
      },
      {
        name: 'Small Town (10k people)',
        rateHr: 12200
      }
    ],
    macroRows: [
      {
        name: 'Major City (1M people)',
        rateHr: 1220000
      },
      {
        name: 'United States',
        rateHr: 468000000
      },
      {
        name: 'Whole Planet (8.1B people)',
        rateHr: 3240000000
      }
    ]
  },
  water: {
    unit: 'L',
    color: '#2b90d9',
    symbol: '💧',
    macroMultiplier: 100000,
    macroLabel: '100,000 Liters',
    microRows: [
      {
        name: 'Average Person (US)',
        rateHr: 13
      },
      {
        name: 'Average Household',
        rateHr: 32
      },
      {
        name: 'Small Town (10k people)',
        rateHr: 130000
      }
    ],
    macroRows: [
      {
        name: 'Major City (1M people)',
        rateHr: 13000000
      },
      {
        name: 'United States',
        rateHr: 4680000000
      },
      {
        name: 'Whole Planet (8.1B people)',
        rateHr: 450000000000
      }
    ]
  },
  co2: {
    unit: 'kg CO₂',
    color: '#555555',
    symbol: '☁️',
    macroMultiplier: 100000,
    macroLabel: '100,000 kg (100 tonnes)',
    microRows: [
      {
        name: 'Average Person (US)',
        rateHr: 1.65
      },
      {
        name: 'Average Household',
        rateHr: 4.1
      },
      {
        name: 'Small Town (10k people)',
        rateHr: 16500
      }
    ],
    macroRows: [
      {
        name: 'Major City (1M people)',
        rateHr: 1650000
      },
      {
        name: 'United States',
        rateHr: 540000000
      },
      {
        name: 'Whole Planet (8.1B people)',
        rateHr: 4210000000
      }
    ]
  },
  food: {
    unit: 'kg',
    color: '#d89b43',
    symbol: '🍎',
    macroMultiplier: 100000,
    macroLabel: '100,000 kg (100 tonnes)',
    microRows: [
      {
        name: 'Average Person (US)',
        rateHr: 0.02
      },
      {
        name: 'Average Household',
        rateHr: 0.08
      },
      {
        name: 'Small Town (10k people)',
        rateHr: 200
      }
    ],
    macroRows: [
      {
        name: 'Major City (1M people)',
        rateHr: 20000
      },
      {
        name: 'United States (estimate)',
        rateHr: 7000000
      },
      {
        name: 'Whole Planet (estimate)',
        rateHr: 120000000
      }
    ]
  },
  waste: {
    unit: 'kg',
    color: '#55a65c',
    symbol: '♻️',
    macroMultiplier: 100000,
    macroLabel: '100,000 kg (100 tonnes)',
    microRows: [
      {
        name: 'Average Person (US)',
        rateHr: 0.09
      },
      {
        name: 'Average Household',
        rateHr: 0.37
      },
      {
        name: 'Small Town (10k people)',
        rateHr: 900
      }
    ],
    macroRows: [
      {
        name: 'Major City (1M people)',
        rateHr: 90000
      },
      {
        name: 'United States',
        rateHr: 33000000
      },
      {
        name: 'Whole Planet',
        rateHr: 262000000
      }
    ]
  }
};
let currentMetric = document.body.dataset.metric || 'energy';
const USER_RATE_DEFAULTS = {
  energy: 2,
  water: 2,
  co2: 2,
  food: 0.02,
  waste: 0.09
};
function loadUserRate(metricKey) {
  try {
    const saved = window.sessionStorage.getItem('consuming-earth:user-rate:' + metricKey);
    if (saved !== null) {
      const value = Number(saved);
      if (Number.isFinite(value) && value >= 0)return value;
    }
  } catch (error) {
    // Continue with the category default when session storage is unavailable.
  }
  return USER_RATE_DEFAULTS[metricKey]
  ?? 0;
}

function saveUserRate(metricKey, value) {
  try {
    window.sessionStorage.setItem('consuming-earth:user-rate:' + metricKey, String(value));
  } catch (error) {
    // The input still works for the current page if session storage is unavailable.
  }
}
let userHourlyRate = loadUserRate(currentMetric);
let activeCanvases = [
];
let pixelRatio = Math.max(1, window.devicePixelRatio || 1);
function createTileCanvas(color, symbol, isMacro, scaleLabel = '100K') {
  const tile = document.createElement('canvas');
  const w = isMacro ? 165: 140,
  h = 75;
  tile.width = w;
  tile.height = h;
  const ctx = tile.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(4, 5, w - 8, h - 10);
  ctx.strokeStyle = 'rgba(255,255,255,0.65)';
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 11, w - 20, h - 22);
  ctx.fillStyle = '#fff';
  ctx.font = isMacro ? 'bold 20px "PT Serif", serif': '24px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(isMacro ? `${symbol} ${scaleLabel}`: symbol, w / 2, h / 2 + 1);
  return tile;
}

function formatRate(num, unit) {
  if (num >= 1e9)return `${(num/1e9).toFixed(2)}B ${unit}/hr`;
  if (num >= 1e6)return `${(num/1e6).toFixed(1)}M ${unit}/hr`;
  if (num >= 1e3)return `${(num/1e3).toFixed(1)}k ${unit}/hr`;
  return `${num} ${unit}/hr`;
}

function renderPage(metricKey) {
  const data = DATASETS[metricKey];
  if (!data)return;
  currentMetric = metricKey;
  const container = document.getElementById('stripsContainer');
  if (!container)return;
  container.innerHTML = '';
  activeCanvases = [
  ];
  const microTile = createTileCanvas(data.color, data.symbol, false);
  // Each denomination is chosen so the larger population strips remain in proportion.
  // Use only familiar denominations so row labels stay consistent across categories.
  const scaleConfig = {
    energy: {
      visualSpeed: 1000,
      groups: {
        person: 1,
        household: 1,
        smallTown: 1000,
        majorCity: 100000,
        unitedStates: 25000000,
        wholePlanet: 250000000
      }
    },
    water: {
      visualSpeed: 100,
      groups: {
        person: 1,
        household: 1,
        smallTown: 1000,
        majorCity: 50000,
        unitedStates: 25000000,
        wholePlanet: 5000000000
      }
    },
    co2: {
      visualSpeed: 1000,
      groups: {
        person: 1,
        household: 1,
        smallTown: 1000,
        majorCity: 100000,
        unitedStates: 50000000,
        wholePlanet: 1000000000
      }
    },
    food: {
      visualSpeed: 500,
      microVisualSpeed: 50000,
      groups: {
        person: 1,
        household: 1,
        smallTown: 25,
        majorCity: 2500,
        unitedStates: 1000000,
        wholePlanet: 10000000
      }
    },
    waste: {
      visualSpeed: 25000,
      groups: {
        person: 1,
        household: 1,
        smallTown: 1000,
        majorCity: 100000,
        unitedStates: 25000000,
        wholePlanet: 250000000
      }
    }
  }
  [metricKey];
  function groupingForRow(name) {
    const n = name.toLowerCase(),
    g = scaleConfig.groups;
    if (n.includes('average person'))return g.person;
    if (n.includes('average household'))return g.household;
    if (n.includes('small town'))return g.smallTown;
    if (n.includes('major city'))return g.majorCity;
    if (n.includes('united states'))return g.unitedStates;
    if (n.includes('whole planet'))return g.wholePlanet;
    return 1;
  }

  function groupingLabel(amount) {
    if (amount < 1)return String(amount * 1000) + ' g';
    if (amount >= 1e9)return String(amount / 1e9) + 'B';
    if (amount >= 1e6)return String(amount / 1e6) + 'M';
    if (amount >= 1e3)return String(amount / 1e3) + 'K';
    return String(amount);
  }
  const tileCache = new Map( [
    [
      1,
      microTile
    ]
  ]);
  function tileForGrouping(amount) {
    if (!tileCache.has(amount)) {
      tileCache.set(amount, createTileCanvas(data.color, data.symbol, true, groupingLabel(amount)));
    }
    return tileCache.get(amount);
  }
  const macroTile = createTileCanvas(data.color, data.symbol, true, '100K');
  const borderUrl = `url(${microTile.toDataURL()})`;
  document.getElementById('topBorder').style.backgroundImage = borderUrl;
  document.getElementById('bottomBorder').style.backgroundImage = borderUrl;
  function createLaneCanvases(stack, rateHr, tile, unitValue, visualSpeed, stackCount) {
    const tracks = [
    ];
    for (let i = 0; i < stackCount; i++) {
      const canvas = document.createElement('canvas');
      canvas.style.width = '100%';
      canvas.style.height = '75px';
      stack.appendChild(canvas);
      const track = {
        canvas,
        ctx: canvas.getContext('2d'),
        tile,
        rateHr: rateHr / stackCount,
        unitValue,
        visualSpeed,
        offsetX: 0,
        logicalWidth: 0
      };
      activeCanvases.push(track);
      tracks.push(track);
    }
    return tracks;
  }

  function addTrack(labelHtml, rateHr, tile, unitValue, visualSpeed = 1, stackCount = 1) {
    const desc = document.createElement('div');
    desc.className = 'description';
    desc.innerHTML = labelHtml;
    container.appendChild(desc);
    const stack = document.createElement('div');
    stack.className = 'track-stack';
    container.appendChild(stack);
    return createLaneCanvases(stack, rateHr, tile, unitValue, visualSpeed, stackCount);
  }

  function addScaledRow(row) {
    const rowMultiplier = groupingForRow(row.name);
    const rowTile = tileForGrouping(rowMultiplier);
    // Normalize tile widths so the displayed pixel speed reflects rate / denomination.
    const isFoodMicroRow = metricKey === 'food' && /average (person|household)/i.test(row.name);
    const baseVisualSpeed = isFoodMicroRow ? scaleConfig.microVisualSpeed: scaleConfig.visualSpeed;
    const visualSpeed = baseVisualSpeed * microTile.width / rowTile.width;
    const pxPerSec = (row.rateHr / 3600 / rowMultiplier) * rowTile.width * visualSpeed;
    const stackCount = Math.max(1, Math.ceil(pxPerSec / 900));
    addTrack(row.name + ' <span class="per-hour-count">(' + formatRate(row.rateHr, data.unit) + ')</span>', row.rateHr, rowTile, rowMultiplier, visualSpeed, stackCount);
  }
  data.microRows.forEach(addScaledRow);
  const userDescription = document.createElement('div');
  userDescription.className = 'description';
  const userRow = document.createElement('div');
  userRow.className = 'user-row';
  userRow.appendChild(document.createTextNode('Your Hourly Usage: '));
  const userInput = document.createElement('input');
  userInput.type = 'number';
  userInput.min = '0';
  userInput.step = 'any';
  userInput.value = String(userHourlyRate);
  userInput.className = 'hour-input';
  userInput.id = 'userInput';
  userRow.appendChild(userInput);
  const userUnit = document.createElement('span');
  userUnit.className = 'per-hour-count';
  userUnit.textContent = data.unit + '/hr';
  userRow.appendChild(userUnit);
  userDescription.appendChild(userRow);
  container.appendChild(userDescription);
  const userStack = document.createElement('div');
  userStack.className = 'track-stack';
  container.appendChild(userStack);
  let userTracks = [
  ];
  function niceGrouping(value) {
    if (!Number.isFinite(value) || value <= 1)return 1;
    // Standard sequence: 1, 2, 5, 10, 25, 50 ... then
    // 1K, 2.5K, 5K, 10K, 25K ... at larger magnitudes.
    const candidates = [
      1,
      2,
      5,
      10,
      25,
      50,
      100,
      250,
      500
    ];
    const maxExponent = Math.max(3, Math.min(300, Math.ceil(Math.log10(value) / 3) * 3 + 3));
    for (let exponent = 3; exponent <= maxExponent; exponent += 3) {
      const magnitude = Math.pow(10, exponent);
      [1, 2.5, 5, 10, 25, 50, 100, 250, 500].forEach(step => {
        const candidate = step * magnitude;
        if (Number.isFinite(candidate))candidates.push(candidate);
      });
    }
    return candidates.reduce((best, candidate) => Math.abs(Math.log(candidate / value)) < Math.abs(Math.log(best / value)) ? candidate: best, candidates[0]);
  }

  function updateUserTrack(rateHr) {
    const previousTracks = new Set(userTracks);
    activeCanvases = activeCanvases.filter(track => !previousTracks.has(track));
    userTracks = [
    ];
    userStack.innerHTML = '';
    const personGrouping = scaleConfig.groups.person;
    let userGrouping = personGrouping;
    const userVisualSpeed = scaleConfig.microVisualSpeed || scaleConfig.visualSpeed;
    // Automatically choose a suitable denomination for every category's
    // custom usage strip, not just Food Waste and Producing Waste.
    if (rateHr > 0) {
      const targetGrouping = rateHr * microTile.width * userVisualSpeed / (3600 * 400);
      userGrouping = Math.max(personGrouping, niceGrouping(targetGrouping));
    }
    const userTile = tileForGrouping(userGrouping);
    const userSpeed = userVisualSpeed * microTile.width / userTile.width;
    const totalPxPerSec = (rateHr / 3600 / userGrouping) * userTile.width * userSpeed;
    const laneSpeedLimit = 250;
    // Keep every category's custom usage lanes at the same readable speed.
    const stackCount = Math.max(1, Math.ceil(totalPxPerSec / laneSpeedLimit));
    userTracks = createLaneCanvases(userStack, rateHr, userTile, userGrouping, userSpeed, stackCount);
    resizeCanvases();
  }
  userInput.addEventListener('input', () => {
    const parsed = Number(userInput.value);
    userHourlyRate = Number.isFinite(parsed) && parsed >= 0 ? parsed: 0;
    saveUserRate(metricKey, userHourlyRate);
    updateUserTrack(userHourlyRate);
  });
  updateUserTrack(userHourlyRate);
  const mid = document.createElement('div');
  mid.className = 'mid-explanation';
  const img = document.createElement('img');
  img.src = macroTile.toDataURL();
  img.className = 'mid-icon';
  mid.appendChild(img);
  mid.appendChild(document.createTextNode(' = ' + data.macroLabel));
  container.appendChild(mid);
  data.macroRows.forEach(addScaledRow);
  resizeCanvases();
}

function resizeCanvases() {
  pixelRatio = Math.max(1, window.devicePixelRatio || 1);
  activeCanvases.forEach(t => {
    t.logicalWidth = t.canvas.clientWidth || window.innerWidth;
    t.canvas.width = Math.round(t.logicalWidth * pixelRatio);
    t.canvas.height = Math.round(75 * pixelRatio);
    t.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  });
}
window.addEventListener('resize', resizeCanvases);
let lastTime = performance.now();
function animate(now) {
  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;
  activeCanvases.forEach(track => {
    const {
      ctx,
      canvas,
      tile,
      rateHr,
      unitValue,
      visualSpeed = 1,
      logicalWidth
    }
    = track;
    const tileW = tile.width;
    const pxPerSec = ((rateHr / 3600) / unitValue) * tileW * visualSpeed;
    track.offsetX = (track.offsetX + pxPerSec * dt) % tileW;
    ctx.clearRect(0, 0, logicalWidth, 75);
    if (pxPerSec > 2200) {
      // Keep the macro tiles visible at extreme rates instead of flattening
      // the whole track into a single solid-color stripe.
      const pattern = ctx.createPattern(tile, 'repeat');
      ctx.save();
      ctx.translate(track.offsetX, 0);
      ctx.fillStyle = pattern;
      ctx.fillRect( -tileW, 5, logicalWidth + tileW, 65);
      ctx.restore();
      return;
    }
    for (let x = track.offsetX - tileW; x < logicalWidth; x += tileW) {
      ctx.drawImage(tile, Math.floor(x), 0, tileW, 75);
    }
  });
  requestAnimationFrame(animate);
}
document.querySelectorAll('.tab-btn[data-metric]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPage(btn.dataset.metric);
  });
});
renderPage(currentMetric);
requestAnimationFrame(animate);
