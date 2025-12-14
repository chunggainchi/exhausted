
'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Text, OrbitControls, Stars, Loader, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { Moon as MoonIcon, RotateCcw } from 'lucide-react';

// --- TYPES ---
interface PlanetData {
    id: string;
    name: string;
    color: string;
    size: number;
    distance: number;
    speed: number;
    rotationSpeed: number;
    textureUrl: string;
    description: string;
    funFact: string;
    temp: string;
    moonsCount: number;
    realSize: string;
    travelTime?: string;
    inclination?: number;
    orbitAU: number;
    radiusMultiplier: number;
    hasRings?: boolean;
    moons?: MoonData[];
    dayLength?: string;
    rotationAxisTilt?: number; // Axial tilt in degrees (e.g., Uranus ~98°, Venus ~177°)
    // Dynamic props for display
    useRealDist?: boolean;
    useRealSize?: boolean;
}

interface MoonData {
    size: number;
    distance: number;
    speed: number;
    color: string;
    // Dynamic props
    useRealDist?: boolean;
    useRealSize?: boolean;
}

// --- CONSTANTS & DATA ---
// Using local texture assets
const TEXTURE_BASE = '/textures';

const PLANETS: PlanetData[] = [
    {
        id: 'mercury',
        name: 'Mercury',
        color: '#E0E0E0',
        size: 0.8,
        distance: 12,
        speed: 8.26e-7,
        rotationSpeed: 1.24e-7, // Adjusted to match orbital period ratio
        rotationAxisTilt: 0.034, // Almost no tilt
        textureUrl: `${TEXTURE_BASE}/Mercury.jpg`,
        travelTime: "~3 Months",
        inclination: 7.0,
        orbitAU: 0.39,
        radiusMultiplier: 0.38,
        description: "The Smallest One.",
        funFact: "The smallest but the fastest! It zips around the Sun at around 47 km/s! It's full of craters and therefore looks very similar to our Moon. It has extreme temperature swings due to its lack of an atmosphere to trap heat. It goes from scorching hot to freezing cold. Even though it's the closest planet to the Sun, it has ice!",
        temp: "🔥🔥🔥",
        moonsCount: 0,
        realSize: "0.38x Earth",
        dayLength: "59 Earth Days"
    },
    {
        id: 'venus',
        name: 'Venus',
        color: '#E3BB76',
        size: 1.5,
        distance: 18,
        speed: 3.23e-7,
        rotationSpeed: 2.99e-8, // Adjusted to match orbital period ratio (177° tilt makes it retrograde)
        rotationAxisTilt: 177, // Nearly upside down - this causes retrograde rotation
        textureUrl: `${TEXTURE_BASE}/Venus.jpg`,
        travelTime: "~4 Months",
        inclination: 3.4,
        orbitAU: 0.72,
        radiusMultiplier: 0.95,
        description: "The Hottest One.",
        funFact: "A day on Venus is around 8 Earth months! The weird thing is that it's day (243 Earth days) is longer than its year (225 Earth days)! Unlike other planets, it rotates backwards (retrograde) which means that Sun rises in the west and sets in the east.",
        temp: "🔥🔥🔥🔥",
        moonsCount: 0,
        realSize: "0.95x Earth",
        dayLength: "243 Earth Days"
    },
    {
        id: 'earth',
        name: 'Earth',
        color: '#2233FF',
        size: 1.6,
        distance: 26,
        speed: 1.99e-7,
        rotationSpeed: 7.27e-6, // Adjusted: Earth rotates 365.25 times per orbit
        rotationAxisTilt: 23.44, // Critical for seasons!
        textureUrl: `${TEXTURE_BASE}/Earth.jpg`,
        travelTime: "0",
        inclination: 0,
        orbitAU: 1.00,
        radiusMultiplier: 1.00,
        description: "Our Home. The Only One with Life.",
        funFact: "Earth is the only planet not named after a god! It's not perfectly round. It travels very fast but its rotation is slowing down slightly every year. It's magnetic field is protecting us from the solar wind and the radiation from the Sun.",
        temp: "🌿😎",
        moonsCount: 1,
        realSize: "1x Earth",
        dayLength: "24 Hours",
        moons: [{ size: 0.45, distance: 3.5, speed: 2.66e-6, color: '#DDDDDD' }]
    },
    {
        id: 'mars',
        name: 'Mars',
        color: '#D14A28',
        size: 1.1,
        distance: 34,
        speed: 1.05e-7,
        rotationSpeed: 7.08e-6, // Adjusted to match orbital period ratio
        rotationAxisTilt: 25.19, // Similar to Earth, causes seasons
        textureUrl: `${TEXTURE_BASE}/Mars.jpg`,
        travelTime: "~7 Months",
        inclination: 1.85,
        orbitAU: 1.52,
        radiusMultiplier: 0.53,
        description: "The Red Planet.",
        funFact: "Mars has the tallest volcano Olympus Mons (25km high - 3x the height of Everest) in the solar system. Its day is almost exactly an Earth day, but its year is almost twice as long! There are also signs that it once had flowing water!",
        temp: "❄️",
        moonsCount: 2,
        realSize: "0.53x Earth",
        dayLength: "24.6 Hours"
    },
    {
        id: 'jupiter',
        name: 'Jupiter',
        color: '#D8CA9D',
        size: 4.5,
        distance: 55,
        speed: 1.67e-8,
        rotationSpeed: 1.76e-5, // Adjusted to match orbital period ratio
        rotationAxisTilt: 3.13, // Minimal tilt
        textureUrl: `${TEXTURE_BASE}/Jupiter.jpg`,
        travelTime: "~5 Years",
        inclination: 1.3,
        orbitAU: 5.20,
        radiusMultiplier: 11.2,
        description: "The Biggest One.",
        funFact: "It is the biggest planet but it has the shortest day. Its year is nearly 12 Earth years long. It is a gas giant with a thick atmosphere of hydrogen and helium, meaning that it has no solid surface. It is the protector of the Earth by pulling in/deflecting many comets and asteroids that would otherwise be heading towards Earth.",    
        temp: "❄️❄️",
        moonsCount: 95,
        realSize: "11.2x Earth",
        dayLength: "10 Hours"
    },
    {
        id: 'saturn',
        name: 'Saturn',
        color: '#F4D03F',
        size: 3.8,
        distance: 75,
        speed: 6.75e-9,
        rotationSpeed: 1.64e-5, // Adjusted to match orbital period ratio
        rotationAxisTilt: 26.73, // Significant tilt, similar to Earth/Mars
        textureUrl: `${TEXTURE_BASE}/Saturn.jpg`,
        travelTime: "~7 Years",
        inclination: 2.5,
        orbitAU: 9.58,
        radiusMultiplier: 9.45,
        hasRings: true,
        description: "Lord of the Rings.",
        funFact: "Its magnificent rings aren't solid but are made of ice and rock particles that orbit around it. Like Jupiter it spins very quickly and has the second-shortest day. However, a year there is almost 30 Earth years long! It's too cold for liquid water to exist.",
        temp: "❄️❄️❄️",
        moonsCount: 146,
        realSize: "9.45x Earth",
        dayLength: "10.7 Hours"
    },
    {
        id: 'uranus',
        name: 'Uranus',
        color: '#4FD0E7',
        size: 2.6,
        distance: 92,
        speed: 2.37e-9,
        rotationSpeed: 1.01e-5, // Adjusted to match orbital period ratio (prograde, but axis tilted)
        rotationAxisTilt: 97.77, // Spins on its side (~97.77° tilt)
        textureUrl: `${TEXTURE_BASE}/Uranus.jpg`,
        travelTime: "~9 Years",
        inclination: 0.77,
        orbitAU: 19.2,
        radiusMultiplier: 4.0,
        description: "The Ice Giant.",
        funFact: "Uranus spins on its side like a rolling ball around the Sun. Because of this tilt it has extreme seasons and is the coldest planet in our solar system. One side is always facing the Sun and the other is always facing away. A year on Uranus is around 84 Earth years long but a day is only 17 Earth hours long! It was the first planet discovered using a telescope.",
        temp: "❄️❄️❄️❄️",
        moonsCount: 28,
        realSize: "4.0x Earth",
        dayLength: "17 Hours"
    },
    {
        id: 'neptune',
        name: 'Neptune',
        color: '#2E5D9C',
        size: 2.5,
        distance: 110,
        speed: 1.20e-9,
        rotationSpeed: 1.08e-5, // Adjusted to match orbital period ratio
        rotationAxisTilt: 28.32, // Significant tilt
        textureUrl: `${TEXTURE_BASE}/Neptune.jpg`,
        travelTime: "~12 Years",
        inclination: 1.77,
        orbitAU: 30.05,
        radiusMultiplier: 3.88,
        description: "The Windiest One.",
        funFact: "It's the farthest planet from the Sun and has the fastest winds (2,400 km/h) in the solar system. It's year is around 165 Earth years long but a day is only 16 Earth hours long. Unlike most planets, it was discovered using math rather than observation.",
        temp: "❄️❄️❄️❄️❄️",
        moonsCount: 16,
        realSize: "3.88x Earth",
        dayLength: "16 Hours"
    }
];

