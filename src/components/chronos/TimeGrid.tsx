"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { ViewMode, TimeStats, ThemeConfig } from './types';
import { TimeDot } from './TimeDot';

interface TimeGridProps {
    viewMode: ViewMode;
    stats: TimeStats;
    theme: ThemeConfig;
    birthDate?: Date;
    onScrub?: (percentage: number | null) => void;
}

interface HoverState {
    index: number | null;
    label: string;
    progress: number;
    x: number;
    y: number;
}

interface LegendHoverState {
    eventId: string | null;
}

export const TimeGrid: React.FC<TimeGridProps> = ({ viewMode, stats, theme, birthDate, onScrub }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isScrubbing, setIsScrubbing] = useState(false);
    const [hoverState, setHoverState] = useState<HoverState | null>(null);
    const [legendHover, setLegendHover] = useState<LegendHoverState>({ eventId: null });
    const [soloEventId, setSoloEventId] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    const gap = viewMode === ViewMode.Life ? 3 : 4;

    // Mount check for Portal
    useEffect(() => {
        setMounted(true);
    }, []);

    // Resize Observer
    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setDimensions({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const layout = useMemo(() => {
        if (dimensions.width === 0 || dimensions.height === 0) return { cols: 10, size: 0 };
        const total = stats.totalUnits;
        let bestSize = 0, bestCols = 1;
        const maxColsSearch = Math.min(total, 150);
        const padding = dimensions.width < 640 ? 10 : 20;

        const availableWidth = dimensions.width - padding * 2;
        const availableHeight = dimensions.height - padding * 2;

        for (let cols = 1; cols <= maxColsSearch; cols++) {
            const rows = Math.ceil(total / cols);
            const wAvailable = (availableWidth - (cols - 1) * gap) / cols;
            const hAvailable = (availableHeight - (rows - 1) * gap) / rows;
            const size = Math.min(wAvailable, hAvailable);
            if (size > bestSize) { bestSize = size; bestCols = cols; }
        }
        const finalSize = Math.max(3, bestSize - 0.5);
        return { cols: bestCols, size: finalSize };
    }, [dimensions.width, dimensions.height, stats.totalUnits, gap]);

    const units = useMemo(() => Array.from({ length: stats.totalUnits }, (_, i) => i), [stats.totalUnits]);

    // Scrubbing Logic
    const calculateScrub = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percentage = x / rect.width;
        if (onScrub) onScrub(percentage);
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        e.preventDefault(); // Prevent text selection/scrolling
        setIsScrubbing(true);
        calculateScrub(e.clientX); // Calculate immediately
        if (containerRef.current) containerRef.current.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isScrubbing) return;
        calculateScrub(e.clientX);
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        setIsScrubbing(false);
        if (onScrub) onScrub(null);
        if (containerRef.current) {
            try {
                containerRef.current.releasePointerCapture(e.pointerId);
            } catch {
                // Ignore errors
            }
        }
    };

    // Global Cursor styling when scrubbing
    useEffect(() => {
        if (isScrubbing) {
            document.body.style.cursor = 'grabbing';
        } else {
            document.body.style.cursor = '';
        }
        return () => { document.body.style.cursor = ''; };
    }, [isScrubbing]);

    // Hover Handlers for Dots (Bubbled up)
    const handleDotHover = (index: number, label: string, progress: number, event: React.MouseEvent) => {
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        // Calculate center X and top Y relative to viewport (for fixed positioning in Portal)
        setHoverState({
            index,
            label,
            progress,
            x: rect.left + rect.width / 2,
            y: rect.top
        });
    };

    const handleDotLeave = () => {
        setHoverState(null);
    };

    const containerPadding = dimensions.width < 640 ? '10px' : '20px';

    return (
        <div
            ref={containerRef}
            className={`w-full h-full flex items-center justify-center touch-none select-none relative ${isScrubbing ? 'cursor-grabbing' : 'cursor-default'}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{ touchAction: 'none' }}
        >
            <div
                onClick={() => setSoloEventId(null)}
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${layout.cols}, ${layout.size}px)`,
                    gap: `${gap}px`,
                    width: 'max-content',
                    padding: containerPadding,
                    zIndex: 10
                }}
                className="transition-opacity duration-300 ease-out relative"
                onMouseLeave={handleDotLeave}
            >

                {units.map((index) => {
                    let status: 'passed' | 'current' | 'future' = 'future';
                    if (index < stats.currentUnitIndex) status = 'passed';
                    if (index === stats.currentUnitIndex) status = 'current';

                    let label = "";
                    let eventColor: string | undefined = undefined;
                    let eventLabel: string | undefined = undefined;
                    let isLegendHovered = false;
                    let milestoneLabel: string | undefined = undefined;
                    let milestoneIcon: string | undefined = undefined;

                    if (viewMode === ViewMode.Life) {
                        const years = Math.floor(index / 12);
                        const months = index % 12 + 1;
                        label = `Year ${years}, Month ${months}`;

                        const bDate = birthDate || new Date('2000-01-01');
                        const dotDate = new Date(bDate);
                        dotDate.setMonth(bDate.getMonth() + index);

                        // Event Detection
                        if (stats.events && stats.events.length > 0) {
                            for (const ev of stats.events) {
                                const start = new Date(ev.startDate);
                                start.setDate(1);
                                start.setHours(0, 0, 0, 0);

                                const end = ev.endDate ? new Date(ev.endDate) : new Date();
                                end.setHours(23, 59, 59, 999);

                                if (dotDate >= start && dotDate <= end) {
                                    eventColor = ev.color;
                                    eventLabel = ev.label;
                                    isLegendHovered = legendHover.eventId === ev.id;
                                }
                            }
                        }

                        if (stats.milestones && stats.milestones.length > 0) {
                            for (const m of stats.milestones) {
                                if (m.date.getFullYear() === dotDate.getFullYear() && m.date.getMonth() === dotDate.getMonth()) {
                                    milestoneLabel = m.label;
                                    milestoneIcon = m.icon;
                                    break;
                                }
                            }
                        }

                        if (eventLabel) {
                            label = `${eventLabel} (${label})`;
                        }
                        if (milestoneLabel) {
                            label = `Milestone: ${milestoneLabel} • ${label}`;
                        }
                    } else if (viewMode === ViewMode.Week) {
                        label = `Week ${index + 1}`;
                    } else {
                        label = `Day ${index + 1}`;
                    }

                    const progress = status === 'current' ? stats.currentUnitProgress : (status === 'passed' ? 100 : 0);

                    return (
                        <TimeDot
                            key={index}
                            index={index}
                            total={stats.totalUnits}
                            viewMode={viewMode}
                            status={status}
                            delay={index * 1.5}
                            size={layout.size}
                            progress={progress}
                            theme={theme}
                            eventColor={eventColor}
                            isHighlighted={isLegendHovered || soloEventId === (stats.events?.find(e => e.label === eventLabel)?.id)}
                            isDimmed={soloEventId !== null && soloEventId !== (stats.events?.find(e => e.label === eventLabel)?.id)}
                            milestoneLabel={milestoneLabel}
                            milestoneIcon={milestoneIcon}
                            onMouseEnter={(e) => handleDotHover(index, label, progress, e)}
                        />
                    );
                })}
            </div>

            {/* Floating Tooltip - Rendered via Portal to ensure it is the highest element */}
            {mounted && hoverState && !isScrubbing && layout.size > 8 && createPortal(
                <div
                    className="fixed z-[9999] px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-medium rounded-lg shadow-2xl pointer-events-none whitespace-nowrap animate-fade-in"
                    style={{
                        left: hoverState.x,
                        top: hoverState.y - 4, // Tighter offset
                        transform: 'translate(-50%, -100%)'
                    }}
                >
                    <div className="flex flex-col items-center">
                        <span>{hoverState.label}</span>
                        {hoverState.progress > 0 && hoverState.progress < 100 && (
                            <span className="text-[10px] text-zinc-500 font-normal">
                                {Math.round(hoverState.progress)}% complete
                            </span>
                        )}
                    </div>
                    {/* Arrow */}
                    <div className="absolute left-1/2 bottom-[-4px] -translate-x-1/2 w-2 h-2 bg-zinc-900 border-b border-r border-zinc-800 rotate-45" />
                </div>,
                document.body
            )}

            {/* Scrubbing Overlay */}
            {isScrubbing && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                    <div className="text-3xl sm:text-4xl font-black text-white/20 backdrop-blur-md bg-zinc-900/50 px-6 py-3 sm:px-8 sm:py-4 rounded-3xl border border-white/5">
                        PREVIEW
                    </div>
                </div>
            )}

            {/* Event Legend */}
            {viewMode === ViewMode.Life && stats.events && stats.events.length > 0 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 flex flex-wrap justify-center gap-x-6 gap-y-2 pointer-events-auto">
                    {stats.events.map((ev) => (
                        <div
                            key={ev.id}
                            className="flex items-center gap-2 group cursor-pointer transition-all duration-300"
                            onMouseEnter={() => setLegendHover({ eventId: ev.id })}
                            onMouseLeave={() => setLegendHover({ eventId: null })}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSoloEventId(soloEventId === ev.id ? null : ev.id);
                            }}
                            style={{
                                opacity: (legendHover.eventId && legendHover.eventId !== ev.id) || (soloEventId && soloEventId !== ev.id) ? 0.4 : 1,
                                transform: legendHover.eventId === ev.id || soloEventId === ev.id ? 'translateY(-2px)' : 'none'
                            }}
                        >
                            <div
                                className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-125"
                                style={{ backgroundColor: ev.color }}
                            />
                            <span className="text-[11px] font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
                                {ev.label}
                                <span className="ml-1.5 opacity-40 font-normal">
                                    {((((ev.endDate ? ev.endDate.getTime() : new Date().getTime()) - ev.startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)) / stats.lifeExpectancy * 100).toFixed(1)}%
                                </span>
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};