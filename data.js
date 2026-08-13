// EcoShield AI Data Store & Simulation Engine
// Refined for Google AI for the Planet Demo Edition

const ECO_DATA = {
  stats: {
    totalHectares: "12,480 Ha",
    avgNdvi: "0.84",
    carbonOffset: "4,120 Tons",
    waterSaved: "18.4 Million Liters",
    activeSensors: "3,840 AlphaEarth Grid Points",
    satellitePass: "Sentinel-2 Satellite Imagery (14m ago)"
  },

  todaySummary: {
    cropHealth: "0.84 NDVI — Optimal Canopy Vigor",
    waterStress: "Low Stress — 78% Moisture Saturation",
    weatherRisk: "Moderate — 31°C Heat Elevation Predicted",
    diseaseRisk: "Low Risk — Conditions currently unfavorable for disease development.",
    aiRecommendation: "Schedule nocturnal pulse drip irrigation before sunrise to mitigate predicted thermal elevation in Plot Beta Vineyard."
  },
  
  parcels: [
    {
      id: "plot-alpha",
      name: "Plot Alpha - Valley Organic Wheat",
      crop: "Organic Hard Winter Wheat",
      hectares: 340,
      coordinates: [37.7749, -122.4194],
      polygon: [
        [37.778, -122.425],
        [37.781, -122.415],
        [37.773, -122.412],
        [37.771, -122.422]
      ],
      healthScore: 92,
      ndvi: 0.88,
      soilMoisture: "78% (NDWI Model)",
      nitrogenLevel: "Optimal Vegetation Density (AlphaEarth)",
      evapotranspiration: "4.2 mm/day (WeatherNext)",
      temperature: "24.5 °C (Thermal Infrared)",
      riskLevel: "Low Risk",
      riskType: "Optimal Growth Profile",
      recommendation: "Maintain scheduled micro-drip hydration. Sentinel-2 multispectral imagery confirms peak photosynthetic capacity.",
      statusColor: "#10B981"
    },
    {
      id: "plot-beta",
      name: "Plot Beta - Napa Cabernet Vineyard",
      crop: "Cabernet Sauvignon Grapes",
      hectares: 185,
      coordinates: [37.785, -122.408],
      polygon: [
        [37.789, -122.412],
        [37.792, -122.402],
        [37.784, -122.398],
        [37.782, -122.408]
      ],
      healthScore: 78,
      ndvi: 0.74,
      soilMoisture: "52% (NDWI Model)",
      nitrogenLevel: "Slight Canopy Deficit (AlphaEarth Insights)",
      evapotranspiration: "5.8 mm/day (WeatherNext)",
      temperature: "28.2 °C (Thermal Infrared)",
      riskLevel: "Moderate",
      riskType: "Hydric Tension & Thermal Elevation",
      recommendation: "WeatherNext microclimate forecasts predict a 2.4°C thermal elevation. Schedule pulse drip irrigation before sunrise to protect grape canopy vigor.",
      statusColor: "#F59E0B"
    },
    {
      id: "plot-gamma",
      name: "Plot Gamma - Sector 4 Maize Field",
      crop: "Grain Corn (Maize)",
      hectares: 510,
      coordinates: [37.765, -122.435],
      polygon: [
        [37.769, -122.441],
        [37.772, -122.430],
        [37.763, -122.427],
        [37.760, -122.438]
      ],
      healthScore: 95,
      ndvi: 0.91,
      soilMoisture: "84% (NDWI Model)",
      nitrogenLevel: "Optimal Canopy Density",
      evapotranspiration: "3.9 mm/day (WeatherNext)",
      temperature: "23.1 °C (Thermal Infrared)",
      riskLevel: "Optimal",
      riskType: "Peak Photosynthetic Saturation",
      recommendation: "Google Earth Engine analysis confirms top 98th percentile yield trajectory across Northern California valley.",
      statusColor: "#10B981"
    },
    {
      id: "plot-delta",
      name: "Plot Delta - Valencia Olive Grove",
      crop: "Picual Olives",
      hectares: 260,
      coordinates: [37.755, -122.415],
      polygon: [
        [37.759, -122.420],
        [37.761, -122.410],
        [37.752, -122.407],
        [37.750, -122.418]
      ],
      healthScore: 64,
      ndvi: 0.61,
      soilMoisture: "44% (NDWI Deficit)",
      nitrogenLevel: "Moderate Canopy Chlorophyll Deficit",
      evapotranspiration: "6.4 mm/day (WeatherNext)",
      temperature: "31.0 °C (Thermal Infrared)",
      riskLevel: "High Risk",
      riskType: "Heat Stress & Fungal Risk",
      recommendation: "AlphaEarth land cover insights detect elevated moisture tension. Apply organic foliar protective spray prior to predicted precipitation.",
      statusColor: "#EF4444"
    }
  ],

  chartData: {
    ndviTimeline: {
      labels: ["May 1", "May 10", "May 20", "Jun 1", "Jun 10", "Jun 20", "Jul 1", "Jul 10", "Jul 20", "Aug 1"],
      datasets: [
        { label: "Plot Alpha (Wheat)", data: [0.65, 0.70, 0.76, 0.81, 0.84, 0.87, 0.88, 0.89, 0.88, 0.88], color: "#10B981" },
        { label: "Plot Beta (Vineyard)", data: [0.55, 0.60, 0.68, 0.72, 0.75, 0.74, 0.76, 0.73, 0.74, 0.74], color: "#F59E0B" },
        { label: "Plot Delta (Olives)", data: [0.70, 0.72, 0.71, 0.68, 0.65, 0.63, 0.62, 0.61, 0.60, 0.61], color: "#EF4444" }
      ]
    },
    soilMoisture: {
      labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
      datasets: [
        { label: "Sentinel-2 NDWI Moisture Index (%)", data: [82, 80, 77, 72, 68, 75, 78], color: "#06B6D4" },
        { label: "WeatherNext AI Baseline", data: [70, 70, 70, 70, 70, 70, 70], color: "rgba(255,255,255,0.4)", borderDash: true }
      ]
    },
    yieldPrediction: {
      labels: ["Wheat", "Corn", "Grapes", "Olives", "Soybeans"],
      actual: [8.4, 11.2, 5.8, 4.2, 3.9],
      predicted: [9.1, 12.0, 6.2, 4.5, 4.3]
    }
  },

  aiPrompts: [
    "Analyze water stress using Sentinel-2 NDWI for Plot Beta",
    "Generate AlphaEarth land cover insights for organic wheat",
    "Predict fungal blight risk using WeatherNext humidity model",
    "Evaluate carbon sequestration potential using Google Earth Engine"
  ]
};

