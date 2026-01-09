"use client";

import React, { useState } from 'react';
import { ViewMode, TimeStats, ThemeConfig } from './types';
import { getFormattedDate } from './utils/dateUtils';
import { Share2, Sparkles, Settings, Check, Info } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface StatsHeaderProps {
    stats: TimeStats;
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
    year: number;
    themeConfig: ThemeConfig;
    onLifeSettings?: () => void;
    customSubtext?: string | null;
}

export const StatsHeader: React.FC<StatsHeaderProps> = ({
    stats,
    viewMode,
    onViewModeChange,
    year,
    themeConfig,
    onLifeSettings,
    customSubtext
}) => {
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        const totalBars = 15;
        const filledBars = Math.round((stats.percentage / 100) * totalBars);
        const emptyBars = totalBars - filledBars;
        const bar = '▓'.repeat(filledBars) + '░'.repeat(emptyBars);
        const text = `Current Status:\n${bar} ${stats.percentage.toFixed(2)}%\n${stats.daysLeft} ${stats.label} Remaining.`;

        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const activeTabClass = "bg-white text-black shadow-sm flex-1 md:flex-none text-center";
    const inactiveTabClass = "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 flex-1 md:flex-none text-center";

    // Dynamic Title Logic
    const getTitle = () => {
        switch (viewMode) {
            case ViewMode.Day: return `Days of ${year}`;
            case ViewMode.Week: return `Weeks of ${year}`;
            case ViewMode.Life: return `Life in months (est.)`;
            case ViewMode.Child: return `The magical 12 years`;
            case ViewMode.Parent: return `Remaining time with parents`;
            default: return `Year ${year}`;
        }
    };

    // Logic to show custom subtext (scrubbing) or default date
    const getSubtext = () => {
        if (customSubtext) return customSubtext;
        if (viewMode === ViewMode.Life) return `${stats.daysLeft} months remaining`;
        if (viewMode === ViewMode.Child) return `75% of your time with them is spent by age 12`;
        if (viewMode === ViewMode.Parent) return `Remaining face time with parents`;
        return getFormattedDate();
    };

    const subtext = getSubtext();
    const isScrubbing = !!customSubtext;

    return (
        <div className="w-full mx-auto space-y-4 transition-all duration-500">

            {/* Top Header Row */}
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">

                {/* Row 1: Title (Left) + Utility Buttons (Right) */}
                <div className="flex items-center justify-between w-full">
                    <div className="text-left">
                        <div className="flex items-center gap-2">
                            <h1 className="text-lg sm:text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
                                {getTitle()}
                            </h1>
                            {viewMode === ViewMode.Child && (
                                <Tooltip align="left" content="The most famous statistic from Urban’s analysis is that the vast majority of time spent with parents occurs during childhood. By age 12: Roughly 75% of the total in-person time you will ever spend with your children has already passed.">
                                    <div className="cursor-help bg-zinc-800/50 text-zinc-400 hover:text-white rounded-full p-1 transition-colors">
                                        <Info size={14} />
                                    </div>
                                </Tooltip>
                            )}
                            {viewMode === ViewMode.Parent && (
                                <Tooltip align="left" content="Think about how many times you see your parents per year. Often the total remaining time is less than the total time you spent with them in any single year of your childhood.">
                                    <div className="cursor-help bg-zinc-800/50 text-zinc-400 hover:text-white rounded-full p-1 transition-colors">
                                        <Info size={14} />
                                    </div>
                                </Tooltip>
                            )}
                        </div>
                        <p className={`text-xs sm:text-sm font-medium mt-0.5 transition-colors duration-200 ${isScrubbing ? 'text-white' : 'text-zinc-400'}`}>
                            {subtext}
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <Tooltip content="Share progress snapshot">
                            <button onClick={handleShare} className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all shadow-sm">
                                {copied ? <Check size={18} className="text-green-500" /> : <Share2 size={18} />}
                            </button>
                        </Tooltip>
                    </div>
                </div>

                {/* Row 2: Segmented Control */}
                <div className="w-full md:w-auto">
                    <div className="flex p-1 bg-zinc-900 border border-zinc-800 rounded-lg shadow-inner w-full md:w-auto">
                        <button onClick={() => onViewModeChange(ViewMode.Day)} className={`px-3 py-2 sm:py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${viewMode === ViewMode.Day ? activeTabClass : inactiveTabClass}`}>
                            Days
                        </button>
                        <div className="w-px bg-zinc-800 my-1 mx-1"></div>
                        <button onClick={() => onViewModeChange(ViewMode.Week)} className={`px-3 py-2 sm:py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${viewMode === ViewMode.Week ? activeTabClass : inactiveTabClass}`}>
                            Weeks
                        </button>
                        <div className="w-px bg-zinc-800 my-1 mx-1"></div>
                        <button onClick={() => onViewModeChange(ViewMode.Life)} className={`px-3 py-2 sm:py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${viewMode === ViewMode.Life ? activeTabClass : inactiveTabClass}`}>
                            Life
                        </button>
                        <div className="w-px bg-zinc-800 my-1 mx-1"></div>
                        <button onClick={() => onViewModeChange(ViewMode.Child)} className={`px-3 py-2 sm:py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${viewMode === ViewMode.Child ? activeTabClass : inactiveTabClass}`}>
                            Child
                        </button>
                        <div className="w-px bg-zinc-800 my-1 mx-1"></div>
                        <button onClick={() => onViewModeChange(ViewMode.Parent)} className={`px-3 py-2 sm:py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${viewMode === ViewMode.Parent ? activeTabClass : inactiveTabClass}`}>
                            Parent
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Stats Card */}
            <div
                className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/5 p-5 sm:p-8 backdrop-blur-xl shadow-2xl transition-all hover:border-white/10 group"
            >
                {/* Settings Button */}
                {(viewMode === ViewMode.Life || viewMode === ViewMode.Child || viewMode === ViewMode.Parent) && (
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
                        <button
                            onClick={onLifeSettings}
                            className="p-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors backdrop-blur-md"
                            aria-label={viewMode === ViewMode.Child ? "Configure Children" : (viewMode === ViewMode.Parent ? "Configure Parents" : "Configure Life Settings")}
                        >
                            <Settings size={16} />
                        </button>
                    </div>
                )}

                <div className="flex flex-col md:flex-row justify-between md:items-end mb-4 sm:mb-6 gap-4">
                    <div className="relative z-10 space-y-1">
                        <h2 className="text-zinc-500 font-medium text-[10px] sm:text-xs uppercase tracking-widest">
                            {viewMode === ViewMode.Life ? 'Life Consumed' : (viewMode === ViewMode.Child ? 'The Magical 12 Years' : (viewMode === ViewMode.Parent ? 'Life Consumed' : 'Year Progress'))}
                        </h2>
                        <div className="flex items-baseline">
                            <span
                                className={`text-5xl sm:text-7xl font-bold tracking-tighter leading-none ${themeConfig.name === 'ChildTheme' ? '' : 'text-transparent bg-clip-text bg-gradient-to-br ' + themeConfig.textGradient}`}
                                style={themeConfig.name === 'ChildTheme' ? { color: themeConfig.pulseColor } : {}}
                            >
                                {stats.percentage.toFixed(2)}%
                            </span>
                        </div>
                    </div>

                    <div className="relative z-10 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start w-full md:w-auto mt-2 md:mt-0">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-md">
                            <Sparkles size={14} style={{ color: themeConfig.pulseColor }} />
                            <span className="text-xs font-medium text-zinc-200 whitespace-nowrap">
                                {stats.daysLeft} {stats.label.toLowerCase()}
                            </span>
                        </div>
                        <p className="text-zinc-500 text-[10px] sm:text-xs md:mt-2">
                            {viewMode === ViewMode.Parent
                                ? `${Math.floor(stats.passedUnits / 12)}/${(stats.totalUnits / 12).toFixed(0)} years`
                                : `${stats.passedUnits}/${stats.totalUnits} ${stats.label.split(' ')[0].toLowerCase()}`
                            }
                        </p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                    <div
                        className={`h-full transition-all duration-500 ease-out ${themeConfig.name === 'ChildTheme' ? '' : 'bg-gradient-to-r ' + themeConfig.textGradient}`}
                        style={{
                            width: `${Math.min(100, Math.max(0, stats.percentage))}%`,
                            boxShadow: `0 0 15px ${themeConfig.pulseColor}60`,
                            backgroundColor: themeConfig.name === 'ChildTheme' ? themeConfig.pulseColor : undefined
                        }}
                    />
                </div>
            </div>
        </div>
    );
};