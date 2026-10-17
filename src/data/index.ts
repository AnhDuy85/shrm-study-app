import type { FlashcardsData, QuizData } from '../types';
import flashcardsJson from './flashcards.json';
import quizJson from './quiz.json';

// Typed accessors so tsc checks the JSON shapes against FlashcardsData / QuizData.
export const FLASHCARDS: FlashcardsData = flashcardsJson;
export const QUIZZES: QuizData = quizJson;
