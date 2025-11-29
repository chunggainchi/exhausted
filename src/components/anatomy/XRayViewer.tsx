'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AnatomyObject } from '@/lib/anatomy-data';

interface XRayViewerProps {
    object: AnatomyObject;
    onBack: () => void;
    onInfoTrigger: () => void;
}

export default function XRayViewer({ object, onBack, onInfoTrigger }: XRayViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);

    const playSound = (type: 'hover' | 'click') => {
        // Placeholder for sound effects
        // const audio = new Audio(`/sounds/${type}.mp3`);
        // audio.play().catch(() => {});
        console.log(`Sound: ${type}`); // Use 'type' to avoid unused var error
    };

    const handleMouseMove = useCallback((e: React.MouseEvent | MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setCursorPos({ x, y });
        setIsHovering(true);
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent | TouchEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        setCursorPos({ x, y });
        setIsHovering(true);
    }, []);

    // Keyboard controls for moving the mask
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!containerRef.current) return;
            const step = 20;
            let newX = cursorPos.x;
            let newY = cursorPos.y;

            // Initialize cursor if off-screen
            if (newX < 0) {
                const rect = containerRef.current.getBoundingClientRect();
                newX = rect.width / 2;
                newY = rect.height / 2;
            }

            switch (e.key) {
                case 'ArrowUp':
                    newY -= step;
                    break;
                case 'ArrowDown':
                    newY += step;
                    break;
                case 'ArrowLeft':
                    newX -= step;
                    break;
                case 'ArrowRight':
                    newX += step;
                    break;
                case 'i':
                case 'I':
                    onInfoTrigger();
                    return; // Don't move cursor
                case 'Escape':
                    onBack();
                    return;
                default:
                    return;
            }
            setCursorPos({ x: newX, y: newY });
            setIsHovering(true);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [cursorPos, onInfoTrigger, onBack]);


    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
            {/* Controls Hint */}
            <div className="absolute top-4 left-4 text-white/50 text-xs md:text-sm z-20 pointer-events-none">
                <p>Bewegen: Maus / Touch</p>
                <p className="hidden md:block">Info: &apos;i&apos; Taste</p>
                <p className="hidden md:block">Zurück: &apos;Esc&apos; Taste</p>
            </div>

            <div className="relative w-full h-full max-w-7xl max-h-[85vh] flex items-center justify-center overflow-hidden cursor-none touch-none"
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => { setIsHovering(true); playSound('hover'); }}
                onMouseLeave={() => setIsHovering(false)}
                onTouchMove={handleTouchMove}
                onTouchStart={() => { setIsHovering(true); playSound('hover'); }}
            >
                {/* Outer Image (Base) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={object.outerImage}
                    alt={object.name}
                    className="max-w-full max-h-full object-contain select-none pointer-events-none"
                    draggable={false}
                />

                {/* X-Ray Image (Masked) */}
                <div
                    className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center"
                    style={{
                        maskImage: `radial-gradient(circle 100px at ${cursorPos.x}px ${cursorPos.y}px, black 100%, transparent 100%)`,
                        WebkitMaskImage: `radial-gradient(circle 100px at ${cursorPos.x}px ${cursorPos.y}px, black 100%, transparent 100%)`,
                    }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={object.xrayImage}
                        alt={`${object.name} X-Ray`}
                        className="max-w-full max-h-full object-contain select-none"
                        draggable={false}
                    />
                </div>

                {/* Cursor Ring */}
                {isHovering && (
                    <div
                        className="absolute w-[200px] h-[200px] border-2 border-green-400/50 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(74,222,128,0.5)]"
                        style={{ left: cursorPos.x, top: cursorPos.y }}
                    />
                )}
            </div>

            <div className="absolute bottom-8 flex gap-4 z-30">
                <button onClick={() => { onBack(); playSound('click'); }} className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm">
                    Zurück
                </button>
                <button onClick={() => { onInfoTrigger(); playSound('click'); }} className="px-8 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/50 rounded-full transition-colors backdrop-blur-sm">
                    Info (i)
                </button>
            </div>
        </div>
    );
}
