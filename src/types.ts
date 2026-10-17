export type DomainKind = 'knowledge' | 'competency';

export type GroupId =
  | 'people'
  | 'organization'
  | 'workplace' // HR Knowledge domains
  | 'leadership'
  | 'interpersonal'
  | 'business'; // Behavioral Competency groups

export interface CompetencyRef {
  name: string;
  group: 'Leadership' | 'Interpersonal' | 'Business';
}

export interface ModuleDef {
  id: GroupId;
  title: string; // e.g. "People" / "Leadership"
  kind: DomainKind;
  description: string; // short VI description
  pdfs: string[]; // file names under /pdfs/, in display order
  competencies?: string[]; // for competency groups: the named competencies inside
}

export interface Flashcard {
  id: string; // stable unique id, e.g. "people-01"
  term: string; // English term ok
  definition: string; // Vietnamese explanation
}

export interface QuizQuestion {
  id: string; // e.g. "people-q1"
  question: string;
  options: string[]; // 4 options
  correctIndex: number; // 0-based
  explanation: string; // short VI explanation
}

export type FlashcardsData = Record<GroupId, Flashcard[]>;
export type QuizData = Record<GroupId, QuizQuestion[]>;

export interface LessonScenario {
  title: string;
  description: string;
}

export interface KeyPoint {
  term: string;
  detail: string;
}

export interface ModuleLesson {
  objectives: string[];
  keyPoints: KeyPoint[];
  diagram: string;
  applications: LessonScenario[];
}

export type LessonData = Record<GroupId, ModuleLesson>;