const TIME_SPEEDS = [
    { value: 1, label: '1s/s' }, // Real Time
    { value: 60, label: '1m/s' },
    { value: 3600, label: '1h/s' },
    { value: 86400, label: '1d/s' }, // Default
    { value: 604800, label: '1w/s' }
];
const SUN_INFO = {
    id: 'sun',
    name: 'Sun',
    description: "The star at the center of our Solar System.",
    temp: "5,500°C",
    moonsCount: 0,
    realSize: "109x Earth",
    travelTime: "N/A",
    funFact: "The Sun accounts for 99.86% of the mass in the Solar System. It is so big that more than a million Earths could fit inside it! It looks yellow to us because of how our atmosphere scatters the blue light, but it's actually white (all colors blended together). A mystery that scientists are still trying to solve - its atmosphere gets hotter the farther you go out?! It's light takes 8 Earth minutes to reach Earth.",
    color: "#FFD700",
    dayLength: "25 Earth Days"
};

const MOON_INFO = {
    id: 'moon',
    name: 'Moon',
    description: "Earth's best friend! It spins around us while we spin around the Sun. Its phases happen because sunlight hits it differently as it moves!",
    temp: "-173°C to 127°C",
    moonsCount: 0,
    realSize: "0.27x Earth",
    travelTime: "3 Days",
    funFact: "We always see the same face of the Moon!",
    dayLength: "29.5 Earth Days",
    color: "#DDDDDD"
};



const SUN_SIZE = 7;

// --- AUDIO SERVICE ---
const audioService = new class {
    bgMusic: HTMLAudioElement | null = null;
    ctx: AudioContext | null = null;

    constructor() {
        if (typeof window !== 'undefined') {
            this.bgMusic = new Audio('/music/space.mp3');
            this.bgMusic.loop = true;
            this.bgMusic.volume = 0.5;
        }
    }

    getContext() {
        if (!this.ctx && typeof window !== 'undefined') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        return this.ctx;
    }

    playClick() {
        const ctx = this.getContext();
        if (!ctx) return;
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

        osc.start();
        osc.stop(ctx.currentTime + 0.05);
    }

    startDrone() {
        this.bgMusic?.play().catch(e => console.warn("Audio autoplay blocked", e));
    }

    stopDrone() {
        this.bgMusic?.pause();
    }
}();

// --- SUB COMPONENTS ---

const Sun: React.FC<{ useRealSize: boolean; viewMoonPhase?: boolean; simTimeRef: React.MutableRefObject<number> }> = ({ useRealSize, viewMoonPhase, simTimeRef }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useTexture(`${TEXTURE_BASE}/Sun.jpg`);

    const size = SUN_SIZE; // Sun size is constant, planets scale relative to it
    
    // Sun rotates once every ~25 days at equator
    // Earth rotates at 7.27e-5, Sun rotates at ~1/25 of that: ~2.9e-6
    const sunRotationSpeed = 2.9e-6;

    useFrame(() => {
        if (meshRef.current) {
            // Use simulation time for realistic rotation that responds to time speed toggle
            meshRef.current.rotation.y = simTimeRef.current * sunRotationSpeed;
        }
    });

    return (
        <group>
            {/* Increase light distance for realistic scale */}
            {/* High contrast lighting for Moon Phase View. White light for realism. */}
            <pointLight intensity={viewMoonPhase ? 4.0 : 3.0} decay={0} distance={useRealSize ? 5000 : 300} color="#ffffff" />
            <ambientLight intensity={viewMoonPhase ? 0.02 : 0.3} />
            <hemisphereLight intensity={viewMoonPhase ? 0.1 : 0.4} groundColor="#000000" color="#443355" />

            <mesh ref={meshRef}>
                <sphereGeometry args={[size, 64, 64]} />
                <meshStandardMaterial
                    map={texture}
                    emissive="#FFD700"
                    emissiveIntensity={0.5}
                    emissiveMap={texture}
                    color="#ffffff"
                />
            </mesh>
            <mesh scale={[1.2, 1.2, 1.2]}>
                <sphereGeometry args={[size, 32, 32]} />
                <meshBasicMaterial
                    color="#FF4500"
                    transparent
                    opacity={0.1}
                    depthWrite={false}
                />
            </mesh>
            <Text
                position={[0, size + (useRealSize ? 10 : 2.5), 0]}
                fontSize={useRealSize ? 20 : 3}
                color="white"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.1}
                outlineColor="#000000"
            >
                Sun
            </Text>
        </group>
    );
};

const AsteroidBelt: React.FC<{ useRealDist: boolean; isPlaying: boolean; simTimeRef: React.MutableRefObject<number> }> = ({ useRealDist, isPlaying, simTimeRef }) => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    // Nice mode: Between Mars (34) and Jupiter (55) -> 42-50.
    // Real mode: Between 2.2 AU (66) and 3.2 AU (96).
    const count = 1500;
    const dummy = useMemo(() => new THREE.Object3D(), []);
    
    // Orbital speed for asteroid belt (average distance ~2.7 AU)
    // Using Kepler's laws: speed ∝ 1/a^(3/2), so for 2.7 AU: ~4.5e-8
    const orbitalSpeed = 5e-8;

    useEffect(() => {
        if (!meshRef.current) return;

        const minR = useRealDist ? 66 : 42;
        const maxR = useRealDist ? 96 : 50;

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = minR + Math.random() * (maxR - minR); // Scaled radius
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = (Math.random() - 0.5) * 2; // Slight vertical spread
            const scale = Math.random() * 0.2 + 0.05;

            dummy.position.set(x, y, z);
            dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
            dummy.scale.set(scale, scale, scale);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    }, [dummy, useRealDist]);

    useFrame(() => {
        if (meshRef.current && isPlaying) {
            // Use simulation time for realistic orbital motion, responds to time speed toggle
            meshRef.current.rotation.y = simTimeRef.current * orbitalSpeed * 0.1;
        }
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#666666" roughness={0.8} />
        </instancedMesh>
    );
};

