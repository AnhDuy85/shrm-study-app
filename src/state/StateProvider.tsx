import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { GroupId } from '../types';
import {
  loadState,
  resetAll as resetStorage,
  saveState,
  type AppState,
  type ModuleProgress,
} from '../lib/storage';

interface QuizAttempt {
  score: number; // number correct
  total: number; // number of questions
  wrong: string[]; // question ids answered wrong
}

interface AppStateContextValue {
  state: AppState;
  setStudied: (group: GroupId, studied: boolean) => void;
  setCardState: (
    group: GroupId,
    cardId: string,
    cardState: 'known' | 'learning',
  ) => void;
  recordQuizAttempt: (group: GroupId, attempt: QuizAttempt) => void;
  setNotes: (group: GroupId, notes: string) => void;
  setReadPage: (group: GroupId, file: string, page: number) => void;
  resetAll: () => void;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

function updateModule(
  prev: AppState,
  group: GroupId,
  updater: (module: ModuleProgress) => ModuleProgress,
): AppState {
  return {
    ...prev,
    modules: {
      ...prev.modules,
      [group]: updater(prev.modules[group]),
    },
  };
}

export function StateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => loadState());

  const persist = useCallback(
    (updater: (prev: AppState) => AppState) => {
      setState((prev) => {
        const next = updater(prev);
        saveState(next);
        return next;
      });
    },
    [setState],
  );

  const setStudied = useCallback(
    (group: GroupId, studied: boolean) => {
      persist((prev) => updateModule(prev, group, (m) => ({ ...m, studied })));
    },
    [persist],
  );

  const setCardState = useCallback(
    (group: GroupId, cardId: string, cardState: 'known' | 'learning') => {
      persist((prev) =>
        updateModule(prev, group, (m) => ({
          ...m,
          cardStates: { ...m.cardStates, [cardId]: cardState },
        })),
      );
    },
    [persist],
  );

  const recordQuizAttempt = useCallback(
    (group: GroupId, attempt: QuizAttempt) => {
      persist((prev) =>
        updateModule(prev, group, (m) => {
          const percent =
            attempt.total > 0
              ? Math.round((attempt.score / attempt.total) * 100)
              : 0;
          const bestScore =
            m.bestScore === null ? percent : Math.max(m.bestScore, percent);
          return {
            ...m,
            bestScore,
            lastAttempt: {
              score: attempt.score,
              total: attempt.total,
              dateISO: new Date().toISOString(),
            },
            lastWrong: attempt.wrong,
          };
        }),
      );
    },
    [persist],
  );

  const setNotes = useCallback(
    (group: GroupId, notes: string) => {
      persist((prev) => updateModule(prev, group, (m) => ({ ...m, notes })));
    },
    [persist],
  );

  const setReadPage = useCallback(
    (group: GroupId, file: string, page: number) => {
      persist((prev) =>
        updateModule(prev, group, (m) => ({
          ...m,
          readPages: { ...m.readPages, [file]: page },
        })),
      );
    },
    [persist],
  );

  const resetAll = useCallback(() => {
    resetStorage();
    setState(loadState());
  }, [setState]);

  const value = useMemo<AppStateContextValue>(
    () => ({
      state,
      setStudied,
      setCardState,
      recordQuizAttempt,
      setNotes,
      setReadPage,
      resetAll,
    }),
    [
      state,
      setStudied,
      setCardState,
      recordQuizAttempt,
      setNotes,
      setReadPage,
      resetAll,
    ],
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState(): AppStateContextValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error('useAppState must be used within a <StateProvider>');
  }
  return ctx;
}
