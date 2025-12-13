module.exports = {

"[project]/src/components/solar/SolarSystem.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>SolarSystem)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-1eccaf1c.esm.js [app-ssr] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-1eccaf1c.esm.js [app-ssr] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Texture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Texture.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Text.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$OrbitControls$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/OrbitControls.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Stars$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Stars.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$web$2f$Loader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/web/Loader.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Preload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Preload.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
// --- CONSTANTS & DATA ---
// Using local texture assets
const TEXTURE_BASE = '/textures';
const PLANETS = [
    {
        id: 'mercury',
        name: 'Mercury',
        color: '#E0E0E0',
        size: 0.8,
        distance: 12,
        speed: 8.26e-7,
        rotationSpeed: 1.24e-6,
        textureUrl: `${TEXTURE_BASE}/Mercury.jpg`,
        travelTime: "~3 Months",
        inclination: 7.0,
        orbitAU: 0.39,
        radiusMultiplier: 0.38,
        description: "The smallest planet in our solar system.",
        funFact: "A year on Mercury is only 88 Earth days!",
        temp: "🔥🔥🔥",
        moonsCount: 0,
        realSize: "0.38x Earth"
    },
    {
        id: 'venus',
        name: 'Venus',
        color: '#E3BB76',
        size: 1.5,
        distance: 18,
        speed: 3.23e-7,
        rotationSpeed: -2.99e-7,
        textureUrl: `${TEXTURE_BASE}/Venus.jpg`,
        travelTime: "~4 Months",
        inclination: 3.4,
        orbitAU: 0.72,
        radiusMultiplier: 0.95,
        description: "The hottest planet.",
        funFact: "A day on Venus is longer than a year!",
        temp: "🔥🔥🔥🔥",
        moonsCount: 0,
        realSize: "0.95x Earth"
    },
    {
        id: 'earth',
        name: 'Earth',
        color: '#2233FF',
        size: 1.6,
        distance: 26,
        speed: 1.99e-7,
        rotationSpeed: 7.27e-5,
        textureUrl: `${TEXTURE_BASE}/Earth.jpg`,
        travelTime: "0",
        inclination: 0,
        orbitAU: 1.00,
        radiusMultiplier: 1.00,
        description: "Our home planet, the only known world with life.",
        funFact: "Earth is the only planet not named after a god!",
        temp: "🌿😎",
        moonsCount: 1,
        realSize: "1x Earth",
        moons: [
            {
                size: 0.45,
                distance: 3.5,
                speed: 2.66e-6,
                color: '#DDDDDD'
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
        rotationSpeed: 7.08e-5,
        textureUrl: `${TEXTURE_BASE}/Mars.jpg`,
        travelTime: "~7 Months",
        inclination: 1.85,
        orbitAU: 1.52,
        radiusMultiplier: 0.53,
        description: "The Red Planet.",
        funFact: "Mars has the tallest volcano in the solar system!",
        temp: "❄️",
        moonsCount: 2,
        realSize: "0.53x Earth"
    },
    {
        id: 'jupiter',
        name: 'Jupiter',
        color: '#D8CA9D',
        size: 4.5,
        distance: 55,
        speed: 1.67e-8,
        rotationSpeed: 1.76e-4,
        textureUrl: `${TEXTURE_BASE}/Jupiter.jpg`,
        travelTime: "~5 Years",
        inclination: 1.3,
        orbitAU: 5.20,
        radiusMultiplier: 11.2,
        description: "The largest planet in our solar system.",
        funFact: "You can fit 1,300 Earths inside Jupiter!",
        temp: "❄️❄️",
        moonsCount: 79,
        realSize: "11.2x Earth"
    },
    {
        id: 'saturn',
        name: 'Saturn',
        color: '#F4D03F',
        size: 3.8,
        distance: 75,
        speed: 6.75e-9,
        rotationSpeed: 1.64e-4,
        textureUrl: `${TEXTURE_BASE}/Saturn.jpg`,
        travelTime: "~7 Years",
        inclination: 2.5,
        orbitAU: 9.58,
        radiusMultiplier: 9.45,
        hasRings: true,
        description: "Lord of the Rings.",
        funFact: "Saturn could float in a giant bathtub!",
        temp: "❄️❄️❄️",
        moonsCount: 82,
        realSize: "9.45x Earth"
    },
    {
        id: 'uranus',
        name: 'Uranus',
        color: '#4FD0E7',
        size: 2.6,
        distance: 92,
        speed: 2.37e-9,
        rotationSpeed: -1.01e-4,
        textureUrl: `${TEXTURE_BASE}/Uranus.jpg`,
        travelTime: "~9 Years",
        inclination: 0.77,
        orbitAU: 19.2,
        radiusMultiplier: 4.0,
        description: "The Ice Giant.",
        funFact: "Uranus spins on its side like a ball.",
        temp: "❄️❄️❄️❄️",
        moonsCount: 27,
        realSize: "4.0x Earth"
    },
    {
        id: 'neptune',
        name: 'Neptune',
        color: '#2E5D9C',
        size: 2.5,
        distance: 110,
        speed: 1.20e-9,
        rotationSpeed: 1.08e-4,
        textureUrl: `${TEXTURE_BASE}/Neptune.jpg`,
        travelTime: "~12 Years",
        inclination: 1.77,
        orbitAU: 30.05,
        radiusMultiplier: 3.88,
        description: "The Windiest One.",
        funFact: "Neptune has the strongest winds in the solar system!",
        temp: "❄️❄️❄️❄️❄️",
        moonsCount: 14,
        realSize: "3.88x Earth"
    }
];
const TIME_SPEEDS = [
    {
        value: 1,
        label: '1s/s'
    },
    {
        value: 60,
        label: '1m/s'
    },
    {
        value: 3600,
        label: '1h/s'
    },
    {
        value: 86400,
        label: '1d/s'
    },
    {
        value: 604800,
        label: '1w/s'
    }
];
const SUN_SIZE = 7;
// --- AUDIO SERVICE ---
const audioService = new class {
    bgMusic = null;
    ctx = null;
    constructor(){
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
    }
    getContext() {
        if (!this.ctx && "undefined" !== 'undefined') {
            "TURBOPACK unreachable";
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
        this.bgMusic?.play().catch((e)=>console.warn("Audio autoplay blocked", e));
    }
    stopDrone() {
        this.bgMusic?.pause();
    }
}();
// --- SUB COMPONENTS ---
const Sun = ({ useRealSize })=>{
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const texture = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Texture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTexture"])(`${TEXTURE_BASE}/Sun.jpg`);
    const size = SUN_SIZE; // Sun size is constant, planets scale relative to it
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])((state, delta)=>{
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.05;
        }
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                intensity: 3.0,
                decay: 0,
                distance: useRealSize ? 5000 : 300,
                color: "#ffaa00"
            }, void 0, false, {
                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                lineNumber: 283,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                intensity: 0.3
            }, void 0, false, {
                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                lineNumber: 284,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("hemisphereLight", {
                intensity: 0.4,
                groundColor: "#000000",
                color: "#443355"
            }, void 0, false, {
                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                lineNumber: 285,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                ref: meshRef,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                        args: [
                            size,
                            64,
                            64
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                        lineNumber: 288,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        map: texture,
                        emissive: "#FFD700",
                        emissiveIntensity: 0.5,
                        emissiveMap: texture,
                        color: "#ffffff"
                    }, void 0, false, {
                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                        lineNumber: 289,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                lineNumber: 287,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                scale: [
                    1.2,
                    1.2,
                    1.2
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                        args: [
                            size,
                            32,
                            32
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                        lineNumber: 298,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: "#FF4500",
                        transparent: true,
                        opacity: 0.1,
                        depthWrite: false
                    }, void 0, false, {
                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                        lineNumber: 299,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                lineNumber: 297,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                position: [
                    0,
                    size + (useRealSize ? 10 : 2.5),
                    0
                ],
                fontSize: useRealSize ? 20 : 3,
                color: "white",
                anchorX: "center",
                anchorY: "middle",
                outlineWidth: 0.1,
                outlineColor: "#000000",
                children: "Sun"
            }, void 0, false, {
                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                lineNumber: 306,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/solar/SolarSystem.tsx",
        lineNumber: 281,
        columnNumber: 9
    }, this);
};
const AsteroidBelt = ({ useRealDist, isPlaying })=>{
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Nice mode: Between Mars (34) and Jupiter (55) -> 42-50.
    // Real mode: Between 2.2 AU (66) and 3.2 AU (96).
    const count = 1500;
    const dummy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Object3D"](), []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!meshRef.current) return;
        const minR = useRealDist ? 66 : 42;
        const maxR = useRealDist ? 96 : 50;
        for(let i = 0; i < count; i++){
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
    }, [
        dummy,
        useRealDist
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])((state, delta)=>{
        if (meshRef.current && isPlaying) {
            meshRef.current.rotation.y += delta * 0.02;
        }
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("instancedMesh", {
        ref: meshRef,
        args: [
            undefined,
            undefined,
            count
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dodecahedronGeometry", {
                args: [
                    1,
                    0
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                lineNumber: 359,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                color: "#666666",
                roughness: 0.8
            }, void 0, false, {
                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                lineNumber: 360,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/solar/SolarSystem.tsx",
        lineNumber: 358,
        columnNumber: 9
    }, this);
};
const Moon = ({ data, parentSize, simTimeRef, useRealDist, useRealSize })=>{
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const textureUrl = '/textures/Moon.jpg';
    const texture = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Texture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTexture"])(textureUrl);
    // Realistic Moon Scaling:
    // Size: ~27% of Earth (Parent)
    // Distance: ~60x Earth Radius (Parent Radius)
    // Only apply real distance scaling if BOTH dist and size are real, otherwise Moon flies off if parent is huge.
    const size = useRealSize ? parentSize * 0.27 : data.size;
    const distance = useRealDist && useRealSize ? parentSize * 60 : data.distance;
    // Calculate orbit geometry once
    const orbitCurve = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const radius = parentSize + distance; // Visual radius for the line
        const curve = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EllipseCurve"](0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
        const points = curve.getPoints(64);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]().setFromPoints(points).rotateX(-Math.PI / 2);
    }, [
        parentSize,
        distance
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])(()=>{
        if (ref.current) {
            const angle = simTimeRef.current * data.speed;
            ref.current.position.x = Math.cos(angle) * (parentSize + distance);
            ref.current.position.z = Math.sin(angle) * (parentSize + distance);
            // Tidal Locking: Moon always faces the planet (Parent)
            // Tidal Locking: Moon always faces the planet (Parent)
            // We must use the parent's WORLD position, because lookAt() expects world coords.
            // lookAt(0,0,0) was looking at the Sun (World Origin).
            if (ref.current.parent) {
                const parentWorldPos = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]();
                ref.current.parent.getWorldPosition(parentWorldPos);
                ref.current.lookAt(parentWorldPos);
            }
        }
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("lineLoop", {
                geometry: orbitCurve,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("lineBasicMaterial", {
                    attach: "material",
                    color: "#666",
                    transparent: true,
                    opacity: 0.3
                }, void 0, false, {
                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                    lineNumber: 409,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                lineNumber: 408,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: ref,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        rotation: [
                            0,
                            Math.PI * 1.5,
                            0
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                                args: [
                                    size,
                                    32,
                                    32
                                ]
                            }, void 0, false, {
                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                lineNumber: 414,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                map: texture,
                                roughness: 0.9,
                                color: "#ffffff"
                            }, void 0, false, {
                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                lineNumber: 415,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                        lineNumber: 413,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                        position: [
                            0,
                            size + 0.8,
                            0
                        ],
                        fontSize: 0.8,
                        color: "#ffffff",
                        anchorX: "center",
                        anchorY: "middle",
                        outlineWidth: 0.05,
                        outlineColor: "#000000",
                        children: "Moon"
                    }, void 0, false, {
                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                        lineNumber: 417,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                lineNumber: 412,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/solar/SolarSystem.tsx",
        lineNumber: 406,
        columnNumber: 9
    }, this);
};
const Planet = ({ data, isFocused, onSelect, simTimeRef, isPlaying, userLocation })=>{
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const orbitRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Apply Orbital Inclination
    const inclinationRad = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(data.inclination || 0);
    const texture = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Texture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTexture"])(data.textureUrl);
    const orbitCurve = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const points = [];
        for(let i = 0; i <= 128; i++){
            const angle = i / 128 * Math.PI * 2;
            points.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](Math.cos(angle) * data.distance, 0, Math.sin(angle) * data.distance));
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]().setFromPoints(points);
    }, [
        data.distance
    ]);
    const initialAngle = data.distance * 0.5;
    const isGasGiant = [
        'jupiter',
        'saturn',
        'uranus',
        'neptune'
    ].includes(data.id);
    const isEarth = data.id === 'earth';
    const roughness = isEarth ? 0.5 : isGasGiant ? 0.4 : 0.9;
    const metalness = isEarth ? 0.1 : 0.0;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])((state, delta)=>{
        if (orbitRef.current) {
            const time = simTimeRef.current;
            const angle = initialAngle + time * data.speed * 0.1;
            orbitRef.current.position.x = Math.cos(angle) * data.distance;
            orbitRef.current.position.z = Math.sin(angle) * data.distance;
            // Rotate planet based on sim time
            if (meshRef.current) {
                meshRef.current.rotation.y = time * data.rotationSpeed;
            }
        }
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        rotation: [
            inclinationRad,
            0,
            0
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("lineLoop", {
                geometry: orbitCurve,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("lineBasicMaterial", {
                    attach: "material",
                    color: isFocused ? "#aaa" : "#555",
                    transparent: true,
                    opacity: isFocused ? 0.6 : 0.4
                }, void 0, false, {
                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                    lineNumber: 476,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                lineNumber: 475,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: orbitRef,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                    onClick: (e)=>{
                        e.stopPropagation();
                        onSelect(data.id);
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                            position: [
                                0,
                                data.size + 1.8,
                                0
                            ],
                            fontSize: Math.max(1.5, data.size * 0.6),
                            color: "white",
                            anchorX: "center",
                            anchorY: "middle",
                            outlineWidth: 0.1,
                            outlineColor: "#000000",
                            children: data.name
                        }, void 0, false, {
                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                            lineNumber: 482,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            ref: meshRef,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                                    args: [
                                        data.size,
                                        64,
                                        64
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                    lineNumber: 495,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                    map: texture,
                                    metalness: metalness,
                                    roughness: roughness,
                                    emissive: isFocused ? "#111111" : "#000000",
                                    emissiveIntensity: isFocused ? 0.2 : 0
                                }, void 0, false, {
                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                    lineNumber: 496,
                                    columnNumber: 25
                                }, this),
                                data.id === 'earth' && userLocation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                                    position: [
                                        data.size * Math.cos(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(userLocation.lat)) * Math.sin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(userLocation.long + 90)),
                                        data.size * Math.sin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(userLocation.lat)),
                                        data.size * Math.cos(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(userLocation.lat)) * Math.cos(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(userLocation.long + 90))
                                    ],
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                                            args: [
                                                data.size * 0.03,
                                                16,
                                                16
                                            ]
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                            lineNumber: 509,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                                            color: "#ff0000",
                                            toneMapped: false
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                            lineNumber: 510,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                                            distance: data.size * 0.5,
                                            intensity: 5,
                                            color: "#ff0000"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                            lineNumber: 511,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                    lineNumber: 504,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                            lineNumber: 494,
                            columnNumber: 21
                        }, this),
                        isFocused && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                            intensity: 1.5,
                            distance: 50,
                            decay: 2,
                            color: "#ffffff"
                        }, void 0, false, {
                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                            lineNumber: 516,
                            columnNumber: 35
                        }, this),
                        (data.id === 'venus' || isGasGiant) && !isFocused && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            scale: [
                                1.05,
                                1.05,
                                1.05
                            ],
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                                    args: [
                                        data.size,
                                        32,
                                        32
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                    lineNumber: 520,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                                    color: data.color,
                                    transparent: true,
                                    opacity: 0.08,
                                    blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                                    side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BackSide"]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                    lineNumber: 521,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                            lineNumber: 519,
                            columnNumber: 25
                        }, this),
                        data.id === 'earth' && !isFocused && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            scale: [
                                1.03,
                                1.03,
                                1.03
                            ],
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                                    args: [
                                        data.size,
                                        64,
                                        64
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                    lineNumber: 534,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                    map: texture,
                                    transparent: true,
                                    opacity: 0.2,
                                    depthWrite: false,
                                    blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                    lineNumber: 535,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                            lineNumber: 533,
                            columnNumber: 25
                        }, this),
                        data.hasRings && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            rotation: [
                                -Math.PI / 3,
                                0,
                                0
                            ],
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ringGeometry", {
                                    args: [
                                        data.size * 1.4,
                                        data.size * 2.2,
                                        128
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                    lineNumber: 547,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                    color: data.color,
                                    side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoubleSide"],
                                    transparent: true,
                                    opacity: 0.7
                                }, void 0, false, {
                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                    lineNumber: 548,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                            lineNumber: 546,
                            columnNumber: 25
                        }, this),
                        data.moons?.map((moon, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Moon, {
                                data: moon,
                                parentSize: data.size,
                                simTimeRef: simTimeRef,
                                useRealDist: data.useRealDist || false,
                                useRealSize: data.useRealSize || false
                            }, idx, false, {
                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                lineNumber: 553,
                                columnNumber: 25
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                    lineNumber: 480,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                lineNumber: 479,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/solar/SolarSystem.tsx",
        lineNumber: 474,
        columnNumber: 9
    }, this);
};
// Fallback if textures fail
const PlanetFallback = ({ data, simTimeRef, onSelect })=>{
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const orbitRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const initialAngle = data.distance * 0.5;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])(()=>{
        if (orbitRef.current) {
            const time = simTimeRef.current;
            const angle = initialAngle + time * data.speed * 0.1;
            orbitRef.current.position.x = Math.cos(angle) * data.distance;
            orbitRef.current.position.z = Math.sin(angle) * data.distance;
            if (meshRef.current) meshRef.current.rotation.y += data.rotationSpeed;
        }
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: orbitRef,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                    onClick: (e)=>{
                        e.stopPropagation();
                        onSelect(data.id);
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                            position: [
                                0,
                                data.size + 1.8,
                                0
                            ],
                            fontSize: Math.max(1.2, data.size * 0.5),
                            color: "white",
                            anchorX: "center",
                            anchorY: "middle",
                            outlineWidth: 0.05,
                            outlineColor: "#000000",
                            children: data.name
                        }, void 0, false, {
                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                            lineNumber: 581,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            ref: meshRef,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                                    args: [
                                        data.size,
                                        64,
                                        64
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                    lineNumber: 593,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                                    color: data.color,
                                    metalness: 0.4,
                                    roughness: 0.3,
                                    clearcoat: 1,
                                    clearcoatRoughness: 0.1
                                }, void 0, false, {
                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                    lineNumber: 594,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                            lineNumber: 592,
                            columnNumber: 21
                        }, this),
                        data.hasRings && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            rotation: [
                                -Math.PI / 3,
                                0,
                                0
                            ],
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ringGeometry", {
                                    args: [
                                        data.size * 1.4,
                                        data.size * 2.2,
                                        64
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                    lineNumber: 604,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                    color: data.color,
                                    side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoubleSide"],
                                    transparent: true,
                                    opacity: 0.5
                                }, void 0, false, {
                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                    lineNumber: 605,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                            lineNumber: 603,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                    lineNumber: 580,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                lineNumber: 579,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                rotation: [
                    Math.PI / 2,
                    0,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ringGeometry", {
                        args: [
                            data.distance - 0.1,
                            data.distance + 0.1,
                            128
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                        lineNumber: 611,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: "#444",
                        side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoubleSide"],
                        transparent: true,
                        opacity: 0.2
                    }, void 0, false, {
                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                        lineNumber: 612,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                lineNumber: 610,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/solar/SolarSystem.tsx",
        lineNumber: 578,
        columnNumber: 9
    }, this);
};
class PlanetErrorBoundary extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Component {
    constructor(props){
        super(props);
        this.state = {
            hasError: false
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true
        };
    }
    componentDidCatch(error) {
        console.warn(`Texture failed for ${this.props.data.name}, switching to glossy mode.`);
    }
    render() {
        if (this.state.hasError) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanetFallback, {
                data: this.props.data,
                simTimeRef: this.props.simTimeRef,
                onSelect: this.props.onSelect
            }, void 0, false, {
                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                lineNumber: 630,
                columnNumber: 20
            }, this);
        }
        return this.props.children;
    }
}
const CameraManager = ({ focusedId, useRealDist, useRealSize, simTimeRef })=>{
    const { camera } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    const controlsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isTransitioning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const previousPlanetPos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]());
    // Trigger transition when focusedId changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        isTransitioning.current = true;
    }, [
        focusedId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])(()=>{
        if (!controlsRef.current) return;
        if (focusedId) {
            const planet = PLANETS.find((p)=>p.id === focusedId);
            if (planet) {
                // Calculate current position exactly as Planet component does
                const dist = useRealDist ? planet.orbitAU * 30 : planet.distance;
                const angle = dist * 0.5 + simTimeRef.current * planet.speed * 0.1;
                let x = Math.cos(angle) * dist;
                let z = Math.sin(angle) * dist;
                let y = 0;
                // Apply Inclination (Rotate around X axis)
                if (planet.inclination) {
                    const inc = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(planet.inclination);
                    y = -z * Math.sin(inc);
                    z = z * Math.cos(inc);
                }
                const planetPos = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](x, y, z);
                if (isTransitioning.current) {
                    // Fly to planet
                    const size = useRealSize ? SUN_SIZE / 109 * planet.radiusMultiplier : planet.size;
                    const viewDist = size * 3.0 + 3.0;
                    const offset = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](0, viewDist * 0.5, viewDist);
                    const idealPos = planetPos.clone().add(offset);
                    camera.position.lerp(idealPos, 0.08);
                    controlsRef.current.target.lerp(planetPos, 0.08);
                    if (camera.position.distanceTo(idealPos) < 0.5) {
                        isTransitioning.current = false;
                        previousPlanetPos.current.copy(planetPos);
                    }
                } else {
                    // Follow planet
                    // Move camera by the delta of planet movement
                    const delta = planetPos.clone().sub(previousPlanetPos.current);
                    if (delta.length() < 50) {
                        camera.position.add(delta);
                    }
                    controlsRef.current.target.copy(planetPos);
                    previousPlanetPos.current.copy(planetPos);
                }
            }
        } else {
            if (isTransitioning.current) {
                // Return to overview
                const maxD = useRealDist ? 2000 : 160;
                const resetPos = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](0, maxD * 0.8, maxD);
                const resetTarget = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0);
                camera.position.lerp(resetPos, 0.05);
                controlsRef.current.target.lerp(resetTarget, 0.05);
                if (camera.position.distanceTo(resetPos) < 1.0) isTransitioning.current = false;
            }
        }
        controlsRef.current.update();
    });
    const maxDistance = useRealDist ? 3000 : 300;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$OrbitControls$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrbitControls"], {
        ref: controlsRef,
        makeDefault: true,
        enableDamping: true,
        dampingFactor: 0.08,
        enableZoom: true,
        enablePan: true,
        enableRotate: true,
        minDistance: focusedId ? useRealDist ? 0.1 : 3 : 10,
        maxDistance: focusedId ? useRealDist ? 500 : 80 : maxDistance,
        rotateSpeed: 0.5,
        zoomSpeed: 0.8,
        panSpeed: 0.5
    }, void 0, false, {
        fileName: "[project]/src/components/solar/SolarSystem.tsx",
        lineNumber: 711,
        columnNumber: 9
    }, this);
};
const SimulationController = ({ isPlaying, speedMultiplier, simTimeRef })=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])((state, delta)=>{
        if (isPlaying) simTimeRef.current += delta * speedMultiplier;
    });
    return null;
};
const UI = ({ focusedId, onSelect, isPlaying, onTogglePlay, showInfo, onToggleInfo, onToggleFullscreen, useRealDist, onToggleRealDist, useRealSize, onToggleRealSize, showLocation, onToggleLocation, isMusicOn, onToggleMusic, simSpeed, onToggleSpeed })=>{
    const [showMobileMenu, setShowMobileMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hoveredInfo, setHoveredInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const focusedPlanet = PLANETS.find((p)=>p.id === focusedId);
    const isMobile = "undefined" !== 'undefined' && window.innerWidth < 768;
    const handleSelect = (id)=>{
        audioService.playClick();
        onSelect(id);
        setShowMobileMenu(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 pointer-events-none flex flex-col justify-between z-50 font-sans",
        children: [
            focusedPlanet && showInfo && isMobile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/80 backdrop-blur-md z-50 pointer-events-auto flex items-center justify-center p-6",
                onClick: ()=>onToggleInfo(),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-black/90 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-2xl max-w-md w-full",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-start mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-white text-2xl font-light tracking-wide",
                                    children: focusedPlanet.name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                    lineNumber: 778,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onToggleInfo(),
                                    className: "text-white/60 hover:text-white text-2xl",
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                    lineNumber: 779,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                            lineNumber: 777,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-300 text-sm italic mb-4 font-light",
                            children: [
                                '"',
                                focusedPlanet.description,
                                '"'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                            lineNumber: 781,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-3 text-xs text-gray-300 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-base",
                                            children: "🌡️"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                            lineNumber: 783,
                                            columnNumber: 70
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: focusedPlanet.temp
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                            lineNumber: 783,
                                            columnNumber: 108
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                    lineNumber: 783,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-base",
                                            children: "🌕"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                            lineNumber: 784,
                                            columnNumber: 70
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                focusedPlanet.moonsCount,
                                                " Moons"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                            lineNumber: 784,
                                            columnNumber: 107
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                    lineNumber: 784,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 col-span-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-base",
                                            children: "📏"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                            lineNumber: 785,
                                            columnNumber: 81
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: focusedPlanet.realSize
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                            lineNumber: 785,
                                            columnNumber: 118
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                    lineNumber: 785,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 col-span-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-base",
                                            children: "🚀"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                            lineNumber: 786,
                                            columnNumber: 81
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "Fly there: ",
                                                focusedPlanet.travelTime
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                            lineNumber: 786,
                                            columnNumber: 118
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                    lineNumber: 786,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                            lineNumber: 782,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3 bg-white/5 p-3 rounded-lg border border-white/10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-medium text-gray-400 uppercase block mb-1.5 tracking-wide",
                                    children: "Fun Fact"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                    lineNumber: 789,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-white font-light leading-relaxed",
                                    children: focusedPlanet.funFact
                                }, void 0, false, {
                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                    lineNumber: 790,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                            lineNumber: 788,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                    lineNumber: 773,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                lineNumber: 769,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 md:p-6 flex justify-between items-start pointer-events-auto gap-4",
                children: [
                    !isMobile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `transition-all duration-500 ${focusedPlanet && showInfo ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 pointer-events-none'} bg-black/40 backdrop-blur-md p-5 rounded-xl border border-white/10 shadow-2xl max-w-sm`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-white text-2xl font-light tracking-wide mb-3",
                                children: focusedPlanet?.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                lineNumber: 801,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-300 text-sm italic mb-4 font-light",
                                children: [
                                    '"',
                                    focusedPlanet?.description,
                                    '"'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                lineNumber: 804,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-3 text-xs text-gray-300 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-base",
                                                children: "🌡️"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                lineNumber: 806,
                                                columnNumber: 70
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: focusedPlanet?.temp
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                lineNumber: 806,
                                                columnNumber: 108
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                        lineNumber: 806,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-base",
                                                children: "🌕"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                lineNumber: 807,
                                                columnNumber: 70
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    focusedPlanet?.moonsCount,
                                                    " Moons"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                lineNumber: 807,
                                                columnNumber: 107
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                        lineNumber: 807,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-base",
                                                children: "📏"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                lineNumber: 808,
                                                columnNumber: 81
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: focusedPlanet?.realSize
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                lineNumber: 808,
                                                columnNumber: 118
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                        lineNumber: 808,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-base",
                                                children: "🚀"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                lineNumber: 809,
                                                columnNumber: 81
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Fly there: ",
                                                    focusedPlanet?.travelTime
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                lineNumber: 809,
                                                columnNumber: 118
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                        lineNumber: 809,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                lineNumber: 805,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 bg-white/5 p-3 rounded-lg border border-white/10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-medium text-gray-400 uppercase block mb-1.5 tracking-wide",
                                        children: "Fun Fact"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                        lineNumber: 812,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-white font-light leading-relaxed",
                                        children: focusedPlanet?.funFact
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                        lineNumber: 813,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                lineNumber: 811,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                        lineNumber: 800,
                        columnNumber: 21
                    }, this),
                    focusedPlanet && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onToggleInfo,
                        className: "bg-black/40 backdrop-blur-md border border-white/10 text-white px-3 py-2 md:px-4 md:py-3 rounded-lg hover:bg-white/10 transition-all duration-300 shadow-lg",
                        title: showInfo ? 'Hide Info' : 'Show Info',
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-lg md:text-xl",
                            children: showInfo ? '✕' : 'ⓘ'
                        }, void 0, false, {
                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                            lineNumber: 825,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                        lineNumber: 820,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                        lineNumber: 829,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-end gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden md:flex gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    audioService.playClick();
                                                    onTogglePlay();
                                                },
                                                onMouseEnter: ()=>setHoveredInfo("Pause/Resume Time"),
                                                onMouseLeave: ()=>setHoveredInfo(null),
                                                className: `${isPlaying ? 'bg-white/10 hover:bg-white/15' : 'bg-white/20 hover:bg-white/25'} backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-lg flex items-center justify-center w-5",
                                                        children: isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-1.5 h-4 bg-white rounded-sm"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                                    lineNumber: 840,
                                                                    columnNumber: 137
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-1.5 h-4 bg-white rounded-sm"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                                    lineNumber: 840,
                                                                    columnNumber: 190
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                            lineNumber: 840,
                                                            columnNumber: 109
                                                        }, this) : "▶︎"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                        lineNumber: 840,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-light tracking-wide",
                                                        children: isPlaying ? "Pause Time" : "Resume Time"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                        lineNumber: 841,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                lineNumber: 834,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: onToggleRealDist,
                                                onMouseEnter: ()=>setHoveredInfo("Scale distances to true reality (Planets far apart)"),
                                                onMouseLeave: ()=>setHoveredInfo(null),
                                                className: `${useRealDist ? 'bg-white/10 border-white/40' : 'bg-black/20 border-white/10'} backdrop-blur-md border text-white px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/10`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm",
                                                    children: "📏"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                    lineNumber: 850,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                lineNumber: 844,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: onToggleRealSize,
                                                onMouseEnter: ()=>setHoveredInfo("Scale planets to real relative sizes"),
                                                onMouseLeave: ()=>setHoveredInfo(null),
                                                className: `${useRealSize ? 'bg-white/10 border-white/40' : 'bg-black/20 border-white/10'} backdrop-blur-md border text-white px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/10`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm",
                                                    children: "⚪"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                    lineNumber: 858,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                lineNumber: 852,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: onToggleLocation,
                                                onMouseEnter: ()=>setHoveredInfo("Show my location on Earth"),
                                                onMouseLeave: ()=>setHoveredInfo(null),
                                                className: `${showLocation ? 'bg-white/10 border-white/40' : 'bg-black/20 border-white/10'} backdrop-blur-md border text-white px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/10`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm",
                                                    children: "⚲"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                    lineNumber: 866,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                lineNumber: 860,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: onToggleMusic,
                                                onMouseEnter: ()=>setHoveredInfo("Ambient Space Music"),
                                                onMouseLeave: ()=>setHoveredInfo(null),
                                                className: `${isMusicOn ? 'bg-white/10 border-white/40' : 'bg-black/20 border-white/10'} backdrop-blur-md border text-white px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/10`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm",
                                                    children: "♬"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                    lineNumber: 874,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                lineNumber: 868,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: onToggleSpeed,
                                                onMouseEnter: ()=>setHoveredInfo("Toggle Time Speed"),
                                                onMouseLeave: ()=>setHoveredInfo(null),
                                                className: "bg-black/20 backdrop-blur-md border border-white/10 text-white px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/10",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-mono",
                                                    children: TIME_SPEEDS.find((s)=>s.value === simSpeed)?.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                    lineNumber: 882,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                lineNumber: 876,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                        lineNumber: 833,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onToggleFullscreen,
                                        onMouseEnter: ()=>setHoveredInfo("Toggle Fullscreen"),
                                        onMouseLeave: ()=>setHoveredInfo(null),
                                        className: "bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-lg",
                                            children: "⛶"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                            lineNumber: 892,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                        lineNumber: 886,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                lineNumber: 832,
                                columnNumber: 21
                            }, this),
                            !isMobile && hoveredInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-md border border-white/20 shadow-xl tracking-wide font-light animate-in fade-in slide-in-from-top-1 duration-200",
                                children: hoveredInfo
                            }, void 0, false, {
                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                lineNumber: 896,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                        lineNumber: 831,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                lineNumber: 797,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden md:block pointer-events-auto bg-black/60 backdrop-blur-lg border-t border-white/10 overflow-x-auto pb-4 shadow-2xl",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3 p-4 min-w-max mx-auto justify-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleSelect(null),
                            className: `flex flex-col items-center justify-center w-20 h-20 rounded-xl transition-all duration-300 ${!focusedId ? 'bg-white/20 scale-105 ring-2 ring-white/30' : 'bg-white/5 hover:bg-white/10 border border-white/10'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 rounded-full mb-1 shadow-md ring-1 ring-white/20 overflow-hidden relative",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "/textures/Sun.jpg",
                                        alt: "Sun",
                                        className: "w-full h-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                        lineNumber: 909,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                    lineNumber: 908,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] font-light text-white uppercase tracking-wider",
                                    children: "Sun"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                    lineNumber: 911,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                            lineNumber: 906,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-[1px] h-12 bg-white/10 mx-2"
                        }, void 0, false, {
                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                            lineNumber: 913,
                            columnNumber: 21
                        }, this),
                        PLANETS.map((planet)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleSelect(planet.id),
                                className: `flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-300 border relative ${focusedId === planet.id ? 'border-white/40 bg-white/10 scale-105 -translate-y-1 shadow-xl z-10' : 'border-white/10 hover:bg-white/5 opacity-70 hover:opacity-100 hover:scale-105'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 rounded-full mb-1 shadow-md ring-1 ring-white/20 overflow-hidden relative",
                                        style: {
                                            boxShadow: `0 0 10px ${planet.color}40`
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: planet.textureUrl,
                                            alt: planet.name,
                                            className: "w-full h-full object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                            lineNumber: 918,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                        lineNumber: 917,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[9px] font-light text-white uppercase tracking-wide",
                                        children: planet.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                        lineNumber: 920,
                                        columnNumber: 29
                                    }, this),
                                    focusedId === planet.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -bottom-1.5 w-1 h-1 bg-white rounded-full animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                        lineNumber: 921,
                                        columnNumber: 57
                                    }, this)
                                ]
                            }, planet.id, true, {
                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                lineNumber: 915,
                                columnNumber: 25
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                    lineNumber: 905,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                lineNumber: 904,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden pointer-events-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowMobileMenu(!showMobileMenu),
                        className: "absolute bottom-4 right-4 bg-black/60 backdrop-blur-lg border border-white/20 text-white p-4 rounded-full shadow-2xl z-40",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-2xl",
                            children: showMobileMenu ? '✕' : '☰'
                        }, void 0, false, {
                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                            lineNumber: 934,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                        lineNumber: 930,
                        columnNumber: 17
                    }, this),
                    showMobileMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-20 right-4 bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl z-40",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-6 gap-2 mb-4 pb-4 border-b border-white/10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            audioService.playClick();
                                            onTogglePlay();
                                        },
                                        className: `col-span-1 flex flex-col items-center justify-center w-10 h-10 rounded-lg text-white ${isPlaying ? 'bg-white/20' : 'bg-white/5'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-lg flex items-center justify-center w-full h-full",
                                            children: isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-1 h-3 bg-white rounded-sm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                        lineNumber: 942,
                                                        columnNumber: 147
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-1 h-3 bg-white rounded-sm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                        lineNumber: 942,
                                                        columnNumber: 198
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                lineNumber: 942,
                                                columnNumber: 119
                                            }, this) : "▶︎"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                            lineNumber: 942,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                        lineNumber: 941,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onToggleRealDist,
                                        className: `col-span-1 flex flex-col items-center justify-center w-10 h-10 rounded-lg text-white ${useRealDist ? 'bg-white/20' : 'bg-white/5'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm",
                                            children: "📏"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                            lineNumber: 945,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                        lineNumber: 944,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onToggleRealSize,
                                        className: `col-span-1 flex flex-col items-center justify-center w-10 h-10 rounded-lg text-white ${useRealSize ? 'bg-white/20' : 'bg-white/5'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm",
                                            children: "⚪"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                            lineNumber: 948,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                        lineNumber: 947,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onToggleLocation,
                                        className: `col-span-1 flex flex-col items-center justify-center w-10 h-10 rounded-lg text-white ${showLocation ? 'bg-white/20' : 'bg-white/5'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm",
                                            children: "⚲"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                            lineNumber: 951,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                        lineNumber: 950,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onToggleMusic,
                                        className: `col-span-1 flex flex-col items-center justify-center w-10 h-10 rounded-lg text-white ${isMusicOn ? 'bg-white/20' : 'bg-white/5'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm",
                                            children: "♬"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                            lineNumber: 954,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                        lineNumber: 953,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onToggleSpeed,
                                        className: `col-span-1 flex flex-col items-center justify-center w-10 h-10 rounded-lg text-white bg-white/5`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-mono",
                                            children: TIME_SPEEDS.find((s)=>s.value === simSpeed)?.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                            lineNumber: 957,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                        lineNumber: 956,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                lineNumber: 940,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-3 gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleSelect(null),
                                        className: `flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-300 ${!focusedId ? 'bg-white/20 ring-2 ring-white/30' : 'bg-white/5 border border-white/10'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-8 h-8 rounded-full mb-1 shadow-md ring-1 ring-white/20 overflow-hidden relative",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: "/textures/Sun.jpg",
                                                    alt: "Sun",
                                                    className: "w-full h-full object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                    lineNumber: 963,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                lineNumber: 962,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[8px] font-light text-white uppercase",
                                                children: "Sun"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                lineNumber: 965,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                        lineNumber: 961,
                                        columnNumber: 29
                                    }, this),
                                    PLANETS.map((planet)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleSelect(planet.id),
                                            className: `flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-300 border ${focusedId === planet.id ? 'border-white/40 bg-white/10' : 'border-white/10 bg-white/5'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-6 h-6 rounded-full mb-1 shadow-md ring-1 ring-white/20 overflow-hidden relative",
                                                    style: {
                                                        boxShadow: `0 0 5px ${planet.color}40`
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: planet.textureUrl,
                                                        alt: planet.name,
                                                        className: "w-full h-full object-cover"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                        lineNumber: 970,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                    lineNumber: 969,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[8px] font-light text-white uppercase",
                                                    children: planet.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                                    lineNumber: 972,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, planet.id, true, {
                                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                            lineNumber: 968,
                                            columnNumber: 33
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                lineNumber: 960,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "https://exhaustedrocket.com",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "block mt-4 text-center text-[10px] text-white/40 hover:text-white transition-colors",
                                children: "Product of exhaustedrocket.com"
                            }, void 0, false, {
                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                lineNumber: 976,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/solar/SolarSystem.tsx",
                        lineNumber: 938,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                lineNumber: 928,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "https://exhaustedrocket.com",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "hidden md:block absolute bottom-1 right-2 text-[10px] text-white/20 hover:text-white/60 z-50 pointer-events-auto transition-colors",
                children: "Product of exhaustedrocket.com"
            }, void 0, false, {
                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                lineNumber: 984,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/solar/SolarSystem.tsx",
        lineNumber: 766,
        columnNumber: 9
    }, this);
};
function SolarSystem() {
    const [focusedId, setFocusedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showInfo, setShowInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [useRealDist, setUseRealDist] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [useRealSize, setUseRealSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showLocation, setShowLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [userLocation, setUserLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isMusicOn, setIsMusicOn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [simSpeed, setSimSpeed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(86400); // Default 1 Day/s
    const simTimeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    // Audio Drone
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isMusicOn) audioService.startDrone();
        else audioService.stopDrone();
        return ()=>audioService.stopDrone();
    }, [
        isMusicOn
    ]);
    // Prevent Browser Zoom on Trackpad
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleWheel = (e)=>{
            if (e.ctrlKey) e.preventDefault();
        };
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        return ()=>{
            if ("TURBOPACK compile-time falsy", 0) {
                "TURBOPACK unreachable";
            }
        };
    }, []);
    // Keyboard Navigation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleKeyDown = (e)=>{
            if (e.key === 'Escape') setFocusedId(null);
            else if (e.key === ' ') setIsPlaying((p)=>!p);
            else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                const idx = PLANETS.findIndex((p)=>p.id === focusedId);
                let nextIdx = 0;
                if (e.key === 'ArrowRight') nextIdx = idx === -1 ? 0 : (idx + 1) % PLANETS.length;
                else nextIdx = idx === -1 ? PLANETS.length - 1 : (idx - 1 + PLANETS.length) % PLANETS.length;
                setFocusedId(PLANETS[nextIdx].id);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return ()=>window.removeEventListener('keydown', handleKeyDown);
    }, [
        focusedId
    ]);
    const toggleLocation = ()=>{
        if (!showLocation) {
            if (typeof navigator !== 'undefined' && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos)=>{
                    setUserLocation({
                        lat: pos.coords.latitude,
                        long: pos.coords.longitude
                    });
                    setShowLocation(true);
                }, (err)=>{
                    console.warn("Geo error", err);
                    alert("Could not get location. Allow permissions.");
                });
            } else {
                alert("Geolocation not supported");
            }
        } else {
            setShowLocation(false);
        }
    };
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Calculate display data based on toggles
    const activePlanets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return PLANETS.map((p)=>({
                ...p,
                distance: useRealDist ? p.orbitAU * 30 : p.distance,
                size: useRealSize ? SUN_SIZE / 109 * p.radiusMultiplier : p.size,
                useRealDist,
                useRealSize
            }));
    }, [
        useRealDist,
        useRealSize
    ]);
    // Fullscreen handler
    const toggleFullscreen = ()=>{
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().then(()=>{
                // Attempt to lock orientation to landscape on mobile
                if (screen.orientation && 'lock' in screen.orientation) {
                    // @ts-ignore
                    screen.orientation.lock('landscape').catch((e)=>console.log('Orientation lock failed:', e));
                }
            }).catch((err)=>{
                console.log('Fullscreen error:', err);
            });
        } else {
            document.exitFullscreen();
            if (screen.orientation && 'unlock' in screen.orientation) {
                screen.orientation.unlock();
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "w-full h-screen relative bg-black overflow-hidden select-none touch-action-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
                camera: {
                    position: [
                        0,
                        60,
                        80
                    ],
                    fov: 45
                },
                dpr: [
                    1,
                    2
                ],
                gl: {
                    antialias: true,
                    toneMappingExposure: 1.2
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
                    fallback: null,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SimulationController, {
                            isPlaying: isPlaying,
                            speedMultiplier: simSpeed,
                            simTimeRef: simTimeRef
                        }, void 0, false, {
                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                            lineNumber: 1096,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Stars$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Stars"], {
                            radius: useRealDist ? 2000 : 200,
                            depth: 100,
                            count: 20000,
                            factor: 8,
                            saturation: 0,
                            fade: true,
                            speed: 0.3
                        }, void 0, false, {
                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                            lineNumber: 1097,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AsteroidBelt, {
                            useRealDist: useRealDist,
                            isPlaying: isPlaying
                        }, void 0, false, {
                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                            lineNumber: 1099,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Sun, {
                            useRealSize: useRealSize
                        }, void 0, false, {
                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                            lineNumber: 1100,
                            columnNumber: 21
                        }, this),
                        activePlanets.map((planet)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanetErrorBoundary, {
                                data: planet,
                                simTimeRef: simTimeRef,
                                onSelect: setFocusedId,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Planet, {
                                    data: planet,
                                    isFocused: focusedId === planet.id,
                                    onSelect: setFocusedId,
                                    simTimeRef: simTimeRef,
                                    isPlaying: isPlaying,
                                    userLocation: showLocation ? userLocation : null
                                }, void 0, false, {
                                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                    lineNumber: 1103,
                                    columnNumber: 29
                                }, this)
                            }, planet.id, false, {
                                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                                lineNumber: 1102,
                                columnNumber: 25
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CameraManager, {
                            focusedId: focusedId,
                            useRealDist: useRealDist,
                            useRealSize: useRealSize,
                            simTimeRef: simTimeRef
                        }, void 0, false, {
                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                            lineNumber: 1113,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Preload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Preload"], {
                            all: true
                        }, void 0, false, {
                            fileName: "[project]/src/components/solar/SolarSystem.tsx",
                            lineNumber: 1114,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/solar/SolarSystem.tsx",
                    lineNumber: 1095,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                lineNumber: 1090,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$web$2f$Loader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Loader"], {}, void 0, false, {
                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                lineNumber: 1117,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UI, {
                focusedId: focusedId,
                onSelect: setFocusedId,
                isPlaying: isPlaying,
                onTogglePlay: ()=>setIsPlaying(!isPlaying),
                showInfo: showInfo,
                onToggleInfo: ()=>setShowInfo(!showInfo),
                onToggleFullscreen: toggleFullscreen,
                showLocation: showLocation,
                onToggleLocation: toggleLocation,
                isMusicOn: isMusicOn,
                onToggleMusic: ()=>setIsMusicOn(!isMusicOn),
                simSpeed: simSpeed,
                onToggleSpeed: ()=>{
                    const currentIndex = TIME_SPEEDS.findIndex((s)=>s.value === simSpeed);
                    const nextIndex = (currentIndex + 1) % TIME_SPEEDS.length;
                    setSimSpeed(TIME_SPEEDS[nextIndex].value);
                },
                useRealDist: useRealDist,
                onToggleRealDist: ()=>setUseRealDist(!useRealDist),
                useRealSize: useRealSize,
                onToggleRealSize: ()=>setUseRealSize(!useRealSize)
            }, void 0, false, {
                fileName: "[project]/src/components/solar/SolarSystem.tsx",
                lineNumber: 1118,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/solar/SolarSystem.tsx",
        lineNumber: 1088,
        columnNumber: 9
    }, this);
}
}}),

};

//# sourceMappingURL=src_components_solar_SolarSystem_tsx_4508b15a._.js.map