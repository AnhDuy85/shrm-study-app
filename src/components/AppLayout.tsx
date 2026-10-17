import { useState, type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { MODULES } from '../data/modules';
import { useLanguage } from '../state/LanguageProvider';
import type { DomainKind, ModuleDef } from '../types';

function navLinkClasses({ isActive }: { isActive: boolean }): string {
  const base =
    'block rounded-md px-3 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500';
  return isActive
    ? `${base} bg-indigo-600 text-white`
    : `${base} text-gray-700 hover:bg-gray-100`;
}

function ModuleNav({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useLanguage();
  const groups: DomainKind[] = ['knowledge', 'competency'];
  const domainLabel: Record<DomainKind, string> = {
    knowledge: t('dash.domainKnowledge'),
    competency: t('dash.domainCompetency'),
  };
  return (
    <nav aria-label={t('nav.aria')} className="space-y-6">
      <NavLink to="/" end className={navLinkClasses} onClick={onNavigate}>
        {t('nav.dashboard')}
      </NavLink>
      {groups.map((kind) => {
        const items = MODULES.filter((m: ModuleDef) => m.kind === kind);
        return (
          <div key={kind}>
            <h2 className="px-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
              {domainLabel[kind]}
            </h2>
            <ul className="mt-2 space-y-1">
              {items.map((m) => (
                <li key={m.id}>
                  <NavLink
                    to={`/module/${m.id}`}
                    className={navLinkClasses}
                    onClick={onNavigate}
                  >
                    {m.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}

function LanguageToggle() {
  const { lang, t, setLang } = useLanguage();
  const buttonClass = (active: boolean) =>
    `rounded-md px-2 py-1 text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
      active
        ? 'bg-indigo-600 text-white'
        : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
    }`;
  return (
    <div
      role="group"
      aria-label={t('lang.toggleAria')}
      className="flex items-center gap-1"
    >
      <button
        type="button"
        onClick={() => setLang('vi')}
        aria-pressed={lang === 'vi'}
        className={buttonClass(lang === 'vi')}
      >
        {t('lang.vi')}
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={buttonClass(lang === 'en')}
      >
        {t('lang.en')}
      </button>
    </div>
  );
}

export default function AppLayout({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top bar (always visible; hosts the mobile menu toggle) */}
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 md:hidden"
              aria-label={mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((open) => !open)}
            >
              <span aria-hidden="true" className="text-lg">
                {mobileOpen ? '✕' : '☰'}
              </span>
            </button>
            <span className="text-lg font-bold">{t('app.title')}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-gray-500 sm:inline">
              {t('app.exam')}
            </span>
            <LanguageToggle />
          </div>
        </div>
        {/* Mobile nav panel */}
        {mobileOpen && (
          <div
            id="mobile-nav"
            className="border-t border-gray-200 px-4 py-4 md:hidden"
          >
            <ModuleNav onNavigate={() => setMobileOpen(false)} />
          </div>
        )}
      </header>

      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar (desktop) */}
        <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white p-4 md:block">
          <div className="sticky top-20">
            <ModuleNav />
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
