import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MODULE_BY_ID } from '../data/modules';
import { FLASHCARDS, QUIZZES } from '../data';
import { useAppState } from '../state/StateProvider';
import type { GroupId } from '../types';
import PdfViewer from '../components/PdfViewer';
import FlashcardDeck from '../components/FlashcardDeck';
import QuizRunner from '../components/QuizRunner';
import NotesEditor from '../components/NotesEditor';
import Badge from '../components/Badge';
import NotFound from './NotFound';

type TabId = 'read' | 'flashcards' | 'quiz' | 'notes';

const TABS: { id: TabId; label: string }[] = [
  { id: 'read', label: 'Read' },
  { id: 'flashcards', label: 'Flashcards' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'notes', label: 'Notes' },
];

export default function ModulePage() {
  const { groupId } = useParams();
  const { state, setStudied } = useAppState();
  const [activeTab, setActiveTab] = useState<TabId>('read');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const module = groupId ? MODULE_BY_ID[groupId] : undefined;
  if (!module) return <NotFound />;

  const group = module.id as GroupId;
  const studied = state.modules[group].studied;

  function onTabKeyDown(e: React.KeyboardEvent, index: number) {
    let next = index;
    if (e.key === 'ArrowRight') next = (index + 1) % TABS.length;
    else if (e.key === 'ArrowLeft') next = (index - 1 + TABS.length) % TABS.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = TABS.length - 1;
    else return;
    e.preventDefault();
    setActiveTab(TABS[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/"
          className="text-sm text-indigo-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          ‹ Về Dashboard
        </Link>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">{module.title}</h1>
            <p className="mt-1 text-sm text-gray-600">{module.description}</p>
            {module.competencies && (
              <div className="mt-2 flex flex-wrap gap-2">
                {module.competencies.map((c) => (
                  <Badge key={c} tone="info">
                    {c}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={studied}
              onChange={(e) => setStudied(group, e.target.checked)}
              className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
            />
            Đánh dấu đã học
          </label>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div role="tablist" aria-label="Nội dung mô-đun" className="flex gap-1">
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => onTabKeyDown(e, i)}
              className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Panels */}
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={0}
        className="focus:outline-none"
      >
        {activeTab === 'read' && (
          <PdfViewer group={group} pdfs={module.pdfs} />
        )}
        {activeTab === 'flashcards' && (
          <FlashcardDeck group={group} cards={FLASHCARDS[group]} />
        )}
        {activeTab === 'quiz' && (
          <QuizRunner group={group} questions={QUIZZES[group]} />
        )}
        {activeTab === 'notes' && <NotesEditor group={group} />}
      </div>
    </div>
  );
}
