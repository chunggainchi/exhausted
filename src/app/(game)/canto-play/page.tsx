"use client"; 

import React, { useState, useEffect } from 'react';
import { ViewState } from '../../../components/canto-play/types';
import { Layout } from '../../../components/canto-play/components/Layout';
import { Home } from '../../../components/canto-play/views/Home';
import { Flashcards } from '../../../components/canto-play/views/Flashcards';
import { Quiz } from '../../../components/canto-play/views/Quiz';
import { Game } from '../../../components/canto-play/views/Game';
import { initAudio } from '../../../components/canto-play/services/audioService';

export default function App() {
  const [currentView, setView] = useState<ViewState>('home');

  useEffect(() => {
    const handleInteraction = () => {
      initAudio();
    };
    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });
  }, []);

  return (
    <Layout currentView={currentView} setView={setView}>
      {currentView === 'home' && <Home setView={setView} />}
      {currentView === 'cards' && <Flashcards />}
      {currentView === 'quiz' && <Quiz />}
      {currentView === 'game' && <Game />}
    </Layout>
  );
}