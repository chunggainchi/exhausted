'use client';

import React, { useEffect, useRef } from 'react';

export default function Confetti() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const particles: any[] = [];
        const colors = ['#f87171', '#60a5fa', '#4ade80', '#fbbf24', '#c084fc'];

        for (let i = 0; i < 150; i++) {
            particles.push({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                vx: (Math.random() - 0.5) * 15,
                vy: (Math.random() - 0.5) * 15 - 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 8 + 4,
                life: 100
            });
        }

        let frameId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let alive = false;
            particles.forEach(p => {
                if (p.life > 0) {
                    alive = true;
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vy += 0.3; // Gravity
                    p.life--;
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            if (alive) {
                frameId = requestAnimationFrame(animate);
            }
        };

        animate();
        return () => cancelAnimationFrame(frameId);
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />;
}
