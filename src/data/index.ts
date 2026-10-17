import type { FlashcardsData, LessonData, QuizData } from '../types';
import flashcardsJson from './flashcards.json';
import quizJson from './quiz.json';
import lessonsJson from './lessons.json';

// Typed accessors so tsc checks the JSON shapes against FlashcardsData / QuizData / LessonData.
export const FLASHCARDS: FlashcardsData = flashcardsJson;
export const QUIZZES: QuizData = quizJson;
export const LESSONS: LessonData = lessonsJson;
