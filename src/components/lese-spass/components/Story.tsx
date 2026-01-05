"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { speakDe } from '../utils/speech';

interface StoryProps {
    onBack: () => void;
}

interface Page {
    img: string;
    text: string;
}

interface Story {
    id: string;
    title: string;
    cover: string;
    pages: Page[];
}

const STORIES: Story[] = [
    {
        id: 'heule-eule',
        title: 'Die Heule Eule',
        cover: '/images/games/heuleeule/story1.webp',
        pages: [
            { img: '/images/games/heuleeule/story1.webp', text: 'Im Garten hört der Igel ein Heulen. Der Igel sagt: „Da ist eine Eule.“ Die Eule sagt: „Ich heule!“' },
            { img: '/images/games/heuleeule/story2.webp', text: 'Der Rabe kommt. Der Rabe sagt: „Willst du spielen?“ Die Eule sagt: „Nein, ich heule.“' },
            { img: '/images/games/heuleeule/story3.webp', text: 'Der Maulwurf kommt aus der Erde. Der Maulwurf macht eine Kette. Der Maulwurf sagt: „Hier ist eine Kette.“ Die Eule sagt: „Nein, ich heule.“' },
            { img: '/images/games/heuleeule/story4.webp', text: 'Oma, Opa, Mama und Papa kommen. Alle spitzen die Ohren. Die kleine Eule fliegt zu Mama.' },
            { img: '/images/games/heuleeule/story5.webp', text: 'Mama sagt: „Warum heulst du?“ Die kleine Eule sagt: „Ich habe es vergessen.“' },
        ]
    }
];

const EXACT_WORDS = new Set(['oma', 'opa', 'mama', 'papa', 'eule', 'igel', 'rabe', 'erde', 'kette', 'ohren', 'baden', 'garten', 'du', 'im', 'da', 'zu', 'ab', 'ei', 'ja', 'nö']);
const VERB_STEMS = new Set(['bad', 'heul']);
const FLEX_SUFFIXES = ['enden', 'endes', 'ender', 'endem', 'ende', 'end', 'test', 'tet', 'ten', 'est', 'st', 'te', 't', 'en', 'et', 'e', 'n'];

function stemTokenForMatch(s: string) {
    s = s.toLowerCase();
    for (const suf of FLEX_SUFFIXES) {
        if (s.length > suf.length + 1 && s.endsWith(suf)) {
            return s.slice(0, -suf.length);
        }
    }
    return s;
}

function isRainbowWord(token: string) {
    const lower = token.toLowerCase().replace(/[.,!?„“]/g, '');
    if (EXACT_WORDS.has(lower)) return true;
    const stem = stemTokenForMatch(lower);
    return VERB_STEMS.has(stem);
}

export const Story: React.FC<StoryProps> = ({ onBack }) => {
    const [view, setView] = useState<'overview' | 'reader'>('overview');
    const [currentStory, setCurrentStory] = useState<Story | null>(null);
    const [pageIndex, setPageIndex] = useState(0);

    const handleStorySelect = (story: Story) => {
        setCurrentStory(story);
        setPageIndex(0);
        setView('reader');
    };

    const handleNext = () => {
        if (!currentStory) return;
        setPageIndex((prev) => (prev + 1) % currentStory.pages.length);
    };

    const handlePrev = () => {
        if (!currentStory) return;
        setPageIndex((prev) => (prev - 1 + currentStory.pages.length) % currentStory.pages.length);
    };

    const renderText = (text: string) => {
        const tokens = text.match(/[\p{L}ÄÖÜäöüß]+|[^\s\p{L}]+/gu) || [];
        const elements: React.ReactNode[] = [];
        let currentLine: React.ReactNode[] = [];
        let lineIndex = 0;

        tokens.forEach((token, idx) => {
            const isWord = /[\p{L}]/u.test(token[0]);

            if (isWord) {
                currentLine.push(
                    <span
                        key={idx}
                        className={`word ${isRainbowWord(token) ? 'rainbow-word' : ''}`}
                        onClick={() => speakDe(token, { rate: 1.0 })}
                    >
                        {token}
                    </span>
                );
            } else {
                currentLine.push(<span key={idx} className="punctuation">{token}</span>);
            }
            currentLine.push(<span key={`sp-${idx}`}> </span>);

            if (/[.!?]/.test(token)) {
                elements.push(<div key={`line-${lineIndex}`} className="story-line">{currentLine}</div>);
                currentLine = [];
                lineIndex++;
            }
        });

        if (currentLine.length > 0) {
            elements.push(<div key={`line-${lineIndex}`} className="story-line">{currentLine}</div>);
        }
        return elements;
    };

    const handleBackToOverview = () => {
        setView('overview');
    };

    return (
        <>
            {view === 'overview' && (
                <div id="ss-overview-view" className="ss-view active">
                    <div className="wl-header">
                        <button id="wl-back-btn" onClick={onBack}>‹</button>
                        <h3>📖 Geschichten</h3>
                    </div>
                    <div id="ss-overview-container">
                        {STORIES.map(story => (
                            <div key={story.id} className="story-card" onClick={() => handleStorySelect(story)}>
                                <div className="relative w-full aspect-video">
                                    <Image src={story.cover} alt={story.title} fill className="object-cover rounded-t-xl" />
                                </div>
                                <div className="story-card-title">{story.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {view === 'reader' && currentStory && (
                <div id="ss-reader-view" className="ss-view active">
                    <h3 id="sr-title">{currentStory.title} — Seite {pageIndex + 1}</h3>

                    <div className="sr-layout">
                        {/* Image Section */}
                        <div id="sr-image-area">
                            <button id="sr-prev-btn" className="sr-nav-btn" onClick={handlePrev}>‹</button>
                            <div className="relative w-full aspect-video">
                                <Image id="sr-image" src={currentStory.pages[pageIndex].img} alt="Story illustration" fill className="object-contain" />
                            </div>
                            <button id="sr-next-btn" className="sr-nav-btn" onClick={handleNext}>›</button>
                        </div>

                        {/* Text Section */}
                        <div id="sr-text-area">
                            <button
                                style={{
                                    background: 'var(--primary)', color: 'white', border: 'none',
                                    padding: '8px 16px', borderRadius: '20px', marginBottom: '16px',
                                    cursor: 'pointer', fontWeight: 'bold'
                                }}
                                onClick={() => speakDe(currentStory.pages[pageIndex].text, { rate: 0.9 })}
                            >
                                🔊 Vorlesen
                            </button>
                            <div id="sr-text-content">
                                {renderText(currentStory.pages[pageIndex].text)}
                            </div>
                            <button
                                style={{
                                    marginTop: '20px', background: 'transparent', border: '1px solid var(--border)',
                                    color: 'var(--text-muted)', padding: '8px 16px', borderRadius: '12px', cursor: 'pointer'
                                }}
                                onClick={handleBackToOverview}
                            >
                                Beenden
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};