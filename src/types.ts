export type DomainKind = 'knowledge' | 'competency';

export type GroupId =
  | 'people'
  | 'organization'
  | 'workplace' // HR Knowledge domains
  | 'leadership'
  | 'interpersonal'
  | 'business'; // Behavioral Competency groups

export type Lang = 'vi' | 'en';
export type Localized = { vi: string; en: string };

export interface CompetencyRef {
  name: string;
  group: 'Leadership' | 'Interpersonal' | 'Business';
}

export interface ModuleDef {
  id: GroupId;
  title: string; // e.g. "People" / "Leadership" (English proper noun)
  kind: DomainKind;
  description: Localized; // short bilingual domain/competency summary
  competencies?: string[]; // for competency groups: the named competencies inside (English proper nouns)
}

export interface Flashcard {
  id: string; // stable unique id, e.g. "people-01"
  term: string; // English term
  definition: Localized; // bilingual explanation
}

export interface QuizQuestion {
  id: string; // e.g. "people-q1"
  question: Localized;
  options: Localized[]; // exactly 4 options (enforced by §12, not tsc)
  correctIndex: number; // 0-based, 0..3 (language-independent)
  explanation: Localized;
}

export type FlashcardsData = Record<GroupId, Flashcard[]>;
export type QuizData = Record<GroupId, QuizQuestion[]>;

export interface LessonScenario {
  title: Localized;
  description: Localized;
}

export interface KeyPoint {
  term: string; // canonical English term
  detail: Localized;
}

export interface ModuleLesson {
  objectives: Localized[];
  keyPoints: KeyPoint[];
  diagram: Localized; // vi == en (English node labels, §1.5)
  applications: LessonScenario[];
}

export type LessonData = Record<GroupId, ModuleLesson>;
