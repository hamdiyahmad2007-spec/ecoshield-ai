// EcoShield AI Map Controller using Leaflet.js — Earth Observation Dashboard

let ecoMap = null;
let parcelLayers = [];

function initEcoMap() {
  const mapContainer = document.getElementById('map-container');
  if (!mapContainer) return;

  // Center on Northern California Agricultural Valley
  ecoMap = L.map('map-container', {
    center: [37.772, -122.415],
    zoom: 13,
    zoomControl: false
  });

  const esriSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Google Earth Engine GIS',
    maxZoom: 19
  });

  const cartoDark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CartoDB &mdash; AlphaEarth Insights',
    maxZoom: 19
  });

  esriSat.addTo(ecoMap);
  L.control.zoom({ position: 'bottomright' }).addTo(ecoMap);

  renderParcels();
  setupMapLayerControls(esriSat, cartoDark);
}

function renderParcels() {
  if (!ecoMap) return;

  ECO_DATA.parcels.forEach((parcel) => {
    const poly = L.polygon(parcel.polygon, {
      color: parcel.statusColor,
      weight: 2.5,
      fillColor: parcel.statusColor,
      fillOpacity: 0.28,
      dashArray: '4, 4'
    }).addTo(ecoMap);

    const customIcon = L.divIcon({
      className: 'custom-parcel-marker',
      html: `
        <div style="
          background: rgba(5, 16, 11, 0.95);
          border: 2px solid ${parcel.statusColor};
          color: #fff;
          padding: 6px 12px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 700;
          box-shadow: 0 0 20px ${parcel.statusColor}66;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          backdrop-filter: blur(16px);
        ">
          <span style="width:8px; height:8px; border-radius:50%; background:${parcel.statusColor}; box-shadow: 0 0 10px ${parcel.statusColor};"></span>
          ${parcel.crop.split(' ')[0]} (NDVI ${parcel.ndvi})
        </div>
      `,
      iconSize: [130, 32],
      iconAnchor: [65, 16]
    });

    const marker = L.marker(parcel.coordinates, { icon: customIcon }).addTo(ecoMap);

    const popupContent = `
      <div style="padding: 10px; font-family: 'Plus Jakarta Sans', sans-serif;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <h4 style="margin:0; font-size:14px; font-weight:800; color:#fff;">${parcel.name}</h4>
          <span style="background:${parcel.statusColor}25; border:1px solid ${parcel.statusColor}; color:${parcel.statusColor}; padding:2px 8px; border-radius:9999px; font-size:10px; font-weight:700;">
            ${parcel.riskLevel}
          </span>
        </div>
        <p style="font-size:12px; color:#9CA3AF; margin-bottom:10px;">Crop: <strong style="color:#fff;">${parcel.crop}</strong> (${parcel.hectares} Ha)</p>
        
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px; margin-bottom:12px; font-size:11px;">
          <div style="background:rgba(255,255,255,0.06); padding:8px; border-radius:12px; border:1px solid rgba(255,255,255,0.08);">
            <div style="color:#6B7280;">Sentinel-2 NDVI</div>
            <div style="color:#10B981; font-weight:800; font-size:14px;">${parcel.ndvi}</div>
          </div>
          <div style="background:rgba(255,255,255,0.06); padding:8px; border-radius:12px; border:1px solid rgba(255,255,255,0.08);">
            <div style="color:#6B7280;">NDWI Hydration</div>
            <div style="color:#06B6D4; font-weight:800; font-size:14px;">${parcel.soilMoisture.split(' ')[0]}</div>
          </div>
        </div>

        <button onclick="selectParcelForDetails('${parcel.id}')" style="
          width:100%;
          background: linear-gradient(135deg, #10B981, #1F6B4F);
          color:#FFFFFF;
          border:none;
          padding:9px;
          border-radius:9999px;
          font-weight:800;
          font-size:11px;
          cursor:pointer;
          box-shadow: 0 4px 20px rgba(16,185,129,0.35);
        ">
          ⚡ Open Earth Observation Data
        </button>
      </div>
    `;

    poly.bindPopup(popupContent, { className: 'custom-map-popup' });
    marker.bindPopup(popupContent, { className: 'custom-map-popup' });

    poly.on('mouseover', function() {
      this.setStyle({ fillOpacity: 0.55, weight: 3.5 });
    });
    poly.on('mouseout', function() {
      this.setStyle({ fillOpacity: 0.28, weight: 2.5 });
    });

    parcelLayers.push({ id: parcel.id, polygon: poly, marker: marker });
  });
}

