// soundboard.js

const soundboard = (() => {
    // --- Data and State ---
    const VOWELS = ['A','E','I','O','U','Ä','Ö','Ü','EU'];
    const CONSONANTS = ['M','P','R','B','G','K','T','L','N','D','H','S'];
    let state = {
        formula: ['', ''],
        isLowercase: false,
    };
    let dom = {};

    // --- Core Logic ---
    // This function must now be async to use 'await'
    async function playNow() {
        const combo = state.formula.join('');
        if (combo) {
            // Use a slightly different rate for the combined sound, like in the original
            await speakDe(combo.toLowerCase(), { rate: 0.8 }); 
        }
    }

    async function handleKeyClick(keyText) {
        // Prevent new clicks while sounds are playing
        if (dom.keysContainer.style.pointerEvents === 'none') return;
        
        // Disable all keys to prevent race conditions
        dom.keysContainer.style.pointerEvents = 'none';

        if (state.formula[0] === '') {
            state.formula[0] = keyText;
            render();
            await speakChunk(keyText);
        } else if (state.formula[1] === '') {
            state.formula[1] = keyText;
            render();
            await speakChunk(keyText); // Wait for the second letter's sound
            await playNow();           // THEN, play the combined sound
        } else {
            // Start a new formula
            state.formula = [keyText, ''];
            render();
            await speakChunk(keyText);
        }

        // Re-enable all keys after the sequence is complete
        dom.keysContainer.style.pointerEvents = 'auto';
    }


    function clearFormula() {
        state.formula = ['', ''];
        render();
    }

    function toggleCase() {
        state.isLowercase = !state.isLowercase;
        render();
    }

    function clearFormula() {
        state.formula = ['', ''];
        render();
    }

    function toggleCase() {
        state.isLowercase = !state.isLowercase;
        render();
    }

    // --- Rendering Logic ---
    function render() {
        if (!soundboard.isInitialized) return;

        // Render keys with correct case
        dom.keysContainer.querySelectorAll('.soundboard-key').forEach(key => {
            key.textContent = state.isLowercase ? key.dataset.key.toLowerCase() : key.dataset.key;
        });

        // Update formula slots
        dom.formulaSlot1.textContent = state.isLowercase && state.formula[0] ? state.formula[0].toLowerCase() : state.formula[0];
        dom.formulaSlot2.textContent = state.isLowercase && state.formula[1] ? state.formula[1].toLowerCase() : state.formula[1];

        // Update case toggle button text
        dom.caseBtn.textContent = state.isLowercase ? 'ABC' : 'abc';
    }

    // --- Public init function ---
    function init() {
        if (soundboard.isInitialized) return;
        
        const scene = document.getElementById('soundboard-scene');
        scene.innerHTML = `
            <div class="soundboard-container">
                <h3>🎛️ Soundboard — Buchstaben zum Hören tippen</h3>
                <div id="sb-keys-container" class="sb-keys-container"></div>
                <div class="sb-formula-container">
                    <div id="sb-formula-slot-1" class="sb-formula-slot"></div>
                    <div class="sb-formula-plus">+</div>
                    <div id="sb-formula-slot-2" class="sb-formula-slot"></div>
                </div>
                <div class="sb-controls">
                    <button id="sb-clear-btn">🧹 Neu</button>
                    <button id="sb-speak-btn">🔊 Hören</button>
                    <button id="sb-case-btn">abc</button>
                </div>
            </div>
        `;
        
        dom = {
            keysContainer: document.getElementById('sb-keys-container'),
            formulaSlot1: document.getElementById('sb-formula-slot-1'),
            formulaSlot2: document.getElementById('sb-formula-slot-2'),
            clearBtn: document.getElementById('sb-clear-btn'),
            speakBtn: document.getElementById('sb-speak-btn'),
            caseBtn: document.getElementById('sb-case-btn'),
        };

        // Create keyboard keys
        const allKeys = [...VOWELS, ...CONSONANTS];
        allKeys.forEach(key => {
            const btn = document.createElement('button');
            btn.className = 'soundboard-key';
            btn.classList.add(VOWELS.includes(key) ? 'vowel' : 'consonant');
            btn.dataset.key = key;
            btn.textContent = key;
            btn.onclick = () => handleKeyClick(key);
            dom.keysContainer.appendChild(btn);
        });

        // Hook up controls
        dom.clearBtn.onclick = clearFormula;
        dom.speakBtn.onclick = playNow;
        dom.caseBtn.onclick = toggleCase;
        
        soundboard.isInitialized = true;
        render();
    }

    return { init, isInitialized: false };
})();