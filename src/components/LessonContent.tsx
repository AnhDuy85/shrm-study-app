import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import type { GroupId, ModuleLesson } from '../types';
import { useLanguage } from '../state/LanguageProvider';
import { tc } from '../i18n/helpers';

interface LessonContentProps {
  group: GroupId;
  lesson: ModuleLesson;
}

// Initialize mermaid once, on the client only. startOnLoad:false lets us render
// imperatively so mermaid does not scan/mutate the DOM behind React's back.
let mermaidInitialized = false;
function ensureMermaidInitialized() {
  if (mermaidInitialized || typeof window === 'undefined') return;
  mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'default' });
  mermaidInitialized = true;
}

export default function LessonContent({ group, lesson }: LessonContentProps) {
  const { lang, t } = useLanguage();
  const diagramRef = useRef<HTMLDivElement>(null);
  const [diagramError, setDiagramError] = useState(false);
  const diagramSrc = tc(lesson.diagram, lang);

  useEffect(() => {
    let cancelled = false;
    ensureMermaidInitialized();

    async function renderDiagram() {
      const container = diagramRef.current;
      if (!container) return;
      try {
        // Unique id per group avoids clashes when switching modules.
        const { svg } = await mermaid.render(`lesson-diagram-${group}`, diagramSrc);
        if (cancelled) return;
        container.innerHTML = svg;
        setDiagramError(false);
      } catch {
        if (cancelled) return;
        container.innerHTML = '';
        setDiagramError(true);
      }
    }

    void renderDiagram();
    return () => {
      cancelled = true;
    };
  }, [group, diagramSrc]);

  return (
    <div className="space-y-8">
      {/* 1. Learning objectives */}
      <section aria-labelledby={`lesson-objectives-${group}`} className="space-y-3">
        <h2
          id={`lesson-objectives-${group}`}
          className="text-lg font-semibold text-gray-900"
        >
          {t('lesson.objectives')}
        </h2>
        <ul className="list-disc space-y-1 pl-6 text-sm text-gray-700">
          {lesson.objectives.map((objective, i) => (
            <li key={i}>{tc(objective, lang)}</li>
          ))}
        </ul>
      </section>

      {/* 2. Key points */}
      <section aria-labelledby={`lesson-keypoints-${group}`} className="space-y-3">
        <h2
          id={`lesson-keypoints-${group}`}
          className="text-lg font-semibold text-gray-900"
        >
          {t('lesson.keyPoints')}
        </h2>
        <dl className="space-y-3">
          {lesson.keyPoints.map((point, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <dt className="font-semibold text-indigo-700">{point.term}</dt>
              <dd className="mt-1 text-sm text-gray-700">
                {tc(point.detail, lang)}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 3. Diagram (Mermaid) */}
      <section aria-labelledby={`lesson-diagram-heading-${group}`} className="space-y-3">
        <h2
          id={`lesson-diagram-heading-${group}`}
          className="text-lg font-semibold text-gray-900"
        >
          {t('lesson.diagram')}
        </h2>
        {diagramError ? (
          <div className="rounded-lg border border-amber-300 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              {t('lesson.diagramFallback')}
            </p>
            <pre className="mt-2 overflow-x-auto rounded bg-white p-3 text-xs text-gray-700">
              {diagramSrc}
            </pre>
          </div>
        ) : (
          <div
            ref={diagramRef}
            role="img"
            aria-label={t('lesson.diagramAria').replace('{group}', group)}
            className="overflow-x-auto rounded-lg border border-gray-200 bg-white p-4"
          />
        )}
      </section>

      {/* 4. Practical applications */}
      <section aria-labelledby={`lesson-applications-${group}`} className="space-y-3">
        <h2
          id={`lesson-applications-${group}`}
          className="text-lg font-semibold text-gray-900"
        >
          {t('lesson.applications')}
        </h2>
        <ul className="space-y-3">
          {lesson.applications.map((item, i) => (
            <li
              key={i}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <h3 className="font-semibold text-gray-900">
                {tc(item.title, lang)}
              </h3>
              <p className="mt-1 text-sm text-gray-700">
                {tc(item.description, lang)}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
