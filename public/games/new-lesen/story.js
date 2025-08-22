// story.js (FINAL, ARCHITECTURALLY CORRECT VERSION)

const story = (() => {
    // --- Data (from your original game) ---
    const STORIES = [ { id:'heule-eule', title:'Die Heule Eule', cover:'/images/games/heuleeule/story1.webp', pages: [ { img:'/images/games/heuleeule/story1.webp', text:'Im Garten hört der Igel ein Heulen. Der Igel sagt: „Da ist eine Eule.“ Die Eule sagt: „Ich heule!“' }, { img:'/images/games/heuleeule/story2.webp', text:'Der Rabe kommt. Der Rabe sagt: „Willst du spielen?“ Die Eule sagt: „Nein, ich heule.“' }, { img:'/images/games/heuleeule/story3.webp', text:'Der Maulwurf kommt aus der Erde. Der Maulwurf macht eine Kette. Der Maulwurf sagt: „Hier ist eine Kette.“ Die Eule sagt: „Nein, ich heule.“' }, { img:'/images/games/heuleeule/story4.webp', text:'Oma, Opa, Mama und Papa kommen. Alle spitzen die Ohren. Die kleine Eule fliegt zu Mama.' }, { img:'/images/games/heuleeule/story5.webp', text:'Mama sagt: „Warum heulst du?“ Die kleine Eule sagt: „Ich habe es vergessen.“' }, ] } ];
    const RAINBOW_WORDS = new Set(['oma', 'opa', 'mama', 'papa', 'eule', 'igel', 'rabe', 'erde', 'kette', 'ohren', 'baden', 'garten', 'heulen']);

    // --- State Management ---
    let state = {
        currentView: 'overview', // 'overview' or 'reader'
        currentStory: null,
        currentPageIndex: 0,
    };
    let dom = {};

    // --- View Rendering Logic (CORRECTED to use CSS classes) ---
    function render() {
        if (!story.isInitialized) return;
        
        // This is the fix: We ONLY toggle the .active class. No more style.display!
        dom.overviewView.classList.toggle('active', state.currentView === 'overview');
        dom.readerView.classList.toggle('active', state.currentView === 'reader');

        if (state.currentView === 'overview') {
            renderOverview();
        }
        if (state.currentView === 'reader') {
            renderReader();
        }
    }

    function renderOverview() {
        dom.overviewContainer.innerHTML = '';
        STORIES.forEach(storyData => {
            const card = document.createElement('div');
            card.className = 'story-card';
            card.innerHTML = `<img src="${storyData.cover}" alt="${storyData.title}"><div class="story-card-title">${storyData.title}</div>`;
            card.onclick = () => {
                state.currentView = 'reader';
                state.currentStory = storyData;
                state.currentPageIndex = 0;
                render();
            };
            dom.overviewContainer.appendChild(card);
        });
    }

    function renderReader() {
        const page = state.currentStory.pages[state.currentPageIndex];
        
        dom.readerTitle.textContent = `${state.currentStory.title} — Seite ${state.currentPageIndex + 1}/${state.currentStory.pages.length}`;
        dom.readerImage.src = page.img;

        dom.readerTextContainer.innerHTML = '';
        const tokens = page.text.match(/[\wÄÖÜäöüß]+|[^\s\p{L}]+/g) || [];
        tokens.forEach(token => {
            const isWord = /[a-zA-ZäöüÄÖÜß]/.test(token);
            if (isWord) {
                const span = document.createElement('span');
                span.className = 'word';
                span.textContent = token;
                if (RAINBOW_WORDS.has(token.toLowerCase().replace(/[.,!?]/g, ''))) {
                    span.classList.add('rainbow-word');
                }
                span.onclick = () => speakDe(token, { rate: 1.0 });
                dom.readerTextContainer.appendChild(span);
                dom.readerTextContainer.appendChild(document.createTextNode(' '));
            } else {
                dom.readerTextContainer.appendChild(document.createTextNode(token + ' '));
            }
        });
    }

    // --- Public init function (CORRECTED) ---
    function init() {
        if (story.isInitialized) return;
        
        const scene = document.getElementById('story-scene');
        scene.innerHTML = `
            <div id="ss-overview-view" class="ss-view">
                <h3>📖 Geschichte auswählen</h3>
                <div id="ss-overview-container"></div>
            </div>
            <div id="ss-reader-view" class="ss-view">
                <h3 id="sr-title"></h3>
                <div id="sr-card"><img id="sr-image"></div>
                <div id="sr-text-container"></div>
                <div id="sr-controls">
                    <button id="sr-prev-btn" class="sr-nav-btn">⬅️</button>
                    <button id="sr-speak-btn">🔊 Vorlesen</button>
                    <button id="sr-next-btn" class="sr-nav-btn">➡️</button>
                </div>
            </div>
        `;
        
        dom = {
            overviewView: document.getElementById('ss-overview-view'),
            overviewContainer: document.getElementById('ss-overview-container'),
            readerView: document.getElementById('ss-reader-view'),
            readerTitle: document.getElementById('sr-title'),
            readerImage: document.getElementById('sr-image'),
            readerTextContainer: document.getElementById('sr-text-container'),
        };

        document.getElementById('sr-prev-btn').onclick = () => {
            state.currentPageIndex = (state.currentPageIndex - 1 + state.currentStory.pages.length) % state.currentStory.pages.length;
            render();
        };
        document.getElementById('sr-next-btn').onclick = () => {
            state.currentPageIndex = (state.currentPageIndex + 1) % state.currentStory.pages.length;
            render();
        };
        document.getElementById('sr-speak-btn').onclick = () => {
            const page = state.currentStory.pages[state.currentPageIndex];
            speakDe(page.text, { rate: 0.9 });
        };
        
        story.isInitialized = true;
        render(); // Render the initial view
    }

    return { init, isInitialized: false };
})();