import React, { useEffect } from 'react';
import { Trophy, Star, RotateCcw, CheckCircle2, XCircle, Award, BookOpen } from 'lucide-react';
import { QuizQuestion, AnswerRecord } from '../quiz/types.ts';
import { evaluateQuizPerformance, COMPLETION_TITLE } from '../quiz/quizLogic.ts';
import { sound } from '../utils/audio.ts';
import { CompanionAvatar } from './CompanionAvatar.tsx';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  questions: QuizQuestion[];
  answers: Record<number, AnswerRecord>;
  onRestart: () => void;
  onOpenStudyGuide: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  totalQuestions,
  questions,
  answers,
  onRestart,
  onOpenStudyGuide,
}) => {
  const assessment = evaluateQuizPerformance(score, totalQuestions);

  useEffect(() => {
    sound.playVictory();
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto bg-gradient-to-b from-[#fffef8] to-[#fbf6e8] border-3 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-2xl relative text-center">
      {/* Corner Ornaments */}
      <div className="absolute top-2 left-2 w-3.5 h-3.5 bg-amber-400 rotate-45 rounded-xs" />
      <div className="absolute top-2 right-2 w-3.5 h-3.5 bg-amber-400 rotate-45 rounded-xs" />
      <div className="absolute bottom-2 left-2 w-3.5 h-3.5 bg-amber-400 rotate-45 rounded-xs" />
      <div className="absolute bottom-2 right-2 w-3.5 h-3.5 bg-amber-400 rotate-45 rounded-xs" />

      {/* Celebrating Avatar with Speech */}
      <CompanionAvatar
        mood="celebrating"
        size="md"
        speechText={assessment.description}
      />

      {/* Main Completion Title (Required text) */}
      <div className="my-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold mb-1.5">
          <Trophy className="w-3.5 h-3.5 text-amber-600" />
          Misi Pengembaraan Tamat
        </div>
        <h1 className="font-['Fredoka',sans-serif] text-xl sm:text-2xl md:text-3xl font-extrabold text-amber-950 leading-tight">
          {COMPLETION_TITLE}
        </h1>
      </div>

      {/* Score Box: Total markah daripada 3 markah */}
      <div className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 p-0.5 rounded-2xl shadow-md my-4 max-w-xs mx-auto">
        <div className="bg-white rounded-[15px] py-3 px-5">
          <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
            Jumlah Markah Anda
          </span>
          <div className="flex items-center justify-center gap-2 my-0.5">
            <span className="font-['Fredoka',sans-serif] text-4xl sm:text-5xl font-black text-amber-600">
              {score}
            </span>
            <span className="font-['Fredoka',sans-serif] text-2xl font-bold text-slate-400">
              / {totalQuestions}
            </span>
            <span className="text-base font-bold text-slate-700 self-end mb-1">
              Markah
            </span>
          </div>

          {/* Stars */}
          <div className="flex items-center justify-center gap-1 my-1">
            {[1, 2, 3].map((starIndex) => {
              const isFilled = starIndex <= assessment.stars;
              return (
                <Star
                  key={starIndex}
                  className={`w-7 h-7 transition-all ${
                    isFilled
                      ? 'text-amber-400 fill-amber-400 filter drop-shadow-xs scale-105'
                      : 'text-slate-200 fill-slate-100'
                  }`}
                />
              );
            })}
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-full font-bold text-xs mt-1">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            {assessment.title}
          </div>
        </div>
      </div>

      {/* Review Questions Breakdown */}
      <div className="text-left bg-white/95 border-2 border-amber-200 rounded-2xl p-3 sm:p-4 my-4 shadow-xs">
        <h3 className="font-['Fredoka',sans-serif] text-sm sm:text-base font-bold text-slate-800 mb-2 flex items-center justify-between">
          <span>Semakan Soalan:</span>
          <span className="text-xs text-slate-500 font-normal">Tahun 4 Bahasa Melayu</span>
        </h3>
        <div className="space-y-2">
          {questions.map((q) => {
            const userAns = answers[q.id];
            const isUserCorrect = userAns?.isCorrect;
            const correctOpt = q.options[q.correctOptionIndex];

            return (
              <div
                key={q.id}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm"
              >
                <div className="flex items-start gap-2">
                  {isUserCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 leading-snug">
                    <p className="font-bold text-slate-900">
                      Soalan {q.id}: {q.question}
                    </p>
                    <p className="text-slate-600 mt-0.5">
                      Jawapan betul: <strong className="text-emerald-700">{correctOpt.label}. {correctOpt.text}</strong>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions: "Main Semula" & "Ulang Kaji Nota" */}
      <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
        <button
          onClick={() => {
            sound.playClick();
            onRestart();
          }}
          aria-label="Main Semula Kuiz"
          className="w-full sm:flex-1 py-3 px-5 rounded-2xl font-['Fredoka',sans-serif] text-base sm:text-lg font-bold text-white bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 shadow-md border-b-4 border-amber-900 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Main Semula</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onOpenStudyGuide();
          }}
          aria-label="Buka Nota Poket"
          className="w-full sm:w-auto py-3 px-4 rounded-2xl font-['Fredoka',sans-serif] text-sm sm:text-base font-bold text-slate-700 bg-white hover:bg-amber-50 border-2 border-amber-300 shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-amber-600" />
          <span>Nota Poket</span>
        </button>
      </div>
    </div>
  );
};