function generateAIDiagnostics(location, cropType, hectares, soilType) {
  const healthBase = Math.floor(Math.random() * 20) + 78;
  const ndviVal = (0.70 + (Math.random() * 0.22)).toFixed(2);
  const moistureVal = Math.floor(Math.random() * 25) + 65;

  return {
    location: location || "Custom Parcel Coordinates (37.77, -122.41)",
    cropType: cropType || "Hard Red Winter Wheat",
    hectares: hectares || 150,
    soilType: soilType || "Clay Loam",
    ndvi: ndviVal,
    healthScore: healthBase,
    moisture: `${moistureVal}% (Sentinel-2 NDWI)`,
    nitrogenIndex: "AlphaEarth Canopy Cover Index: 44 mg/kg",
    carbonSinkRate: `${(hectares * 0.38).toFixed(1)} Metric Tons CO2e / Year`,
    pestRisk: healthBase > 85 ? "Low Risk — Conditions unfavorable" : "18% (WeatherNext Alert)",
    insights: [
      `Sentinel-2 satellite imagery (10m Resolution) verifies robust canopy chlorophyll saturation with an NDVI of ${ndviVal}.`,
      `AlphaEarth land cover insights indicate optimal root hydric tension at ${moistureVal}% NDWI saturation.`,
      `WeatherNext AI climate forecasting predicts stable microclimate conditions over the next 10 days.`
    ],
    actionPlan: [
      { step: 1, title: "Precision Water Allocation", desc: `WeatherNext evapotranspiration model recommends 12mm nocturnal pulse irrigation targeting Sector 2.`, priority: "High" },
      { step: 2, title: "Canopy Optimization", desc: `Variable-rate nutrient application mapped from Earth observation data.`, priority: "Medium" },
      { step: 3, title: "Sentinel-2 Re-Pass Validation", desc: `Orbital satellite re-imaging scheduled for Friday 08:30 UTC for leaf expansion validation.`, priority: "Info" }
    ]
  };
}
