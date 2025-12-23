export interface Word {
  id: string;
  theme: string;
  themes?: string[]; // Optional extra themes
  photo: string;
  yue: string; // Cantonese
  de: string;  // German
  en: string;  // English
}

export interface Theme {
  id: string;
  label: string;
  emoji: string;
}

export type ViewState = 'home' | 'cards' | 'quiz' | 'game';