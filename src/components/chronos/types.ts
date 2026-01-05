export enum ViewMode {
    Day = 'DAY',
    Week = 'WEEK',
    Life = 'LIFE'
}

export interface ThemeConfig {
    name: string;
    textGradient: string;
    hue: number;
    saturation: number;
    pulseColor: string;
}

export interface TimeStats {
    totalUnits: number;
    passedUnits: number;
    percentage: number;
    currentUnitIndex: number; // 0-based index
    daysLeft: number; // Semantic meaning changes in Life mode (weeks left)
    currentUnitProgress: number; // 0-100
    label: string; // "Days Remaining" or "Weeks Remaining"
}

export interface QuoteData {
    text: string;
    author?: string;
}