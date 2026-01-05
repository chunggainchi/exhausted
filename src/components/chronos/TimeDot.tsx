"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, GraduationCap, Briefcase, Baby, Home, Plane, Trophy } from 'lucide-react';
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
    eventColor?: string;
    isHighlighted?: boolean;
    isDimmed?: boolean;
    milestoneLabel?: string;
    milestoneIcon?: string;
    onMouseEnter?: (event: React.MouseEvent) => void;
}

const TimeDotComponent: React.FC<TimeDotProps> = ({ status, index, total, viewMode, delay = 0, size, progress = 0, theme, eventColor, isHighlighted, isDimmed, milestoneLabel, milestoneIcon, onMouseEnter }) => {

    const hue = theme.hue;
    const saturation = theme.saturation;

    const MILESTONE_ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
        'star': Star,
        'heart': Heart,
        'graduation': GraduationCap,
        'work': Briefcase,
        'baby': Baby,
        'home': Home,
        'travel': Plane,
        'trophy': Trophy,
    };

    const MilestoneIcon = milestoneIcon ? (MILESTONE_ICON_MAP[milestoneIcon] || Star) : Star;

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
                        backgroundColor: eventColor || theme.pulseColor,
                        filter: 'blur(4px)',
                    }}
                />

                {/* Main Dot Container */}
                <div
                    className="relative w-full h-full rounded-full overflow-hidden ring-1 ring-offset-1 ring-offset-black bg-zinc-800/80 transition-transform duration-300"
                    style={{
                        borderColor: eventColor || currentGlow,
                        transform: 'scale(1.25)',
                        boxShadow: `0 0 10px ${eventColor || theme.pulseColor}`
                    }}
                >
                    {/* Liquid Fill */}
                    <div
                        className="absolute bottom-0 left-0 w-full transition-all duration-[1000ms] ease-linear"
                        style={{
                            height: `${progress}%`,
                            backgroundColor: eventColor || currentGlow,
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
            if (eventColor) {
                dynamicStyle = { backgroundColor: eventColor, opacity: 0.9 };
                statusClasses = "scale-100 hover:opacity-100 shadow-[0_0_8px_rgba(0,0,0,0.5)]";
            } else {
                let lightness = 50;
                let opacity = 1.0;
                const ratio = index / total;

                if (viewMode === ViewMode.Life) {
                    lightness = 60 - (ratio * 30);
                    opacity = 1.0 - (ratio * 0.6);
                } else {
                    const sine = Math.sin(ratio * Math.PI);
                    lightness = 30 + (sine * 30);
                    opacity = 0.5 + (sine * 0.5);
                }

                const color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
                statusClasses = "scale-100 hover:opacity-100";
                dynamicStyle = { backgroundColor: color };
            }
            break;

        case 'future':
            if (eventColor) {
                // Dimmed event color for future
                dynamicStyle = {
                    backgroundColor: eventColor,
                    opacity: 0.15,
                    border: `1px solid ${eventColor}33`
                };
                statusClasses = "hover:opacity-100 hover:scale-110 transition-all duration-300";
            } else {
                statusClasses = "bg-zinc-800/40 hover:bg-zinc-700 hover:scale-110 transition-colors duration-300";
            }
            break;
    }

    return (
        <div
            className={`relative rounded-full transition-transform duration-700 ease-out ${statusClasses}`}
            style={{
                animationDelay: total < 400 ? `${delay}ms` : '0ms',
                width: `${size}px`,
                height: `${size}px`,
                ...dynamicStyle,
                ...(isHighlighted ? { transform: 'scale(1.5)', zIndex: 30, opacity: 1, boxShadow: `0 0 12px ${eventColor}` } : {}),
                ...(isDimmed ? { opacity: 0.1, filter: 'grayscale(100%)' } : {})
            }}
            onMouseEnter={onMouseEnter}
        >
            {milestoneLabel && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <MilestoneIcon size={size * 0.7} className="text-white fill-white animate-pulse" />
                </div>
            )}
        </div>
    );
};

export const TimeDot = React.memo(TimeDotComponent);
TimeDot.displayName = 'TimeDot';