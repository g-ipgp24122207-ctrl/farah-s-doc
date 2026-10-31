import test from 'node:test';
import assert from 'node:assert/strict';
import { QUIZ_QUESTIONS } from './quizData.ts';
import {
  validateAnswer,
  calculateTotalScore,
  evaluateQuizPerformance,
  SUCCESS_MESSAGE,
  RETRY_MESSAGE,
  COMPLETION_TITLE,
} from './quizLogic.ts';

test('Quiz contains exactly 3 questions with valid options and correct indices', () => {
  assert.equal(QUIZ_QUESTIONS.length, 3);

  // Question 1
  const q1 = QUIZ_QUESTIONS[0];
  assert.match(q1.question, /gembira/);
  assert.equal(q1.options.length, 2);
  assert.equal(q1.correctOptionIndex, 1); // B. Kata adjektif perasaan

  // Question 2
  const q2 = QUIZ_QUESTIONS[1];
  assert.match(q2.question, /kata adjektif cara/);
  assert.equal(q2.options.length, 3);
  assert.equal(q2.correctOptionIndex, 1); // B. Pantas

  // Question 3
  const q3 = QUIZ_QUESTIONS[2];
  assert.match(q3.question, /kata adjektif perasaan/);
  assert.equal(q3.options.length, 3);
  assert.equal(q3.correctOptionIndex, 2); // C. Bimbang
});

test('validateAnswer gives correct messages for right and wrong choices', () => {
  const q1 = QUIZ_QUESTIONS[0];
  
  // Wrong choice (index 0: Cara)
  const wrongRes = validateAnswer(q1, 0);
  assert.equal(wrongRes.isCorrect, false);
  assert.equal(wrongRes.message, RETRY_MESSAGE);

  // Correct choice (index 1: Perasaan)
  const rightRes = validateAnswer(q1, 1);
  assert.equal(rightRes.isCorrect, true);
  assert.equal(rightRes.message, SUCCESS_MESSAGE);
});

test('calculateTotalScore counts correct answers properly', () => {
  const allCorrect = {
    1: { questionId: 1, selectedIndex: 1, isCorrect: true, attempts: 1 },
    2: { questionId: 2, selectedIndex: 1, isCorrect: true, attempts: 1 },
    3: { questionId: 3, selectedIndex: 2, isCorrect: true, attempts: 1 },
  };
  assert.equal(calculateTotalScore(allCorrect), 3);

  const twoCorrect = {
    1: { questionId: 1, selectedIndex: 0, isCorrect: false, attempts: 1 },
    2: { questionId: 2, selectedIndex: 1, isCorrect: true, attempts: 1 },
    3: { questionId: 3, selectedIndex: 2, isCorrect: true, attempts: 1 },
  };
  assert.equal(calculateTotalScore(twoCorrect), 2);

  const noneCorrect = {};
  assert.equal(calculateTotalScore(noneCorrect), 0);
});

test('evaluateQuizPerformance assesses star ratings and titles', () => {
  const perfect = evaluateQuizPerformance(3, 3);
  assert.equal(perfect.stars, 3);
  assert.equal(perfect.percentage, 100);
  assert.equal(perfect.title, 'Pakar Tatabahasa Sejati!');

  const good = evaluateQuizPerformance(2, 3);
  assert.equal(good.stars, 2);
  assert.equal(good.percentage, 67);

  const attempt = evaluateQuizPerformance(1, 3);
  assert.equal(attempt.stars, 1);
});

test('completion title contains Kuiz Pantas Paimon', () => {
  assert.match(COMPLETION_TITLE, /Kuiz Pantas Paimon/);
});
