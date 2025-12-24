"use client"; 
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { speakDe, speakChunk } from '../utils/speech';

// --- Data ---
export interface Word {
    id: string;
    text: string;
    syll: number[];
    img: string;
    stufe: number;
}

const WORDS: Word[] = [ { id:'du',  text:'du',  syll:[0,1], img:'https://images.unsplash.com/photo-1532348904171-919f8b2b7e62?q=80&w=1740&auto-format&fit=crop', stufe: 1 }, { id:'im',  text:'im',  syll:[0,1], img:'https://www.shutterstock.com/image-vector/boy-playing-hide-seek-box-600nw-762258736.jpg', stufe: 1 }, { id:'da',  text:'da',  syll:[0,1], img:'https://plus.unsplash.com/premium_photo-1729860559950-da4570b34e21?q=80&w=774&auto-format&fit=crop', stufe: 1 }, { id:'zu',  text:'zu',  syll:[0,1], img:'https://www.shutterstock.com/image-illustration/elegantly-designed-home-entry-featuring-600nw-2434581389.jpg', stufe: 1 }, { id:'ab',  text:'ab',  syll:[0,1], img:'https://bestlifeonline.com/wp-content/uploads/sites/3/2023/05/woman-taking-off-shoes-places-where-take-off.jpg', stufe: 1 }, { id:'ei',  text:'Ei',  syll:[0,1], img:'https://images.unsplash.com/photo-1607690424560-35d967d6ad7c?q=80&w=774&auto-format&fit=crop', stufe: 1 }, { id:'ja',  text:'ja',  syll:[0,1], img:'https://images.unsplash.com/photo-1693168058020-fd7445ff87df?q=80&w=687&auto-format&fit=crop', stufe: 1 }, { id:'nö',  text:'nö',  syll:[0,1], img:'https://images.unsplash.com/photo-1693168058063-f8e3474ce214?q=80&w=774&auto-format&fit=crop', stufe: 1 }, { id:'oma',   text:'Oma',   syll:[0,1], img:'https://images.unsplash.com/photo-1577048982771-1960014bde8b?q=80&w=776&auto-format&fit=crop', stufe: 2 }, { id:'opa',   text:'Opa',   syll:[0,1], img:'https://images.unsplash.com/photo-1586498024141-1940debde48d?q=80&w=774&auto-format&fit=crop', stufe: 2 }, { id:'mama',  text:'Mama',  syll:[0,2], img:'https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=778&auto-format&fit=crop', stufe: 2 }, { id:'papa',  text:'Papa',  syll:[0,2], img:'https://images.unsplash.com/photo-1593323925814-253c803de3a5?q=80&w=770&auto-format&fit=crop', stufe: 2 }, { id:'eule',  text:'Eule',  syll:[0,2], img:'https://images.unsplash.com/photo-1553264701-d138db4fd5d4?q=80&w=1740&auto-format&fit=crop', stufe: 2 }, { id:'igel',  text:'Igel',  syll:[0,1], img:'https://images.unsplash.com/photo-1512742282398-91d6f0580591?q=80&w=1548&auto-format&fit=crop', stufe: 2 }, { id:'rabe',  text:'Rabe',  syll:[0,2], img:'https://images.unsplash.com/photo-1433888376991-1297486ba3f5?q=80&w=1740&auto-format&fit=crop', stufe: 2 }, { id:'erde',  text:'Erde',  syll:[0,2], img:'https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=774&auto-format&fit=crop', stufe: 2 }, { id:'kette', text:'Kette', syll:[0,3], img:'https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=774&auto-format&fit=crop', stufe: 2 }, { id:'ohren', text:'Ohren', syll:[0,2], img:'https://images.unsplash.com/photo-1516726283839-a493d9f167aa?q=80&w=1740&auto-format&fit=crop', stufe: 2 }, { id:'baden', text:'Baden', syll:[0,2], img:'https://images.unsplash.com/photo-1616641179518-fddb553e18df?q=80&w=760&auto-format&fit=crop', stufe: 2 }, { id:'garten',text:'Garten',syll:[0,3], img:'https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=1548&auto-format&fit=crop', stufe: 2 }, ];

