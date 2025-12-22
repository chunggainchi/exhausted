"use client";
import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_WORDS } from '../constants';

const STORAGE_KEY = 'wortzug_wordlist_v1';

export interface WordListState {
  version: number;
  updatedAt: string;
  words: string[];
}

export const useWordList = () => {
  const [words, setWords] = useState<string[]>(DEFAULT_WORDS);
  const [loaded, setLoaded] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: WordListState = JSON.parse(stored);
        if (parsed.words && Array.isArray(parsed.words) && parsed.words.length > 0) {
          setWords(parsed.words);
        } else {
          // Fallback if stored list is broken/empty
          setWords(DEFAULT_WORDS);
        }
      } else {
        // First run
        setWords(DEFAULT_WORDS);
      }
    } catch (e) {
      console.error("Failed to load word list", e);
      setWords(DEFAULT_WORDS);
    } finally {
      setLoaded(true);
    }
  }, []);

  // Save to local storage whenever words change
  const saveToStorage = useCallback((newWords: string[]) => {
    try {
      const payload: WordListState = {
        version: 1,
        updatedAt: new Date().toISOString(),
        words: newWords
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setWords(newWords);
    } catch (e) {
      console.error("Failed to save word list", e);
    }
  }, []);

  const addWord = (rawWord: string): { success: boolean; error?: string } => {
    const word = rawWord.trim().toUpperCase();

    // Validations
    if (!word) return { success: false, error: "Word cannot be empty" };
    if (word.length > 12) return { success: false, error: "Word is too long (max 12)" };
    if (word.length < 2) return { success: false, error: "Word is too short" };
    
    // Allow A-Z and German Umlauts
    const germanRegex = /^[A-ZÄÖÜ]+$/;
    if (!germanRegex.test(word)) {
      return { success: false, error: "Only letters A-Z, Ä, Ö, Ü allowed" };
    }

    if (words.includes(word)) {
      return { success: false, error: "Word already exists" };
    }

    const newList = [...words, word];
    saveToStorage(newList);
    return { success: true };
  };

  const removeWord = (wordToRemove: string) => {
    const newList = words.filter(w => w !== wordToRemove);
    if (newList.length === 0) {
      // Prevent empty list - revert to default or force keep one?
      // For safety, we revert to default if the user tries to delete the last one, 
      // or we handle it in the UI. 
      // Strategy: Allow delete, but if list is empty, next reload will use default. 
      // Better Strategy: Don't allow deleting the last word via UI, but if it happens:
      saveToStorage(newList); 
    } else {
      saveToStorage(newList);
    }
  };

  const resetToDefault = () => {
    saveToStorage(DEFAULT_WORDS);
  };

  return {
    words,
    loaded,
    addWord,
    removeWord,
    resetToDefault
  };
};