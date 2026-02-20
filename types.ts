
export type Grade = 10 | 11 | 12 | 'all';

export interface Experiment {
  id: string;
  title: string;
  grade: 10 | 11 | 12;
  goal: string;
  theory: string;
  materials: string[];
  steps: string[];
  safetyInfo: string[];
  conclusion?: string;
  observation?: string;
  category: string;
  videoUrl?: string;
}

export interface ChemicalReaction {
  reagents: string[];
  products: string;
  equation: string;
  type: string;
  observation: string;
  color?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
