const DATASETS = {
  energy: {
    unit: 'kWh', color: '#f5b014', symbol: '⚡', macroMultiplier: 100000,
    macroLabel: '100,000 kWh (100 MWh)',
    microRows: [{name:'Average Person (US)',rateHr:1.2},{name:'Average Household',rateHr:3.1},{name:'Small Town (10k people)',rateHr:12200}],
    macroRows: [{name:'Major City (1M people)',rateHr:1220000},{name:'United States',rateHr:468000000},{name:'Whole Planet (8.1B people)',rateHr:3240000000}]
  },
  water: {
    unit: 'L', color: '#2b90d9', symbol: '💧', macroMultiplier: 100000,
    macroLabel: '100,000 Liters',
    microRows: [{name:'Average Person (US)',rateHr:13},{name:'Average Household',rateHr:32},{name:'Small Town (10k people)',rateHr:130000}],
    macroRows: [{name:'Major City (1M people)',rateHr:13000000},{name:'United States',rateHr:4680000000},{name:'Whole Planet (8.1B people)',rateHr:450000000000}]
  },
  co2: {
    unit: 'kg CO₂', color: '#555555', symbol: '☁️', macroMultiplier: 100000,
    macroLabel: '100,000 kg (100 tonnes)',
    microRows: [{name:'Average Person (US)',rateHr:1.65},{name:'Average Household',rateHr:4.1},{name:'Small Town (10k people)',rateHr:16500}],
    macroRows: [{name:'Major City (1M people)',rateHr:1650000},{name:'United States',rateHr:540000000},{name:'Whole Planet (8.1B people)',rateHr:4210000000}]
  },
  food: {
    unit: 'kg', color: '#d89b43', symbol: '🍎', macroMultiplier: 100000,
    macroLabel: '100,000 kg (100 tonnes)',
    microRows: [{name:'Average Person (US)',rateHr:0.02},{name:'Average Household',rateHr:0.08},{name:'Small Town (10k people)',rateHr:200}],
    macroRows: [{name:'Major City (1M people)',rateHr:20000},{name:'United States (estimate)',rateHr:7000000},{name:'Whole Planet (estimate)',rateHr:120000000}]
  },
  waste: {
    unit: 'kg', color: '#55a65c', symbol: '♻️', macroMultiplier: 100000,
    macroLabel: '100,000 kg (100 tonnes)',
    microRows: [{name:'Average Person (US)',rateHr:0.09},{name:'Average Household',rateHr:0.37},{name:'Small Town (10k people)',rateHr:900}],
    macroRows: [{name:'Major City (1M people)',rateHr:90000},{name:'United States',rateHr:33000000},{name:'Whole Planet',rateHr:262000000}]
  }
};

let currentMetric = document.body.dataset.metric || 'energy';
let userHourlyRate = 2;
let activeCanvases = [];
let pixelRatio = Math.max(1, window.devicePixelRatio || 1);

