import { ArmConfig, Point, WordConfig } from './types';

// SVG Viewport Dimensions
export const VIEW_WIDTH = 1200; // Increased width to fit full train
export const VIEW_HEIGHT = 500;
export const FLOOR_Y = 450;

// Arm Configuration
export const ARM_CONFIG: ArmConfig = {
  // Shoulder is now the PIVOT point (35px above floor)
  // Centered relative to new width (was 400)
  shoulder: { x: 500, y: 415 }, 
  l1: 160, 
  l2: 140,
  wristLength: 40
};

// Locations
// Shifted to accommodate wider view and centered composition
export const PRINTER_POS: Point = { x: 250, y: 390 }; // Where blocks spawn
export const HOME_POS: Point = { x: 500, y: 200 }; // Hover position
export const WAGON_START_X = 640;
export const WAGON_Y_OFFSET = 405; // Height where block sits on the flatbed
export const WAGON_SPACING = 80;

// Game Data
export const GERMAN_WORDS: WordConfig[] = [
  { word: "AUTO" },
  { word: "BALL" },
  { word: "ZUG" },
  { word: "BAUM" },
  { word: "MAUS" },
  { word: "EULE" },
  { word: "OMA" },
  { word: "OPA" },
  { word: "EIS" }, 
  { word: "BAD" },
  { word: "DU" },
  { word: "ICH" },
  { word: "BILD" },
  { word: "POPO" },
  { word: "HUND" },
  { word: "BEIN" },
  { word: "EIN" },
  { word: "JA" },
  { word: "NEIN" },
  { word: "HALLO" },
];

// Extract strings for the default settings template
export const DEFAULT_WORDS: string[] = GERMAN_WORDS.map(w => w.word);

export const QWERTZ_LAYOUT = [
  ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'Ü'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ö', 'Ä'],
  ['Y', 'X', 'C', 'V', 'B', 'N', 'M'],
];

export const KEY_MAPPING: Record<string, string> = {
  'Ä': 'AE',
  'Ö': 'OE',
  'Ü': 'UE',
  'ß': 'SS',
};

// Visual Palette - Premium Educational Theme
export const COLORS = {
  background: "#0f172a", // Slate 950 - Deep rich blue-black
  floor: "#334155",      // Slate 700
  grid: "#1e293b",       // Slate 800
  robot: {
    base: "#475569",     // Slate 600
    baseStroke: "#1e293b",
    limb: "#e2e8f0",     // Slate 200 - Clean light grey
    limbStroke: "#94a3b8", // Slate 400 - Soft contour
    joint: "#fbbf24",    // Amber 400 - Friendly orange
    jointStroke: "#d97706", // Amber 600
    claw: "#94a3b8",     // Slate 400
  },
  blocks: {
    pending: "#fcd34d", // Amber 300 - Bright & inviting
    loaded: "#67e8f9",  // Cyan 300 - Cool & fresh
    held: "#f9a8d4",    // Pink 300 - Distinct active state
    text: "#1e293b"     // Dark Slate
  },
  ui: {
    text: "#34d399",    // Emerald 400 - Soft Matrix
    accent: "#22d3ee"   // Cyan 400
  }
};