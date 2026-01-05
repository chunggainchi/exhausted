"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ThemeConfig, ViewMode } from './types';

interface TimeDotProps {
    status: 'passed' | 'current' | 'future';
    index: number;
    total: number;
    viewMode: ViewMode;
    delay?: number;
    size: number;
    progress?: number;
    theme: ThemeConfig;
    onMouseEnter?: (event: React.MouseEvent) => void;
}

const TimeDotComponent: React.FC<TimeDotProps> = ({ status, index, total, viewMode, delay = 0, size, progress = 0, theme, onMouseEnter }) => {

    const hue = theme.hue;
    const saturation = theme.saturation;

    // Current Dot Style
    const currentGlow = `hsla(${hue}, ${saturation}%, 60%, 1)`;

    if (status === 'current') {
        return (
            <div
                className="relative group flex items-center justify-center z-20 will-change-transform"
                style={{ width: `${size}px`, height: `${size}px` }}
                onMouseEnter={onMouseEnter}
            >
                {/* Pulsing Aura - FAST PULSE (1.5s) */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                        scale: [1.1, 1.8, 1.1],
                        opacity: [0.2, 0.9, 0.2],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        backgroundColor: theme.pulseColor,
                        filter: 'blur(4px)',
                    }}
                />

                {/* Main Dot Container */}
                <div
                    className="relative w-full h-full rounded-full overflow-hidden ring-1 ring-offset-1 ring-offset-black bg-zinc-800/80 transition-transform duration-300"
                    style={{
                        borderColor: currentGlow,
                        transform: 'scale(1.25)',
                        boxShadow: `0 0 10px ${theme.pulseColor}`
                    }}
                >
                    {/* Liquid Fill */}
                    <div
                        className="absolute bottom-0 left-0 w-full transition-all duration-[1000ms] ease-linear"
                        style={{
                            height: `${progress}%`,
                            backgroundColor: currentGlow,
                        }}
                    />
                    {/* Gloss */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/30 pointer-events-none" />
                </div>
            </div>
        );
    }

    let statusClasses = "";
    let dynamicStyle: React.CSSProperties = {};

    switch (status) {
        case 'passed':
            // Gradient Logic based on View Mode

            let lightness = 50;
            let opacity = 1.0;
            const ratio = index / total;

            if (viewMode === ViewMode.Life) {
                // Life Mode: Vibrant Start -> Dim End
                // Age 0: High Lightness/Opacity
                // Age 80: Low Lightness/Opacity (but visible)

                // Lightness: 60% -> 30%
                lightness = 60 - (ratio * 30);
                // Opacity: 1.0 -> 0.4
                opacity = 1.0 - (ratio * 0.6);
            } else {
                // Day/Week Mode: Dim Start -> Vibrant Middle -> Dim End
                // Bell Curve (Sine Wave)
                // Start/End: 30% Lightness
                // Peak: 60% Lightness

                const sine = Math.sin(ratio * Math.PI); // 0 -> 1 -> 0

                lightness = 30 + (sine * 30); // 30% -> 60% -> 30%
                opacity = 0.5 + (sine * 0.5); // 0.5 -> 1.0 -> 0.5
            }

            const color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;

            statusClasses = "scale-100 hover:opacity-100";
            dynamicStyle = { backgroundColor: color };
            break;

        case 'future':
            statusClasses = "bg-zinc-800/40 hover:bg-zinc-700 hover:scale-110 transition-colors duration-300";
            break;
    }

    return (
        <div
            className={`relative rounded-full transition-transform duration-700 ease-out ${statusClasses}`}
            style={{
                animationDelay: total < 400 ? `${delay}ms` : '0ms',
                width: `${size}px`,
                height: `${size}px`,
                ...dynamicStyle
            }}
            onMouseEnter={onMouseEnter}
        />
    );
};

export const TimeDot = React.memo(TimeDotComponent);
TimeDot.displayName = 'TimeDot';