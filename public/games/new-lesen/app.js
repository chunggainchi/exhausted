// app.js

// --- Speech Engine (Clean, Isolated, and Reliable) ---
let voiceDE = null;
let voicesReady = false;

async function initializeSpeech() {
    if (!('speechSynthesis' in window)) {
        console.error("TTS not supported");
        return;
    }
    // Prime the engine on the first user interaction
    document.body.addEventListener('pointerdown', () => {
        try { speechSynthesis.speak(new SpeechSynthesisUtterance('')); } catch(e) {}
    }, { once: true });
    
    const voices = await new Promise(resolve => {
        const get = () => { const v = speechSynthesis.getVoices(); if (v.length) resolve(v); };
        speechSynthesis.onvoiceschanged = get; get();
    });
    
    const deVoices = voices.filter(v => v.lang.startsWith('de'));
    if (deVoices.length > 0) {
        voiceDE = deVoices.find(v => v.name.includes('Anna')) || deVoices.find(v => v.localService) || deVoices[0];
        console.log("Selected German voice:", voiceDE.name);
        voicesReady = true;
    } else {
        console.error("No German voices found.");
    }
}

function speak(text, options = {}) {
    if (!voicesReady || !voiceDE) return;
    try {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voiceDE;
        utterance.lang = voiceDE.lang;
        utterance.rate = options.rate || 0.85;
        speechSynthesis.speak(utterance);
    } catch (e) { console.error("Speech Synthesis Error:", e); }
}

const speakDe = (t, opts = {}) => speak(t, { ...opts });
const speakChunk = (chunk) => {
    const lc = chunk.toLowerCase();
    const PRONUNCIATION_MAP = { a:'ah', e:'eh', i:'ih', o:'oh', u:'uh', ä:'äh', ö:'öh', ü:'üh' };
    speak(PRONUNCIATION_MAP[lc] || lc, { rate: 0.75 });
};


// --- App State & Scene Management ---
const state = { activeScene: 'home' };
const scenes = ['home', 'wordlab']; // Add 'quiz', 'story' here later

function showScene(sceneId) {
    state.activeScene = sceneId;
    scenes.forEach(id => document.getElementById(`${id}-scene`).classList.remove('active'));
    document.getElementById(`${sceneId}-scene`).classList.add('active');
    document.querySelectorAll('#sidebar .nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.scene === sceneId));

    // Initialize the scene's logic if it hasn't been already
    if (sceneId === 'wordlab' && typeof wordLab.init === 'function' && !wordLab.isInitialized) {
        wordLab.init();
    }
    
    if (window.innerWidth <= 850) {
        document.getElementById('sidebar').classList.remove('open');
        document.getElementById('overlay').classList.remove('active');
    }
}

// --- Navigation & Initial Load ---
document.addEventListener('DOMContentLoaded', async () => {
    const NAV_ITEMS = [{ id: 'home', label: '🏠 Home' }, { id: 'wordlab', label: '🧱 Word Lab' }];
    const sidebar = document.getElementById('sidebar');
    NAV_ITEMS.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'nav-btn';
        btn.textContent = item.label;
        btn.dataset.scene = item.id;
        btn.onclick = () => showScene(item.id);
        sidebar.appendChild(btn);
    });

    const burgerBtn = document.getElementById('burger-btn');
    const overlay = document.getElementById('overlay');
    burgerBtn.onclick = () => { sidebar.classList.toggle('open'); overlay.classList.toggle('active'); };
    overlay.onclick = () => { sidebar.classList.remove('open'); overlay.classList.remove('active'); };

    await initializeSpeech();
    showScene('home');
});