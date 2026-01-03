
'use client';

import Image from 'next/image';
import React, { useState, useEffect, useRef, useMemo, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Text, OrbitControls, Stars, Loader, Preload, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { Moon as MoonIcon, RotateCcw, CloudSun, Calendar, Milestone, ArrowUpRight } from 'lucide-react';

// --- TYPES ---
interface InnerLayer {
    name: string;
    radiusRatio: number;
    color: string;
    description: string;
}

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
    orbitPeriodDays?: number; // Orbital period in Earth days
    rotationPeriodHours?: number; // Rotation period in Earth hours
    rotationRetrograde?: boolean; // Explicit retrograde rotation flag
    // Dynamic props for display
    useRealDist?: boolean;
    useRealSize?: boolean;
    innerLayers?: InnerLayer[];
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
const TWO_PI = Math.PI * 2;
const DAY_SECONDS = 86400;
const HOUR_SECONDS = 3600;
const DEBUG_OVERLAY_ENABLED = false;

const deriveAngularSpeeds = (planet: PlanetData): PlanetData => {
    const orbitSpeed = planet.orbitPeriodDays
        ? TWO_PI / (planet.orbitPeriodDays * DAY_SECONDS)
        : planet.speed;

    const periodHours = planet.rotationPeriodHours;
    const rotationSign = periodHours && periodHours < 0
        ? -1
        : (planet.rotationRetrograde ? -1 : 1);
    const rotationSpeed = periodHours
        ? (TWO_PI / (Math.abs(periodHours) * HOUR_SECONDS)) * rotationSign
        : planet.rotationSpeed;

    return { ...planet, speed: orbitSpeed, rotationSpeed };
};

const PLANETS: PlanetData[] = [
    {
        id: 'mercury',
        name: 'Mercury',
        color: '#E0E0E0',
        size: 0.8,
        distance: 12,
        speed: 8.26e-7,
        rotationSpeed: 1.24e-6, // Adjusted to match orbital period ratio
        orbitPeriodDays: 87.9691,
        rotationPeriodHours: 1407.6,
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
        rotationSpeed: 2.99e-7, // Adjusted to match orbital period ratio (177° tilt makes it retrograde)
        orbitPeriodDays: 224.701,
        rotationPeriodHours: 5832.5,
        rotationRetrograde: false,
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
        rotationSpeed: 7.29e-5, // (Standard Earth angular velocity)
        orbitPeriodDays: 365.256,
        rotationPeriodHours: 23.934,
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
        moons: [{ size: 0.45, distance: 3.5, speed: 2.66e-6, color: '#DDDDDD' }],
        innerLayers: [
            {
                name: "Inner Core",
                radiusRatio: 0.19,
                color: "#FFFFFF",
                description: "🔥 Solid iron–nickel ball, ~1,220 km wide and ~5,400°C hot (almost Sun-level spicy). This ultra-dense jawbreaker spins quietly at Earth’s center and helps power our magnetic field."
            },
            {
                name: "Outer Core",
                radiusRatio: 0.55,
                color: "#FFD700",
                description: "🧲🌊 A churning ocean of molten metal, ~2,300 km thick. This liquid dynamo sloshes around to create Earth’s magnetic shield—blocking solar chaos, lighting up auroras, and keeping compasses sane."
            },
            {
                name: "Lower Mantle",
                radiusRatio: 0.88,
                color: "#FF4500",
                description: "🐢🔥 2,200 km of super-hot rock that *flows slower than fingernails grow*. It looks solid, moves like lava over millions of years, and quietly rearranges continents from below."
            },
            {
                name: "Upper Mantle",
                radiusRatio: 0.99,
                color: "#8B0000",
                description: "🏄‍♂️🌍 The squishy engine room beneath the crust. Home to the asthenosphere—soft enough for tectonic plates to slide, crash, and stack mountains like geological LEGO."
            },
            {
                name: "Crust",
                radiusRatio: 1.0,
                color: "#2233FF",
                description: "🍕🌊 Earth’s ultra-thin outer skin (5–70 km thick!). This crispy shell holds oceans, cities, forests—and *100% of human drama*."
            }
        ]
    },
    {
        id: 'mars',
        name: 'Mars',
        color: '#D14A28',
        size: 1.1,
        distance: 34,
        speed: 1.05e-7,
        rotationSpeed: 7.08e-5, // Adjusted to match orbital period ratio
        orbitPeriodDays: 686.98,
        rotationPeriodHours: 24.623,
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
        rotationSpeed: 1.76e-4, // Adjusted to match orbital period ratio
        orbitPeriodDays: 4332.59,
        rotationPeriodHours: 9.925,
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
        rotationSpeed: 1.64e-4, // Adjusted to match orbital period ratio
        orbitPeriodDays: 10759,
        rotationPeriodHours: 10.7,
        rotationAxisTilt: 26.73, // Significant tilt, similar to Earth/Mars
        textureUrl: `${TEXTURE_BASE}/Saturn.jpg`,
        travelTime: "~7 Years",
        inclination: 2.5,
        orbitAU: 9.58,
        radiusMultiplier: 9.45,
        hasRings: true,
        description: "Lord of the Rings.",
        funFact: "It's magnificent 7 rings aren't solid but are made of ice and rock particles that orbit around it. Like Jupiter it spins very quickly and has the second-shortest day. However, a year there is almost 30 Earth years long! It's too cold for liquid water to exist.",
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
        rotationSpeed: 1.01e-4, // Adjusted to match orbital period ratio (prograde, but axis tilted)
        orbitPeriodDays: 30687,
        rotationPeriodHours: 17.24,
        rotationRetrograde: false,
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
        rotationSpeed: 1.08e-4, // Adjusted to match orbital period ratio
        orbitPeriodDays: 60190,
        rotationPeriodHours: 16.11,
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

interface SaturnRingBand {
    start: number;
    end: number;
    color: [number, number, number];
    opacity: number;
    label: string;
}

// Tune each band's opacity/color here for quick visual adjustments
export const SATURN_RING_BANDS: SaturnRingBand[] = [
    // Innermost dusty D ring: very faint
    { start: 0.0, end: 0.04, color: [150, 140, 130], opacity: 0.2, label: 'D Ring' },

    // C Ring: Visible gold/grey structure
    { start: 0.04, end: 0.12, color: [160, 140, 100], opacity: 0.5, label: 'C Ring' },

    // B Ring (Inner): Intense gold scattering
    { start: 0.12, end: 0.28, color: [220, 200, 150], opacity: 0.9, label: 'B Ring' },
    // B Ring (Mid): Maximum density
    { start: 0.28, end: 0.46, color: [200, 180, 130], opacity: 1.0, label: 'B Ring' },
    // B Ring (Outer): Fading slightly
    { start: 0.46, end: 0.58, color: [180, 160, 120], opacity: 0.85, label: 'B Ring' },

    // Cassini Division: Dark but not empty (dusty)
    { start: 0.58, end: 0.62, color: [60, 60, 70], opacity: 0.3, label: 'Cassini Division' },

    // A Ring: Bright gold/white
    { start: 0.62, end: 0.72, color: [210, 200, 170], opacity: 0.8, label: 'A Ring' },
    // A Ring Outer Edge
    { start: 0.72, end: 0.76, color: [180, 170, 160], opacity: 0.6, label: 'A Ring Outer' },

    // F Ring: Sharp, bright white strand
    { start: 0.76, end: 0.77, color: [255, 255, 255], opacity: 1.0, label: 'F Ring' },

    // Gap
    { start: 0.77, end: 0.82, color: [10, 20, 30], opacity: 0.0, label: '' },

    // G Ring: Diffuse, starting to shift blue
    { start: 0.82, end: 0.88, color: [100, 150, 200], opacity: 0.4, label: 'G Ring' },

    // E Ring: The massive blue halo (Enceladus plume)
    // Brighter color value needed because it's very diffuse
    { start: 0.88, end: 1.0, color: [60, 120, 255], opacity: 0.4, label: 'E Ring' }
];

const findSaturnRingBand = (t: number): SaturnRingBand => {
    for (const band of SATURN_RING_BANDS) {
        if (t >= band.start && t < band.end) return band;
    }
    return SATURN_RING_BANDS[SATURN_RING_BANDS.length - 1];
};
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

// --- DAY & NIGHT DEMO COMPONENTS ---
const CITIES = [
    { name: "Tromsø", lat: 69.6492, long: 18.9553 },    // Far north, Norway - extreme variation (Polar Night/Midnight Sun)
    { name: "Munich", lat: 48.137, long: 11.575 },
    { name: "Hong Kong", lat: 22.319, long: 114.169 },
    { name: "Sydney", lat: -33.8688, long: 151.2093 }  // Southern Hemisphere for contrast
];

const SunlightBeams: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null);
    const { scene } = useThree();
    const dummyVec = useRef(new THREE.Vector3());

    useFrame(() => {
        const earth = scene.getObjectByName('Earth'); // Must ensure Earth mesh is named 'Earth'
        if (groupRef.current && earth) {
            earth.getWorldPosition(dummyVec.current);
            groupRef.current.lookAt(dummyVec.current);
        }
    });

    return (
        <group ref={groupRef}>
            {/* Multiple semi-transparent cones to simulate light shafts */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 15]}>
                <cylinderGeometry args={[SUN_SIZE * 0.4, SUN_SIZE * 3, 100, 32, 1, true]} />
                <meshBasicMaterial color="#FFD700" transparent opacity={0.06} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 15]}>
                <cylinderGeometry args={[SUN_SIZE * 0.2, SUN_SIZE * 1.5, 80, 32, 1, true]} />
                <meshBasicMaterial color="#FFF9C4" transparent opacity={0.08} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
        </group>
    );
}

