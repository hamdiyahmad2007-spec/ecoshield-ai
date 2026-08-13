// EcoShield AI ShieldAI Advisory Assistant Chat Engine — Demo Edition

function setupAIChat() {
  const chatForm = document.getElementById('chat-input-form');
  const chatInput = document.getElementById('chat-input-text');
  const chatBox = document.getElementById('chat-messages-box');

  if (!chatForm || !chatInput || !chatBox) return;

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (!query) return;

    appendUserMessage(query);
    chatInput.value = '';
    
    setTimeout(() => {
      generateAIResponse(query);
    }, 600);
  });

  const chipContainer = document.getElementById('ai-prompt-chips');
  if (chipContainer) {
    chipContainer.innerHTML = ECO_DATA.aiPrompts.map(prompt => `
      <button onclick="sendPresetPrompt('${prompt}')" class="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-400 text-xs text-gray-300 hover:text-emerald-300 transition-all text-left">
        💡 ${prompt}
      </button>
    `).join('');
  }
}

function sendPresetPrompt(promptText) {
  const chatInput = document.getElementById('chat-input-text');
  if (chatInput) {
    chatInput.value = promptText;
    const chatForm = document.getElementById('chat-input-form');
    if (chatForm) chatForm.dispatchEvent(new Event('submit'));
  }
}

function appendUserMessage(msgText) {
  const chatBox = document.getElementById('chat-messages-box');
  if (!chatBox) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = 'flex justify-end';
  msgDiv.innerHTML = `
    <div class="chat-message-user max-w-[85%] sm:max-w-[70%]">
      ${escapeHtml(msgText)}
    </div>
  `;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function generateAIResponse(userQuery) {
  const chatBox = document.getElementById('chat-messages-box');
  if (!chatBox) return;

  const typingDiv = document.createElement('div');
  typingDiv.className = 'flex justify-start';
  typingDiv.id = 'ai-typing-indicator';
  typingDiv.innerHTML = `
    <div class="chat-message-ai flex items-center gap-2">
      <span class="text-xs text-emerald-400 font-bold">Gemini AI Processing Satellite Data</span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>
  `;
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  let answerText = "";
  const lowerQ = userQuery.toLowerCase();

  if (lowerQ.includes('water') || lowerQ.includes('drought') || lowerQ.includes('irrigation')) {
    answerText = `Sentinel-2 NDWI (Normalized Difference Water Index) layers combined with <strong>WeatherNext AI</strong> evapotranspiration data reveal a 18% moisture tension in <strong>Plot Beta (Vineyard)</strong>.
    <br/><br/>
    <strong>Gemini AI Prescription (100% Satellite Derived):</strong>
    <ul class="list-disc pl-5 space-y-1 text-xs mt-2">
      <li>Initiate nocturnal pulse drip irrigation between <strong>03:00 AM - 06:00 AM</strong> to prevent solar thermal degradation.</li>
      <li>Target 14mm application depth over sandy loam zone mapped by Google Earth Engine.</li>
      <li>Estimated water savings: <strong>32,000 Liters</strong> vs baseline flooding.</li>
    </ul>`;
  } else if (lowerQ.includes('nitrogen') || lowerQ.includes('alphaearth') || lowerQ.includes('wheat') || lowerQ.includes('fertilizer')) {
    answerText = `The <strong>AlphaEarth Foundation Model</strong> analyzed Sentinel-2 Near-Infrared bands, confirming optimal chlorophyll saturation for <strong>Plot Alpha Wheat</strong>, with localized vegetation variance in the East sector.
    <br/><br/>
    <strong>AI Recommendations:</strong>
    <ul class="list-disc pl-5 space-y-1 text-xs mt-2">
      <li>Apply variable-rate nitrogen boost (VRA) at 22 kg/Ha in North-East quadrant.</li>
      <li>WeatherNext AI predicts rain on Thursday; complete application before 14:00 UTC.</li>
    </ul>`;
  } else if (lowerQ.includes('fungal') || lowerQ.includes('blight') || lowerQ.includes('pest') || lowerQ.includes('weathernext')) {
    answerText = `<strong>WeatherNext AI</strong> microclimate matrix indicates relative humidity reached 88%. This triggers a <strong>Moderate Risk Alert</strong> for fungal incubation in Plot Delta.
    <br/><br/>
    <strong>Preventive Action Protocol:</strong>
    <ul class="list-disc pl-5 space-y-1 text-xs mt-2">
      <li>Deploy copper-based organic foliar spray within a 48-hour window.</li>
      <li>AlphaEarth leaf density map shows 85% canopy cover; selective thinning advised.</li>
    </ul>`;
  } else {
    answerText = `I can help explain crop health, weather risks, irrigation recommendations, vegetation changes, and sustainable farming practices using satellite imagery and AI.
    <br/><br/>
    <strong>Key Diagnostics:</strong>
    <ul class="list-disc pl-5 space-y-1 text-xs mt-2">
      <li>Average Field NDVI: <span class="text-emerald-400 font-bold">0.84</span> (Optimal Chlorophyll Vigor)</li>
      <li>WeatherNext Evapotranspiration: 4.8 mm/day</li>
      <li>Carbon Sequestration Potential: <strong>3.8 Tons CO2e/Ha/Yr</strong></li>
    </ul>
    Feel free to ask me any question about satellite moisture models, crop health, or sustainable irrigation!`;
  }

  setTimeout(() => {
    const indicator = document.getElementById('ai-typing-indicator');
    if (indicator) indicator.remove();

    const aiMsgDiv = document.createElement('div');
    aiMsgDiv.className = 'flex justify-start';
    aiMsgDiv.innerHTML = `
      <div class="chat-message-ai max-w-[90%] sm:max-w-[80%] space-y-2">
        <div class="flex items-center justify-between pb-2 border-b border-emerald-500/20 text-xs">
          <span class="font-bold text-emerald-400 flex items-center gap-1.5">
            <span>🛡️</span> Gemini Precision Agronomy Bot
          </span>
          <span class="text-gray-400 text-[10px]">Google Earth Engine & AlphaEarth AI</span>
        </div>
        <div class="text-xs text-gray-200 leading-relaxed">
          ${answerText}
        </div>
      </div>
    `;
    chatBox.appendChild(aiMsgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 1200);
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