const Moon: React.FC<{ data: { size: number, distance: number, speed: number, color: string }, parentSize: number, simTimeRef: React.MutableRefObject<number>, useRealDist: boolean, useRealSize: boolean }> = ({ data, parentSize, simTimeRef, useRealDist, useRealSize }) => {
    const ref = useRef<THREE.Group>(null);
    const textureUrl = '/textures/Moon.jpg';
    const texture = useTexture(textureUrl);

    // Realistic Moon Scaling:
    // Size: ~27% of Earth (Parent)
    // Distance: ~60x Earth Radius (Parent Radius)
    // Only apply real distance scaling if BOTH dist and size are real, otherwise Moon flies off if parent is huge.

    const size = useRealSize ? parentSize * 0.27 : data.size;
    const distance = (useRealDist && useRealSize) ? parentSize * 60 : data.distance;

    // Calculate orbit geometry once
    const orbitCurve = useMemo(() => {
        const radius = parentSize + distance; // Visual radius for the line
        const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
        const points = curve.getPoints(64);
        return new THREE.BufferGeometry().setFromPoints(points).rotateX(-Math.PI / 2);
    }, [parentSize, distance]);

    useFrame(() => {
        if (ref.current) {
            const angle = -simTimeRef.current * data.speed; // Negative to orbit counterclockwise (same as planets)
            ref.current.position.x = Math.cos(angle) * (parentSize + distance);
            ref.current.position.z = Math.sin(angle) * (parentSize + distance);

            // Tidal Locking: Moon always faces the planet (Parent)

            // Tidal Locking: Moon always faces the planet (Parent)
            // We must use the parent's WORLD position, because lookAt() expects world coords.
            // lookAt(0,0,0) was looking at the Sun (World Origin).
            if (ref.current.parent) {
                const parentWorldPos = new THREE.Vector3();
                ref.current.parent.getWorldPosition(parentWorldPos);
                ref.current.lookAt(parentWorldPos);
            }
        }
    });

    return (
        <group>
            {/* Stable Moon Orbit Line */}
            <lineLoop geometry={orbitCurve}>
                <lineBasicMaterial attach="material" color="#666" transparent opacity={0.3} />
            </lineLoop>

            <group ref={ref}>
                <mesh rotation={[0, Math.PI * 1.5, 0]}>
                    <sphereGeometry args={[size, 32, 32]} />
                    <meshStandardMaterial map={texture} roughness={0.9} color="#ffffff" />
                </mesh>
                <Text
                    position={[0, size + 0.8, 0]}
                    fontSize={0.8}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.05}
                    outlineColor="#000000"
                >
                    Moon
                </Text>
            </group>
        </group>
    );
};

const Planet: React.FC<{ data: PlanetData; isFocused: boolean; onSelect: (id: string) => void; simTimeRef: React.MutableRefObject<number>; isPlaying: boolean; userLocation?: { lat: number; long: number } | null }> = ({ data, isFocused, onSelect, simTimeRef, userLocation }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const orbitRef = useRef<THREE.Group>(null);

    // Apply Orbital Inclination
    const inclinationRad = THREE.MathUtils.degToRad(data.inclination || 0);

    const texture = useTexture(data.textureUrl);

    const orbitCurve = useMemo(() => {
        const points = [];
        for (let i = 0; i <= 128; i++) {
            const angle = (i / 128) * Math.PI * 2;
            points.push(new THREE.Vector3(Math.cos(angle) * data.distance, 0, Math.sin(angle) * data.distance));
        }
        return new THREE.BufferGeometry().setFromPoints(points);
    }, [data.distance]);

    const initialAngle = data.distance * 0.5;

    const isGasGiant = ['jupiter', 'saturn', 'uranus', 'neptune'].includes(data.id);
    const isEarth = data.id === 'earth';
    const roughness = isEarth ? 0.5 : (isGasGiant ? 0.4 : 0.9);
    const metalness = isEarth ? 0.1 : 0.0;

    useFrame(() => {
        if (orbitRef.current) {
            const time = simTimeRef.current;
            const angle = initialAngle + (time * data.speed * 0.1);

            orbitRef.current.position.x = Math.cos(angle) * data.distance;
            orbitRef.current.position.z = Math.sin(angle) * data.distance;

            // Rotate planet based on sim time
            if (meshRef.current) {
                // Apply rotation axis tilt if specified
                if (data.rotationAxisTilt !== undefined) {
                    const tiltRad = THREE.MathUtils.degToRad(data.rotationAxisTilt);
                    // Tilt the rotation axis around X-axis
                    meshRef.current.rotation.x = tiltRad;
                    
                    // For Uranus (spinning on its side ~98°), rotate around Z-axis after tilt
                    if (data.id === 'uranus') {
                        meshRef.current.rotation.z = time * data.rotationSpeed;
                        meshRef.current.rotation.y = 0;
                    } else {
                        // All other planets (including Venus with 177° tilt) rotate around Y-axis
                        // Venus's 177° tilt already makes it retrograde, so positive speed is correct
                        meshRef.current.rotation.y = time * data.rotationSpeed;
                        meshRef.current.rotation.z = 0;
                    }
                } else {
                    // Planets without explicit tilt (shouldn't happen now, but fallback)
                    meshRef.current.rotation.x = 0;
                    meshRef.current.rotation.z = 0;
                    meshRef.current.rotation.y = time * data.rotationSpeed;
                }
            }
        }
    });

    return (
        <group rotation={[inclinationRad, 0, 0]}>
            <lineLoop geometry={orbitCurve}>
                <lineBasicMaterial attach="material" color={isFocused ? "#aaa" : "#555"} transparent opacity={isFocused ? 0.6 : 0.4} />
            </lineLoop>

            <group ref={orbitRef}>
                <group onClick={(e) => { e.stopPropagation(); onSelect(data.id); }}>

                    <Text
                        position={[0, data.size + 1.8, 0]}
                        fontSize={Math.max(1.5, data.size * 0.6)}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                        outlineWidth={0.1}
                        outlineColor="#000000"
                    >
                        {data.name}
                    </Text>

                    <mesh 
                        ref={meshRef}
                        onClick={(e) => { e.stopPropagation(); onSelect(data.id); }}
                        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
                        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
                    >
                        <sphereGeometry args={[data.size, 64, 64]} />
                        <meshStandardMaterial
                            map={texture}
                            metalness={metalness}
                            roughness={roughness}
                            emissive={isFocused ? "#111111" : "#000000"}
                            emissiveIntensity={isFocused ? 0.2 : 0}
                        />
                        {data.id === 'earth' && userLocation && (
                            <mesh position={[
                                data.size * Math.cos(THREE.MathUtils.degToRad(userLocation.lat)) * Math.sin(THREE.MathUtils.degToRad(userLocation.long + 90)),
                                data.size * Math.sin(THREE.MathUtils.degToRad(userLocation.lat)),
                                data.size * Math.cos(THREE.MathUtils.degToRad(userLocation.lat)) * Math.cos(THREE.MathUtils.degToRad(userLocation.long + 90))
                            ]}>
                                <sphereGeometry args={[data.size * 0.03, 16, 16]} />
                                <meshBasicMaterial color="#ff0000" toneMapped={false} />
                                <pointLight distance={data.size * 0.5} intensity={5} color="#ff0000" />
                            </mesh>
                        )}
                    </mesh>

                    {isFocused && <pointLight intensity={1.5} distance={50} decay={2} color="#ffffff" />}

                    {(data.id === 'venus' || isGasGiant) && !isFocused && (
                        <mesh scale={[1.05, 1.05, 1.05]}>
                            <sphereGeometry args={[data.size, 32, 32]} />
                            <meshBasicMaterial
                                color={data.color}
                                transparent
                                opacity={0.08}
                                blending={THREE.AdditiveBlending}
                                side={THREE.BackSide}
                            />
                        </mesh>
                    )}


                    {data.id === 'earth' && !isFocused && (
                        <mesh scale={[1.03, 1.03, 1.03]}>
                            <sphereGeometry args={[data.size, 64, 64]} />
                            <meshStandardMaterial
                                map={texture}
                                transparent
                                opacity={0.2}
                                depthWrite={false}
                                blending={THREE.AdditiveBlending}
                            />
                        </mesh>
                    )}

                    {data.hasRings && (
                        <mesh rotation={[-Math.PI / 3, 0, 0]}>
                            <ringGeometry args={[data.size * 1.4, data.size * 2.2, 128]} />
                            <meshStandardMaterial color={data.color} side={THREE.DoubleSide} transparent opacity={0.7} />
                        </mesh>
                    )}

                    {data.moons?.map((moon, idx) => (
                        <Moon key={idx} data={moon} parentSize={data.size} simTimeRef={simTimeRef} useRealDist={data.useRealDist || false} useRealSize={data.useRealSize || false} />
                    ))}
                </group>
            </group>
        </group >
    );
};

