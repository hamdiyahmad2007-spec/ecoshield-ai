// EcoShield AI Multi-Stage AI Scanner & Satellite Diagnostic Engine — Executive Demo

let scanProgress = 0;
let scanTimer = null;
let currentDiagnostics = null;

function setupScannerForm() {
  const scanForm = document.getElementById('ai-scan-form');
  if (!scanForm) return;

  scanForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const location = document.getElementById('scan-input-location')?.value || "37.7749, -122.4194";
    const cropType = document.getElementById('scan-input-crop')?.value || "Hard Winter Wheat";
    const hectares = parseFloat(document.getElementById('scan-input-hectares')?.value || "220");
    const soilType = document.getElementById('scan-input-soil')?.value || "Clay Loam";

    runMultiStageScan(location, cropType, hectares, soilType);
  });
}

function runMultiStageScan(location, cropType, hectares, soilType) {
  const modalOverlay = document.getElementById('scanner-modal-overlay');
  const progressFill = document.getElementById('scanner-progress-fill');
  const progressText = document.getElementById('scanner-progress-percent');
  const stageTitle = document.getElementById('scanner-stage-title');
  const stageSubtitle = document.getElementById('scanner-stage-subtitle');

  if (!modalOverlay) return;

  modalOverlay.classList.add('active');
  scanProgress = 0;

  const stages = [
    { target: 25, title: "🛰️ Stage 1/4: Sentinel-2 Satellite Imagery Acquisition", subtitle: "Fetching 10m multispectral bands from Google Earth Engine..." },
    { target: 55, title: "🌍 Stage 2/4: AlphaEarth Land & Vegetation Insights", subtitle: "Processing canopy chlorophyll density & vegetative cover..." },
    { target: 80, title: "☁️ Stage 3/4: WeatherNext Microclimate Assessment", subtitle: "Calculating soil hydric tension & evapotranspiration curves..." },
    { target: 100, title: "🧠 Stage 4/4: Gemini AI Precision Agronomy Synthesis", subtitle: "Generating executive precision farming insights & satellite risk diagnostics..." }
  ];

  let stageIndex = 0;

  if (scanTimer) clearInterval(scanTimer);

  scanTimer = setInterval(() => {
    scanProgress += 2;
    if (progressFill) progressFill.style.width = `${scanProgress}%`;
    if (progressText) progressText.innerText = `${scanProgress}%`;

    if (stageIndex < stages.length && scanProgress >= stages[stageIndex].target) {
      if (stageTitle) stageTitle.innerText = stages[stageIndex].title;
      if (stageSubtitle) stageSubtitle.innerText = stages[stageIndex].subtitle;
      stageIndex++;
    }

    if (scanProgress >= 100) {
      clearInterval(scanTimer);
      setTimeout(() => {
        modalOverlay.classList.remove('active');
        currentDiagnostics = generateAIDiagnostics(location, cropType, hectares, soilType);
        displayScanResults(currentDiagnostics);
      }, 600);
    }
  }, 50);
}

