"use client"; 
import React, { useState } from 'react';
import { speakDe, speakChunk } from '../utils/speech';

interface SoundboardProps {
  onBack: () => void;
}

export const Soundboard: React.FC<SoundboardProps> = ({ onBack }) => {
  const [formula, setFormula] = useState<[string, string]>(['', '']);
  const [isLowercase, setIsLowercase] = useState(false);

  const VOWELS = ['A','E','I','O','U'];
  const CONSONANTS = ['B','D','F','G','H','K','L','M','N','P','R','S','T','W','Z'];

  const handleKeyClick = (keyText: string) => {
    // 1. Calculate new state locally
    let nextFormula: [string, string] = [...formula];
    let slotIndex = -1;

    // Find first empty slot
    if (formula[0] === '') slotIndex = 0;
    else if (formula[1] === '') slotIndex = 1;

    if (slotIndex === -1) {
        // Both full, reset start
        slotIndex = 0;
        nextFormula = [keyText, ''];
    } else {
        nextFormula[slotIndex] = keyText;
    }

    // 2. Update React State immediately
    setFormula(nextFormula);

    // 3. Trigger speech side-effect (fire and forget, don't await)
    speakChunk(keyText);
    
    // If we just filled the second slot, schedule the combo
    if (slotIndex === 1) {
        setTimeout(() => {
             const combo = nextFormula.join('');
             speakDe(combo.toLowerCase(), { rate: 0.8 });
        }, 600);
    }
  };

  const handleSlotClick = (index: 0 | 1) => {
    const newFormula: [string, string] = [...formula];
    newFormula[index] = '';
    setFormula(newFormula);
  };

  const handleClear = () => {
      setFormula(['', '']);
  };

  const playNow = () => {
    const combo = formula.join('');
    if (combo) {
        speakDe(combo.toLowerCase(), { rate: 0.8 }); 
    }
  };

  const toggleCase = () => setIsLowercase(!isLowercase);

  const formatText = (t: string) => isLowercase ? t.toLowerCase() : t;

  return (
    <div className="soundboard-container">
        <div className="sb-header">
            <h3>🎛️ Soundboard</h3>
            <button className="sb-mini-btn" onClick={onBack}>✕</button>
        </div>
        
        {/* Formula Display */}
        <div className="sb-formula-area">
            <div 
                className={`sb-slot ${formula[0] ? 'filled' : 'empty'} ${!formula[0] ? 'active' : ''}`} 
                onClick={() => handleSlotClick(0)}
            >
                {formula[0] ? formatText(formula[0]) : null}
            </div>
            
            <div className="sb-plus">+</div>
            
            <div 
                className={`sb-slot ${formula[1] ? 'filled' : 'empty'} ${formula[0] && !formula[1] ? 'active' : ''}`}
                onClick={() => handleSlotClick(1)}
            >
                {formula[1] ? formatText(formula[1]) : null}
            </div>

            <div className="sb-actions">
                 <button 
                    className={`sb-action-btn play ${!formula[0] && !formula[1] ? 'disabled' : ''}`}
                    onClick={playNow}
                    disabled={!formula[0] && !formula[1]}
                 >
                    🔊
                 </button>
                 <button className="sb-action-btn clear" onClick={handleClear}>🗑️</button>
            </div>
        </div>

        {/* Keyboard Area */}
        <div className="sb-keyboard">
            <div className="sb-controls-row">
                 <span className="sb-label">Vokale</span>
                 <button className="sb-case-toggle" onClick={toggleCase}>
                    {isLowercase ? 'a' : 'A'} / {isLowercase ? 'A' : 'a'}
                 </button>
            </div>

            <div className="sb-vowels-row">
                {VOWELS.map(key => (
                    <button 
                        key={key} 
                        className="sb-key vowel"
                        onClick={() => handleKeyClick(key)}
                    >
                        {formatText(key)}
                    </button>
                ))}
            </div>

            <div className="sb-divider"></div>
            <div className="sb-label">Konsonanten</div>

            <div className="sb-consonants-grid">
                {CONSONANTS.map(key => (
                    <button 
                        key={key} 
                        className="sb-key consonant"
                        onClick={() => handleKeyClick(key)}
                    >
                        {formatText(key)}
                    </button>
                ))}
            </div>
        </div>
    </div>
  );
};