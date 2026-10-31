import { QuizQuestion, AnswerRecord } from './types.ts';

export const SUCCESS_MESSAGE = 'Betul! Tahniah, kamu berjaya!';
export const RETRY_MESSAGE = 'Cuba lagi! Fikirkan sama ada perkataan itu menerangkan cara atau perasaan.';
export const COMPLETION_TITLE = 'Tahniah, Pengembara! Kamu telah menyelesaikan Kuiz Pantas Paimon!';

export interface ValidationResult {
  isCorrect: boolean;
  message: string;
}

export function validateAnswer(question: QuizQuestion, selectedOptionIndex: number): ValidationResult {
  const isCorrect = selectedOptionIndex === question.correctOptionIndex;
  return {
    isCorrect,
    message: isCorrect ? SUCCESS_MESSAGE : RETRY_MESSAGE,
  };
}

export function calculateTotalScore(answers: Record<number, AnswerRecord>): number {
  return Object.values(answers).reduce((total, ans) => {
    // Murid mendapat 1 markah jika jawapannya betul
    return ans.isCorrect ? total + 1 : total;
  }, 0);
}

export interface ScoreAssessment {
  score: number;
  maxScore: number;
  percentage: number;
  title: string;
  badge: string;
  description: string;
  stars: number;
}

export function evaluateQuizPerformance(score: number, maxScore: number = 3): ScoreAssessment {
  const percentage = Math.round((score / maxScore) * 100);
  
  if (score === 3) {
    return {
      score,
      maxScore,
      percentage,
      title: 'Pakar Tatabahasa Sejati!',
      badge: 'Bintang Emas Anemo',
      description: 'Hebat sekali! Kamu menguasai perbezaan kata adjektif cara dan perasaan dengan cemerlang!',
      stars: 3,
    };
  } else if (score === 2) {
    return {
      score,
      maxScore,
      percentage,
      title: 'Pengembara Berbakat!',
      badge: 'Pingat Perak Pengembara',
      description: 'Pencapaian yang baik! Ulang kaji sedikit lagi nota kata adjektif untuk capai markah penuh 3/3!',
      stars: 2,
    };
  } else {
    return {
      score,
      maxScore,
      percentage,
      title: 'Pengembara Pemula!',
      badge: 'Lencana Semangat',
      description: 'Jangan berputus asa! Mari baca nota poket Paimon dan cuba lagi kuiz ini.',
      stars: 1,
    };
  }
}
