// wordlab.js (CORRECTED)

const wordLab = (() => {
    // --- Data is the same ---
    const WORDS = [ { id:'du',  text:'du',  syll:[0,1], img:'https://images.unsplash.com/photo-1532348904171-919f8b2b7e62?q=80&w=1740&auto-format&fit=crop', stufe: 1 }, { id:'im',  text:'im',  syll:[0,1], img:'https://www.shutterstock.com/image-vector/boy-playing-hide-seek-box-600nw-762258736.jpg', stufe: 1 }, { id:'da',  text:'da',  syll:[0,1], img:'https://plus.unsplash.com/premium_photo-1729860559950-da4570b34e21?q=80&w=774&auto-format&fit=crop', stufe: 1 }, { id:'zu',  text:'zu',  syll:[0,1], img:'https://www.shutterstock.com/image-illustration/elegantly-designed-home-entry-featuring-600nw-2434581389.jpg', stufe: 1 }, { id:'ab',  text:'ab',  syll:[0,1], img:'https://bestlifeonline.com/wp-content/uploads/sites/3/2023/05/woman-taking-off-shoes-places-where-take-off.jpg', stufe: 1 }, { id:'ei',  text:'Ei',  syll:[0,1], img:'https://images.unsplash.com/photo-1607690424560-35d967d6ad7c?q=80&w=774&auto-format&fit=crop', stufe: 1 }, { id:'ja',  text:'ja',  syll:[0,1], img:'https://images.unsplash.com/photo-1693168058020-fd7445ff87df?q=80&w=687&auto-format&fit=crop', stufe: 1 }, { id:'nö',  text:'nö',  syll:[0,1], img:'https://images.unsplash.com/photo-1693168058063-f8e3474ce214?q=80&w=774&auto-format&fit=crop', stufe: 1 }, { id:'oma',   text:'Oma',   syll:[0,1], img:'https://images.unsplash.com/photo-1577048982771-1960014bde8b?q=80&w=776&auto-format&fit=crop', stufe: 2 }, { id:'opa',   text:'Opa',   syll:[0,1], img:'https://images.unsplash.com/photo-1586498024141-1940debde48d?q=80&w=774&auto-format&fit=crop', stufe: 2 }, { id:'mama',  text:'Mama',  syll:[0,2], img:'https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=778&auto-format&fit=crop', stufe: 2 }, { id:'papa',  text:'Papa',  syll:[0,2], img:'https://images.unsplash.com/photo-1593323925814-253c803de3a5?q=80&w=770&auto-format&fit=crop', stufe: 2 }, { id:'eule',  text:'Eule',  syll:[0,2], img:'https://images.unsplash.com/photo-1553264701-d138db4fd5d4?q=80&w=1740&auto-format&fit=crop', stufe: 2 }, { id:'igel',  text:'Igel',  syll:[0,1], img:'https://images.unsplash.com/photo-1512742282398-91d6f0580591?q=80&w=1548&auto-format&fit=crop', stufe: 2 }, { id:'rabe',  text:'Rabe',  syll:[0,2], img:'https://images.unsplash.com/photo-1433888376991-1297486ba3f5?q=80&w=1740&auto-format&fit=crop', stufe: 2 }, { id:'erde',  text:'Erde',  syll:[0,2], img:'https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=774&auto-format&fit=crop', stufe: 2 }, { id:'kette', text:'Kette', syll:[0,3], img:'https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=774&auto-format&fit=crop', stufe: 2 }, { id:'ohren', text:'Ohren', syll:[0,2], img:'https://images.unsplash.com/photo-1516726283839-a493d9f167aa?q=80&w=1740&auto-format&fit=crop', stufe: 2 }, { id:'baden', text:'Baden', syll:[0,2], img:'https://images.unsplash.com/photo-1616641179518-fddb553e18df?q=80&w=760&auto-format&fit=crop', stufe: 2 }, { id:'garten',text:'Garten',syll:[0,3], img:'https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=1548&auto-format&fit=crop', stufe: 2 }, ];
    let state = { currentView: 'stufen', currentStufe: 1, currentWord: null, detail: {} };
    let dom = {};

    // --- KEY ADDITION: A function to safely get the words ---
    function getWords() {
        return WORDS;
    }

    function triggerConfetti() {
        const container = document.getElementById('confetti-container');
        for (let i = 0; i < 40; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 90%, 65%)`;
            confetti.style.animationDelay = (Math.random() * 0.3) + 's';
            container.appendChild(confetti);
            setTimeout(() => confetti.remove(), 2000);
        }
    }

    // --- View Rendering Logic ---
    function render() {
        if (!wordLab.isInitialized) return;
        
        // Toggle view visibility
        dom.stufenView.style.display = state.currentView === 'stufen' ? 'flex' : 'none';
        dom.cardsView.style.display = state.currentView === 'cards' ? 'flex' : 'none';
        dom.detailView.style.display = state.currentView === 'detail' ? 'flex' : 'none';
        
        dom.header.style.display = 'flex';

        // Render content for the active view
        if (state.currentView === 'stufen') renderStufen();
        if (state.currentView === 'cards') renderCards();
        if (state.currentView === 'detail') renderDetail();
    }
    
    function renderStufen() {
        dom.headerTitle.textContent = `🧪 Word Lab`;
        // Hide the back button, but keep its space so the title stays centered
        dom.backBtn.style.visibility = 'hidden'; 
        dom.header.className = 'wl-header stufen-header';

        const stufenMap = new Map();
        WORDS.forEach(w => stufenMap.set(w.stufe, (stufenMap.get(w.stufe) || 0) + 1));
        dom.stufenContainer.innerHTML = '';
        stufenMap.forEach((count, num) => {
            const btn = document.createElement('button');
            btn.className = 'stufe-btn';
            btn.innerHTML = `<div class="stufe-title">📚 Stufe ${num}</div><div class="stufe-count">${count} Wörter</div>`;
            btn.onclick = () => { state.currentStufe = num; state.currentView = 'cards'; render(); };
            dom.stufenContainer.appendChild(btn);
        });
    }

    function renderCards() {
        dom.headerTitle.textContent = `🧪 Word Lab - Stufe ${state.currentStufe}`;
        dom.backBtn.textContent = '‹';
        dom.backBtn.style.visibility = 'visible'; // KEY FIX: Make the back button visible again
        dom.backBtn.onclick = () => { state.currentView = 'stufen'; render(); };
        dom.header.className = 'wl-header cards-header';

        const wordsInStufe = WORDS.filter(w => w.stufe === state.currentStufe);
        dom.cardsContainer.innerHTML = '';
        wordsInStufe.forEach(word => {
            const card = document.createElement('div');
            card.className = 'word-card';
            card.innerHTML = `<img src="${word.img}" alt="${word.text}"><div class="word-card-text">${word.text}</div>`;
            card.onclick = () => { state.currentWord = word; state.currentView = 'detail'; setupDetailView(); };
            dom.cardsContainer.appendChild(card);
        });
    }

    function renderDetail() {
        dom.headerTitle.textContent = `🧪 Word Lab - Stufe ${state.currentStufe}`;
        dom.backBtn.textContent = '‹';
        dom.backBtn.style.visibility = 'visible'; // KEY FIX: Make the back button visible again
        dom.backBtn.onclick = () => { state.currentView = 'cards'; render(); };
        dom.header.className = 'wl-header detail-header';
        
        const word = state.currentWord;
        dom.detailImage.src = word.img;
        dom.detailImage.alt = word.text;

        dom.detailSyllableDisplay.innerHTML = '';
        for (let i = 0; i < word.syll.length; i++) { const start = word.syll[i], end = (i+1 < word.syll.length) ? word.syll[i+1] : word.text.length, chunk = word.text.slice(start, end), span = document.createElement('span'); span.textContent = chunk; dom.detailSyllableDisplay.appendChild(span); }

        dom.detailSlotsContainer.innerHTML = '';
        state.detail.slots.forEach((slot, index) => { const el = document.createElement('div'); el.className = 'slot'; if (index === state.detail.nextSlotIndex) el.classList.add('next'); el.textContent = slot.filled || (index === state.detail.nextSlotIndex ? '❓' : '❓❓'); dom.detailSlotsContainer.appendChild(el); });

        dom.detailBankContainer.innerHTML = '';
        state.detail.syllableBank.forEach(syllable => { const isFilled = state.detail.slots.some(s => s.filled === syllable.text); if (!isFilled) { const btn = document.createElement('button'); btn.className = 'syllable-btn'; btn.textContent = syllable.text; btn.onclick = () => handleSyllableClick(syllable.text, btn); dom.detailBankContainer.appendChild(btn); } });

        dom.detailSpeakBtn.onclick = () => speakDe(word.text);
        dom.detailNextBtn.onclick = () => { const wordsInStufe = WORDS.filter(w => w.stufe === state.currentStufe), currentIndex = wordsInStufe.findIndex(w => w.id === state.currentWord.id), nextIndex = (currentIndex + 1) % wordsInStufe.length; state.currentWord = wordsInStufe[nextIndex]; setupDetailView(); };
    }

    function setupDetailView() { const word = state.currentWord; state.detail={}; state.detail.nextSlotIndex=0; state.detail.slots=[]; state.detail.syllableBank=[]; for(let i=0;i<word.syll.length;i++){const start=word.syll[i],end=(i+1<word.syll.length)?word.syll[i+1]:word.text.length,chunk=word.text.slice(start,end);state.detail.syllableBank.push({text:chunk});state.detail.slots.push({expected:chunk,filled:''})}state.detail.syllableBank.sort(()=>Math.random()-.5);render(); }
    async function handleSyllableClick(syllableText, btnElement) { if(syllableText!==state.detail.slots[state.detail.nextSlotIndex].expected)return;btnElement.disabled=!0;await speakChunk(syllableText);state.detail.slots[state.detail.nextSlotIndex].filled=syllableText;state.detail.nextSlotIndex++;render();if(state.detail.nextSlotIndex===state.detail.slots.length)setTimeout(async()=>{await speakDe(state.currentWord.text);triggerConfetti();setTimeout(()=>{const wordsInStufe=WORDS.filter(w=>w.stufe===state.currentStufe),currentIndex=wordsInStufe.findIndex(w=>w.id===state.currentWord.id),nextIndex=(currentIndex+1)%wordsInStufe.length;state.currentWord=wordsInStufe[nextIndex];setupDetailView()},1200)},250)}
    
    function init() {
        if (wordLab.isInitialized) return;
        
        const scene = document.getElementById('wordlab-scene');
        scene.innerHTML = `
            <div class="wl-header" id="wl-header">
                <button id="wl-back-btn" class="wl-back-btn"></button>
                <h3 id="wl-header-title"></h3>
            </div>

            <div id="wl-stufen-view" class="wl-view active">
                <div id="wl-stufen-container"></div>
            </div>
    
            <div id="wl-cards-view" class="wl-view">
                <div id="wl-cards-container"></div>
            </div>
    
            <div id="wl-detail-view" class="wl-view">
                <div id="wl-card"><img id="wl-image" alt=""></div>
                <div id="wl-syllable-display"></div>
                <div id="wl-slots-container"></div>
                <div id="wl-bank-container"></div>
                <div id="wl-controls">
                    <button id="wl-speak-btn">🔊 Vorlesen</button>
                    <button id="wl-next-btn">Weiter ➡️</button>
                </div>
            </div>`;
        
        dom = {
            header: document.getElementById('wl-header'),
            backBtn: document.getElementById('wl-back-btn'),
            headerTitle: document.getElementById('wl-header-title'),
            stufenView: document.getElementById('wl-stufen-view'),
            stufenContainer: document.getElementById('wl-stufen-container'),
            cardsView: document.getElementById('wl-cards-view'),
            cardsContainer: document.getElementById('wl-cards-container'),
            detailView: document.getElementById('wl-detail-view'),
            detailImage: document.getElementById('wl-image'),
            detailSyllableDisplay: document.getElementById('wl-syllable-display'),
            detailSlotsContainer: document.getElementById('wl-slots-container'),
            detailBankContainer: document.getElementById('wl-bank-container'),
            detailSpeakBtn: document.getElementById('wl-speak-btn'),
            detailNextBtn: document.getElementById('wl-next-btn'),
        };
    
        wordLab.isInitialized = true;
        render();
    }

    return { 
        init, 
        isInitialized: false,
        getWords, // This makes the function public
        triggerConfetti
    };
})();