// Fallback if textures fail
const PlanetFallback: React.FC<{ data: PlanetData, simTimeRef: React.MutableRefObject<number>, onSelect: (id: string) => void }> = ({ data, simTimeRef, onSelect }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const orbitRef = useRef<THREE.Group>(null);
    const initialAngle = data.distance * 0.5;

    useFrame(() => {
        if (orbitRef.current) {
            const time = simTimeRef.current;
            const angle = initialAngle + (time * data.speed * 0.1);
            orbitRef.current.position.x = Math.cos(angle) * data.distance;
            orbitRef.current.position.z = Math.sin(angle) * data.distance;
            if (meshRef.current) meshRef.current.rotation.y += data.rotationSpeed;
        }
    });

    return (
        <group>
            <group ref={orbitRef}>
                <group onClick={(e) => { e.stopPropagation(); onSelect(data.id); }}>
                    <Text
                        position={[0, data.size + 1.8, 0]}
                        fontSize={Math.max(1.2, data.size * 0.5)}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                        outlineWidth={0.05}
                        outlineColor="#000000"
                    >
                        {data.name}
                    </Text>
                    <mesh ref={meshRef}>
                        <sphereGeometry args={[data.size, 64, 64]} />
                        <meshPhysicalMaterial
                            color={data.color}
                            metalness={0.4}
                            roughness={0.3}
                            clearcoat={1}
                            clearcoatRoughness={0.1}
                        />
                    </mesh>
                    {data.hasRings && (
                        <mesh rotation={[-Math.PI / 3, 0, 0]}>
                            <ringGeometry args={[data.size * 1.4, data.size * 2.2, 64]} />
                            <meshStandardMaterial color={data.color} side={THREE.DoubleSide} transparent opacity={0.5} />
                        </mesh>
                    )}
                </group>
            </group>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[data.distance - 0.1, data.distance + 0.1, 128]} />
                <meshBasicMaterial color="#444" side={THREE.DoubleSide} transparent opacity={0.2} />
            </mesh>
        </group>
    );
};

class PlanetErrorBoundary extends React.Component<
    { children: React.ReactNode, data: PlanetData, simTimeRef: React.MutableRefObject<number>, onSelect: (id: string) => void },
    { hasError: boolean }
> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() { return { hasError: true }; }
    componentDidCatch() { console.warn(`Texture failed for ${this.props.data.name}, switching to glossy mode.`); }
    render() {
        if (this.state.hasError) {
            return <PlanetFallback data={this.props.data} simTimeRef={this.props.simTimeRef} onSelect={this.props.onSelect} />;
        }
        return this.props.children;
    }
}

const CameraManager: React.FC<{ focusedId: string | null; useRealDist: boolean; useRealSize: boolean; simTimeRef: React.MutableRefObject<number>, viewMoonPhase: boolean, zoomSignal: number }> = ({ focusedId, useRealDist, useRealSize, simTimeRef, viewMoonPhase, zoomSignal }) => {
    const { camera } = useThree();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const controlsRef = useRef<any>(null);
    const isTransitioning = useRef(false);
    const previousPlanetPos = useRef(new THREE.Vector3());
    const lastSimTime = useRef(simTimeRef.current);
    const prevZoomSignal = useRef(0);

    const previousEarthPos = useRef(new THREE.Vector3());

    // Handle Zoom Signal
    useEffect(() => {
        if (zoomSignal !== prevZoomSignal.current) {
            const delta = zoomSignal - prevZoomSignal.current;
            if (controlsRef.current) {
                const target = controlsRef.current.target;
                const dist = camera.position.distanceTo(target);
                // Zoom step: 15% of current distance
                const step = dist * 0.15 * delta;

                // Vector from Camera to Target
                const dir = new THREE.Vector3().subVectors(target, camera.position).normalize();

                // Move Camera
                // If Zooming In (Positive Delta), we move towards target.
                // If Zooming Out (Negative Delta), we move away.
                // Wait. ArrowUp -> ZoomSignal + 1. We want Zoom In.
                // So +Delta should mean "Move Closer".
                camera.position.addScaledVector(dir, step);

                controlsRef.current.update();
            }
            prevZoomSignal.current = zoomSignal;
        }
    }, [zoomSignal, camera]);

    // Trigger transition when focusedId changes OR when viewMoonPhase turns off
    useEffect(() => {
        isTransitioning.current = true;
    }, [focusedId, viewMoonPhase]);

    useFrame(() => {
        if (!controlsRef.current) return;

        if (viewMoonPhase) {
            // Moon Phase View: Camera on Earth, looking at Moon
            const earth = PLANETS.find(p => p.id === 'earth');
            const moon = earth?.moons?.[0];
            if (earth && moon) {
                // Calculate Earth & Moon positions (Logic copied from below for accuracy)
                const eDist = useRealDist ? earth.orbitAU * 30 : earth.distance;
                const eAngle = (eDist * 0.5) + (simTimeRef.current * earth.speed * 0.1);
                const earthPos = new THREE.Vector3(Math.cos(eAngle) * eDist, 0, Math.sin(eAngle) * eDist);


                const mDist = (useRealDist && useRealSize) ? ((SUN_SIZE / 109) * earth.radiusMultiplier * 60) : moon.distance;
                const mAngle = -simTimeRef.current * moon.speed; // Negative to orbit counterclockwise (same as planets)
                const moonWorldPos = new THREE.Vector3(
                    earthPos.x + Math.cos(mAngle) * (earth.size + mDist),
                    0,
                    earthPos.z + Math.sin(mAngle) * (earth.size + mDist)
                );

                // Track Moon as target
                const targetPos = moonWorldPos;

                if (isTransitioning.current) {
                    // Initial Fly-in: Lock camera to "Earth Surface View" facing Moon
                    const earthRadius = useRealSize ? (SUN_SIZE / 109) * earth.radiusMultiplier : earth.size;
                    const dirToMoon = new THREE.Vector3().subVectors(moonWorldPos, earthPos).normalize();
                    const camPos = earthPos.clone().add(dirToMoon.multiplyScalar(earthRadius * 1.5));

                    camera.position.lerp(camPos, 0.1);
                    controlsRef.current.target.lerp(targetPos, 0.1);

                    // Allow transition to finish when close - SNAP to exact position
                    if (camera.position.distanceTo(camPos) < 1.0) {
                        camera.position.copy(camPos);
                        controlsRef.current.target.copy(targetPos);
                        isTransitioning.current = false;

                        // Initialize Previous State
                        previousPlanetPos.current.copy(targetPos); // Target (Moon)
                        previousEarthPos.current.copy(earthPos);   // Reference (Earth)
                        lastSimTime.current = simTimeRef.current;
                    }
                } else {
                    // FREE MODE: Follow Moon's Orbit AND Rotation
                    // We want to maintain the Camera's angle relative to the Earth-Moon axis.

                    // 1. Calculate Geometric Rotation required
                    // Current Vector from Moon to Earth
                    const dirCurrent = new THREE.Vector3().subVectors(earthPos, targetPos).normalize();
                    // Previous Vector from Moon to Earth
                    const dirPrev = new THREE.Vector3().subVectors(previousEarthPos.current, previousPlanetPos.current).normalize();

                    // Quaternion to rotate Previous Frame to Current Frame
                    const quat = new THREE.Quaternion().setFromUnitVectors(dirPrev, dirCurrent);

                    // 2. Apply this rotation to the Camera's relative offset from the Moon
                    // Using PREVIOUS positions to get the offset
                    const offset = camera.position.clone().sub(previousPlanetPos.current);
                    offset.applyQuaternion(quat);

                    // 3. Set New Camera Position: Current Moon + Rotated Offset
                    camera.position.copy(targetPos).add(offset);
                    controlsRef.current.target.copy(targetPos);

                    // Update state
                    previousPlanetPos.current.copy(targetPos);
                    previousEarthPos.current.copy(earthPos);
                    lastSimTime.current = simTimeRef.current;
                }

                controlsRef.current.update();
                return;
            }
        }

        if (focusedId) {
            const planet = PLANETS.find(p => p.id === focusedId);
            if (planet) {
                const dist = useRealDist ? planet.orbitAU * 30 : planet.distance;
                const angle = (dist * 0.5) + (simTimeRef.current * planet.speed * 0.1);

                const x = Math.cos(angle) * dist;
                let z = Math.sin(angle) * dist;
                let y = 0;

                if (planet.inclination) {
                    const inc = THREE.MathUtils.degToRad(planet.inclination);
                    y = -z * Math.sin(inc);
                    z = z * Math.cos(inc);
                }
                const planetPos = new THREE.Vector3(x, y, z);

                if (isTransitioning.current) {
                    // Fly to planet (Initial Approach)
                    const size = useRealSize ? (SUN_SIZE / 109) * planet.radiusMultiplier : planet.size;
                    const viewDist = size * 3.0 + 3.0; // Distance to view from
                    const offset = new THREE.Vector3(0, viewDist * 0.5, viewDist);
                    // Ensure we fly to an offset position (not inside planet)
                    const idealPos = planetPos.clone().add(offset);

                    camera.position.lerp(idealPos, 0.08);
                    controlsRef.current.target.lerp(planetPos, 0.08);

                    // Stop transitioning when close
                    if (camera.position.distanceTo(idealPos) < 0.5) {
                        isTransitioning.current = false;
                        previousPlanetPos.current.copy(planetPos);
                    }
                } else {
                    // Follow planet: Only update the target to follow planet's orbit
                    // Let OrbitControls handle camera position based on user input
                    const delta = planetPos.clone().sub(previousPlanetPos.current);
                    if (delta.length() < 50) {
                        // Move target with planet - this allows camera to orbit around moving target
                        controlsRef.current.target.add(delta);
                    } else {
                        // Large jump (loop/reset?), just copy
                        controlsRef.current.target.copy(planetPos);
                    }
                    previousPlanetPos.current.copy(planetPos);
                }
            }
        } else {
            if (isTransitioning.current) {
                const resetPos = useRealDist ? new THREE.Vector3(0, 1500, 2000) : new THREE.Vector3(0, 60, 80);
                const resetTarget = new THREE.Vector3(0, 0, 0);
                camera.position.lerp(resetPos, 0.05);
                controlsRef.current.target.lerp(resetTarget, 0.05);
                if (camera.position.distanceTo(resetPos) < 1.0) isTransitioning.current = false;
            }
        }
        controlsRef.current.update();
    });

    const maxDistance = useRealDist ? 3000 : 300;

    return (
        <OrbitControls
            ref={controlsRef}
            key={focusedId ? 'planet' : 'sun'}
            makeDefault
            enableDamping
            dampingFactor={0.08}
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            minDistance={focusedId ? (useRealDist ? 0.1 : 3) : 10}
            maxDistance={focusedId ? (useRealDist ? 500 : 80) : maxDistance}
            rotateSpeed={0.5}
            zoomSpeed={0.8}
            panSpeed={0.5}
        />
    );
};

