"use client"; 
import React, { useState, useEffect } from 'react';
import '../../../components/lese-spass/style.css';
import { initializeSpeech } from '../../../components/lese-spass/utils/speech';
import { Wordlab } from '../../../components/lese-spass/components/Wordlab';
import { Quiz } from '../../../components/lese-spass/components/Quiz';
import { Soundboard } from '../../../components/lese-spass/components/Soundboard';
import { Story } from '../../../components/lese-spass/components/Story';

type View = 'home' | 'wordlab' | 'quiz' | 'soundboard' | 'story';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    initializeSpeech();
  }, []);

  const handleNavClick = (view: View) => {
    setCurrentView(view);
    setIsSidebarOpen(false);
  };

  return (
    <div id="app-container">
      {/* Sidebar Navigation */}
      <nav id="sidebar" className={isSidebarOpen ? 'open' : ''}>
        <img 
            src="/images/logo.svg" 
            id="sidebar-logo" 
            alt="Logo" 
            onClick={() => window.open("https://exhaustedrocket.com/", "_blank")} 
        />
        <button className={`nav-btn ${currentView === 'home' ? 'active' : ''}`} onClick={() => handleNavClick('home')}>🏠 Home</button>
        <button className={`nav-btn ${currentView === 'soundboard' ? 'active' : ''}`} onClick={() => handleNavClick('soundboard')}>🎛️ Soundboard</button>
        <button className={`nav-btn ${currentView === 'wordlab' ? 'active' : ''}`} onClick={() => handleNavClick('wordlab')}>🧪 Word Lab</button>
        <button className={`nav-btn ${currentView === 'quiz' ? 'active' : ''}`} onClick={() => handleNavClick('quiz')}>🧠 Quiz</button>
        <button className={`nav-btn ${currentView === 'story' ? 'active' : ''}`} onClick={() => handleNavClick('story')}>📖 Story</button>
      </nav>

      {/* Main Content */}
      <main id="main-content">
        
        {/* Home Scene */}
        {currentView === 'home' && (
            <div id="home-scene" className="scene">
                <div className="hero-animation">
                    <svg viewBox="0 0 400 300" className="magic-book-svg" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="5" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>
                        
                        {/* Book Back Cover */}
                        <path d="M50,220 L350,220 L330,240 L70,240 Z" fill="#334155" />
                        
                        {/* Left Page */}
                        <path d="M50,220 C50,220 120,230 200,220 L200,100 C120,110 50,100 50,100 Z" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
                        {/* Right Page */}
                        <path d="M200,220 C280,230 350,220 350,220 L350,100 C350,100 280,110 200,100 Z" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
                        {/* Center Spine */}
                        <line x1="200" y1="100" x2="200" y2="220" stroke="#cbd5e1" strokeWidth="2" />

                        {/* Text Lines */}
                        <line x1="70" y1="130" x2="180" y2="130" stroke="#cbd5e1" strokeWidth="4" />
                        <line x1="70" y1="150" x2="180" y2="150" stroke="#cbd5e1" strokeWidth="4" />
                        <line x1="70" y1="170" x2="160" y2="170" stroke="#cbd5e1" strokeWidth="4" />
                        
                        <line x1="220" y1="130" x2="330" y2="130" stroke="#cbd5e1" strokeWidth="4" />
                        <line x1="220" y1="150" x2="330" y2="150" stroke="#cbd5e1" strokeWidth="4" />
                        <line x1="240" y1="170" x2="330" y2="170" stroke="#cbd5e1" strokeWidth="4" />

                        {/* Floating Elements (Animated) */}
                        <g className="float-icon star-1" filter="url(#glow)">
                             <polygon points="100,50 110,80 140,85 115,105 125,135 100,115 75,135 85,105 60,85 90,80" fill="#fbbf24" opacity="0.9"/>
                        </g>
                        
                        <g className="float-icon circle-1" filter="url(#glow)">
                             <circle cx="280" cy="60" r="15" fill="#f472b6" opacity="0.8" />
                        </g>
                        
                        <g className="float-icon rect-1" filter="url(#glow)">
                             <rect x="185" y="40" width="30" height="30" rx="5" fill="#38bdf8" opacity="0.8" transform="rotate(15 200 55)" />
                        </g>

                        <g className="float-icon letter-a">
                             <text x="50" y="80" fill="#f1f5f9" fontSize="30" fontWeight="bold">A</text>
                        </g>
                        <g className="float-icon letter-b">
                             <text x="320" y="90" fill="#f1f5f9" fontSize="30" fontWeight="bold">B</text>
                        </g>

                    </svg>
                </div>
                
                <h1 className="home-title">Lesen macht Spaß ✨</h1>
                
                {/* Mobile Quick Links (Visible only on <850px via CSS) */}
                <div id="home-mobile-nav">
                    <button className="nav-btn" onClick={() => handleNavClick('soundboard')}>🎛️ Soundboard</button>
                    <button className="nav-btn" onClick={() => handleNavClick('wordlab')}>🧪 Word Lab</button>
                    <button className="nav-btn" onClick={() => handleNavClick('quiz')}>🧠 Quiz</button>
                    <button className="nav-btn" onClick={() => handleNavClick('story')}>📖 Story</button>
                </div>
            </div>
        )}

        {/* Scenes */}
        {currentView === 'wordlab' && (
            <div id="wordlab-scene" className="scene">
                <Wordlab onBack={() => handleNavClick('home')} />
            </div>
        )}

        {currentView === 'quiz' && (
            <div id="quiz-scene" className="scene">
                <Quiz onBack={() => handleNavClick('home')} />
            </div>
        )}

        {currentView === 'soundboard' && (
            <div id="soundboard-scene" className="scene">
                <Soundboard onBack={() => handleNavClick('home')} />
            </div>
        )}

        {currentView === 'story' && (
            <div id="story-scene" className="scene">
                <Story onBack={() => handleNavClick('home')} />
            </div>
        )}
      </main>

      {/* Burger Menu Button (Mobile) */}
      <button id="burger-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>☰</button>
      
      {/* Overlay (Mobile) */}
      <div 
        id="overlay" 
        className={isSidebarOpen ? 'active' : ''} 
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Confetti Container */}
      <div id="confetti-container"></div>
    </div>
  );
}