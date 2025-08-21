// wordlab.js

const wordLab = (() => {
    // --- State and Data (private to the Word Lab module) ---
    let state = {};
    const WORDS = [ { id:'du',  text:'du',  syll:[0,1], img:'https://images.unsplash.com/photo-1532348904171-919f8b2b7e62?q=80&w=1740&auto=format&fit=crop', stufe: 1 }, { id:'im',  text:'im',  syll:[0,1], img:'https://www.shutterstock.com/image-vector/boy-playing-hide-seek-box-600nw-762258736.jpg', stufe: 1 }, { id:'da',  text:'da',  syll:[0,1], img:'https://plus.unsplash.com/premium_photo-1729860559950-da4570b34e21?q=80&w=774&auto=format&fit=crop', stufe: 1 }, { id:'oma',   text:'Oma',   syll:[0,1], img:'https://images.unsplash.com/photo-1577048982771-1960014bde8b?q=80&w=776&auto=format&fit=crop', stufe: 2 }, { id:'opa',   text:'Opa',   syll:[0,1], img:'https://images.unsplash.com/photo-1586498024141-1940debde48d?q=80&w=774&auto=format&fit=crop', stufe: 2 }, { id:'mama',  text:'Mama',  syll:[0,2], img:'https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=778&auto=format&fit=crop', stufe: 2 }, { id:'papa',  text:'Papa',  syll:[0,2], img:'https://images.unsplash.com/photo-1593323925814-253c803de3a5?q=80&w=770&auto=format&fit=crop', stufe: 2 }, ];

    let dom = {}; // To hold references to HTML elements

    // --- Core Logic (ported from your original game) ---
    function setupWord(word) {
        state.currentWord = word;
        state.nextSlotIndex = 0;
        
        state.slots = [];
        state.syllableBank = [];
        
        for(let i=0; i<word.syll.length; i++){
            const start = word.syll[i];
            const end = (i+1 < word.syll.length) ? word.syll[i+1] : word.text.length;
            const chunk = word.text.slice(start, end);
            state.syllableBank.push({ text: chunk, originalIndex: i });
            state.slots.push({ expected: chunk, filled: '' });
        }
        
        state.syllableBank.sort(() => Math.random() - 0.5);
        render();
    }

    function handleSyllableClick(syllableText, originalIndex, btnElement) {
        speakChunk(syllableText);
        
        if (syllableText === state.slots[state.nextSlotIndex].expected) {
            state.slots[state.nextSlotIndex].filled = syllableText;
            state.nextSlotIndex++;
            btnElement.disabled = true;

            if (state.nextSlotIndex === state.slots.length) {
                handleWin();
            }
            render();
        }
    }

    function handleWin() {
        speakDe(state.currentWord.text);
        // We'll add confetti/effects later to keep it simple
        setTimeout(() => {
            // For now, just reset the current word
            setupWord(state.currentWord);
        }, 1500);
    }
    
    // --- Rendering Logic (creates and updates HTML) ---
    function render() {
        if (!dom.card) return; // Don't render if not initialized
        
        dom.image.src = state.currentWord.img;
        dom.wordDisplay.textContent = state.nextSlotIndex === state.slots.length ? state.currentWord.text : '';

        dom.slotsContainer.innerHTML = '';
        state.slots.forEach((slot, index) => {
            const el = document.createElement('div');
            el.className = 'slot';
            if (index === state.nextSlotIndex) el.classList.add('next');
            el.textContent = slot.filled;
            dom.slotsContainer.appendChild(el);
        });

        dom.bankContainer.innerHTML = '';
        state.syllableBank.forEach(syllable => {
            const isFilled = state.slots.some(s => s.filled === syllable.text);
            if (!isFilled) {
                const btn = document.createElement('button');
                btn.className = 'syllable-btn';
                btn.textContent = syllable.text;
                btn.onclick = () => handleSyllableClick(syllable.text, syllable.originalIndex, btn);
                dom.bankContainer.appendChild(btn);
            }
        });
    }

    // --- Public init function ---
    function init() {
        if (wordLab.isInitialized) return;
        
        const scene = document.getElementById('wordlab-scene');
        scene.innerHTML = `
            <div id="wl-card"><img id="wl-image" src=""></div>
            <div id="wl-word-display"></div>
            <div id="wl-slots-container"></div>
            <div id="wl-bank-container"></div>
            <div id="wl-controls">
                <button id="wl-speak-btn">🔊 Vorlesen</button>
                <button id="wl-back-btn">📚 Zur Übersicht</button>
            </div>
            <style> /* Word Lab Specific Styles */
                #wl-card { width: 100%; max-width: 400px; aspect-ratio: 4 / 3; background-color: rgba(255,255,255,0.06); border-radius: 20px; display: flex; justify-content: center; align-items: center; padding: 15px; box-sizing: border-box; }
                #wl-image { max-width: 100%; max-height: 100%; object-fit: cover; border-radius: 12px; }
                #wl-word-display { font-size: 36px; font-weight: 500; min-height: 40px; }
                #wl-slots-container, #wl-bank-container { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 10px; }
                .slot { width: 100px; height: 50px; border: 2px dashed #AFB6C3; border-radius: 14px; display: flex; justify-content: center; align-items: center; font-size: 28px; }
                .slot.next { border-style: solid; border-color: var(--accent); }
                .syllable-btn { width: 100px; height: 50px; background-image: linear-gradient(to right, #334155, #475569); border:none; border-radius:14px; color:white; font-size:28px; cursor:pointer; }
                .syllable-btn:disabled { opacity: 0.3; cursor: not-allowed; }
                #wl-controls { margin-top: 20px; display: flex; gap: 20px; }
                #wl-controls button { font-size: 18px; padding: 12px 20px; border:none; border-radius:14px; background-image: linear-gradient(to right, var(--accent), var(--accent-2)); color: white; cursor: pointer; }
            </style>
        `;
        
        // Cache DOM elements
        dom = {
            card: document.getElementById('wl-card'),
            image: document.getElementById('wl-image'),
            wordDisplay: document.getElementById('wl-word-display'),
            slotsContainer: document.getElementById('wl-slots-container'),
            bankContainer: document.getElementById('wl-bank-container'),
        };

        // Hook up controls
        document.getElementById('wl-speak-btn').onclick = () => speakDe(state.currentWord.text);
        document.getElementById('wl-back-btn').onclick = () => {
            // This is a placeholder for now. We can add the Stufen selection later.
            alert("Zurück zur Stufen-Übersicht (wird noch implementiert)");
        };

        setupWord(WORDS[0]); // Start with the first word
        wordLab.isInitialized = true;
    }

    return {
        init,
        isInitialized: false,
    };
})();