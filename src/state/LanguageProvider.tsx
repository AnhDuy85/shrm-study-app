import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import type { Lang } from '../types';
import { tui } from '../i18n/helpers';
import type { UiKey } from '../i18n/strings';
import { useAppState } from './StateProvider';

interface LanguageContextValue {
  lang: Lang;
  t: (key: UiKey) => string;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { state, setLanguage } = useAppState();
  const lang = state.language;

  const setLang = useCallback(
    (next: Lang) => {
      setLanguage(next);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = next;
      }
    },
    [setLanguage],
  );

  const toggleLang = useCallback(() => {
    setLang(lang === 'vi' ? 'en' : 'vi');
  }, [lang, setLang]);

  const t = useCallback((key: UiKey) => tui(lang, key), [lang]);

  // Keep <html lang> in sync on mount and whenever lang changes.
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, t, setLang, toggleLang }),
    [lang, t, setLang, toggleLang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a <LanguageProvider>');
  }
  return ctx;
}
