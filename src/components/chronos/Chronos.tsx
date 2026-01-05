"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { ViewMode, TimeStats, ThemeConfig, LifeEvent, LifeMilestone } from './types';
import { calculateStats } from './utils/dateUtils';
import { StatsHeader } from './StatsHeader';
import { TimeGrid } from './TimeGrid';
import { QuoteFooter } from './QuoteFooter';
import { SettingsModal } from './SettingsModal';

// --- SINGLE THEME DEFINITION (Inferno/Orange) ---
const THEME: ThemeConfig = {
    name: 'Inferno',
    textGradient: 'from-orange-400 to-red-500',
    hue: 25, // Pure Orange
    saturation: 100,
    pulseColor: '#FB923C' // Orange-400
};

export const Chronos: React.FC = () => {
    // State
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Day);
    const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
    const [lifeExpectancy, setLifeExpectancy] = useState<number>(80);
    const [stats, setStats] = useState<TimeStats>(calculateStats(ViewMode.Day));
    const [scrubPercentage, setScrubPercentage] = useState<number | null>(null);
    const [isZenMode, setIsZenMode] = useState(false);
    const [lifeEvents, setLifeEvents] = useState<LifeEvent[]>([]);
    const [lifeMilestones, setLifeMilestones] = useState<LifeMilestone[]>([]);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Initialize
    useEffect(() => {
        const savedBirth = localStorage.getItem('tempo_birthDate');
        const savedExpectancy = localStorage.getItem('tempo_lifeExpectancy');
        const savedView = localStorage.getItem('tempo_viewMode');

        if (savedBirth) {
            const d = new Date(savedBirth);
            if (!isNaN(d.getTime())) setBirthDate(d);
        }
        if (savedExpectancy) {
            const e = parseInt(savedExpectancy, 10);
            if (!isNaN(e)) setLifeExpectancy(e);
        }
        if (savedView) setViewMode(savedView as ViewMode);

        const savedEvents = localStorage.getItem('tempo_lifeEvents');
        if (savedEvents) {
            try {
                const parsed = JSON.parse(savedEvents);
                const decoded = parsed.map((ev: { startDate: string; endDate?: string; id: string; label: string; color: string }) => ({
                    ...ev,
                    startDate: new Date(ev.startDate),
                    endDate: ev.endDate ? new Date(ev.endDate) : undefined
                }));
                setLifeEvents(decoded);
            } catch (e) {
                console.error('Failed to parse life events', e);
            }
        }

        const savedMilestones = localStorage.getItem('tempo_lifeMilestones');
        if (savedMilestones) {
            try {
                const parsed = JSON.parse(savedMilestones);
                const decoded = parsed.map((m: { date: string; id: string; label: string; icon?: string }) => ({
                    ...m,
                    date: new Date(m.date)
                }));
                setLifeMilestones(decoded);
            } catch (e) {
                console.error('Failed to parse life milestones', e);
            }
        }

        setMounted(true);
    }, []);

    // Save State
    useEffect(() => {
        if (!mounted) return;
        localStorage.setItem('tempo_viewMode', viewMode);
    }, [viewMode, mounted]);

    // Unified Stats Management (Timer + Scrubbing)
    useEffect(() => {
        const updateStats = () => {
            const realStats = calculateStats(viewMode, birthDate, lifeExpectancy, lifeEvents, lifeMilestones);

            if (scrubPercentage !== null) {
                const total = realStats.totalUnits;
                const fakePassed = Math.floor(scrubPercentage * total);
                setStats({
                    ...realStats,
                    passedUnits: fakePassed,
                    currentUnitIndex: fakePassed,
                    percentage: scrubPercentage * 100,
                    daysLeft: total - fakePassed,
                    currentUnitProgress: 50,
                });
            } else {
                setStats(realStats);
            }
        };

        updateStats();

        // Timer only runs when NOT scrubbing to save cycles and prevent jumpiness
        if (scrubPercentage === null) {
            const interval = setInterval(updateStats, 1000);
            return () => clearInterval(interval);
        }
    }, [viewMode, birthDate, lifeExpectancy, scrubPercentage, lifeEvents, lifeMilestones]);

    // Dynamic Label Calculation for Scrubbing
    const scrubLabel = useMemo(() => {
        if (scrubPercentage === null) return null;

        if (viewMode === ViewMode.Life) {
            const totalMonths = lifeExpectancy * 12;
            const targetMonthIndex = Math.floor(scrubPercentage * totalMonths);

            const bDate = birthDate || new Date('2000-01-01');
            const targetDate = new Date(bDate);
            targetDate.setMonth(bDate.getMonth() + targetMonthIndex);

            const age = (targetMonthIndex / 12).toFixed(1);
            const monthName = targetDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            return `Age ${age} • ${monthName}`;
        }

        // For both Day and Week views, we are in the context of a Year.
        // We map the percentage (0-1) to the specific day of the year.
        const year = new Date().getFullYear();
        const isLeap = ((year % 4 === 0 && year % 100 > 0) || year % 400 === 0);
        const totalDays = isLeap ? 366 : 365;

        const dayIndex = Math.min(Math.floor(scrubPercentage * totalDays), totalDays - 1);
        const targetDate = new Date(year, 0, 1 + dayIndex);

        return targetDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

    }, [scrubPercentage, viewMode, birthDate, lifeExpectancy]);


    const handleSaveSettings = (date: Date, expectancy: number, events: LifeEvent[], milestones: LifeMilestone[]) => {
        setBirthDate(date);
        setLifeExpectancy(expectancy);
        setLifeEvents(events);
        setLifeMilestones(milestones);
        localStorage.setItem('tempo_birthDate', date.toISOString());
        localStorage.setItem('tempo_lifeExpectancy', expectancy.toString());
        localStorage.setItem('tempo_lifeEvents', JSON.stringify(events));
        localStorage.setItem('tempo_lifeMilestones', JSON.stringify(milestones));
    };

    const handleViewModeChange = (mode: ViewMode) => {
        if (mode === ViewMode.Life) {
            const savedBirth = localStorage.getItem('tempo_birthDate');
            const hasValidSavedDate = savedBirth && !isNaN(new Date(savedBirth).getTime());
            const hasValidStateDate = birthDate && !isNaN(birthDate.getTime());

            if (!hasValidStateDate && !hasValidSavedDate) {
                setIsSettingsOpen(true);
            }
        }
        setViewMode(mode);
    };

    if (!mounted) return null;

    return (
        <div
            className="h-[100dvh] w-full bg-[#050505] text-zinc-100 selection:bg-white/20 overflow-hidden flex flex-col touch-manipulation font-sans"
            onDoubleClick={() => setIsZenMode(p => !p)}
        >
            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                onSave={handleSaveSettings}
                initialDate={birthDate}
                initialExpectancy={lifeExpectancy}
                initialEvents={lifeEvents}
                initialMilestones={lifeMilestones}
            />

            {/* Subtle Static Background Gradient */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[50vh] bg-gradient-to-b from-orange-500/[0.05] to-transparent opacity-50 blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-col h-full w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className={`flex-none pt-4 sm:pt-6 pb-2 transition-all duration-500 ${isZenMode ? '-translate-y-full opacity-0 pointer-events-none absolute' : 'translate-y-0 opacity-100'}`}>
                    <StatsHeader
                        stats={stats}
                        viewMode={viewMode}
                        onViewModeChange={handleViewModeChange}
                        year={new Date().getFullYear()}
                        themeConfig={THEME}
                        onLifeSettings={() => setIsSettingsOpen(true)}
                        customSubtext={scrubLabel}
                    />
                </header>

                <main className={`flex-1 min-h-0 w-full relative flex items-center justify-center py-2 sm:py-4 transition-all duration-700 ${isZenMode ? 'scale-105' : 'scale-100'}`}>
                    <TimeGrid
                        viewMode={viewMode}
                        stats={stats}
                        theme={THEME}
                        birthDate={birthDate}
                        onScrub={isZenMode ? undefined : setScrubPercentage}
                    />
                </main>

                <footer className={`flex-none pb-6 transition-all duration-500 ${isZenMode ? 'translate-y-full opacity-0 pointer-events-none absolute' : 'translate-y-0 opacity-100'}`}>
                    <QuoteFooter />
                </footer>
            </div>

            {isZenMode && (
                <div className="fixed bottom-8 left-0 w-full text-center pointer-events-none animate-pulse text-zinc-600 text-[10px] tracking-widest uppercase">
                    Double tap to exit Zen
                </div>
            )}
        </div>
    );
};

export default Chronos;