export type AdjectiveType = 'cara' | 'perasaan';

export interface QuizOption {
  id: string;
  label: string;
  text: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  targetWord?: string;
  categoryPrompt: string;
  options: QuizOption[];
  correctOptionIndex: number;
  explanation: string;
  type: AdjectiveType;
}

export interface AnswerRecord {
  questionId: number;
  selectedIndex: number;
  isCorrect: boolean;
  attempts: number;
}

export type QuizView = 'intro' | 'quiz' | 'result';