const SimulationController: React.FC<{ isPlaying: boolean, speedMultiplier: number, simTimeRef: React.MutableRefObject<number> }> = ({ isPlaying, speedMultiplier, simTimeRef }) => {
    useFrame((_state, delta) => {
        if (isPlaying) simTimeRef.current += delta * speedMultiplier;
    });
    return null;
};

const UI: React.FC<{
    focusedId: string | null;
    onSelect: (id: string | null) => void;
    isPlaying: boolean;
    onTogglePlay: () => void;
    showInfo: boolean;
    onToggleInfo: () => void;
    onToggleFullscreen: () => void;
    useRealDist: boolean;
    onToggleRealDist: () => void;
    useRealSize: boolean;
    onToggleRealSize: () => void;
    showLocation: boolean;
    onToggleLocation: () => void;
    isMusicOn: boolean;
    onToggleMusic: () => void;
    simSpeed: number;
    onToggleSpeed: () => void;
    viewMoonPhase: boolean;
    onToggleMoonPhase: () => void;
    isFullscreen: boolean;
}> = ({ focusedId, onSelect, isPlaying, onTogglePlay, showInfo, onToggleInfo, onToggleFullscreen, useRealDist, onToggleRealDist, useRealSize, onToggleRealSize, showLocation, onToggleLocation, isMusicOn, onToggleMusic, simSpeed, onToggleSpeed, viewMoonPhase, onToggleMoonPhase, isFullscreen }) => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);
    const infoPanelRef = useRef<HTMLDivElement>(null);
    const infoButtonRef = useRef<HTMLButtonElement>(null);

    // Handle Click Outside for Info Panel
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Check if click is outside Panel AND outside Button
            if (
                infoPanelRef.current &&
                !infoPanelRef.current.contains(event.target as Node) &&
                infoButtonRef.current &&
                !infoButtonRef.current.contains(event.target as Node)
            ) {
                if (showInfo) onToggleInfo();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showInfo, onToggleInfo]);

    const focusedPlanet = PLANETS.find(p => p.id === focusedId);
    const displayedPlanet = viewMoonPhase ? MOON_INFO : (focusedPlanet || (focusedId === null ? SUN_INFO : null));

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const updateViewport = () => setIsMobile(window.innerWidth < 768);
        updateViewport();
        window.addEventListener('resize', updateViewport);
        return () => window.removeEventListener('resize', updateViewport);
    }, []);

    const handleSelect = (id: string | null) => {
        audioService.playClick();
        onSelect(id);
        setShowMobileMenu(false);
        if (id !== 'earth' && viewMoonPhase) onToggleMoonPhase(); // Exit moon phase ONLY if currently active
    };

    return (
        <div className="pointer-events-none">
            {/* Mobile Info Modal */}
            {displayedPlanet && showInfo && isMobile && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 pointer-events-auto flex items-center justify-center p-6"
                    onClick={() => onToggleInfo()}
                >
                    <div
                        className="bg-black/90 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-2xl max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="text-white text-2xl font-light tracking-wide">{displayedPlanet.name}</h1>
                            <button onClick={() => onToggleInfo()} className="text-white/60 hover:text-white text-2xl">✕</button>
                        </div>
                        <p className="text-gray-300 text-sm italic mb-4 font-light">&quot;{displayedPlanet.description}&quot;</p>
                        <div className="grid grid-cols-2 gap-3 text-xs text-gray-300 mb-4">
                            <div className="flex items-center gap-2"><span className="text-base">🌡️</span><span>{displayedPlanet.temp}</span></div>
                            <div className="flex items-center gap-2"><span className="text-base">🌕</span><span>{displayedPlanet.moonsCount} Moons</span></div>
                            <div className="flex items-center gap-2 col-span-2"><span className="text-base">📏</span><span>{displayedPlanet.realSize}</span></div>
                            <div className="flex items-center gap-2 col-span-2"><span className="text-base">🚀</span><span>Fly there: {displayedPlanet.travelTime}</span></div>
                            <div className="flex items-center gap-2 col-span-2"><span className="text-base">⏳</span><span>Day: {displayedPlanet.dayLength}</span></div>
                        </div>
                        <div className="mt-3 bg-white/5 p-3 rounded-lg border border-white/10">
                            <span className="text-xs font-medium text-gray-400 uppercase block mb-1.5 tracking-wide">Fun Fact</span>
                            <p className="text-sm text-white font-light leading-relaxed">{displayedPlanet.funFact}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-start gap-4 z-50 font-sans pointer-events-none">
                {/* Info Panel - Collapsible (Desktop Only) */}
                {!isMobile && (
                    <div
                        ref={infoPanelRef}
                        className={`transition-all duration-500 ${displayedPlanet && showInfo ? 'pointer-events-auto opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 pointer-events-none'} bg-black/40 backdrop-blur-md p-5 rounded-xl border border-white/10 shadow-2xl max-w-sm`}
                    >
                        <h1 className="text-white text-2xl font-light tracking-wide mb-3">
                            {displayedPlanet?.name}
                        </h1>
                        <p className="text-gray-300 text-sm italic mb-4 font-light">&quot;{displayedPlanet?.description}&quot;</p>
                        <div className="grid grid-cols-2 gap-3 text-xs text-gray-300 mb-4">
                            <div className="flex items-center gap-2"><span className="text-base">🌡️</span><span>{displayedPlanet?.temp}</span></div>
                            <div className="flex items-center gap-2"><span className="text-base">🌕</span><span>{displayedPlanet?.moonsCount} Moons</span></div>
                            <div className="flex items-center gap-2 col-span-2"><span className="text-base">📏</span><span>{displayedPlanet?.realSize}</span></div>
                            <div className="flex items-center gap-2 col-span-2"><span className="text-base">🚀</span><span>Fly there: {displayedPlanet?.travelTime}</span></div>
                            <div className="flex items-center gap-2 col-span-2"><span className="text-base">⏳</span><span>Day: {displayedPlanet?.dayLength}</span></div>
                        </div>
                        <div className="mt-3 bg-white/5 p-3 rounded-lg border border-white/10">
                            <span className="text-xs font-medium text-gray-400 uppercase block mb-1.5 tracking-wide">Fun Fact</span>
                            <p className="text-sm text-white font-light leading-relaxed">{displayedPlanet?.funFact}</p>
                        </div>
                    </div>
                )}

                {/* Mobile Info Button */}
                {isMobile && (
                    <div className="flex items-center gap-2 pointer-events-auto">
                        {displayedPlanet && (
                            <button
                                onClick={onToggleInfo}
                                className="bg-black/40 backdrop-blur-md border border-white/10 text-white px-3 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 shadow-lg"
                            >
                                <span className="text-lg">ⓘ</span>
                            </button>
                        )}
                        <button
                            onClick={onToggleFullscreen}
                            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                            className={`${isFullscreen ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] border-white' : 'bg-black/40 border-white/10 text-white'} backdrop-blur-md border px-3 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 shadow-lg`}
                        >
                            <span className="text-lg">{isFullscreen ? '✕' : '⛶'}</span>
                        </button>
                    </div>
                )}

                {/* Info Toggle Button moved to control group */}

                <div className="flex-1"></div>
                {/* Control Buttons & Tooltip */}
                <div className="flex flex-col items-end gap-2 pointer-events-none">
                    <div className="flex gap-3 pointer-events-auto">
                        <div className="hidden md:flex gap-3">
                            {displayedPlanet && (
                                <button
                                    ref={infoButtonRef}
                                    onClick={(e) => { e.stopPropagation(); onToggleInfo(); }}
                                    onMouseEnter={() => setHoveredInfo(showInfo ? "Hide info" : "Show info")}
                                    onMouseLeave={() => setHoveredInfo(null)}
                                    className={`${showInfo ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] border-white' : 'bg-black/20 border-white/10 text-white'} backdrop-blur-md border px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/10 hover:text-white`}
                                >
                                    <span className="text-sm">ⓘ</span>
                                </button>
                            )}
                            {/* Reset View Button for Moon Phase */}
                            {viewMoonPhase && (
                                <button
                                    onClick={() => { onToggleMoonPhase(); setTimeout(onToggleMoonPhase, 100); }}
                                    onMouseEnter={() => setHoveredInfo("Reset View")}
                                    onMouseLeave={() => setHoveredInfo(null)}
                                    className="bg-black/20 border-white/10 backdrop-blur-md border text-white px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/10"
                                >
                                    <RotateCcw size={16} />
                                </button>
                            )}
                            {focusedId === 'earth' && (
                                <button
                                    onClick={onToggleMoonPhase}
                                    onMouseEnter={() => setHoveredInfo("View Moon from Earth")}
                                    onMouseLeave={() => setHoveredInfo(null)}
                                    className={`${viewMoonPhase ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] border-white' : 'bg-black/20 border-white/10 text-white'} backdrop-blur-md border px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/10 hover:text-white`}
                                >
                                    <MoonIcon size={16} className={viewMoonPhase ? "fill-current" : ""} />
                                </button>
                            )}
                            <button
                                onClick={() => { audioService.playClick(); onTogglePlay(); }}
                                onMouseEnter={() => setHoveredInfo("Pause/Resume Time")}
                                onMouseLeave={() => setHoveredInfo(null)}
                                className={`${isPlaying ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] border-white' : 'bg-black/20 border-white/10 text-white'} backdrop-blur-md border px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2 hover:text-white`}
                            >
                                <span className="text-lg flex items-center justify-center w-5">{isPlaying ? <div className="flex gap-1"><div className="w-1.5 h-4 bg-current rounded-sm"></div><div className="w-1.5 h-4 bg-current rounded-sm"></div></div> : "▶︎"}</span>
                                <span className="text-sm font-light tracking-wide">{isPlaying ? "Time" : "Time"}</span>
                            </button>

                            <button
                                onClick={onToggleRealDist}
                                onMouseEnter={() => setHoveredInfo("Scale distances to true reality (Planets will be much further apart)")}
                                onMouseLeave={() => setHoveredInfo(null)}
                                className={`${useRealDist ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] border-white' : 'bg-black/20 border-white/10 text-white'} backdrop-blur-md border px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/10 hover:text-white`}
                            >
                                <span className="text-sm">📏</span>
                            </button>
                            <button
                                onClick={onToggleRealSize}
                                onMouseEnter={() => setHoveredInfo("Scale planets to real relative sizes (Many planets will look much smaller)")}
                                onMouseLeave={() => setHoveredInfo(null)}
                                className={`${useRealSize ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] border-white' : 'bg-black/20 border-white/10 text-white'} backdrop-blur-md border px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/10 hover:text-white`}
                            >
                                <span className="text-sm">⚪</span>
                            </button>
                            <button
                                onClick={onToggleLocation}
                                onMouseEnter={() => setHoveredInfo("Show my location on Earth - Red dot shows where you are!")}
                                onMouseLeave={() => setHoveredInfo(null)}
                                className={`${showLocation ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] border-white' : 'bg-black/20 border-white/10 text-white'} backdrop-blur-md border px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/10 hover:text-white`}
                            >
                                <span className="text-sm">⚲</span>
                            </button>
                            <button
                                onClick={onToggleMusic}
                                onMouseEnter={() => setHoveredInfo("Ambient space sound (Space has no sound in real life though)")}
                                onMouseLeave={() => setHoveredInfo(null)}
                                className={`${isMusicOn ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] border-white' : 'bg-black/20 border-white/10 text-white'} backdrop-blur-md border px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/10 hover:text-white`}
                            >
                                <span className="text-sm">♬</span>
                            </button>
                            <button
                                onClick={onToggleSpeed}
                                onMouseEnter={() => setHoveredInfo("Toggle time speed (1s/s is real life speed but you will not see much movement)")}
                                onMouseLeave={() => setHoveredInfo(null)}
                                className="bg-black/20 backdrop-blur-md border border-white/10 text-white px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/10"
                            >
                                <span className="text-sm font-mono">{TIME_SPEEDS.find(s => s.value === simSpeed)?.label}</span>
                            </button>
                        </div>

                        {!isMobile && (
                            <button
                                onClick={onToggleFullscreen}
                                onMouseEnter={() => setHoveredInfo("Toggle fullscreen")}
                                onMouseLeave={() => setHoveredInfo(null)}
                                className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                            >
                                <span className="text-lg">⛶</span>
                            </button>
                        )}
                    </div>
                    {!isMobile && hoveredInfo && (
                        <div className="pointer-events-none bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-md border border-white/20 shadow-xl tracking-wide font-light animate-in fade-in slide-in-from-top-1 duration-200">
                            {hoveredInfo}
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation - Desktop */}
            <div className="absolute bottom-0 left-0 right-0 hidden md:block bg-black/60 backdrop-blur-lg border-t border-white/10 overflow-x-auto pb-4 shadow-2xl z-50 pointer-events-none">
                <div className="flex items-center gap-3 p-4 min-w-max mx-auto justify-center pointer-events-auto">
                    <button onClick={() => handleSelect(null)} className={`flex flex-col items-center justify-center w-20 h-20 rounded-xl transition-all duration-300 ${!focusedId ? 'bg-white/20 scale-105 ring-2 ring-white/30' : 'bg-white/5 hover:bg-white/10 border border-white/10'}`}>
                        {/* Sun Texture for Home Button */}
                        <div className="w-10 h-10 rounded-full mb-1 shadow-md ring-1 ring-white/20 overflow-hidden relative">
                            <img src="/textures/Sun.jpg" alt="Sun" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[10px] font-light text-white uppercase tracking-wider">Sun</span>
                    </button>
                    <div className="w-[1px] h-12 bg-white/10 mx-2"></div>
                    {PLANETS.map((planet) => (
                        <button key={planet.id} onClick={() => handleSelect(planet.id)} className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-300 border relative ${focusedId === planet.id ? 'border-white/40 bg-white/10 scale-105 -translate-y-1 shadow-xl z-10' : 'border-white/10 hover:bg-white/5 opacity-70 hover:opacity-100 hover:scale-105'}`}>
                            {/* Planet Texture for Buttons */}
                            <div className="w-8 h-8 rounded-full mb-1 shadow-md ring-1 ring-white/20 overflow-hidden relative" style={{ boxShadow: `0 0 10px ${planet.color}40` }}>
                                <img src={planet.textureUrl} alt={planet.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-[9px] font-light text-white uppercase tracking-wide">{planet.name}</span>
                            {focusedId === planet.id && <div className="absolute -bottom-1.5 w-1 h-1 bg-white rounded-full animate-pulse"></div>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mobile Navigation - Burger Menu */}
            <div className="absolute bottom-0 left-0 right-0 md:hidden z-50 pointer-events-none">
                {/* Burger Button */}
                <button
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-lg border border-white/20 text-white p-4 rounded-xl shadow-2xl z-40 pointer-events-auto"
                >
                    <span className="text-2xl">{showMobileMenu ? '✕' : '☰'}</span>
                </button>

                {showMobileMenu && (
                    <>
                        <div className="fixed inset-0 bg-transparent z-40 pointer-events-auto" onClick={() => setShowMobileMenu(false)} />
                        <div className="absolute bottom-20 right-4 bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl z-50 pointer-events-auto">
                            {/* Mobile Controls */}
                            <div className="flex flex-col gap-3 mb-4 pb-4 border-b border-white/10">
                                {/* Playback Controls */}
                                <div className="flex gap-2">
                                    <button onClick={() => { audioService.playClick(); onTogglePlay(); }} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${isPlaying ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] border-white' : 'bg-white/5 border-white/10 text-gray-300'}`}>
                                        <span className="text-lg">{isPlaying ? "⏸" : "▶︎"}</span>
                                        <span className="text-sm font-medium">{isPlaying ? "Time" : "Time"}</span>
                                    </button>
                                    <button onClick={onToggleSpeed} className="w-20 flex items-center justify-center py-3 rounded-xl text-white bg-white/5 border border-white/10 font-mono text-xs">
                                        {TIME_SPEEDS.find(s => s.value === simSpeed)?.label}
                                    </button>
                                </div>

                                {/* View Options */}
                                <div className="grid grid-cols-2 gap-2">
                                    <button onClick={onToggleRealDist} className={`py-3 rounded-xl border transition-all ${useRealDist ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] border-white' : 'bg-white/5 border-white/10 text-gray-300'}`}>
                                        <span className="mr-2">📏</span><span className="text-xs">Scale Dist</span>
                                    </button>
                                    <button onClick={onToggleRealSize} className={`py-3 rounded-xl border transition-all ${useRealSize ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] border-white' : 'bg-white/5 border-white/10 text-gray-300'}`}>
                                        <span className="mr-2">⚪</span><span className="text-xs">Scale Size</span>
                                    </button>
                                </div>

                                {/* Moon Phase - Dedicated Button */}
                                {focusedId === 'earth' && (
                                    <button onClick={onToggleMoonPhase} className={`w-full py-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${viewMoonPhase ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] border-white' : 'bg-white/5 border-white/10 text-gray-300'}`}>
                                        <MoonIcon size={18} className={viewMoonPhase ? "fill-current" : ""} />
                                        <span className="text-sm font-medium">View Moon Phases</span>
                                    </button>
                                )}

                                {/* Location & Audio */}
                                <div className="grid grid-cols-2 gap-2">
                                    <button onClick={onToggleLocation} className={`py-3 rounded-xl border transition-all ${showLocation ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] border-white' : 'bg-white/5 border-white/10 text-gray-300'}`}>
                                        <span className="mr-2">⚲</span><span className="text-xs">Location</span>
                                    </button>
                                    <button onClick={onToggleMusic} className={`py-3 rounded-xl border transition-all ${isMusicOn ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] border-white' : 'bg-white/5 border-white/10 text-gray-300'}`}>
                                        <span className="mr-2">♬</span><span className="text-xs">Music</span>
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <button onClick={() => handleSelect(null)} className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-300 ${!focusedId ? 'bg-white/20 ring-2 ring-white/30' : 'bg-white/5 border border-white/10'}`}>
                                    <div className="w-8 h-8 rounded-full mb-1 shadow-md ring-1 ring-white/20 overflow-hidden relative">
                                        <img src="/textures/Sun.jpg" alt="Sun" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-[8px] font-light text-white uppercase">Sun</span>
                                </button>
                                {PLANETS.map((planet) => (
                                    <button key={planet.id} onClick={() => handleSelect(planet.id)} className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-300 border ${focusedId === planet.id ? 'border-white/40 bg-white/10' : 'border-white/10 bg-white/5'}`}>
                                        <div className="w-6 h-6 rounded-full mb-1 shadow-md ring-1 ring-white/20 overflow-hidden relative" style={{ boxShadow: `0 0 5px ${planet.color}40` }}>
                                            <img src={planet.textureUrl} alt={planet.name} className="w-full h-full object-cover" />
                                        </div>
                                        <span className="text-[8px] font-light text-white uppercase">{planet.name}</span>
                                    </button>
                                ))}
                            </div>
                            <a href="https://exhaustedrocket.com" target="_blank" rel="noopener noreferrer" className="block mt-4 text-center text-[10px] text-white/40 hover:text-white transition-colors">
                                Product of exhaustedrocket.com
                            </a>
                        </div>
                    </>
                )}
            </div>

            {/* Desktop Footer Link */}
            <a href="https://exhaustedrocket.com" target="_blank" rel="noopener noreferrer" className="hidden md:block fixed bottom-1 right-2 text-[10px] text-white/20 hover:text-white/60 z-50 pointer-events-auto transition-colors">
                Product of exhaustedrocket.com
            </a>
        </div>
    );
};

