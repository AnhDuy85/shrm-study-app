import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MODULES } from '../data/modules';
import { FLASHCARDS, QUIZZES } from '../data';
import { useAppState } from '../state/StateProvider';
import { useLanguage } from '../state/LanguageProvider';
import { tc } from '../i18n/helpers';
import type { DomainKind, ModuleDef } from '../types';
import ProgressBar from '../components/ProgressBar';
import Badge from '../components/Badge';

function ModuleCard({ module }: { module: ModuleDef }) {
  const { state } = useAppState();
  const { lang, t } = useLanguage();
  const progress = state.modules[module.id];
  const cards = FLASHCARDS[module.id];
  const quiz = QUIZZES[module.id];

  const reviewed = cards.filter((c) => progress.cardStates[c.id]).length;
  const reviewedPct = cards.length > 0 ? (reviewed / cards.length) * 100 : 0;
  const pct =
    progress.bestScore === null ? '—' : `${progress.bestScore}%`;

  return (
    <Link
      to={`/module/${module.id}`}
      className="block rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
        {progress.studied ? (
          <Badge tone="success">{t('dash.studied')}</Badge>
        ) : (
          <Badge tone="neutral">{t('dash.notStudied')}</Badge>
        )}
      </div>
      <p className="mt-1 text-sm text-gray-600">{tc(module.description, lang)}</p>

      <div className="mt-4 space-y-1">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{t('dash.cardsReviewed')}</span>
          <span>
            {reviewed} / {cards.length}
          </span>
        </div>
        <ProgressBar
          value={reviewedPct}
          label={t('dash.progressLabel').replace('{group}', module.title)}
        />
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
        <Badge tone="info">{t('dash.bestScore').replace('{pct}', pct)}</Badge>
        <span>{t('dash.questionCount').replace('{n}', String(quiz.length))}</span>
      </div>
    </Link>
  );
}

export default function DashboardPage() {
  const { resetAll } = useAppState();
  const { t } = useLanguage();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const groups: DomainKind[] = ['knowledge', 'competency'];
  const domainLabel: Record<DomainKind, string> = {
    knowledge: t('dash.domainKnowledge'),
    competency: t('dash.domainCompetency'),
  };

  function handleReset() {
    resetAll();
    setConfirmOpen(false);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t('dash.title')}</h1>
          <p className="mt-1 text-sm text-gray-600">{t('dash.intro')}</p>
        </div>
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          {t('dash.reset')}
        </button>
      </div>

      {groups.map((kind) => (
        <section key={kind} aria-labelledby={`section-${kind}`}>
          <h2
            id={`section-${kind}`}
            className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500"
          >
            {domainLabel[kind]}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODULES.filter((m) => m.kind === kind).map((m) => (
              <ModuleCard key={m.id} module={m} />
            ))}
          </div>
        </section>
      ))}

      {/* Confirm reset dialog */}
      {confirmOpen && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-title"
        >
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <h2 id="reset-title" className="text-lg font-semibold">
              {t('dash.resetTitle')}
            </h2>
            <p className="mt-2 text-sm text-gray-600">{t('dash.resetBody')}</p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                {t('dash.cancel')}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                {t('dash.confirmReset')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
