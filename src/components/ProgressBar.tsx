import React from 'react';
import { Compass, CheckCircle2 } from 'lucide-react';

interface ProgressBarProps {
  currentQuestionIndex: number;
  totalQuestions: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentQuestionIndex,
  totalQuestions,
}) => {
  const currentStep = currentQuestionIndex + 1;

  return (
    <div className="w-full max-w-xl mx-auto my-1 px-2">
      {/* Top Label: "Soalan 1/3, Soalan 2/3, Soalan 3/3" */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-amber-600 animate-[spin_8s_linear_infinite]" />
          <span className="font-['Fredoka',sans-serif] text-sm sm:text-base font-bold tracking-wide text-amber-950 bg-amber-200/90 px-3 py-0.5 rounded-full border border-amber-400 shadow-xs">
            Soalan {currentStep}/{totalQuestions}
          </span>
        </div>
        <span className="text-xs font-bold text-slate-700 bg-white/80 px-2 py-0.5 rounded-full border border-sky-200">
          Langkah {currentStep} daripada {totalQuestions}
        </span>
      </div>

      {/* Progress Track */}
      <div className="relative flex items-center justify-between px-1">
        {/* Background Track Line */}
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-2 bg-sky-200 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-emerald-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (totalQuestions - 1 || 1)) * 100}%` }}
          />
        </div>

        {/* Step Nodes */}
        {Array.from({ length: totalQuestions }).map((_, index) => {
          const stepNum = index + 1;
          const isDone = index < currentQuestionIndex;
          const isCurrent = index === currentQuestionIndex;

          return (
            <div
              key={index}
              className="relative z-10 flex flex-col items-center"
            >
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm transition-all duration-300 border-2 ${
                  isCurrent
                    ? 'bg-amber-400 text-amber-950 border-amber-100 ring-3 ring-amber-300/70 scale-105'
                    : isDone
                    ? 'bg-emerald-500 text-white border-white'
                    : 'bg-white text-slate-400 border-sky-300'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <span>{stepNum}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