function displayScanResults(diag) {
  const resultsContainer = document.getElementById('scan-results-container');
  if (!resultsContainer) return;

  resultsContainer.classList.remove('hidden');
  resultsContainer.scrollIntoView({ behavior: 'smooth' });

  resultsContainer.innerHTML = `
    <div class="glass-panel p-6 sm:p-8 space-y-6 border border-emerald-500/40 glow-box-neon">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <div class="flex items-center gap-2">
            <span class="badge-glow">✨ SATELLITE & GEMINI AI ANALYSIS COMPLETE</span>
            <span class="text-xs text-gray-400">Synced ${new Date().toLocaleTimeString()}</span>
          </div>
          <h2 class="text-2xl font-extrabold text-white mt-2">${diag.cropType} Satellite Diagnostic</h2>
          <p class="text-xs text-gray-400">${diag.location} &bull; ${diag.hectares} Ha &bull; ${diag.soilType}</p>
        </div>
        <div class="flex gap-3">
          <button onclick="printReport()" class="btn-secondary text-xs">
            🖨️ Export Executive Report
          </button>
          <button onclick="openChatWithContext('${diag.cropType}')" class="btn-primary text-xs">
            💬 Consult Gemini AI Bot
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="bg-black/40 p-4 rounded-xl border border-white/5">
          <div class="text-xs text-gray-400">Sentinel-2 NDVI</div>
          <div class="text-2xl font-extrabold text-emerald-400 mt-1">${diag.ndvi}</div>
          <div class="text-[10px] text-emerald-500 mt-1">Chlorophyll Saturation</div>
        </div>

        <div class="bg-black/40 p-4 rounded-xl border border-white/5">
          <div class="text-xs text-gray-400">AlphaEarth Insights</div>
          <div class="text-2xl font-extrabold text-white mt-1">${diag.healthScore}/100</div>
          <div class="text-[10px] text-cyan-400 mt-1">Land & Vegetation Score</div>
        </div>

        <div class="bg-black/40 p-4 rounded-xl border border-white/5">
          <div class="text-xs text-gray-400">NDWI Moisture Index</div>
          <div class="text-2xl font-extrabold text-cyan-400 mt-1">${diag.moisture.split(' ')[0]}</div>
          <div class="text-[10px] text-gray-400 mt-1">WeatherNext Model</div>
        </div>

        <div class="bg-black/40 p-4 rounded-xl border border-white/5">
          <div class="text-xs text-gray-400">Disease Risk Index</div>
          <div class="text-2xl font-extrabold text-amber-400 mt-1">${diag.pestRisk}</div>
          <div class="text-[10px] text-gray-400 mt-1">Microclimate Alert</div>
        </div>
      </div>

      <div class="space-y-3">
        <div class="flex justify-between items-center">
          <h3 class="text-sm font-bold text-white flex items-center gap-2">
            <span>🗺️</span> Google Earth Engine Observation Data
          </h3>
          <div class="flex gap-2">
            <button onclick="switchResultMapImage('ndvi')" id="res-btn-ndvi" class="px-3 py-1 text-xs rounded-lg bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-semibold">NDVI Band</button>
            <button onclick="switchResultMapImage('drone')" id="res-btn-drone" class="px-3 py-1 text-xs rounded-lg bg-white/5 border border-white/10 text-gray-400 font-semibold">True Color</button>
            <button onclick="switchResultMapImage('thermal')" id="res-btn-thermal" class="px-3 py-1 text-xs rounded-lg bg-white/5 border border-white/10 text-gray-400 font-semibold">Thermal IR</button>
          </div>
        </div>

        <div class="relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <img id="result-spectral-img" src="assets/satellite_field_ndvi.jpg" onerror="this.onerror=null;this.src='assets/satellite_field_ndvi_1785994886143.jpg';" class="w-full h-full object-cover transition-all duration-500" alt="Satellite Crop Scan" />
          <div class="scan-line"></div>
          <div class="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-xs text-emerald-400 font-mono">
            SATELLITE LAYER: Sentinel-2 Multispectral Index
          </div>
        </div>
      </div>

      <div class="space-y-4 pt-2">
        <h3 class="text-base font-bold text-white flex items-center gap-2">
          <span>⚡</span> Gemini AI Precision Agronomy Recommendations
        </h3>
        <div class="space-y-3">
          ${diag.actionPlan.map(item => `
            <div class="bg-black/30 p-4 rounded-xl border border-emerald-500/20 flex items-start gap-4 hover:border-emerald-500/50 transition-all">
              <div class="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 font-bold text-sm shrink-0">
                ${item.step}
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-center">
                  <h4 class="text-sm font-bold text-white">${item.title}</h4>
                  <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">${item.priority} Priority</span>
                </div>
                <p class="text-xs text-gray-300 mt-1 leading-relaxed">${item.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function switchResultMapImage(mode) {
  const imgEl = document.getElementById('result-spectral-img');
  if (!imgEl) return;

  const btnNdvi = document.getElementById('res-btn-ndvi');
  const btnDrone = document.getElementById('res-btn-drone');
  const btnThermal = document.getElementById('res-btn-thermal');

  [btnNdvi, btnDrone, btnThermal].forEach(btn => {
    if (btn) {
      btn.className = "px-3 py-1 text-xs rounded-lg bg-white/5 border border-white/10 text-gray-400 font-semibold";
    }
  });

  if (mode === 'ndvi') {
    imgEl.src = "assets/satellite_field_ndvi.jpg";
    if (btnNdvi) btnNdvi.className = "px-3 py-1 text-xs rounded-lg bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-semibold";
  } else if (mode === 'drone') {
    imgEl.src = "assets/drone_crop_health.jpg";
    if (btnDrone) btnDrone.className = "px-3 py-1 text-xs rounded-lg bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-semibold";
  } else if (mode === 'thermal') {
    imgEl.src = "assets/thermal_moisture_map.jpg";
    if (btnThermal) btnThermal.className = "px-3 py-1 text-xs rounded-lg bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-semibold";
  }
}

function printReport() {
  window.print();
}

function openChatWithContext(cropName) {
  const chatSection = document.getElementById('ai-assistant');
  if (chatSection) {
    chatSection.scrollIntoView({ behavior: 'smooth' });
    const chatInput = document.getElementById('chat-input-text');
    if (chatInput) {
      chatInput.value = `Provide detailed recommendations for my ${cropName} parcel based on recent satellite scan.`;
    }
  }
}
