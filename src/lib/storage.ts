import type { GroupId, Lang } from '../types';

const STORAGE_KEY = 'shrm-study-app:v1';

const GROUP_IDS: GroupId[] = [
  'people',
  'organization',
  'workplace',
  'leadership',
  'interpersonal',
  'business',
];

export interface ModuleProgress {
  studied: boolean; // "mark as studied" toggle
  cardStates: Record<string, 'known' | 'learning'>; // flashcard id -> state
  bestScore: number | null; // best quiz score %, 0..100
  lastAttempt: { score: number; total: number; dateISO: string } | null;
  lastWrong: string[]; // quiz question ids wrong in last attempt
  notes: string; // free text
}

export interface AppState {
  version: 1;
  language: Lang;
  modules: Record<GroupId, ModuleProgress>;
}

function defaultModuleProgress(): ModuleProgress {
  return {
    studied: false,
    cardStates: {},
    bestScore: null,
    lastAttempt: null,
    lastWrong: [],
    notes: '',
  };
}

export function defaultState(): AppState {
  const modules = {} as Record<GroupId, ModuleProgress>;
  for (const id of GROUP_IDS) {
    modules[id] = defaultModuleProgress();
  }
  return { version: 1, language: 'vi', modules };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/**
 * Merge a possibly-partial/invalid stored module into a complete ModuleProgress,
 * tolerating missing fields and schema drift.
 */
function mergeModuleProgress(raw: unknown): ModuleProgress {
  const base = defaultModuleProgress();
  if (!isObject(raw)) return base;

  if (typeof raw.studied === 'boolean') base.studied = raw.studied;
  if (isObject(raw.cardStates)) {
    for (const [cardId, value] of Object.entries(raw.cardStates)) {
      if (value === 'known' || value === 'learning') {
        base.cardStates[cardId] = value;
      }
    }
  }
  if (typeof raw.bestScore === 'number') base.bestScore = raw.bestScore;
  if (
    isObject(raw.lastAttempt) &&
    typeof raw.lastAttempt.score === 'number' &&
    typeof raw.lastAttempt.total === 'number' &&
    typeof raw.lastAttempt.dateISO === 'string'
  ) {
    base.lastAttempt = {
      score: raw.lastAttempt.score,
      total: raw.lastAttempt.total,
      dateISO: raw.lastAttempt.dateISO,
    };
  }
  if (Array.isArray(raw.lastWrong)) {
    base.lastWrong = raw.lastWrong.filter(
      (x): x is string => typeof x === 'string',
    );
  }
  if (typeof raw.notes === 'string') base.notes = raw.notes;
  return base;
}

/**
 * Load state from localStorage. Always returns a complete AppState with all 6
 * groups seeded; tolerant of missing key, invalid JSON, and partial data.
 */
export function loadState(): AppState {
  const state = defaultState();
  if (typeof localStorage === 'undefined') return state;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return state;

    const parsed: unknown = JSON.parse(raw);
    if (!isObject(parsed) || !isObject(parsed.modules)) return state;

    for (const id of GROUP_IDS) {
      state.modules[id] = mergeModuleProgress(
        (parsed.modules as Record<string, unknown>)[id],
      );
    }
    state.language = parsed.language === 'en' ? 'en' : 'vi';
    return state;
  } catch {
    // Corrupt or inaccessible storage -> fall back to defaults.
    return state;
  }
}

export function saveState(state: AppState): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Quota exceeded or storage disabled -> ignore; in-memory state still valid.
  }
}

export function resetAll(): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage access errors.
  }
}