export const getWords = () => WORDS;

export const triggerConfetti = () => {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 90%, 65%)`;
        confetti.style.animationDelay = (Math.random() * 0.3) + 's';
        container.appendChild(confetti);
        setTimeout(() => confetti.remove(), 2500);
    }
};

interface WordlabProps {
  onBack: () => void;
}

// Internal State Interface
interface GameState {
    slots: { expected: string; filled: string | null }[]; 
    syllableBank: { text: string; id: number; used: boolean }[];
    activeIndex: number; 
}

export const Wordlab: React.FC<WordlabProps> = ({ onBack }) => {
  const [view, setView] = useState<'stufen' | 'cards' | 'detail'>('stufen');
  const [currentStufe, setCurrentStufe] = useState(1);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  
  // Visual state
  const [gameState, setGameState] = useState<GameState>({
      slots: [],
      syllableBank: [],
      activeIndex: 0,
  });

  // Use a REF for locking to avoid race conditions with async state updates
  const lockRef = useRef(false);

  const stufenMap = new Map();
  WORDS.forEach(w => stufenMap.set(w.stufe, (stufenMap.get(w.stufe) || 0) + 1));

  // --- INITIALIZATION ---
  useEffect(() => {
    if (currentWord) {
      const slots: GameState['slots'] = [];
      const bankItems: GameState['syllableBank'] = [];

      for (let i = 0; i < currentWord.syll.length; i++) {
        const start = currentWord.syll[i];
        const end = (i + 1 < currentWord.syll.length) ? currentWord.syll[i + 1] : currentWord.text.length;
        const chunk = currentWord.text.slice(start, end);
        
        slots.push({ expected: chunk, filled: null });
        bankItems.push({ text: chunk, id: Math.random(), used: false });
      }

      // Shuffle buttons
      bankItems.sort(() => Math.random() - 0.5);

      setGameState({
          slots,
          syllableBank: bankItems,
          activeIndex: 0,
      });
      lockRef.current = false;
    }
  }, [currentWord]);

  // --- NAVIGATION LOGIC ---
  const loadNextWord = useCallback(() => {
    if (!currentWord) return;
    const wordsInStufe = WORDS.filter(w => w.stufe === currentStufe);
    const currentIndex = wordsInStufe.findIndex(w => w.id === currentWord.id);
    const nextIndex = (currentIndex + 1) % wordsInStufe.length;
    setCurrentWord(wordsInStufe[nextIndex]);
  }, [currentWord, currentStufe]);

  // --- INTERACTION LOGIC ---
  const handleSyllableClick = async (syllableText: string, buttonId: number) => {
      // 1. Synchronous Lock Check (prevents rapid-fire clicks)
      if (lockRef.current) return;

      // 2. Bounds check
      if (gameState.activeIndex >= gameState.slots.length) return;

      // 3. Logic Check
      const targetSyllable = gameState.slots[gameState.activeIndex].expected;
      
      if (syllableText === targetSyllable) {
          // --- CORRECT MOVE ---
          
          // Determine if this is the winning move BEFORE updating state
          const isWinningMove = gameState.activeIndex + 1 === gameState.slots.length;

          if (isWinningMove) {
              lockRef.current = true; // Lock immediately
          }

          // Fire and forget sound
          speakChunk(syllableText).catch(() => {});

          // Update UI
          setGameState(prev => {
              const newSlots = [...prev.slots];
              newSlots[prev.activeIndex].filled = syllableText;
              const newBank = prev.syllableBank.map(b => 
                  b.id === buttonId ? { ...b, used: true } : b
              );
              return {
                  ...prev,
                  slots: newSlots,
                  syllableBank: newBank,
                  activeIndex: prev.activeIndex + 1,
              };
          });

          // Trigger Success Sequence if won
          if (isWinningMove) {
              await runSuccessSequence();
          }

      } else {
          // --- INCORRECT MOVE ---
          // Just ignore or maybe shake (implemented via CSS later if needed)
      }
  };

  const runSuccessSequence = async () => {
      // 1. Visual pause to see the filled word
      await new Promise(r => setTimeout(r, 600));

      // 2. Speak full word (with timeout safety)
      if (currentWord) {
         const speakPromise = speakDe(currentWord.text);
         const timeoutPromise = new Promise(r => setTimeout(r, 2000)); // Max 2s for speech
         await Promise.race([speakPromise, timeoutPromise]);
      }

      // 3. Confetti
      triggerConfetti();

      // 4. Celebration pause
      await new Promise(r => setTimeout(r, 1500));

      // 5. Next
      loadNextWord();
      // Note: lockRef is reset in the useEffect when currentWord changes
  };

  // --- RENDERING ---

  let title = `🧪 Word Lab`;
  if (view === 'cards' || view === 'detail') title += ` - Stufe ${currentStufe}`;
  
  const handleBack = () => {
    if (view === 'detail') setView('cards');
    else if (view === 'cards') setView('stufen');
    else onBack(); 
  };

  return (
    <>
      <div className={`wl-header ${view}-header`} id="wl-header">
         {(view !== 'stufen') && (
            <button id="wl-back-btn" onClick={handleBack}>‹</button>
         )}
         <h3 id="wl-header-title">{title}</h3>
      </div>

      {view === 'stufen' && (
        <div id="wl-stufen-view" className="wl-view">
          <div id="wl-stufen-container">
            {Array.from(stufenMap.entries()).map(([num, count]) => (
              <button key={num} className="stufe-btn" onClick={() => handleStufeSelect(num)}>
                <div className="stufe-title">📚 Stufe {num}</div>
                <div className="stufe-count">{count} Wörter</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {view === 'cards' && (
        <div id="wl-cards-view" className="wl-view">
          <div id="wl-cards-container">
            {WORDS.filter(w => w.stufe === currentStufe).map(word => (
              <div key={word.id} className="word-card" onClick={() => handleWordSelect(word)}>
                <img src={word.img} alt={word.text} />
                <div className="word-card-text">{word.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'detail' && currentWord && (
        <div id="wl-detail-view" className="wl-view detail-mode">
          <div id="wl-card"><img id="wl-image" src={currentWord.img} alt={currentWord.text} /></div>
          
          <div id="wl-syllable-display">
            {(() => {
                const chunks = [];
                for (let i = 0; i < currentWord.syll.length; i++) {
                    const start = currentWord.syll[i];
                    const end = (i + 1 < currentWord.syll.length) ? currentWord.syll[i + 1] : currentWord.text.length;
                    chunks.push(<span key={i}>{currentWord.text.slice(start, end)}</span>);
                }
                return chunks;
            })()}
          </div>

          <div id="wl-slots-container">
            {gameState.slots.map((slot, idx) => {
                const isActive = !lockRef.current && idx === gameState.activeIndex;
                return (
                    <div key={idx} className={`slot ${isActive ? 'next' : ''}`}>
                        {slot.filled || (isActive ? '❓' : '❓❓')}
                    </div>
                );
            })}
          </div>

          <div id="wl-bank-container">
            {gameState.syllableBank.map((s) => {
                 if (s.used) return null;
                 return (
                    <button key={s.id} className="syllable-btn" onClick={() => handleSyllableClick(s.text, s.id)}>
                        {s.text}
                    </button>
                 );
            })}
          </div>

          <div id="wl-controls">
            <button id="wl-speak-btn" onClick={() => speakDe(currentWord.text)}>🔊 Hören</button>
            <button id="wl-next-btn" onClick={loadNextWord}> ⮕ </button>
          </div>
        </div>
      )}
    </>
  );

  function handleStufeSelect(stufe: number) {
    setCurrentStufe(stufe);
    setView('cards');
  }

  function handleWordSelect(word: Word) {
    setCurrentWord(word);
    setView('detail');
  }
};