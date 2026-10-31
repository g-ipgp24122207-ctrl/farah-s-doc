import React from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import { QuizQuestion, AnswerRecord } from '../quiz/types.ts';
import { SUCCESS_MESSAGE, RETRY_MESSAGE } from '../quiz/quizLogic.ts';
import { sound } from '../utils/audio.ts';

interface QuizCardProps {
  question: QuizQuestion;
  currentAnswer?: AnswerRecord;
  onSelectOption: (optionIndex: number) => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  currentAnswer,
  onSelectOption,
  onNextQuestion,
  isLastQuestion,
}) => {
  const hasAnswered = currentAnswer !== undefined;
  const isCorrect = currentAnswer?.isCorrect ?? false;

  const handleOptionClick = (idx: number) => {
    sound.playClick();
    onSelectOption(idx);
    if (idx === question.correctOptionIndex) {
      sound.playCorrect();
    } else {
      sound.playRetry();
    }
  };

  const handleNextClick = () => {
    sound.playClick();
    onNextQuestion();
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-gradient-to-b from-[#fffef8] to-[#fbf7ea] border-3 border-amber-300 rounded-3xl p-4 sm:p-6 shadow-xl relative transition-all">
      {/* Ornate Corner Accents */}
      <div className="absolute top-2 left-2 w-3 h-3 bg-amber-400 rotate-45 rounded-xs" />
      <div className="absolute top-2 right-2 w-3 h-3 bg-amber-400 rotate-45 rounded-xs" />
      <div className="absolute bottom-2 left-2 w-3 h-3 bg-amber-400 rotate-45 rounded-xs" />
      <div className="absolute bottom-2 right-2 w-3 h-3 bg-amber-400 rotate-45 rounded-xs" />

      {/* Category Hint / Header Badge */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Cabaran Soalan {question.id}
        </span>
        <span className="text-xs text-slate-500 font-semibold">
          {question.options.length} Pilihan Jawapan
        </span>
      </div>

      {/* Main Question Text */}
      <div className="mb-4">
        <h2 className="font-['Fredoka',sans-serif] text-lg sm:text-xl md:text-2xl font-bold text-slate-800 leading-snug">
          {question.question}
        </h2>
        {question.targetWord && (
          <div className="mt-1.5 py-1 px-3 bg-sky-50 border-2 border-dashed border-sky-300 rounded-xl inline-flex items-center gap-2">
            <span className="text-xs text-sky-800 uppercase font-bold tracking-wider">
              Perkataan:
            </span>
            <span className="font-['Fredoka',sans-serif] text-xl sm:text-2xl font-extrabold text-sky-900 tracking-wide">
              “{question.targetWord}”
            </span>
          </div>
        )}
      </div>

      {/* Answer Options List */}
      <div className="space-y-2.5 mb-4">
        {question.options.map((opt, idx) => {
          const isSelected = currentAnswer?.selectedIndex === idx;
          const isThisCorrect = idx === question.correctOptionIndex;

          let buttonStyle = 'bg-white hover:bg-amber-50/80 text-slate-800 border-2 border-amber-200 hover:border-amber-400 hover:shadow-xs';
          let badgeStyle = 'bg-amber-100 text-amber-900 border-amber-300';

          if (hasAnswered) {
            if (isSelected) {
              if (isCorrect) {
                buttonStyle = 'bg-emerald-50 text-emerald-950 border-3 border-emerald-500 shadow-md ring-2 ring-emerald-300';
                badgeStyle = 'bg-emerald-500 text-white border-emerald-600';
              } else {
                buttonStyle = 'bg-rose-50 text-rose-950 border-2 border-rose-400 shadow-xs';
                badgeStyle = 'bg-rose-400 text-white border-rose-500';
              }
            } else if (isCorrect && isThisCorrect) {
              buttonStyle = 'bg-emerald-50/60 text-emerald-900 border-2 border-emerald-400';
              badgeStyle = 'bg-emerald-400 text-white border-emerald-500';
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleOptionClick(idx)}
              aria-label={`Pilihan ${opt.label}: ${opt.text}`}
              className={`w-full text-left p-3 sm:p-3.5 rounded-2xl flex items-center justify-between gap-3 transition-all cursor-pointer font-semibold text-base sm:text-lg select-none active:scale-[0.99] ${buttonStyle}`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-['Fredoka',sans-serif] font-bold text-sm sm:text-base border-2 shrink-0 transition-colors ${badgeStyle}`}
                >
                  {opt.label}
                </span>
                <span className="font-['Fredoka',sans-serif] font-medium text-slate-900">
                  {opt.text}
                </span>
              </div>

              {/* Status Icons */}
              {hasAnswered && isSelected && (
                <div className="shrink-0">
                  {isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-xs sm:text-sm bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                      <CheckCircle2 className="w-4 h-4" />
                      Betul!
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-rose-700 font-bold text-xs sm:text-sm bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-300">
                      <AlertCircle className="w-4 h-4" />
                      Cuba Lagi
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Immediate Feedback Banner */}
      {hasAnswered && (
        <div
          className={`p-3 rounded-2xl border-2 mb-3 animate-fade-in transition-all ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
              : 'bg-amber-50 border-amber-400 text-amber-950'
          }`}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-2.5">
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-['Fredoka',sans-serif] text-sm sm:text-base font-bold">
                {isCorrect ? SUCCESS_MESSAGE : RETRY_MESSAGE}
              </p>
              <p className="text-xs sm:text-sm text-slate-700 mt-0.5 font-medium">
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Footer: "Soalan Seterusnya" button */}
      {hasAnswered && (
        <div className="pt-1">
          <button
            onClick={handleNextClick}
            aria-label={isLastQuestion ? 'Lihat Keputusan Kuiz' : 'Soalan Seterusnya'}
            className="w-full py-3.5 px-5 rounded-2xl font-['Fredoka',sans-serif] text-base sm:text-lg font-bold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 shadow-md border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isLastQuestion ? 'Lihat Keputusan Kuiz' : 'Soalan Seterusnya'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
