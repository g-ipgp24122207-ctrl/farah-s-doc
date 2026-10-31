/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { FantasyBackground } from './components/FantasyBackground.tsx';
import { QuizHeader } from './components/QuizHeader.tsx';
import { ProgressBar } from './components/ProgressBar.tsx';
import { CompanionAvatar, CompanionMood } from './components/CompanionAvatar.tsx';
import { QuizCard } from './components/QuizCard.tsx';
import { ResultScreen } from './components/ResultScreen.tsx';
import { StudyGuideModal } from './components/StudyGuideModal.tsx';
import { QUIZ_QUESTIONS } from './quiz/quizData.ts';
import { AnswerRecord, QuizView } from './quiz/types.ts';
import { calculateTotalScore, SUCCESS_MESSAGE, RETRY_MESSAGE } from './quiz/quizLogic.ts';
import { sound } from './utils/audio.ts';

export default function App() {
  const [view, setView] = useState<QuizView>('quiz');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, AnswerRecord>>({});
  const [isStudyGuideOpen, setIsStudyGuideOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => sound.getMuted());
  const [isBgmEnabled, setIsBgmEnabled] = useState<boolean>(() => sound.getIsBgmEnabled());

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion?.id];

  // Companion mood and speech bubble determination
  let companionMood: CompanionMood = 'neutral';
  let companionSpeech = 'Hai Pengembara cilik! Mari bantu Paimon kenal pasti kata adjektif!';

  if (view === 'quiz' && currentQuestion) {
    if (currentAnswer) {
      if (currentAnswer.isCorrect) {
        companionMood = 'happy';
        companionSpeech = SUCCESS_MESSAGE;
      } else {
        companionMood = 'thinking';
        companionSpeech = RETRY_MESSAGE;
      }
    } else {
      companionMood = 'neutral';
      companionSpeech = `Soalan ${currentQuestion.id}: ${currentQuestion.categoryPrompt}`;
    }
  }

  // Handle Option Selection
  const handleSelectOption = (optionIndex: number) => {
    const isCorrect = optionIndex === currentQuestion.correctOptionIndex;
    const existingAnswer = answers[currentQuestion.id];
    const attempts = (existingAnswer?.attempts || 0) + 1;

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        selectedIndex: optionIndex,
        isCorrect,
        attempts,
      },
    }));
  };

  // Handle Next Question or Finish
  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setView('result');
    }
  };

  // Restart Quiz
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setView('quiz');
  };

  // Toggle Sound
  const handleToggleMute = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  };

  // Toggle Background Music
  const handleToggleBgm = () => {
    const nextBgm = sound.toggleBgm();
    setIsBgmEnabled(nextBgm);
  };

  // Keyboard shortcut listener
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isStudyGuideOpen) return;

      if (view === 'quiz' && currentQuestion) {
        const key = e.key.toUpperCase();
        if (key === 'A' || key === '1') {
          if (currentQuestion.options.length > 0) handleSelectOption(0);
        } else if (key === 'B' || key === '2') {
          if (currentQuestion.options.length > 1) handleSelectOption(1);
        } else if (key === 'C' || key === '3') {
          if (currentQuestion.options.length > 2) handleSelectOption(2);
        } else if (key === 'ENTER' && currentAnswer) {
          handleNextQuestion();
        }
      }
    },
    [view, currentQuestion, currentAnswer, isStudyGuideOpen]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const totalScore = calculateTotalScore(answers);

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-amber-200">
      {/* Dynamic Animated Fantasy Backdrop */}
      <FantasyBackground />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-start pb-6">
        {/* Header */}
        <QuizHeader
          isMuted={isMuted}
          isBgmEnabled={isBgmEnabled}
          onToggleMute={handleToggleMute}
          onToggleBgm={handleToggleBgm}
          onOpenStudyGuide={() => setIsStudyGuideOpen(true)}
        />

        {/* Views */}
        <main className="w-full px-3 sm:px-4 mt-1">
          {view === 'quiz' && (
            <div className="max-w-xl mx-auto space-y-2">
              {/* Progress Indicator: Soalan 1/3, Soalan 2/3, Soalan 3/3 */}
              <ProgressBar
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={QUIZ_QUESTIONS.length}
              />

              {/* Floating Guide Fairy Avatar with speech */}
              <CompanionAvatar
                mood={companionMood}
                speechText={companionSpeech}
                size="md"
              />

              {/* Interactive Question Card */}
              <QuizCard
                question={currentQuestion}
                currentAnswer={currentAnswer}
                onSelectOption={handleSelectOption}
                onNextQuestion={handleNextQuestion}
                isLastQuestion={currentQuestionIndex === QUIZ_QUESTIONS.length - 1}
              />
            </div>
          )}

          {view === 'result' && (
            <div className="mt-1">
              <ResultScreen
                score={totalScore}
                totalQuestions={QUIZ_QUESTIONS.length}
                questions={QUIZ_QUESTIONS}
                answers={answers}
                onRestart={handleRestart}
                onOpenStudyGuide={() => setIsStudyGuideOpen(true)}
              />
            </div>
          )}
        </main>
      </div>

      {/* Reference Study Guide Modal */}
      <StudyGuideModal
        isOpen={isStudyGuideOpen}
        onClose={() => setIsStudyGuideOpen(false)}
      />

      {/* Footer */}
      <footer className="relative z-10 py-2 text-center text-xs font-semibold text-slate-700/80">
        <p>Kuiz Interaktif Bahasa Melayu Tahun 4 • Pengembaraan Tatabahasa</p>
      </footer>
    </div>
  );
}
