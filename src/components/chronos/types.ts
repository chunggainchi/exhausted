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

export interface LifeEvent {
    id: string;
    label: string;
    startDate: Date;
    endDate?: Date; // If missing, lasts until now or end of life? Let's say it has an end or is ongoing.
    color: string;
}

export interface LifeMilestone {
    id: string;
    label: string;
    date: Date;
    icon?: string; // e.g. "star", "heart", "graduation"
}

export interface TimeStats {
    totalUnits: number;
    passedUnits: number;
    percentage: number;
    currentUnitIndex: number; // 0-based index
    daysLeft: number; // Semantic meaning changes in Life mode (weeks left)
    currentUnitProgress: number; // 0-100
    label: string; // "Days Remaining" or "Weeks Remaining"
    events?: LifeEvent[];
    milestones?: LifeMilestone[];
    lifeExpectancy: number;
}

export interface QuoteData {
    text: string;
    author?: string;
}