// --- MAIN COMPONENT ---
export default function SolarSystem() {
    const [focusedId, setFocusedId] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showInfo, setShowInfo] = useState(false);
    const [useRealDist, setUseRealDist] = useState(false);
    const [useRealSize, setUseRealSize] = useState(false);
    const [showLocation, setShowLocation] = useState(false);
    const [userLocation, setUserLocation] = useState<{ lat: number, long: number } | null>(null);
    const [isMusicOn, setIsMusicOn] = useState(true);
    const [simSpeed, setSimSpeed] = useState(86400); // Default 1 Day/s
    const [viewMoonPhase, setViewMoonPhase] = useState(false);
    const [zoomSignal, setZoomSignal] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const simTimeRef = useRef(0);

    // Audio Drone
    useEffect(() => {
        if (isMusicOn) audioService.startDrone();
        else audioService.stopDrone();
        return () => audioService.stopDrone();
    }, [isMusicOn]);

    const containerRef = useRef<HTMLDivElement>(null);

    // Fullscreen handler
    useEffect(() => {
        const handleFullscreenChange = () => {
            const fullscreenActive = !!document.fullscreenElement;
            setIsFullscreen(fullscreenActive);
            if (!fullscreenActive && typeof screen !== 'undefined' && screen.orientation && 'unlock' in screen.orientation) {
                const orientation = screen.orientation as ScreenOrientation & { unlock?: () => void };
                orientation.unlock?.();
            }
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleFullscreen = useCallback(() => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().then(() => {
                // Attempt to lock orientation to landscape on mobile
                if (screen.orientation && 'lock' in screen.orientation) {
                    const orientation = screen.orientation as ScreenOrientation & { lock?: (orientation: 'landscape' | 'portrait') => Promise<void> };
                    orientation.lock?.('landscape').catch((e: unknown) => console.log('Orientation lock failed:', e));
                }
            }).catch(err => {
                console.log('Fullscreen error:', err);
            });
        } else {
            document.exitFullscreen();
            if (screen.orientation && 'unlock' in screen.orientation) {
                const orientation = screen.orientation as ScreenOrientation & { unlock?: () => void };
                orientation.unlock?.();
            }
        }
    }, []);

    // Prevent Browser Zoom on Trackpad
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => { if (e.ctrlKey) e.preventDefault(); };
        if (typeof window !== 'undefined') window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            if (typeof window !== 'undefined') window.removeEventListener('wheel', handleWheel);
        };
    }, []);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent shortcuts when typing in input fields
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            if (e.key === 'Escape') {
                setFocusedId(null);
            } else if (e.key === ' ') {
                e.preventDefault();
                setIsPlaying(p => !p);
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const idx = PLANETS.findIndex(p => p.id === focusedId);
                let nextIdx = 0;
                if (e.key === 'ArrowRight') nextIdx = idx === -1 ? 0 : (idx + 1) % PLANETS.length;
                else nextIdx = idx === -1 ? PLANETS.length - 1 : (idx - 1 + PLANETS.length) % PLANETS.length;
                setFocusedId(PLANETS[nextIdx].id);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setZoomSignal(z => z + 1);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setZoomSignal(z => z - 1);
            } else if (e.key === 'i' || e.key === 'I') {
                e.preventDefault();
                setShowInfo(s => !s);
            } else if (e.key === 's' || e.key === 'S') {
                e.preventDefault();
                const currentIndex = TIME_SPEEDS.findIndex(s => s.value === simSpeed);
                const nextIndex = (currentIndex + 1) % TIME_SPEEDS.length;
                setSimSpeed(TIME_SPEEDS[nextIndex].value);
            } else if (e.key === 'f' || e.key === 'F') {
                e.preventDefault();
                toggleFullscreen();
            } else if (e.key === 'm' || e.key === 'M') {
                e.preventDefault();
                setIsMusicOn(m => !m);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [focusedId, simSpeed, showInfo, toggleFullscreen]);

    const toggleLocation = () => {
        if (!showLocation) {
            alert("Locating you...");
            if (typeof navigator !== 'undefined' && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        setUserLocation({ lat: pos.coords.latitude, long: pos.coords.longitude });
                        setShowLocation(true);
                    },
                    (err) => { console.warn("Geo error", err); alert("Could not get location. Allow permissions."); }
                );
            } else { alert("Geolocation not supported"); }
        } else {
            setShowLocation(false);
        }
    };

    // Calculate display data based on toggles
    const activePlanets = useMemo(() => {
        return PLANETS.map(p => ({
            ...p,
            distance: useRealDist ? p.orbitAU * 30 : p.distance, // Scale AU by 30
            size: useRealSize ? (SUN_SIZE / 109) * p.radiusMultiplier : p.size, // Scale relative to Sun (Size 7)
            useRealDist,
            useRealSize
        }));
    }, [useRealDist, useRealSize]);

    return (
        <div ref={containerRef} className="w-full h-screen relative bg-black overflow-hidden select-none touch-action-none">

            <Canvas
                camera={{ position: [0, 60, 80], fov: 45 }}
                dpr={[1, 2]}
                gl={{ antialias: true, toneMappingExposure: 1.2 }}
            >
                <Suspense fallback={null}>
                    <SimulationController isPlaying={isPlaying} speedMultiplier={simSpeed} simTimeRef={simTimeRef} />
                    <Stars radius={useRealDist ? 2000 : 200} depth={100} count={20000} factor={8} saturation={0} fade speed={0.3} />

                    <AsteroidBelt useRealDist={useRealDist} isPlaying={isPlaying} simTimeRef={simTimeRef} />
                    <Sun useRealSize={useRealSize} viewMoonPhase={viewMoonPhase} simTimeRef={simTimeRef} />
                    {activePlanets.map((planet) => (
                        <PlanetErrorBoundary key={planet.id} data={planet} simTimeRef={simTimeRef} onSelect={setFocusedId}>
                            <Planet
                                data={planet}
                                isFocused={focusedId === planet.id}
                                onSelect={setFocusedId}
                                simTimeRef={simTimeRef}
                                isPlaying={isPlaying}
                                userLocation={showLocation ? userLocation : null}
                            />
                        </PlanetErrorBoundary>
                    ))}
                    <CameraManager focusedId={focusedId} useRealDist={useRealDist} useRealSize={useRealSize} simTimeRef={simTimeRef} viewMoonPhase={viewMoonPhase} zoomSignal={zoomSignal} />
                    <Preload all />
                </Suspense>
            </Canvas>
            <Loader />
            <UI
                focusedId={focusedId}
                onSelect={setFocusedId}
                isPlaying={isPlaying}
                onTogglePlay={() => setIsPlaying(!isPlaying)}
                showInfo={showInfo}
                onToggleInfo={() => setShowInfo(!showInfo)}
                onToggleFullscreen={toggleFullscreen}
                showLocation={showLocation}
                onToggleLocation={toggleLocation}
                isMusicOn={isMusicOn}
                onToggleMusic={() => setIsMusicOn(!isMusicOn)}
                simSpeed={simSpeed}
                onToggleSpeed={() => {
                    const currentIndex = TIME_SPEEDS.findIndex(s => s.value === simSpeed);
                    const nextIndex = (currentIndex + 1) % TIME_SPEEDS.length;
                    setSimSpeed(TIME_SPEEDS[nextIndex].value);
                }}
                useRealDist={useRealDist}
                onToggleRealDist={() => setUseRealDist(!useRealDist)}
                useRealSize={useRealSize}
                onToggleRealSize={() => setUseRealSize(!useRealSize)}
                viewMoonPhase={viewMoonPhase}
                onToggleMoonPhase={() => setViewMoonPhase(!viewMoonPhase)}
                isFullscreen={isFullscreen}
            />
        </div>
    );
}