const TerminatorRing: React.FC<{ radius: number }> = ({ radius }) => {
    // A ring that always faces the sun (0,0,0).
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            // Look at World Origin (Sun)
            meshRef.current.lookAt(0, 0, 0);
        }
    });

    return (
        <mesh ref={meshRef}>
            <ringGeometry args={[radius * 1.01, radius * 1.05, 64]} />
            <meshBasicMaterial color="#FF4500" side={THREE.DoubleSide} transparent opacity={0.6} blending={THREE.AdditiveBlending} />
        </mesh>
    );
};

const CityMarker: React.FC<{
    radius: number,
    city: { name: string, lat: number, long: number },
    sunPos: THREE.Vector3
}> = ({ radius, city }) => {
    const meshRef = useRef<THREE.Group>(null);
    const textRef = useRef<any>(null);

    const pos = useMemo(() => {
        const phi = THREE.MathUtils.degToRad(city.lat);
        const theta = THREE.MathUtils.degToRad(city.long + 90);

        const r = radius * 1.01;
        const y = r * Math.sin(phi);
        const h = r * Math.cos(phi);
        const x = h * Math.sin(theta);
        const z = h * Math.cos(theta);

        return new THREE.Vector3(x, y, z);
    }, [radius, city]);

    useFrame(() => {
        if (meshRef.current && textRef.current) {
            const worldPos = new THREE.Vector3();
            meshRef.current.getWorldPosition(worldPos);

            // Vector To Sun = -WorldPos (since Sun is 0,0,0)
            // Normal (approx) = WorldPos - EarthCenter.
            const earthPos = new THREE.Vector3();
            if (meshRef.current.parent) {
                meshRef.current.parent.getWorldPosition(earthPos);
            }

            const normal = new THREE.Vector3().subVectors(worldPos, earthPos).normalize();
            const toSun = new THREE.Vector3().subVectors(new THREE.Vector3(0, 0, 0), worldPos).normalize();

            const dot = normal.dot(toSun);
            const nowDay = dot > 0;

            textRef.current.text = `${city.name}\n${nowDay ? "☀️" : "🌙"}`;
            textRef.current.color = nowDay ? "#FFFF00" : "#AAAAAA";
        }
    });

    // Southern Hemisphere cities get label below the dot
    const isSouthern = city.lat < 0;
    const labelYOffset = isSouthern ? -radius * 0.1 : radius * 0.1;
    const labelAnchor = isSouthern ? "top" : "bottom";

    return (
        <group position={pos} ref={meshRef}>
            <mesh>
                <sphereGeometry args={[radius * 0.02, 8, 8]} />
                <meshBasicMaterial color="red" toneMapped={false} />
            </mesh>
            <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
                <Text
                    ref={textRef}
                    position={[0, labelYOffset, 0]}
                    fontSize={radius * 0.1}
                    color="white"
                    anchorX="center"
                    anchorY={labelAnchor}
                    outlineWidth={radius * 0.01}
                    outlineColor="black"
                >
                    {city.name}
                </Text>
            </Billboard>
        </group>
    );
};

const RotationIndicator: React.FC<{ radius: number }> = ({ radius }) => {
    // Fixed relative to Earth orbit, showing spin
    const groupRef = useRef<THREE.Group>(null);

    useFrame(({ camera }) => {
        if (groupRef.current) {
            // Billboard the text/arrow to face camera? 
            // Or just keep it fixed relative to Earth-Sun line?
            // "Make it visibly obvious Earth rotates".
            // A fixed curved arrow near Earth is enough.
            groupRef.current.lookAt(camera.position); // Look at camera for readability
        }
    });

    return (
        <group position={[0, radius * 1.4, 0]}>
            <Text
                fontSize={radius * 0.4}
                color="#DDD"
                anchorX="center"
                anchorY="bottom"
                outlineWidth={0.02}
                outlineColor="black"
            >
                Earth Spins ⟳
            </Text>
        </group>
    );
};

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
            meshRef.current.rotation.y = simTimeRef.current * orbitalSpeed;
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



// --- SEASONS MODE COMPONENTS ---

const EarthAxis: React.FC<{ radius: number }> = ({ radius }) => {
    // Axis visual - NO rotation here! The parent tiltRef group handles the tilt.
    const axisLen = radius * 3;

    return (
        <group>
            {/* The Axis Line */}
            <mesh>
                <cylinderGeometry args={[radius * 0.02, radius * 0.02, axisLen, 8]} />
                <meshBasicMaterial color="#FFD700" opacity={0.8} transparent />
            </mesh>
            {/* Arrow Head */}
            <mesh position={[0, axisLen / 2, 0]}>
                <coneGeometry args={[radius * 0.1, radius * 0.3, 16]} />
                <meshBasicMaterial color="#FFD700" />
            </mesh>
            {/* Label - Billboard to always face camera */}
            <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
                <Text
                    position={[0, axisLen / 2 + radius * 0.4, 0]}
                    fontSize={radius * 0.18}
                    color="#FFD700"
                    outlineWidth={0.02}
                    outlineColor="black"
                >
                    Axial Tilt
                </Text>
            </Billboard>
        </group>
    );
};

const SeasonsOrbitMarkers: React.FC<{ distance: number }> = ({ distance }) => {
    // Simplified labels: emoji + month only
    const markers = [
        { angle: 0, label: "❄️ Dec" },
        { angle: Math.PI / 2, label: "🌸 Mar" },
        { angle: Math.PI, label: "☀️ Jun" },
        { angle: Math.PI * 1.5, label: "🍂 Sep" },
    ];

    return (
        <group rotation={[THREE.MathUtils.degToRad(0), 0, 0]}>
            {markers.map(m => (
                <group key={m.label} position={[
                    Math.cos(m.angle) * distance,
                    0,
                    Math.sin(m.angle) * distance
                ]}>
                    <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
                        <Text
                            position={[0, 2, 0]}
                            fontSize={distance * 0.03}
                            color="#FFF"
                            anchorX="center"
                            anchorY="middle"
                            outlineWidth={0.03}
                            outlineColor="black"
                        >
                            {m.label.includes("Equinox") ? m.label.replace("Vernal ", "Spring ").replace("Autumnal ", "Fall ") : m.label}
                        </Text>
                    </Billboard>
                </group>
            ))}
        </group>
    )
}

