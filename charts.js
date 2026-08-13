// EcoShield AI Chart Engine using Chart.js — Executive Demo Edition

let ndviChart = null;
let moistureChart = null;
let yieldChart = null;

function initEcoCharts() {
  Chart.defaults.color = '#9CA3AF';
  Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

  initNdviChart();
  initMoistureChart();
  initYieldChart();
}

function initNdviChart() {
  const ctx = document.getElementById('chart-ndvi');
  if (!ctx) return;

  ndviChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ECO_DATA.chartData.ndviTimeline.labels,
      datasets: ECO_DATA.chartData.ndviTimeline.datasets.map(ds => ({
        label: ds.label,
        data: ds.data,
        borderColor: ds.color,
        backgroundColor: ds.color + '18',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: ds.color,
        pointRadius: 4,
        pointHoverRadius: 7
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { boxWidth: 12, usePointStyle: true, font: { size: 11 } }
        },
        tooltip: {
          backgroundColor: 'rgba(5, 16, 11, 0.96)',
          borderColor: 'rgba(16, 185, 129, 0.4)',
          borderWidth: 1,
          padding: 12,
          displayColors: true,
          titleFont: { size: 12, weight: 'bold' },
          bodyFont: { size: 12 }
        }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.03)' } },
        y: { 
          min: 0.4, 
          max: 1.0,
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { stepSize: 0.1 } 
        }
      }
    }
  });
}

function initMoistureChart() {
  const ctx = document.getElementById('chart-moisture');
  if (!ctx) return;

  moistureChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ECO_DATA.chartData.soilMoisture.labels,
      datasets: [
        {
          label: 'Sentinel-2 NDWI Moisture Index (%)',
          data: ECO_DATA.chartData.soilMoisture.datasets[0].data,
          borderColor: '#06B6D4',
          backgroundColor: 'rgba(6, 182, 212, 0.18)',
          borderWidth: 3,
          tension: 0.35,
          fill: true
        },
        {
          label: 'WeatherNext AI Baseline (70%)',
          data: ECO_DATA.chartData.soilMoisture.datasets[1].data,
          borderColor: 'rgba(255,255,255,0.3)',
          borderDash: [5, 5],
          borderWidth: 1.5,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11 } } }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.03)' } },
        y: { 
          min: 40, 
          max: 100,
          grid: { color: 'rgba(255,255,255,0.05)' } 
        }
      }
    }
  });
}

function initYieldChart() {
  const ctx = document.getElementById('chart-yield');
  if (!ctx) return;

  yieldChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ECO_DATA.chartData.yieldPrediction.labels,
      datasets: [
        {
          label: 'Historical Regional Average (Tons/Ha)',
          data: ECO_DATA.chartData.yieldPrediction.actual,
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: 8
        },
        {
          label: 'AlphaEarth AI Predicted Yield (Tons/Ha)',
          data: ECO_DATA.chartData.yieldPrediction.predicted,
          backgroundColor: 'rgba(16, 185, 129, 0.88)',
          borderRadius: 8
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11 } } }
      },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' } }
      }
    }
  });
}
