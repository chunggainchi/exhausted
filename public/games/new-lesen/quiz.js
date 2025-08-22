// quiz.js (Corrected Version)

const quiz = (() => {
    // --- Data and State ---
    const WORDS = wordLab.getWords();
    let state = {
        currentWord: null,
        options: [],
        isAnswered: false,
        correctAnswers: 0,
        progress: 0,
        steps: 10,
        selectedStufe: 'all',
    };
    let dom = {};

    // --- Core Logic (Unchanged) ---
    function getWordPool() { if (state.selectedStufe === 'all') { return WORDS; } return WORDS.filter(w => w.stufe === state.selectedStufe); }
    function prepareQuestion() { state.isAnswered = false; const pool = getWordPool(); if (pool.length === 0) { alert("Keine Wörter für diese Stufe gefunden!"); return; } const questionWord = pool[Math.floor(Math.random() * pool.length)]; state.currentWord = questionWord; const otherWords = WORDS.filter(w => w.id !== questionWord.id); otherWords.sort(() => Math.random() - 0.5); state.options = [questionWord, ...otherWords.slice(0, 3)]; state.options.sort(() => Math.random() - 0.5); render(); }
    function handleOptionClick(selectedWord, btnElement) {
        if (state.isAnswered) return;
        state.isAnswered = true;
    
        if (selectedWord.id === state.currentWord.id) {
            // --- KEY ADDITION: Speak the word on a correct answer ---
            speakDe(selectedWord.text);
    
            state.correctAnswers++;
            state.progress = Math.min(state.steps, state.progress + 1);
            btnElement.classList.add('correct');
    
            if (typeof wordLab.triggerConfetti === 'function') {
                wordLab.triggerConfetti();
            }
    
            if (state.progress >= state.steps) {
                handleWin();
            } else {
                setTimeout(prepareQuestion, 1200); // Increased delay slightly for better feel
            }
        } else {
            state.progress = Math.max(0, state.progress - 1);
            btnElement.classList.add('incorrect');
            speakDe("Falsch", { rate: 1.1 });
            setTimeout(() => {
                state.isAnswered = false;
                render();
            }, 1000);
        }
        render();
    }
    function handleWin() { speakDe("Super! Du hast die Runde geschafft!"); setTimeout(() => { state.correctAnswers = 0; state.progress = 0; prepareQuestion(); }, 1500); }

    // --- Rendering Logic (Unchanged) ---
    function render() {
        if (!quiz.isInitialized || !state.currentWord) return;
        dom.questionText.textContent = state.currentWord.text;
        dom.optionsGrid.innerHTML = '';
        state.options.forEach(word => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option-btn';
            btn.innerHTML = `<img src="${word.img}" alt="">`;
            btn.onclick = () => handleOptionClick(word, btn);
            if (state.isAnswered && state.currentWord && word.id !== state.currentWord.id) {
                if (btn.classList.contains('incorrect')) { /* keep it */ }
            }
            dom.optionsGrid.appendChild(btn);
        });
        const progressPercent = (state.progress / state.steps) * 100;
        dom.progressBarFill.style.width = `${progressPercent}%`;
        dom.mouseEmoji.style.left = `calc(${progressPercent}% - 15px)`;
        dom.correctCounter.textContent = `✅ ${state.correctAnswers}`;
    }

    // --- Public init function (CORRECTED) ---
    function init() {
        if (quiz.isInitialized) return;
        
        const scene = document.getElementById('quiz-scene');
        scene.innerHTML = `
            <div class="quiz-header">
                <h3>🧠 Quiz</h3>
                <select id="quiz-stufen-select" class="quiz-stufen-select"></select>
            </div>
            <div class="quiz-container">
                <div class="quiz-question"></div>
                <div class="quiz-options-grid"></div>
                <div class="quiz-progress-bar">
                    <div class="fill"></div>
                    <span class="emoji mouse">🐭</span>
                    <span class="emoji cheese">🧀</span>
                </div>
            </div>
            <div class="quiz-footer">
                <div id="quiz-correct-counter" class="quiz-correct-counter"></div>
                <button id="quiz-speak-btn">🔊 Vorlesen</button>
            </div>
        `;
        
        dom = {
            questionText: document.querySelector('#quiz-scene .quiz-question'),
            optionsGrid: document.querySelector('#quiz-scene .quiz-options-grid'),
            speakBtn: document.getElementById('quiz-speak-btn'),
            // This will now correctly find the element
            stufenSelect: document.getElementById('quiz-stufen-select'),
            progressBarFill: document.querySelector('#quiz-scene .quiz-progress-bar .fill'),
            mouseEmoji: document.querySelector('#quiz-scene .quiz-progress-bar .mouse'),
            correctCounter: document.getElementById('quiz-correct-counter'),
        };

        const stufen = [...new Set(WORDS.map(w => w.stufe))].sort((a,b) => a-b);
        dom.stufenSelect.innerHTML = `<option value="all">🌐 Alle Stufen</option>`;
        stufen.forEach(s => {
            const option = document.createElement('option');
            option.value = s;
            option.textContent = `📚 Stufe ${s}`;
            dom.stufenSelect.appendChild(option);
        });
        dom.stufenSelect.onchange = (e) => {
            state.selectedStufe = e.target.value === 'all' ? 'all' : Number(e.target.value);
            state.correctAnswers = 0;
            state.progress = 0;
            prepareQuestion();
        };

        dom.speakBtn.onclick = () => { if (state.currentWord) speakDe(state.currentWord.text); };

        quiz.isInitialized = true;
        prepareQuestion();
    }

    return { init, isInitialized: false };
})();