const LatCircle: React.FC<{ radius: number; lat: number; color: string; label: string }> = ({ radius, lat, color, label }) => {
    const phi = THREE.MathUtils.degToRad(lat);
    const circleRadius = radius * 1.001 * Math.cos(phi);
    const y = radius * 1.001 * Math.sin(phi);

    return (
        <group position={[0, y, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[circleRadius, radius * 0.003, 8, 128]} />
                <meshBasicMaterial color={color} transparent opacity={0.5} />
            </mesh>
            <Billboard follow={true}>
                <Text
                    position={[circleRadius + radius * 0.05, 0, 0]}
                    fontSize={radius * 0.035}
                    color={color}
                    anchorX="left"
                    outlineWidth={radius * 0.005}
                    outlineColor="black"
                    fillOpacity={0.7}
                >
                    {label}
                </Text>
            </Billboard>
        </group>
    );
};

const EarthReferenceLines: React.FC<{ radius: number }> = ({ radius }) => {
    const tilt = 23.44; // Exact axial tilt for science
    return (
        <group>
            {/* Equator (0 deg) */}
            <LatCircle radius={radius} lat={0} color="#FFFFFF" label="Equator" />

            {/* Tropics (~23.4° N/S) */}
            <LatCircle radius={radius} lat={tilt} color="#FFA500" label="Tropic (Cancer)" />
            <LatCircle radius={radius} lat={-tilt} color="#FFA500" label="Tropic (Capr.)" />

            {/* Polar Circles (~66.6° N/S) */}
            <LatCircle radius={radius} lat={90 - tilt} color="#87CEEB" label="Arctic" />
            <LatCircle radius={radius} lat={-(90 - tilt)} color="#87CEEB" label="Antarctic" />
        </group>
    );
};

const SeasonsCityMarker: React.FC<{
    radius: number,
    city: { name: string, lat: number, long: number },
    orbitalAngle: number // To calc sun declination
}> = ({ radius, city, orbitalAngle }) => {
    const meshRef = useRef<THREE.Group>(null);
    const textRef = useRef<any>(null);

    // Calculate Day Length
    // obliquity epsilon = 23.5 deg
    const eps = THREE.MathUtils.degToRad(23.44);
    // Solar Declination delta approx:
    // Angle 0 = Dec Solstice (Winter N) -> delta should be -23.5
    // Angle PI = Jun Solstice (Summer N) -> delta should be +23.5
    const declination = -eps * Math.cos(orbitalAngle);

    const latRad = THREE.MathUtils.degToRad(city.lat);

    // Hour angle H0
    const tanLat = Math.tan(latRad);
    const tanDec = Math.tan(declination);

    const cosH0 = Math.max(-1, Math.min(1, -tanLat * tanDec));
    const H0 = Math.acos(cosH0); // Radians (0 to PI)

    const dayLengthHours = (H0 / Math.PI) * 24;

    const pos = useMemo(() => {
        const phi = THREE.MathUtils.degToRad(city.lat);
        const theta = THREE.MathUtils.degToRad(city.long + 90);
        const r = radius * 1.01;
        const y = r * Math.sin(phi);
        const h = r * Math.cos(phi);
        const x = h * Math.sin(theta);
        const z = h * Math.cos(theta);
        return new THREE.Vector3(x, y, z);
    }, [radius, city]);

    useFrame(() => {
        if (meshRef.current) {
            const worldPos = new THREE.Vector3();
            meshRef.current.getWorldPosition(worldPos);
            const earthPos = new THREE.Vector3();
            if (meshRef.current.parent) meshRef.current.parent.getWorldPosition(earthPos);

            const normal = new THREE.Vector3().subVectors(worldPos, earthPos).normalize();
            const toSun = new THREE.Vector3().subVectors(new THREE.Vector3(0, 0, 0), worldPos).normalize();

            const dot = normal.dot(toSun);
            const nowDay = dot > 0;

            if (textRef.current) {
                textRef.current.text = `${city.name}\n${nowDay ? "Day" : "Night"} (${Math.round(dayLengthHours)}h)`;
                textRef.current.color = nowDay ? "#FFFF00" : "#AAAAAA";
            }
        }
    })

    // Southern Hemisphere cities get label below the dot
    const isSouthern = city.lat < 0;
    const labelYOffset = isSouthern ? -radius * 0.12 : radius * 0.12;
    const labelAnchor = isSouthern ? "top" : "bottom";

    return (
        <group position={pos} ref={meshRef}>
            <mesh>
                <sphereGeometry args={[radius * 0.025, 8, 8]} />
                <meshBasicMaterial color="cyan" toneMapped={false} />
            </mesh>
            <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
                <Text
                    ref={textRef}
                    position={[0, labelYOffset, 0]}
                    fontSize={radius * 0.075}
                    color="white"
                    anchorX="center"
                    anchorY={labelAnchor}
                    outlineWidth={radius * 0.008}
                    outlineColor="black"
                >
                    {city.name}
                </Text>
            </Billboard>
        </group>
    );
}

const Planet: React.FC<{ data: PlanetData; isFocused: boolean; onSelect: (id: string) => void; simTimeRef: React.MutableRefObject<number>; isPlaying: boolean; userLocation?: { lat: number; long: number } | null; viewInnerLayers?: boolean; onHoverLayer?: (layer: InnerLayer | null) => void; currentHoveredLayerName: string | null; selectedLayerName?: string | null; onSelectLayer?: (layer: InnerLayer | null) => void; dayNightMode?: boolean; seasonsMode?: boolean; overrideOrbitalAngle?: number; }> = ({ data, isFocused, onSelect, simTimeRef, userLocation, viewInnerLayers, onHoverLayer, currentHoveredLayerName, selectedLayerName, onSelectLayer, dayNightMode, seasonsMode, overrideOrbitalAngle }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const orbitRef = useRef<THREE.Group>(null);
    const ringRef = useRef<THREE.Mesh>(null);

    // New Refs for Seasons Mode Hierarchy
    const tiltRef = useRef<THREE.Group>(null);
    const spinRef = useRef<THREE.Group>(null);

    // Apply Orbital Inclination
    const inclinationRad = THREE.MathUtils.degToRad(data.inclination || 0);

    const texture = useTexture(data.textureUrl);
    const isSaturn = data.id === 'saturn';

    const saturnRingData = useMemo(() => {
        if (!isSaturn) return null;
        const innerRadius = data.size * 1.35;
        const outerRadius = data.size * 2.4;
        const geometry = new THREE.RingGeometry(innerRadius, outerRadius, 256, 128);

        const positionAttr = geometry.attributes.position as THREE.BufferAttribute;
        const colorArray = new Float32Array(positionAttr.count * 3);
        const workingColor = new THREE.Color();
        const highlight = new THREE.Color('#fff6e8');

        for (let i = 0; i < positionAttr.count; i++) {
            const x = positionAttr.getX(i);
            const y = positionAttr.getY(i);
            const radius = Math.sqrt(x * x + y * y);
            const t = THREE.MathUtils.clamp((radius - innerRadius) / (outerRadius - innerRadius), 0, 1);
            const band = findSaturnRingBand(t);
            workingColor.setRGB(band.color[0] / 255, band.color[1] / 255, band.color[2] / 255);

            const theta = Math.atan2(y, x);
            const fineRinglets = 0.5 + 0.5 * Math.sin(t * 1800 + theta * 8);
            const midRinglets = 0.5 + 0.5 * Math.sin(t * 320);
            const radialRipple = 0.5 + 0.5 * Math.sin(theta * 20 + t * 25);
            const density = THREE.MathUtils.clamp(band.opacity ?? 0.5, 0, 1);
            const brightnessPrimary = THREE.MathUtils.clamp(0.55 + 0.35 * fineRinglets + 0.15 * midRinglets + 0.05 * radialRipple, 0.3, 1.4);
            const brightness = THREE.MathUtils.clamp(0.65 + 0.4 * fineRinglets + 0.18 * midRinglets + 0.06 * radialRipple, brightnessPrimary, 1.5);

            const haloAmount = THREE.MathUtils.smoothstep(t, 0.85, 1);
            workingColor.lerp(highlight, 0.1 * haloAmount);

            const finalR = THREE.MathUtils.clamp(workingColor.r * brightness * density * 1.08, 0, 1);
            const finalG = THREE.MathUtils.clamp(workingColor.g * brightness * density * 1.08, 0, 1);
            const finalB = THREE.MathUtils.clamp(workingColor.b * (0.96 + 0.05 * midRinglets) * density * 1.08, 0, 1);

            colorArray[i * 3] = finalR;
            colorArray[i * 3 + 1] = finalG;
            colorArray[i * 3 + 2] = finalB;
        }

        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colorArray, 3));
        return { geometry, innerRadius, outerRadius };
    }, [isSaturn, data.size]);

    useEffect(() => {
        if (!saturnRingData) return;
        return () => {
            saturnRingData.geometry.dispose();
        };
    }, [saturnRingData]);

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
            // Orbital Position
            let angle = 0;
            if (seasonsMode && data.id === 'earth' && overrideOrbitalAngle !== undefined) {
                // Use Override Angle for position
                angle = overrideOrbitalAngle;
            } else {
                // Normal Simulation Time
                const time = simTimeRef.current;
                angle = initialAngle + (time * data.speed);
            }

            orbitRef.current.position.x = Math.cos(angle) * data.distance;
            orbitRef.current.position.z = Math.sin(angle) * data.distance;

            // Planet Rotation Update
            if (data.id === 'earth' && seasonsMode) {
                // SEASONS MODE PHYSICS:
                // 1. Tilt Group (Fixed Z Rotation)
                if (tiltRef.current) {
                    // -23.5 degrees: Leans AWAY from Sun at angle 0 (right side of screen/orbit usually)
                    // Actually at Angle 0 (Dec Solst), Earth is at X=Dist, Z=0. 
                    // Vector to Sun is (-1, 0, 0). 
                    // If we tilt Z by -23.5 deg: Top moves Right (+X), Bottom moves Left (-X).
                    // Wait, +Z rotation moves X to Y. 
                    // Let's standard: Z axis points OUT of screen (if Y up, X right).
                    // Rot Z positive: X axis moves towards Y axis (CCW).
                    // North Pole (Y+) moves towards West (-X).
                    // We want North Pole to lean AWAY from Sun at Dec Solstice.
                    // Earth at +X. Sun at 0.
                    // Axis should point AWAY from Sun (towards +X). 
                    // So we need North Pole (+Y) to rotate towards +X.
                    // That is a NEGATIVE Z rotation.
                    tiltRef.current.rotation.z = THREE.MathUtils.degToRad(-23.5);
                }

                // 2. Spin Group (Daily Y Rotation)
                if (spinRef.current) {
                    spinRef.current.rotation.y = simTimeRef.current * data.rotationSpeed;
                }

                // 3. Mesh (Identity)
                if (meshRef.current) {
                    meshRef.current.rotation.set(0, 0, 0);
                }

            } else {
                // STANDARD MODE
                if (meshRef.current) {
                    if (data.rotationAxisTilt !== undefined && !seasonsMode) {
                        const tiltRad = THREE.MathUtils.degToRad(data.rotationAxisTilt);
                        meshRef.current.rotation.x = tiltRad;
                        if (data.id === 'uranus') {
                            meshRef.current.rotation.z = simTimeRef.current * data.rotationSpeed;
                            meshRef.current.rotation.y = 0;
                        } else {
                            meshRef.current.rotation.y = simTimeRef.current * data.rotationSpeed;
                            meshRef.current.rotation.z = 0;
                        }
                    } else {
                        meshRef.current.rotation.x = 0;
                        meshRef.current.rotation.z = 0;
                        meshRef.current.rotation.y = simTimeRef.current * data.rotationSpeed;
                    }
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

                {/* Day/Night Demo Overlays - Fixed relative to Orbit */}
                {data.id === 'earth' && dayNightMode && !seasonsMode && (
                    <>
                        <TerminatorRing radius={data.size} />
                        <RotationIndicator radius={data.size} />
                    </>
                )}
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

                    {/* SEASONS MODE RENDER PATH (PHYSICS REFACTOR) */}
                    {data.id === 'earth' && seasonsMode ? (
                        <>
                            <TerminatorRing radius={data.size} />
                            <group ref={tiltRef}>
                                {/* Visual Axis (Fixed in Tilt Group) */}
                                <EarthAxis radius={data.size} />

                                <group ref={spinRef}>
                                    {/* Earth Mesh (Spins) */}
                                    <mesh
                                        ref={meshRef}
                                        name={data.name}
                                        onClick={(e) => { e.stopPropagation(); onSelect(data.id); }}
                                        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
                                        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
                                    >
                                        <sphereGeometry args={[data.size, 64, 64, 0, Math.PI * 2]} />
                                        <meshStandardMaterial
                                            map={texture}
                                            metalness={metalness}
                                            roughness={roughness}
                                            emissive={isFocused ? "#111111" : "#000000"}
                                            emissiveIntensity={isFocused ? 0.2 : 0}
                                            side={THREE.FrontSide}
                                        />
                                        {/* City Markers - Spinning with Earth */}
                                        {CITIES.map((city, i) => (
                                            <SeasonsCityMarker
                                                key={i}
                                                radius={data.size}
                                                city={city}
                                                orbitalAngle={overrideOrbitalAngle || 0}
                                            />
                                        ))}
                                        <EarthReferenceLines radius={data.size} />
                                    </mesh>
                                </group>
                            </group>
                        </>
                    ) : (
                        /* STANDARD RENDER PATH */
                        <mesh
                            ref={meshRef}
                            name={data.name}
                            onClick={(e) => { e.stopPropagation(); onSelect(data.id); }}
                            onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
                            onPointerOut={() => { document.body.style.cursor = 'auto'; }}
                        >
                            <sphereGeometry args={[data.size, 64, 64, 0, (data.id === 'earth' && viewInnerLayers) ? Math.PI * 2 * (240 / 360) : Math.PI * 2]} />
                            <meshStandardMaterial
                                map={texture}
                                metalness={metalness}
                                roughness={roughness}
                                emissive={isFocused ? "#111111" : "#000000"}
                                emissiveIntensity={isFocused ? 0.2 : 0}
                                side={(data.id === 'earth' && viewInnerLayers) ? THREE.DoubleSide : THREE.FrontSide}
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
                            {/* City Markers for Day/Night Demo */}
                            {data.id === 'earth' && dayNightMode && !seasonsMode && (
                                <>
                                    {CITIES.map((city, i) => (
                                        <CityMarker key={i} radius={data.size} city={city} sunPos={new THREE.Vector3(0, 0, 0)} />
                                    ))}
                                    <EarthReferenceLines radius={data.size} />
                                </>
                            )}
                        </mesh>
                    )}

                    {/* Inner Layers - rendered as sibling with its own rotation handling */}
                    {data.id === 'earth' && isFocused && viewInnerLayers && (
                        <PlanetInnerLayers
                            planetData={data}
                            simTimeRef={simTimeRef}
                            useRealSize={data.useRealSize || false}
                            onHoverLayer={onHoverLayer}
                            currentHoveredLayerName={currentHoveredLayerName || null}
                            selectedLayerName={selectedLayerName || null}
                            onSelectLayer={onSelectLayer}
                        />
                    )}

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
                        <mesh
                            rotation={[-Math.PI / 3, 0, 0]}
                            ref={data.id === 'saturn' ? ringRef : undefined}
                        >
                            {isSaturn && saturnRingData ? (
                                <>
                                    <primitive object={saturnRingData.geometry} attach="geometry" />
                                    <meshStandardMaterial
                                        vertexColors
                                        transparent
                                        opacity={0.9}
                                        roughness={0.35}
                                        metalness={0.05}
                                        emissive="#fff6d9"
                                        emissiveIntensity={0.25}
                                        toneMapped={false}
                                        side={THREE.DoubleSide}
                                        depthWrite={false}
                                    />
                                </>
                            ) : (
                                <>
                                    <ringGeometry args={[data.size * 1.4, data.size * 2.2, 128]} />
                                    <meshStandardMaterial color={data.color} side={THREE.DoubleSide} transparent opacity={0.7} />
                                </>
                            )}
                        </mesh>
                    )}

                    {data.moons?.map((moon, idx) => (
                        <Moon key={idx} data={moon} parentSize={data.size} simTimeRef={simTimeRef} useRealDist={data.useRealDist || false} useRealSize={data.useRealSize || false} />
                    ))}
                </group>
            </group>
        </group>
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
            const angle = initialAngle + (time * data.speed);
            orbitRef.current.position.x = Math.cos(angle) * data.distance;
            orbitRef.current.position.z = Math.sin(angle) * data.distance;
            if (meshRef.current) {
                meshRef.current.rotation.y = time * data.rotationSpeed;
            }
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

