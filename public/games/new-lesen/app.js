// app.js (DEFINITIVELY CORRECTED VERSION)

// --- Speech Engine (Upgraded to be Promise-Based and Async) ---
let voiceDE = null;
let voicesReady = false;

async function initializeSpeech() {
    if (!('speechSynthesis' in window)) {
        console.error("TTS not supported");
        return;
    }
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
    // Return a Promise that resolves when the utterance ends
    return new Promise((resolve, reject) => {
        if (!voicesReady || !voiceDE) {
            return reject("TTS not ready");
        }
        try {
            // Cancel any previous sound to ensure a clean start
            speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = voiceDE;
            utterance.lang = voiceDE.lang;
            utterance.rate = options.rate || 0.85;

            // Resolve the promise when the sound finishes
            utterance.onend = resolve;
            // Reject the promise on error
            utterance.onerror = reject;

            speechSynthesis.speak(utterance);
        } catch (e) {
            console.error("Speech Synthesis Error:", e);
            reject(e);
        }
    });
}

// These helper functions now need to be 'async' to use 'await'
const speakDe = async (t, opts = {}) => await speak(t, { ...opts });
const speakChunk = async (chunk) => {
    if (!chunk) return;
    const lc = chunk.toLowerCase();
    const isSingle = chunk.length === 1;

    // The full, original pronunciation maps
    const V_LONG = { a:'ah', e:'eh', i:'ih', o:'oh', u:'uh', ä:'äh', ö:'öh', ü:'üh' };
    const C_LONG = { m:'m', n:'n', s:'s', l:'l', f:'f', r:'r', z:'z', h:'h' };
    
    let textToSpeak = isSingle ? (V_LONG[lc] || C_LONG[lc] || lc) : lc;
    
    await speak(textToSpeak, { rate: 0.75 });
};

// --- App State & Scene Management ---
const state = { activeScene: 'home' };
// <<< THIS IS THE ACTUAL CORRECTED ARRAY with 'soundboard' >>>
const scenes = ['home', 'wordlab', 'quiz', 'soundboard', 'story'];

function showScene(sceneId) {
    state.activeScene = sceneId;
    // This will now correctly hide ALL scenes before showing the new one.
    scenes.forEach(id => {
        const el = document.getElementById(`${id}-scene`);
        if (el) el.classList.remove('active');
    });
    const activeEl = document.getElementById(`${sceneId}-scene`);
    if (activeEl) activeEl.classList.add('active');

    document.querySelectorAll('#sidebar .nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.scene === sceneId));

    if (sceneId === 'wordlab' && typeof wordLab.init === 'function' && !wordLab.isInitialized) {
        wordLab.init();
    }
    if (sceneId === 'quiz' && typeof quiz.init === 'function' && !quiz.isInitialized) {
        quiz.init();
    }
    if (sceneId === 'soundboard' && typeof soundboard.init === 'function' && !soundboard.isInitialized) {
        soundboard.init();
    }
    if (sceneId === 'story' && typeof story.init === 'function' && !story.isInitialized) {
        story.init();
    }

    if (window.innerWidth <= 850) {
        document.getElementById('sidebar').classList.remove('open');
        document.getElementById('overlay').classList.remove('active');
    }
}

// --- Navigation & Initial Load ---
document.addEventListener('DOMContentLoaded', async () => {
    const NAV_ITEMS = [{ id: 'home', label: '🏠 Home' }, { id: 'soundboard', label: '🎛️ Soundboard' }, { id: 'wordlab', label: '🧱 Word Lab' }, { id: 'quiz', label: '🧠 Quiz' }, { id: 'story', label: '📖 Story' }];
    const sidebar = document.getElementById('sidebar');

    const logo = document.createElement('img');
    logo.src = '/images/logo.svg';
    logo.id = 'sidebar-logo';
    logo.onclick = () => window.location.href = "https://exhaustedrocket.com/";
    sidebar.appendChild(logo);
    
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