function setupMapLayerControls(esriSat, cartoDark) {
  const btnSat = document.getElementById('map-btn-sat');
  const btnNdvi = document.getElementById('map-btn-ndvi');
  const btnThermal = document.getElementById('map-btn-thermal');

  if (!btnSat) return;

  btnSat.addEventListener('click', () => {
    setActiveMapLayerBtn(btnSat);
    if (!ecoMap.hasLayer(esriSat)) {
      ecoMap.removeLayer(cartoDark);
      esriSat.addTo(ecoMap);
    }
    setParcelOpacity(0.28);
  });

  btnNdvi.addEventListener('click', () => {
    setActiveMapLayerBtn(btnNdvi);
    if (!ecoMap.hasLayer(cartoDark)) {
      ecoMap.removeLayer(esriSat);
      cartoDark.addTo(ecoMap);
    }
    setParcelOpacity(0.65);
  });

  btnThermal.addEventListener('click', () => {
    setActiveMapLayerBtn(btnThermal);
    if (!ecoMap.hasLayer(esriSat)) {
      ecoMap.removeLayer(cartoDark);
      esriSat.addTo(ecoMap);
    }
    setParcelOpacity(0.85);
  });
}

function setActiveMapLayerBtn(activeBtn) {
  ['map-btn-sat', 'map-btn-ndvi', 'map-btn-thermal'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.className = "px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 font-bold hover:text-white transition-all";
    }
  });
  activeBtn.className = "active px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-bold transition-all";
}

function setParcelOpacity(opacity) {
  parcelLayers.forEach(item => {
    item.polygon.setStyle({ fillOpacity: opacity });
  });
}

function selectParcelForDetails(parcelId) {
  const parcel = ECO_DATA.parcels.find(p => p.id === parcelId);
  if (!parcel) return;

  ecoMap.flyTo(parcel.coordinates, 14, { duration: 1.5 });

  const detailPanel = document.getElementById('parcel-detail-panel');
  if (detailPanel) {
    detailPanel.innerHTML = `
      <div class="glass-panel p-6 space-y-4">
        <div class="flex justify-between items-start">
          <div>
            <span class="text-xs text-emerald-400 font-bold uppercase tracking-wider">Earth Engine Selection</span>
            <h3 class="text-xl font-extrabold text-white mt-1">${parcel.name}</h3>
            <p class="text-xs text-gray-400">${parcel.crop} &bull; ${parcel.hectares} Hectares</p>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-bold" style="background:${parcel.statusColor}20; color:${parcel.statusColor}; border: 1px solid ${parcel.statusColor}">
            ${parcel.riskLevel}
          </span>
        </div>

        <div class="grid grid-cols-2 gap-3 pt-2">
          <div class="bg-black/40 p-3.5 rounded-2xl border border-white/10">
            <div class="text-xs text-gray-400">Sentinel-2 NDVI</div>
            <div class="text-xl font-extrabold text-emerald-400 mt-1">${parcel.ndvi}</div>
            <div class="w-full bg-gray-700 h-1.5 rounded-full mt-2 overflow-hidden">
              <div class="bg-emerald-400 h-full" style="width: ${parcel.ndvi * 100}%"></div>
            </div>
          </div>

          <div class="bg-black/40 p-3.5 rounded-2xl border border-white/10">
            <div class="text-xs text-gray-400">NDWI Hydration</div>
            <div class="text-xl font-extrabold text-cyan-400 mt-1">${parcel.soilMoisture.split(' ')[0]}</div>
            <div class="w-full bg-gray-700 h-1.5 rounded-full mt-2 overflow-hidden">
              <div class="bg-cyan-400 h-full" style="width: ${parcel.soilMoisture.split(' ')[0]}"></div>
            </div>
          </div>
        </div>

        <div class="bg-black/40 p-3.5 rounded-2xl border border-white/10 space-y-2 text-xs">
          <div class="flex justify-between"><span class="text-gray-400">AlphaEarth Insights:</span><span class="text-white font-medium">${parcel.nitrogenLevel}</span></div>
          <div class="flex justify-between"><span class="text-gray-400">WeatherNext ET:</span><span class="text-white font-medium">${parcel.evapotranspiration}</span></div>
          <div class="flex justify-between"><span class="text-gray-400">Thermal IR Temp:</span><span class="text-white font-medium">${parcel.temperature}</span></div>
        </div>

        <div class="bg-emerald-950/40 p-4 rounded-2xl border border-emerald-500/30">
          <div class="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
            <span>✨</span> Gemini AI Recommendation
          </div>
          <p class="text-xs text-gray-200 leading-relaxed">${parcel.recommendation}</p>
        </div>
      </div>
    `;
  }
}