// Updated CameraManager signature to accept override options
const CameraManager: React.FC<{ focusedId: string | null; useRealDist: boolean; useRealSize: boolean; simTimeRef: React.MutableRefObject<number>, viewMoonPhase: boolean, zoomSignal: number, seasonsMode?: boolean, overrideOrbitalAngle?: number }> = ({ focusedId, useRealDist, useRealSize, simTimeRef, viewMoonPhase, zoomSignal, seasonsMode, overrideOrbitalAngle }) => {
    const { camera } = useThree();
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

    // Trigger transition when focusedId changes OR when viewMoonPhase turns off OR SEASONS MODE toggles
    useEffect(() => {
        isTransitioning.current = true;
    }, [focusedId, viewMoonPhase, seasonsMode]);

    useFrame(() => {
        if (!controlsRef.current) return;

        if (viewMoonPhase) {
            // Moon Phase View: Camera on Earth, looking at Moon
            const earthBase = PLANETS.find(p => p.id === 'earth');
            const earth = earthBase ? deriveAngularSpeeds(earthBase) : undefined;
            const moon = earth?.moons?.[0];
            if (earth && moon) {
                // Calculate Earth & Moon positions (Logic copied from below for accuracy)
                const eDist = useRealDist ? earth.orbitAU * 30 : earth.distance;
                const eAngle = (eDist * 0.5) + (simTimeRef.current * earth.speed);
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
            const basePlanet = PLANETS.find(p => p.id === focusedId);
            const planet = basePlanet ? deriveAngularSpeeds(basePlanet) : undefined;
            if (planet) {
                const dist = useRealDist ? planet.orbitAU * 30 : planet.distance;

                // Calculate Orbital Position (Standard vs Override)
                let angle = 0;
                if (seasonsMode && focusedId === 'earth' && overrideOrbitalAngle !== undefined) {
                    angle = overrideOrbitalAngle;
                } else {
                    angle = (dist * 0.5) + (simTimeRef.current * planet.speed);
                }

                const x = Math.cos(angle) * dist;
                let z = Math.sin(angle) * dist;
                let y = 0;

                if (planet.inclination) {
                    const inc = THREE.MathUtils.degToRad(planet.inclination);
                    y = -z * Math.sin(inc);
                    z = z * Math.cos(inc);
                }

                const planetPos = new THREE.Vector3(x, y, z);

                // --- Camera Follow Logic ---
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
                        // Also move camera to keep relative position!
                        camera.position.add(delta);
                    } else {
                        // Large jump (loop/reset?), just copy
                        controlsRef.current.target.copy(planetPos);
                    }
                    previousPlanetPos.current.copy(planetPos);
                }
            }
        } else {
            // Sun Focus / Reset
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

// --- Planet Inner Layers Visualization ---
const PlanetInnerLayers: React.FC<{
    planetData: PlanetData;
    simTimeRef: React.MutableRefObject<number>;
    useRealSize: boolean;
    onHoverLayer?: (layer: InnerLayer | null) => void;
    currentHoveredLayerName: string | null;
    selectedLayerName?: string | null;
    onSelectLayer?: (layer: InnerLayer | null) => void;
}> = ({ planetData, simTimeRef, useRealSize, onHoverLayer, currentHoveredLayerName, selectedLayerName, onSelectLayer }) => {
    const groupRef = useRef<THREE.Group>(null);
    const { innerLayers } = planetData;

    const handleHover = (layer: InnerLayer | null) => {
        if (onHoverLayer) onHoverLayer(layer);
    };
    const handleSelect = (layer: InnerLayer) => {
        if (!onSelectLayer) return;
        if (selectedLayerName === layer.name) {
            onSelectLayer(null);
        } else {
            onSelectLayer(layer);
        }
    };

    // Match the planet's rotation
    useFrame(() => {
        if (groupRef.current && planetData.rotationAxisTilt !== undefined) {
            const time = simTimeRef.current;
            const tiltRad = THREE.MathUtils.degToRad(planetData.rotationAxisTilt);
            groupRef.current.rotation.x = tiltRad;
            groupRef.current.rotation.y = time * planetData.rotationSpeed;
        }
    });

    if (!innerLayers) return null;

    const size = useRealSize ? (SUN_SIZE / 109) * planetData.radiusMultiplier : planetData.size;
    const crustLayer = innerLayers.find((layer) => layer.name === 'Crust');

    // 120 degree cutout means 240 degrees of the sphere is visible (360 - 120 = 240)
    const FILL_ANGLE = Math.PI * 2 * (240 / 360);

    return (
        <group ref={groupRef}>
            {innerLayers.map((layer, index) => {
                const radius = size * layer.radiusRatio;
                if (layer.radiusRatio >= 1.0) return null;

                const isHovered = currentHoveredLayerName === layer.name;
                const isSelected = selectedLayerName === layer.name;
                const hasSelection = !!selectedLayerName || !!currentHoveredLayerName;
                const isDimmed = hasSelection && !isSelected && !isHovered;
                const baseGlow = index === 0 ? 0.8 : (index === 1 ? 0.5 : 0.2);

                return (
                    <InnerLayerShell
                        key={layer.name}
                        layer={layer}
                        radius={radius}
                        fillAngle={FILL_ANGLE}
                        index={index}
                        isHovered={isHovered}
                        isSelected={isSelected}
                        hasSelection={hasSelection}
                        isDimmed={isDimmed}
                        baseGlow={baseGlow}
                        onHover={handleHover}
                        onSelect={handleSelect}
                    />
                );
            })}
            {crustLayer && (
                <mesh
                    onPointerOver={(e) => { e.stopPropagation(); handleHover(crustLayer); }}
                    onPointerOut={(e) => {
                        e.stopPropagation();
                        handleHover(null);
                        if (selectedLayerName === crustLayer.name && onSelectLayer && e.pointerType !== 'touch') {
                            onSelectLayer(null);
                        }
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleHover(crustLayer);
                        handleSelect(crustLayer);
                    }}
                >
                    <sphereGeometry args={[size * 1.02, 32, 32, 0, FILL_ANGLE]} />
                    <meshBasicMaterial transparent opacity={0} />
                </mesh>
            )}
        </group>
    );
};

interface InnerLayerShellProps {
    layer: InnerLayer;
    radius: number;
    fillAngle: number;
    index: number;
    isHovered: boolean;
    isSelected: boolean;
    hasSelection: boolean;
    isDimmed: boolean;
    baseGlow: number;
    onHover: (layer: InnerLayer | null) => void;
    onSelect: (layer: InnerLayer) => void;
}

function InnerLayerShell({ layer, radius, fillAngle, index, isHovered, isSelected, hasSelection, isDimmed, baseGlow, onHover, onSelect }: InnerLayerShellProps) {
    const materialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
    const geometryRef = useRef<THREE.SphereGeometry | null>(null);
    const basePositionsRef = useRef<Float32Array | null>(null);
    const tempNormal = useRef(new THREE.Vector3()).current;
    const isInnerCore = layer.name === 'Inner Core';
    const isOuterCore = layer.name === 'Outer Core';
    const isActive = isHovered || isSelected;

    useEffect(() => {
        if (isOuterCore && geometryRef.current) {
            const positionAttr = geometryRef.current.getAttribute('position') as THREE.BufferAttribute;
            const arr = positionAttr.array as Float32Array;
            basePositionsRef.current = arr.slice() as Float32Array;
        }
    }, [isOuterCore, radius]);

    const materialProps = useMemo(() => {
        if (isInnerCore) {
            return {
                color: layer.color,
                side: THREE.DoubleSide,
                emissive: layer.color,
                emissiveIntensity: isDimmed ? 0.2 : 2.8,
                roughness: 0.05,
                metalness: 1,
                transparent: isDimmed,
                opacity: isDimmed ? 0.08 : 1,
            };
        }
        if (isOuterCore) {
            return {
                color: layer.color,
                side: THREE.DoubleSide,
                emissive: layer.color,
                emissiveIntensity: isDimmed ? 0.1 : 1.1,
                roughness: 0.25,
                metalness: 1,
                transparent: true,
                opacity: isDimmed ? 0.05 : 0.75,
                clearcoat: 1,
                clearcoatRoughness: 0.1,
                transmission: 0.25,
                thickness: radius * 0.35,
            };
        }
        return {
            color: layer.color,
            side: THREE.DoubleSide,
            emissive: layer.color,
            emissiveIntensity: isActive ? 1.6 : (isDimmed ? 0.01 : baseGlow),
            roughness: 0.7,
            metalness: 0.2,
            transparent: hasSelection,
            opacity: isDimmed ? 0.05 : 0.95,
        };
    }, [layer.color, baseGlow, hasSelection, isDimmed, isActive, isInnerCore, isOuterCore, radius]);

    useFrame(({ clock }) => {
        if (!materialRef.current) return;
        if (isOuterCore) {
            const t = clock.getElapsedTime();
            const molten = 0.6 + 0.4 * Math.sin(t * 1.4 + radius * 3 + index);
            materialRef.current.emissiveIntensity = isDimmed ? 0.1 : (isActive ? 1.6 : 1.0) + molten * 0.4;
            materialRef.current.opacity = isDimmed ? 0.04 : THREE.MathUtils.clamp(0.55 + 0.2 * Math.sin(t * 1.1 + index), 0.35, 0.95);
            materialRef.current.clearcoatRoughness = isDimmed ? 0.2 : 0.08 + 0.04 * Math.cos(t * 1.2);
            materialRef.current.transmission = isDimmed ? 0.05 : 0.2 + 0.1 * Math.sin(t * 0.9 + radius);
            if (geometryRef.current && basePositionsRef.current) {
                const positionAttr = geometryRef.current.getAttribute('position') as THREE.BufferAttribute;
                const positions = positionAttr.array as Float32Array;
                const base = basePositionsRef.current;
                const amplitude = (isDimmed ? 0.004 : 0.02) * radius;
                for (let i = 0; i < positions.length; i += 3) {
                    const ox = base[i];
                    const oy = base[i + 1];
                    const oz = base[i + 2];
                    const len = Math.sqrt(ox * ox + oy * oy + oz * oz) || 1;
                    tempNormal.set(ox / len, oy / len, oz / len);
                    const wave = Math.sin(t * 0.8 + tempNormal.x * 8 + tempNormal.y * 6 + tempNormal.z * 5 + index);
                    const offset = amplitude * wave;
                    positions[i] = ox + tempNormal.x * offset;
                    positions[i + 1] = oy + tempNormal.y * offset;
                    positions[i + 2] = oz + tempNormal.z * offset;
                }
                positionAttr.needsUpdate = true;
                geometryRef.current.computeVertexNormals();
            }
        } else if (isInnerCore) {
            const blaze = 2.6 + 0.5 * Math.sin(clock.getElapsedTime() * 0.8);
            materialRef.current.emissiveIntensity = isDimmed ? 0.2 : blaze;
            materialRef.current.opacity = isDimmed ? 0.08 : 1;
        } else {
            materialRef.current.emissiveIntensity = isActive ? 1.4 : (isDimmed ? 0.01 : baseGlow);
            materialRef.current.opacity = isDimmed ? 0.05 : 0.95;
        }
    });

    return (
        <mesh
            onPointerOver={(e) => { e.stopPropagation(); onHover(layer); }}
            onPointerOut={(e) => { e.stopPropagation(); onHover(null); }}
            onClick={(e) => { e.stopPropagation(); onHover(layer); onSelect(layer); }}
        >
            <sphereGeometry ref={geometryRef} args={[radius, 64, 64, 0, fillAngle]} />
            <meshPhysicalMaterial ref={materialRef} {...materialProps} />
        </mesh>
    );
}

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
    viewInnerLayers: boolean;
    onToggleInnerLayers: () => void;
    dayNightMode: boolean;
    onToggleDayNight: () => void;
    seasonsMode: boolean;
    onToggleSeasons: () => void;
    seasonProgress: number;
    setSeasonProgress: (val: number) => void;
    isFullscreen: boolean;
}> = ({ focusedId, onSelect, isPlaying, onTogglePlay, showInfo, onToggleInfo, onToggleFullscreen, useRealDist, onToggleRealDist, useRealSize, onToggleRealSize, showLocation, onToggleLocation, isMusicOn, onToggleMusic, simSpeed, onToggleSpeed, viewMoonPhase, onToggleMoonPhase, viewInnerLayers, onToggleInnerLayers, dayNightMode, onToggleDayNight, seasonsMode, onToggleSeasons, seasonProgress, setSeasonProgress, isFullscreen }) => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);
    const infoPanelRef = useRef<HTMLDivElement>(null);
    const infoButtonRef = useRef<HTMLButtonElement>(null);
    const [showDebugOverlay, setShowDebugOverlay] = useState(DEBUG_OVERLAY_ENABLED);

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

    // Debug overlay for orbital/rotation periods derived from current speeds
    const derivedFocused = focusedPlanet ? deriveAngularSpeeds(focusedPlanet) : null;
    const debugOrbitDays = derivedFocused ? (TWO_PI / derivedFocused.speed) / DAY_SECONDS : null;
    const debugRotationHours = derivedFocused ? (TWO_PI / Math.abs(derivedFocused.rotationSpeed)) / HOUR_SECONDS : null;
    // Always pull Moon orbit data when in Moon Phase mode or when Earth is focused
    const earthForMoonDebug = (viewMoonPhase || derivedFocused?.id === 'earth')
        ? (() => {
            const earthBase = PLANETS.find(p => p.id === 'earth');
            return earthBase ? deriveAngularSpeeds(earthBase) : null;
        })()
        : null;
    const moonDebug = earthForMoonDebug?.moons?.[0]
        ? {
            name: 'Moon',
            orbitDays: (TWO_PI / earthForMoonDebug.moons[0].speed) / DAY_SECONDS,
        }
        : null;
    const moonSynodicDays = moonDebug?.orbitDays && debugOrbitDays
        ? 1 / ((1 / moonDebug.orbitDays) - (1 / debugOrbitDays))
        : null;

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
                {isMobile && displayedPlanet && (
                    <button
                        onClick={onToggleInfo}
                        className="pointer-events-auto bg-black/40 backdrop-blur-md border border-white/10 text-white px-3 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 shadow-lg"
                    >
                        <span className="text-lg">ⓘ</span>
                    </button>
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
                                    onMouseEnter={() => setHoveredInfo(showInfo ? "Hide info (I)" : "Show info (I)")}
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
                            {focusedId === 'earth' && (
                                <button
                                    onClick={onToggleInnerLayers}
                                    onMouseEnter={() => setHoveredInfo(viewInnerLayers ? "Hide Earth Inner Layers" : "View Earth Inner Layers (L)")}
                                    onMouseLeave={() => setHoveredInfo(null)}
                                    className={`${viewInnerLayers ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] border-white' : 'bg-black/20 border-white/10 text-white'} backdrop-blur-md border px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/10 hover:text-white`}
                                >
                                    <span className="text-sm">🌍</span>
                                </button>
                            )}
                            {focusedId === 'earth' && (
                                <button
                                    onClick={onToggleDayNight}
                                    onMouseEnter={() => setHoveredInfo("Day & Night Demo - Why it’s day here and night somewhere else")}
                                    onMouseLeave={() => setHoveredInfo(null)}
                                    className={`${dayNightMode ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] border-white' : 'bg-black/20 border-white/10 text-white'} backdrop-blur-md border px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/10 hover:text-white`}
                                >
                                    <CloudSun size={16} />
                                </button>
                            )}
                            {focusedId === 'earth' && (
                                <button
                                    onClick={onToggleSeasons}
                                    onMouseEnter={() => setHoveredInfo("Seasons Mode - Why winter days are short")}
                                    onMouseLeave={() => setHoveredInfo(null)}
                                    className={`${seasonsMode ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] border-white' : 'bg-black/20 border-white/10 text-white'} backdrop-blur-md border px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/10 hover:text-white`}
                                >
                                    <Calendar size={16} />
                                </button>
                            )}
                            <button
                                onClick={() => { audioService.playClick(); onTogglePlay(); }}
                                onMouseEnter={() => setHoveredInfo("Pause/Resume Time (Space)")}
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
                                onMouseEnter={() => setHoveredInfo("Ambient space sound (M)")}
                                onMouseLeave={() => setHoveredInfo(null)}
                                className={`${isMusicOn ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] border-white' : 'bg-black/20 border-white/10 text-white'} backdrop-blur-md border px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/10 hover:text-white`}
                            >
                                <span className="text-sm">♬</span>
                            </button>
                            <button
                                onClick={onToggleSpeed}
                                onMouseEnter={() => setHoveredInfo("Toggle time speed (S)")}
                                onMouseLeave={() => setHoveredInfo(null)}
                                className="bg-black/20 backdrop-blur-md border border-white/10 text-white px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/10"
                            >
                                <span className="text-sm font-mono">{TIME_SPEEDS.find(s => s.value === simSpeed)?.label}</span>
                            </button>
                        </div>

                        {!isMobile && (
                            <button
                                onClick={onToggleFullscreen}
                                onMouseEnter={() => setHoveredInfo(isFullscreen ? "Exit fullscreen (F)" : "Enter fullscreen (F)")}
                                onMouseLeave={() => setHoveredInfo(null)}
                                className={`${isFullscreen ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] border-white' : 'bg-white/10 hover:bg-white/15 border-white/20 text-white'} backdrop-blur-md border px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg`}
                            >
                                <span className="text-lg">{isFullscreen ? '✕' : '⛶'}</span>
                            </button>
                        )}
                    </div>

                    {/* Desktop Season Slider - Floats near the controls when active */}
                    {!isMobile && seasonsMode && (
                        <div className="absolute top-20 right-4 w-64 bg-black/60 backdrop-blur-md rounded-xl p-4 border border-white/10 pointer-events-auto animate-in slide-in-from-right-4 duration-300">
                            <div className="flex justify-between text-[10px] text-gray-300 mb-2 font-medium tracking-wide">
                                <span>Dec</span>
                                <span>Mar</span>
                                <span>Jun</span>
                                <span>Sep</span>
                                <span>Dec</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="365"
                                value={seasonProgress}
                                onChange={(e) => setSeasonProgress(Number(e.target.value))}
                                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                            />
                            <div className="text-center text-white text-xs mt-2 font-mono border-t border-white/10 pt-2">
                                Day: {Math.floor(seasonProgress)}
                            </div>
                        </div>
                    )}
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
                            <Image src="/textures/Sun.jpg" alt="Sun" fill sizes="40px" className="object-cover" />
                        </div>
                        <span className="text-[10px] font-light text-white uppercase tracking-wider">Sun</span>
                    </button>
                    <div className="w-[1px] h-12 bg-white/10 mx-2"></div>
                    {PLANETS.map((planet) => (
                        <button key={planet.id} onClick={() => handleSelect(planet.id)} className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-300 border relative ${focusedId === planet.id ? 'border-white/40 bg-white/10 scale-105 -translate-y-1 shadow-xl z-10' : 'border-white/10 hover:bg-white/5 opacity-70 hover:opacity-100 hover:scale-105'}`}>
                            {/* Planet Texture for Buttons */}
                            <div className="w-8 h-8 rounded-full mb-1 shadow-md ring-1 ring-white/20 overflow-hidden relative" style={{ boxShadow: `0 0 10px ${planet.color}40` }}>
                                <Image src={planet.textureUrl} alt={planet.name} fill sizes="32px" className="object-cover" />
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

                                {/* Earth Inner Layers - Dedicated Button */}
                                <button onClick={onToggleInnerLayers} className={`w-full py-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${viewInnerLayers ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] border-white' : 'bg-white/5 border-white/10 text-gray-300'}`}>
                                    <span className="text-lg">🌍</span>
                                    <span className="text-sm font-medium">Earth Inner Layers</span>
                                </button>


                                {/* Day/Night Demo - Dedicated Button */}
                                <button onClick={onToggleDayNight} className={`w-full py-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${dayNightMode ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] border-white' : 'bg-white/5 border-white/10 text-gray-300'}`}>
                                    <CloudSun size={18} className={dayNightMode ? "fill-current" : ""} />
                                    <span className="text-sm font-medium">Day & Night Demo</span>
                                </button>

                                {/* Seasons Mode - Dedicated Button */}
                                <button onClick={onToggleSeasons} className={`w-full py-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${seasonsMode ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] border-white' : 'bg-white/5 border-white/10 text-gray-300'}`}>
                                    <Calendar size={18} />
                                    <span className="text-sm font-medium">Seasons: Winter Days</span>
                                </button>

                                {/* Season Progress Slider (only when Seasons Mode Active) */}
                                {seasonsMode && (
                                    <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/10">
                                        <div className="flex justify-between text-xs text-gray-300 mb-2">
                                            <span>Dec Solstice</span>
                                            <span>Mar Eq</span>
                                            <span>Jun Solstice</span>
                                            <span>Sep Eq</span>
                                            <span>Dec</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="365"
                                            value={seasonProgress}
                                            onChange={(e) => setSeasonProgress(Number(e.target.value))}
                                            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                                        />
                                        <div className="text-center text-white text-sm mt-1 font-mono">
                                            Day of Year: {Math.floor(seasonProgress)}
                                        </div>
                                    </div>
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
                                        <Image src="/textures/Sun.jpg" alt="Sun" fill sizes="32px" className="object-cover" />
                                    </div>
                                    <span className="text-[8px] font-light text-white uppercase">Sun</span>
                                </button>
                                {PLANETS.map((planet) => (
                                    <button key={planet.id} onClick={() => handleSelect(planet.id)} className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-300 border ${focusedId === planet.id ? 'border-white/40 bg-white/10' : 'border-white/10 bg-white/5'}`}>
                                        <div className="w-6 h-6 rounded-full mb-1 shadow-md ring-1 ring-white/20 overflow-hidden relative" style={{ boxShadow: `0 0 5px ${planet.color}40` }}>
                                            <Image src={planet.textureUrl} alt={planet.name} fill sizes="24px" className="object-cover" />
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

            {/* Debug overlay for quick physics sanity-check */}
            {DEBUG_OVERLAY_ENABLED && (
                <div className="fixed top-2 left-2 z-50 pointer-events-auto flex flex-col gap-2">
                    <button
                        onClick={() => setShowDebugOverlay(v => !v)}
                        className="bg-black/70 text-white text-[11px] px-3 py-2 rounded border border-white/10 shadow-lg hover:bg-black/80"
                    >
                        {showDebugOverlay ? 'Hide' : 'Show'} debug
                    </button>
                    {showDebugOverlay && (
                        <div className="bg-black/80 text-white text-[11px] px-3 py-2 rounded border border-white/10 shadow-lg space-y-2 min-w-[200px]">
                            {moonDebug && (
                                <div className="space-y-1">
                                    <div className="font-semibold">Moon debug</div>
                                    <div>Orbit: {moonDebug.orbitDays.toFixed(2)} days</div>
                                    {moonSynodicDays && (
                                        <div>Moon phase cycle: {moonSynodicDays.toFixed(2)} days</div>
                                    )}
                                </div>
                            )}
                            {derivedFocused && (
                                <div className="space-y-1">
                                    <div className="font-semibold">{derivedFocused.name} debug</div>
                                    {debugOrbitDays !== null && (
                                        <div>Orbit: {debugOrbitDays.toFixed(2)} days</div>
                                    )}
                                    {debugRotationHours !== null && (
                                        <div>Day: {debugRotationHours.toFixed(2)} hours</div>
                                    )}
                                </div>
                            )}
                            {!derivedFocused && !moonDebug && (
                                <div className="opacity-80">Select a planet or enable Moon phase</div>
                            )}
                            <div className="opacity-60">Speeds → periods (rad/s)</div>
                        </div>
                    )}
                </div>
            )}
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
    const [viewInnerLayers, setViewInnerLayers] = useState(false);
    const [dayNightMode, setDayNightMode] = useState(false);
    const [seasonsMode, setSeasonsMode] = useState(false);
    const [seasonProgress, setSeasonProgress] = useState(0); // 0 to 365
    const [zoomSignal, setZoomSignal] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [hoveredLayer, setHoveredLayer] = useState<InnerLayer | null>(null);
    const [selectedLayer, setSelectedLayer] = useState<InnerLayer | null>(null);
    const [isMobileViewport, setIsMobileViewport] = useState(false);
    const simTimeRef = useRef(0);

    const handleLayerSelect = useCallback((layer: InnerLayer | null) => {
        setSelectedLayer(prev => {
            if (!layer) return null;
            if (prev?.name === layer.name) {
                return null;
            }
            return layer;
        });
    }, []);

    useEffect(() => {
        if (!viewInnerLayers || focusedId !== 'earth') {
            setHoveredLayer(null);
            setSelectedLayer(null);
        }
    }, [viewInnerLayers, focusedId]);

    useEffect(() => {
        const updateViewport = () => {
            if (typeof window === 'undefined') return;
            setIsMobileViewport(window.innerWidth < 768);
        };
        updateViewport();
        window.addEventListener('resize', updateViewport);
        return () => window.removeEventListener('resize', updateViewport);
    }, []);

    // Audio Drone
    useEffect(() => {
        if (isMusicOn) audioService.startDrone();
        else audioService.stopDrone();
        return () => audioService.stopDrone();
    }, [isMusicOn]);

    // Sync season slider with simulation time when playing
    // Also sync simTimeRef when transitioning from slider-controlled to time-controlled
    const wasPlayingRef = useRef(isPlaying);
    useEffect(() => {
        if (!seasonsMode) return;

        // When resuming time, sync simTimeRef to match current slider position
        if (isPlaying && !wasPlayingRef.current) {
            const earthData = PLANETS.find(p => p.id === 'earth');
            if (earthData) {
                // Convert seasonProgress (day 0-365) to the angle
                const targetAngle = (seasonProgress / 365) * Math.PI * 2;
                // Solve for simTime: angle = (dist * 0.5) + (simTime * speed)
                // simTime = (angle - dist * 0.5) / speed
                const dist = earthData.distance;
                const newSimTime = (targetAngle - dist * 0.5) / earthData.speed;
                simTimeRef.current = newSimTime;
            }
        }
        wasPlayingRef.current = isPlaying;

        if (!isPlaying) return;

        // When playing, sync slider with Earth's position
        const syncInterval = setInterval(() => {
            const earthData = PLANETS.find(p => p.id === 'earth');
            if (earthData) {
                const dist = earthData.distance;
                const currentAngle = (dist * 0.5) + (simTimeRef.current * earthData.speed);
                const normalizedAngle = ((currentAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
                const dayOfYear = Math.floor((normalizedAngle / (Math.PI * 2)) * 365);
                setSeasonProgress(dayOfYear);
            }
        }, 100);

        return () => clearInterval(syncInterval);
    }, [seasonsMode, isPlaying, seasonProgress]);

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
            } else if (e.key === 'l' || e.key === 'L') {
                e.preventDefault();
                if (focusedId === 'earth') {
                    setViewInnerLayers(v => {
                        if (!v) {
                            setViewMoonPhase(false); // Turn off moon phase when enabling inner layers
                            setSimSpeed(60); // Force speed to 1m/s
                        }
                        return !v;
                    });
                }
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
        return PLANETS.map((p) => {
            const derived = deriveAngularSpeeds(p);
            return {
                ...derived,
                distance: useRealDist ? p.orbitAU * 30 : p.distance, // Scale AU by 30
                size: useRealSize ? (SUN_SIZE / 109) * p.radiusMultiplier : p.size, // Scale relative to Sun (Size 7)
                useRealDist,
                useRealSize
            };
        });
    }, [useRealDist, useRealSize]);

    const activeLayer = hoveredLayer || selectedLayer;

    return (
        <div ref={containerRef} className="w-full h-screen relative bg-black overflow-hidden select-none touch-action-none">

            <Canvas
                camera={{ position: [0, 60, 80], fov: 45, near: 0.1, far: 6000 }}
                dpr={[1, 2]}
                gl={{ antialias: true, toneMappingExposure: 1.2 }}
            >
                <Suspense fallback={null}>
                    <SimulationController isPlaying={isPlaying} speedMultiplier={simSpeed} simTimeRef={simTimeRef} />
                    <Stars radius={useRealDist ? 2000 : 200} depth={100} count={20000} factor={8} saturation={0} fade speed={0.3} />

                    <AsteroidBelt useRealDist={useRealDist} isPlaying={isPlaying} simTimeRef={simTimeRef} />
                    <Sun useRealSize={useRealSize} viewMoonPhase={viewMoonPhase} simTimeRef={simTimeRef} />
                    {dayNightMode && !seasonsMode && <SunlightBeams />}
                    {seasonsMode && <SeasonsOrbitMarkers distance={PLANETS.find(p => p.id === 'earth')?.distance || 26} />}
                    {activePlanets.map((planet) => (
                        <PlanetErrorBoundary key={planet.id} data={planet} simTimeRef={simTimeRef} onSelect={setFocusedId}>
                            <Planet
                                data={planet}
                                isFocused={focusedId === planet.id}
                                onSelect={setFocusedId}
                                simTimeRef={simTimeRef}
                                isPlaying={isPlaying}
                                userLocation={showLocation ? userLocation : null}
                                viewInnerLayers={viewInnerLayers}
                                onHoverLayer={setHoveredLayer}
                                currentHoveredLayerName={hoveredLayer?.name || null}
                                selectedLayerName={selectedLayer?.name || null}
                                onSelectLayer={handleLayerSelect}
                                dayNightMode={dayNightMode}
                                seasonsMode={seasonsMode}
                                overrideOrbitalAngle={seasonsMode && planet.id === 'earth' ? THREE.MathUtils.degToRad((seasonProgress / 365.0) * 360) : undefined}
                            />
                        </PlanetErrorBoundary>
                    ))}
                    <CameraManager focusedId={focusedId} useRealDist={useRealDist} useRealSize={useRealSize} simTimeRef={simTimeRef} viewMoonPhase={viewMoonPhase} zoomSignal={zoomSignal} seasonsMode={seasonsMode} overrideOrbitalAngle={seasonsMode ? THREE.MathUtils.degToRad((seasonProgress / 365.0) * 360) : undefined} />
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
                onToggleMoonPhase={() => {
                    if (!viewMoonPhase) setViewInnerLayers(false); // Turn off inner layers when enabling moon phase
                    setViewMoonPhase(!viewMoonPhase);
                }}
                viewInnerLayers={viewInnerLayers}
                onToggleInnerLayers={() => {
                    if (!viewInnerLayers) {
                        setViewMoonPhase(false); // Turn off moon phase when enabling inner layers
                        setSimSpeed(60); // Force speed to 1m/s
                    }
                    setViewInnerLayers(!viewInnerLayers);
                }}
                dayNightMode={dayNightMode}
                onToggleDayNight={() => {
                    if (seasonsMode) setSeasonsMode(false); // Disable seasons if day/night toggled
                    const newMode = !dayNightMode;
                    setDayNightMode(newMode);
                    if (newMode) {
                        if (focusedId !== 'earth') setFocusedId('earth');
                    }
                }}
                seasonsMode={seasonsMode}
                onToggleSeasons={() => {
                    if (dayNightMode) setDayNightMode(false); // Disable day/night if seasons toggled
                    if (viewMoonPhase) setViewMoonPhase(false);
                    if (viewInnerLayers) setViewInnerLayers(false);
                    const newMode = !seasonsMode;
                    setSeasonsMode(newMode);
                    if (newMode) {
                        if (focusedId !== 'earth') setFocusedId('earth');
                        // Calculate current orbital position and convert to day of year
                        const earthData = PLANETS.find(p => p.id === 'earth');
                        if (earthData) {
                            const dist = earthData.distance;
                            const currentAngle = (dist * 0.5) + (simTimeRef.current * earthData.speed);
                            // Normalize angle to 0-2PI and convert to day (0-365)
                            const normalizedAngle = ((currentAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
                            const dayOfYear = Math.floor((normalizedAngle / (Math.PI * 2)) * 365);
                            setSeasonProgress(dayOfYear);
                        }
                        setIsPlaying(false); // Pause time so user can explore with slider
                        setSimSpeed(3600); // Set to 1h/s for easier observation
                    } else {
                        setIsPlaying(true); // Resume time when exiting
                    }
                }}
                seasonProgress={seasonProgress}
                setSeasonProgress={setSeasonProgress}
                isFullscreen={isFullscreen}
            />

            {/* Layer Info Overlay - Fixed position, top-left, outside 3D canvas */}
            {viewInnerLayers && activeLayer && (
                <div
                    className={`fixed z-50 pointer-events-none animate-in fade-in ${isMobileViewport ? 'slide-in-from-bottom-2 bottom-6 left-1/2 -translate-x-1/2 transform' : 'slide-in-from-left-2 top-24 right-6'} duration-200`}
                >
                    <div className={`bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl p-5 ${isMobileViewport ? 'w-[90vw] max-w-sm' : 'w-64 max-w-xs'} text-white pointer-events-auto`}>
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.35em] text-white/60 mb-1">Earth Layer</p>
                                <h3 className="text-2xl font-light tracking-wide flex items-center gap-2">
                                    {activeLayer.name}
                                </h3>
                            </div>
                            <span
                                className="w-3 h-3 rounded-full mt-1.5 shadow-[0_0_12px_rgba(255,255,255,0.3)]"
                                style={{ backgroundColor: activeLayer.color }}
                            />
                        </div>
                        <p className="text-sm text-gray-300 italic font-light leading-relaxed">
                            {activeLayer.description}
                        </p>
                        {selectedLayer && activeLayer.name === selectedLayer.name && (
                            <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-3">
                                <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-200/80 mb-1">Focus Locked</p>
                                <p className="text-xs text-gray-200 leading-relaxed">
                                    Tap this layer again to bring the rest of Earth back into view.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
