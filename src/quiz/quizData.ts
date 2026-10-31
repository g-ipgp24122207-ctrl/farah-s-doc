import { QuizQuestion } from './types.ts';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Apakah jenis kata adjektif bagi perkataan “gembira”?',
    targetWord: 'gembira',
    categoryPrompt: 'Kenal pasti jenis kata adjektif bagi perkataan di atas.',
    options: [
      { id: '1A', label: 'A', text: 'Kata adjektif cara' },
      { id: '1B', label: 'B', text: 'Kata adjektif perasaan' },
    ],
    correctOptionIndex: 1,
    explanation: '“Gembira” merujuk kepada keadaan emosi atau suasana hati seseorang. Oleh itu, ia tergolong dalam kata adjektif perasaan.',
    type: 'perasaan',
  },
  {
    id: 2,
    question: 'Yang manakah merupakan kata adjektif cara?',
    categoryPrompt: 'Pilih perkataan yang menerangkan cara atau ragam perbuatan dilakukan.',
    options: [
      { id: '2A', label: 'A', text: 'Sedih' },
      { id: '2B', label: 'B', text: 'Pantas' },
      { id: '2C', label: 'C', text: 'Bangga' },
    ],
    correctOptionIndex: 1,
    explanation: '“Pantas” menerangkan cara sesuatu perbuatan dilakukan (seperti kuda berlari pantas). Manakala “sedih” dan “bangga” ialah kata adjektif perasaan.',
    type: 'cara',
  },
  {
    id: 3,
    question: 'Yang manakah merupakan kata adjektif perasaan?',
    categoryPrompt: 'Pilih perkataan yang menerangkan emosi atau rasa di dalam jiwa.',
    options: [
      { id: '3A', label: 'A', text: 'Perlahan' },
      { id: '3B', label: 'B', text: 'Gopoh' },
      { id: '3C', label: 'C', text: 'Bimbang' },
    ],
    correctOptionIndex: 2,
    explanation: '“Bimbang” menerangkan perasaan resah atau gelisah. Manakala “perlahan” dan “gopoh” menerangkan cara perbuatan dilakukan (kata adjektif cara).',
    type: 'perasaan',
  },
];

export const STUDY_NOTES = {
  cara: {
    title: 'Kata Adjektif Cara',
    description: 'Menerangkan kelakuan atau ragam bagaimana sesuatu perbuatan dilakukan.',
    examples: ['pantas', 'perlahan', 'gopoh', 'laju', 'cermat', 'senyap'],
    sampleSentence: 'Kuda pengembara itu berlari pantas menuju ke kota Mondstadt.',
    keyword: 'CARA / RAGAM',
  },
  perasaan: {
    title: 'Kata Adjektif Perasaan',
    description: 'Menerangkan emosi, naluri, atau rasa hati manusia.',
    examples: ['gembira', 'sedih', 'bimbang', 'bangga', 'takut', 'sayang'],
    sampleSentence: 'Paimon berasa amat gembira setelah menjumpai peti harta karun.',
    keyword: 'EMOSI / RASA HATI',
  },
};
