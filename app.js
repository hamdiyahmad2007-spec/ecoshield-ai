// EcoShield AI Main Application Entrypoint — Apple × Google AI Theme

document.addEventListener('DOMContentLoaded', () => {
  console.log("🌱 EcoShield AI — Google Earth Engine & AlphaEarth Platform Initialized");

  // 1. Initialize Ambient Particles System
  initAmbientParticles();

  // 2. Initialize GIS Map & Charts
  initEcoMap();
  initEcoCharts();

  // 3. Setup Forms & Chat Listeners
  setupScannerForm();
  setupAIChat();

  // 4. Navigation Tab Listener
  setupNavigationTabs();
});

// Ambient Glowing Particles & Forest Light Rays Generator
function initAmbientParticles() {
  const canvas = document.getElementById('ambient-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 45;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.5 - 0.2, // Slow upward floating leaf effect
      pulse: Math.random() * 0.02 + 0.005
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.alpha += Math.sin(Date.now() * p.pulse) * 0.005;

      if (p.y < -10) p.y = height + 10;
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 135, ${Math.max(0.05, Math.min(0.6, p.alpha))})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00FF87';
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

function setupNavigationTabs() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = tab.getAttribute('data-target');
      if (!targetId) return;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function triggerGlobalRefresh() {
  const refreshBtn = document.getElementById('global-refresh-btn');
  if (refreshBtn) {
    refreshBtn.classList.add('animate-spin');
    setTimeout(() => {
      refreshBtn.classList.remove('animate-spin');
      showNotification("🛰️ Sentinel-2 Swarm & WeatherNext AI Feed Refreshed");
    }, 1000);
  }
}

function showNotification(msg) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-6 right-6 z-50 bg-[#08170F]/90 border border-emerald-400/40 text-emerald-300 text-xs px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-2.5 transform translate-y-10 opacity-0 transition-all duration-300';
  toast.innerHTML = `<span class="text-base">✨</span> <span class="font-medium">${msg}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('translate-y-10', 'opacity-0');
  }, 50);

  setTimeout(() => {
    toast.classList.add('translate-y-10', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
