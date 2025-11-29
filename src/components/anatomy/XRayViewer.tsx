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
    const [isMobilePortrait, setIsMobilePortrait] = useState(false);

    useEffect(() => {
        const checkOrientation = () => {
            setIsMobilePortrait(window.matchMedia("(orientation: portrait) and (max-width: 768px)").matches);
        };
        checkOrientation();
        window.addEventListener('resize', checkOrientation);
        return () => window.removeEventListener('resize', checkOrientation);
    }, []);

    const playSound = (type: 'hover' | 'click') => {
        // Placeholder for sound effects
        // const audio = new Audio(`/sounds/${type}.mp3`);
        // audio.play().catch(() => {});
        console.log(`Sound: ${type}`); // Use 'type' to avoid unused var error
    };

    const handleMouseMove = useCallback((e: React.MouseEvent | MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        if (isMobilePortrait) {
            // Remap coordinates for 90deg rotation
            // ... (comments)
        } else {
            // Standard behavior
        }

        // For now, let's trust the rect logic but we might need to adjust for the transform.
        // If the element is transformed, getBoundingClientRect gives the bounding box of the transformed element.
        // But e.clientX is viewport. 
        // If we want local coordinates in the transformed element, we might need to project.

        // However, since we are just moving a mask *inside* the element, and the mask is also inside the transformed element,
        // we want the mask position to be in the element's coordinate space.

        // If the container is rotated 90deg, and we want the mask to be under the finger:
        // Finger at viewport (Vx, Vy).
        // We need element coordinates (Ex, Ey) such that when rendered at (Ex, Ey) inside the rotated element, it appears at (Vx, Vy).

        // If Element is rotated 90deg CW:
        // Visual Point P = RotationMatrix * Point E + Offset.
        // We need E = InverseRotation * (P - Offset).

        // Let's implement this logic in the render loop if needed, but for now let's try to just handle the layout.
        // Actually, if we rotate the container, the internal X/Y axes rotate too.
        // So if we set left: 10px, top: 10px, it will be at the "top-left" of the rotated element.
        // Visually, that might be Top-Right of the screen (if 90deg CW).

        // So if user touches Top-Right of screen, that corresponds to (0,0) or similar.
        // We need to map Viewport (X, Y) to Element (X, Y).

        // Let's refine the handleTouchMove for mobile portrait specifically.
        // If isMobilePortrait (Rotated 90deg CW):
        // Screen X (0 to Width) -> Element Y (Height to 0) ? or (0 to Height)?
        // Screen Y (0 to Height) -> Element X (0 to Width) ?

        // Let's assume we rotate 90deg CW around center.
        // Screen Top-Left (0,0) -> Element Bottom-Left (0, Height) ? No.

        // Let's keep it simple:
        // If we rotate the container, we just need to map the touch to the element.
        // We can use a ref to the image itself maybe?

        // Let's try a simpler CSS hack:
        // We don't rotate the container. We rotate the *content*?
        // No, we want the image to be bigger.

        // Let's go with the rotation.
        // We will need to swap X and Y in the touch handler if rotated.

        // If rotated 90deg CW:
        // NewX = TouchY - RectTop
        // NewY = RectRight - TouchX
        // (Roughly)

        // Let's use a helper to get local coordinates.
        // Let's use a helper to get local coordinates.

        // Wait, rect.right might be in viewport coords.
        // If rotated, rect.width is the visual width (which is element height).

        // Let's try:
        // If 90deg CW:
        // Visual X axis corresponds to Element -Y axis.
        // Visual Y axis corresponds to Element X axis.

        // So:
        // Element X = Visual Y (relative to top)
        // Element Y = Visual Width - Visual X (relative to left)

        // Let's try this mapping.

        if (isMobilePortrait) {
            // 90deg CW rotation
            // Visual Y (down) increases Element X (right)
            // Visual X (right) increases Element Y (down)? No.
            // Visual X (right) corresponds to Element Y (down) going UP? 
            // If we rotate 90 CW:
            // Top edge -> Right edge.
            // Left edge -> Top edge.
            // So Element X axis points Down (Visual Y).
            // Element Y axis points Left (Visual -X).

            // So:
            // Element X = (e.clientY - rect.top)
            // Element Y = (rect.width - (e.clientX - rect.left))  <-- rect.width is visual width

            setCursorPos({
                x: e.clientY - rect.top,
                y: rect.width - (e.clientX - rect.left)
            });
        } else {
            setCursorPos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }

        setIsHovering(true);
    }, [isMobilePortrait]);

    const handleTouchMove = useCallback((e: React.TouchEvent | TouchEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const touch = e.touches[0];

        if (isMobilePortrait) {
            // Same logic as above
            setCursorPos({
                x: touch.clientY - rect.top,
                y: rect.width - (touch.clientX - rect.left)
            });
        } else {
            setCursorPos({
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
            });
        }
        setIsHovering(true);
    }, [isMobilePortrait]);

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
        <div className={`relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden ${isMobilePortrait ? 'fixed inset-0 z-50' : ''}`}>
            {/* Controls Hint */}
            {/* Controls Hint */}
            <div className={`absolute text-white/50 text-xs md:text-sm z-20 pointer-events-none
                ${isMobilePortrait
                    ? 'fixed top-1/2 right-4 -translate-y-1/2 rotate-90 origin-center whitespace-nowrap'
                    : 'top-4 left-4'}`}>
                <p>Bewegen: Maus / Touch</p>
                <p className="hidden md:block">Info: &apos;i&apos; Taste</p>
                <p className="hidden md:block">Zurück: &apos;Esc&apos; Taste</p>
            </div>

            <div className={`relative flex items-center justify-center overflow-hidden cursor-none touch-none transition-transform duration-300 ease-in-out
                ${isMobilePortrait
                    ? 'w-[100vh] h-[100vw] rotate-90 origin-center'
                    : 'w-full h-full max-w-7xl max-h-[85vh]'}`}
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

            <div className={`absolute flex gap-4 z-30 
                ${isMobilePortrait
                    ? 'fixed left-8 top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-90 origin-center'
                    : 'bottom-8'}`}>
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
