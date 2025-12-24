"use client"; 
import React, { useState, useEffect, useCallback } from 'react';
import { getWords, triggerConfetti, Word } from './Wordlab'; // Reuse data and Type
import { speakDe } from '../utils/speech';

interface QuizProps {
  onBack: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ onBack }) => {
  const [selectedStufe, setSelectedStufe] = useState<number | 'all'>('all');
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [options, setOptions] = useState<Word[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [clickedOptionId, setClickedOptionId] = useState<string | null>(null);

  const steps = 10;
  const WORDS = getWords();

  const getWordPool = useCallback(() => {
    return selectedStufe === 'all' ? WORDS : WORDS.filter(w => w.stufe === selectedStufe);
  }, [selectedStufe, WORDS]);

  const prepareQuestion = useCallback(() => {
    setIsAnswered(false);
    setClickedOptionId(null);

    const pool = getWordPool();
    if (pool.length === 0) return;

    const questionWord = pool[Math.floor(Math.random() * pool.length)];
    const otherWords = WORDS.filter(w => w.id !== questionWord.id).sort(() => Math.random() - 0.5);
    const newOptions = [questionWord, ...otherWords.slice(0, 3)].sort(() => Math.random() - 0.5);

    setCurrentWord(questionWord);
    setOptions(newOptions);
  }, [getWordPool, WORDS]);

  useEffect(() => {
    prepareQuestion();
  }, [prepareQuestion]);

  const handleOptionClick = (selectedWord: Word) => {
    if (isAnswered || !currentWord) return;
    setIsAnswered(true);
    setClickedOptionId(selectedWord.id);

    if (selectedWord.id === currentWord.id) {
      // Correct
      speakDe(selectedWord.text);
      setCorrectAnswers(prev => prev + 1);
      setProgress(prev => Math.min(steps, prev + 1));
      triggerConfetti();

      if (progress + 1 >= steps) {
        speakDe("Super! Du hast die Runde geschafft!");
        setTimeout(() => {
            setCorrectAnswers(0);
            setProgress(0);
            prepareQuestion();
        }, 1500);
      } else {
        setTimeout(prepareQuestion, 1200);
      }
    } else {
      // Incorrect
      setProgress(prev => Math.max(0, prev - 1));
      speakDe("Falsch", { rate: 1.1 });
      setTimeout(() => {
        setIsAnswered(false);
        setClickedOptionId(null);
      }, 1000);
    }
  };

  // Build Stufen Options
  const stufen = [...new Set(WORDS.map(w => w.stufe))].sort((a,b) => a-b);

  if (!currentWord) return <div>Loading...</div>;

  return (
    <>
      <div className="quiz-header">
          <button id="wl-back-btn" onClick={onBack}>‹</button>
          <h3>🧠 Quiz</h3>
          <select 
            id="quiz-stufen-select" 
            className="quiz-stufen-select"
            value={selectedStufe}
            onChange={(e) => {
                setSelectedStufe(e.target.value === 'all' ? 'all' : Number(e.target.value));
                setCorrectAnswers(0);
                setProgress(0);
            }}
          >
            <option value="all">🌐 Alle Stufen</option>
            {stufen.map(s => <option key={s} value={s}>📚 Stufe {s}</option>)}
          </select>
      </div>

      <div className="quiz-container">
          <div className="quiz-question">{currentWord.text}</div>
          <div className="quiz-options-grid">
            {options.map(word => {
                let btnClass = 'quiz-option-btn';
                if (isAnswered) {
                    if (word.id === currentWord.id && clickedOptionId === word.id) {
                         // Correctly clicked
                         btnClass += ' correct';
                    } else if (word.id === clickedOptionId && word.id !== currentWord.id) {
                         // Incorrectly clicked
                         btnClass += ' incorrect';
                    }
                }

                return (
                    <button key={word.id} className={btnClass} onClick={() => handleOptionClick(word)}>
                        <img src={word.img} alt="" />
                    </button>
                );
            })}
          </div>
          
          <div className="quiz-progress-bar">
              <div className="fill" style={{ width: `${(progress / steps) * 100}%` }}></div>
              <span className="emoji mouse" style={{ left: `calc(${(progress / steps) * 100}% - 15px)` }}>🐭</span>
              <span className="emoji cheese">🧀</span>
          </div>
      </div>

      <div className="quiz-footer">
          <div id="quiz-correct-counter" className="quiz-correct-counter">✅ {correctAnswers}</div>
          <button id="quiz-speak-btn" onClick={() => speakDe(currentWord.text)}>🔊 Vorlesen</button>
      </div>
    </>
  );
};