function createTileCanvas(color, symbol, isMacro, scaleLabel = '100K') {
  const tile = document.createElement('canvas');
  const w = isMacro ? 165 : 140, h = 75;
  tile.width = w; tile.height = h;
  const ctx = tile.getContext('2d');
  ctx.fillStyle = color; ctx.fillRect(4,5,w-8,h-10);
  ctx.strokeStyle = 'rgba(255,255,255,0.65)'; ctx.lineWidth = 2;
  ctx.strokeRect(10,11,w-20,h-22);
  ctx.fillStyle = '#fff'; ctx.font = isMacro ? 'bold 20px "PT Serif", serif' : '24px sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(isMacro ? `${symbol} ${scaleLabel}` : symbol,w/2,h/2+1);
  return tile;
}
function formatRate(num,unit) {
  if(num>=1e9)return `${(num/1e9).toFixed(2)}B ${unit}/hr`;
  if(num>=1e6)return `${(num/1e6).toFixed(1)}M ${unit}/hr`;
  if(num>=1e3)return `${(num/1e3).toFixed(1)}k ${unit}/hr`;
  return `${num} ${unit}/hr`;
}
function renderPage(metricKey) {
  const data=DATASETS[metricKey];
  if(!data)return;
  currentMetric=metricKey;
  const container=document.getElementById('stripsContainer');
  if(!container)return;
  container.innerHTML='';
  activeCanvases=[];
  const microTile=createTileCanvas(data.color,data.symbol,false);
  const smallTownWaterTile=(metricKey==='water') ? createTileCanvas(data.color,data.symbol,true,'10K') : microTile;
  const macroTile=createTileCanvas(data.color,data.symbol,true,'100K');
  const borderUrl=`url(${microTile.toDataURL()})`;
  document.getElementById('topBorder').style.backgroundImage=borderUrl;
  document.getElementById('bottomBorder').style.backgroundImage=borderUrl;
  function addTrack(labelHtml,rateHr,tile,unitValue,visualSpeed=1,stackCount=1) {
    const desc=document.createElement('div');
    desc.className='description'; desc.innerHTML=labelHtml; container.appendChild(desc);
    const stack=document.createElement('div');
    stack.className='track-stack';
    container.appendChild(stack);
    const tracks=[];
    for(let i=0;i<stackCount;i++){
      const canvas=document.createElement('canvas');
      canvas.style.width='100%'; canvas.style.height='75px';
      stack.appendChild(canvas);
      const track={canvas,ctx:canvas.getContext('2d'),tile,rateHr:rateHr/stackCount,unitValue,visualSpeed,offsetX:0,logicalWidth:0};
      activeCanvases.push(track); tracks.push(track);
    }
    return tracks[0];
  }
  data.microRows.forEach(row=>{
    const isSmallTownWater=metricKey==='water' && row.name.toLowerCase().includes('small town');
    const rowTile=isSmallTownWater ? smallTownWaterTile : microTile;
    const rowMultiplier=isSmallTownWater ? 10000 : 1;
    const pxPerSec=(row.rateHr/3600/rowMultiplier)*rowTile.width;
    const stackCount=Math.max(1,Math.ceil(pxPerSec/900));
    addTrack(`${row.name} <span class="per-hour-count">(${formatRate(row.rateHr,data.unit)})</span>`,row.rateHr,rowTile,rowMultiplier,1,stackCount);
  });
  const userTrack=addTrack(`<div class="user-row">Your Hourly Usage: <input type="number" min="0" value="${userHourlyRate}" class="hour-input" id="userInput"> <span class="per-hour-count">${data.unit}/hr</span></div>`,userHourlyRate,microTile,1);
  document.getElementById('userInput').addEventListener('input',e=>{
    userHourlyRate=Math.max(0,parseFloat(e.target.value)||0);
    userTrack.rateHr=userHourlyRate;
  });
  const mid=document.createElement('div'); mid.className='mid-explanation';
  const img=document.createElement('img'); img.src=macroTile.toDataURL(); img.className='mid-icon';
  mid.appendChild(img); mid.appendChild(document.createTextNode(` = ${data.macroLabel}`)); container.appendChild(mid);
  data.macroRows.forEach(row=>{
    const isWholePlanet=row.name.toLowerCase().includes('whole planet');
    const rowMultiplier=(metricKey==='water' && isWholePlanet) ? 1000000 : 100000;
    const rowTile=(metricKey==='water' && isWholePlanet) ? createTileCanvas(data.color,data.symbol,true,'1M') : macroTile;
    const pxPerSec=((row.rateHr/3600)/rowMultiplier)*rowTile.width;
    const stackCount=Math.max(1,Math.ceil(pxPerSec/900));
    addTrack(`${row.name} <span class="per-hour-count">(${formatRate(row.rateHr,data.unit)})</span>`,row.rateHr,rowTile,rowMultiplier,1,stackCount);
  });
  resizeCanvases();
}
function resizeCanvases() {
  pixelRatio=Math.max(1,window.devicePixelRatio||1);
  activeCanvases.forEach(t=>{
    t.logicalWidth=t.canvas.clientWidth||window.innerWidth;
    t.canvas.width=Math.round(t.logicalWidth*pixelRatio);
    t.canvas.height=Math.round(75*pixelRatio);
    t.ctx.setTransform(pixelRatio,0,0,pixelRatio,0,0);
  });
}
window.addEventListener('resize',resizeCanvases);
let lastTime=performance.now();
function animate(now) {
  const dt=Math.min((now-lastTime)/1000,0.05); lastTime=now;
  activeCanvases.forEach(track=>{
    const {ctx,canvas,tile,rateHr,unitValue,visualSpeed=1,logicalWidth}=track;
    const tileW=tile.width;
    const pxPerSec=((rateHr/3600)/unitValue)*tileW*visualSpeed;
    track.offsetX=(track.offsetX+pxPerSec*dt)%tileW;
    ctx.clearRect(0,0,logicalWidth,75);
    if(pxPerSec>2200){
      // Keep the macro tiles visible at extreme rates instead of flattening
      // the whole track into a single solid-color stripe.
      const pattern=ctx.createPattern(tile,'repeat');
      ctx.save();
      ctx.translate(track.offsetX,0);
      ctx.fillStyle=pattern;
      ctx.fillRect(-tileW,5,logicalWidth+tileW,65);
      ctx.restore();
      return;
    }
    for(let x=track.offsetX-tileW;x<logicalWidth;x+=tileW){
      ctx.drawImage(tile,Math.floor(x),0,tileW,75);
    }
  });
  requestAnimationFrame(animate);
}
document.querySelectorAll('.tab-btn[data-metric]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active'); renderPage(btn.dataset.metric);
  });
});
renderPage(currentMetric);
requestAnimationFrame(animate);
