import { useState } from 'react';
import type { GroupId, QuizQuestion } from '../types';
import { useAppState } from '../state/StateProvider';

interface QuizRunnerProps {
  group: GroupId;
  questions: QuizQuestion[];
}

type Phase = 'running' | 'result';

export default function QuizRunner({ group, questions }: QuizRunnerProps) {
  const { state, recordQuizAttempt } = useAppState();
  const [phase, setPhase] = useState<Phase>('running');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const bestScore = state.modules[group].bestScore;

  if (questions.length === 0) {
    return <p className="text-sm text-gray-600">Chưa có câu hỏi nào.</p>;
  }

  function restart() {
    setPhase('running');
    setCurrent(0);
    setAnswers({});
  }

  function finish() {
    const wrong = questions
      .filter((q) => answers[q.id] !== q.correctIndex)
      .map((q) => q.id);
    const score = questions.length - wrong.length;
    recordQuizAttempt(group, { score, total: questions.length, wrong });
    setPhase('result');
  }

  if (phase === 'result') {
    const wrongQuestions = questions.filter(
      (q) => answers[q.id] !== q.correctIndex,
    );
    const score = questions.length - wrongQuestions.length;
    const percent = Math.round((score / questions.length) * 100);

    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
          <h3 className="text-lg font-semibold">Kết quả</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">
            {score} / {questions.length}
          </p>
          <p className="text-sm text-gray-600">Đạt {percent}%</p>
          {bestScore !== null && (
            <p className="mt-1 text-xs text-gray-500">
              Điểm cao nhất: {bestScore}%
            </p>
          )}
        </div>

        {wrongQuestions.length > 0 ? (
          <div className="space-y-4">
            <h4 className="font-semibold">Xem lại câu sai</h4>
            {wrongQuestions.map((q) => (
              <div
                key={q.id}
                className="rounded-lg border border-red-200 bg-red-50 p-4"
              >
                <p className="font-medium text-gray-900">{q.question}</p>
                <p className="mt-2 text-sm text-red-700">
                  Bạn chọn:{' '}
                  {answers[q.id] !== undefined
                    ? q.options[answers[q.id]]
                    : '(bỏ trống)'}
                </p>
                <p className="text-sm text-green-700">
                  Đáp án đúng: {q.options[q.correctIndex]}
                </p>
                <p className="mt-2 text-sm text-gray-600">{q.explanation}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            Xuất sắc! Bạn trả lời đúng tất cả các câu.
          </p>
        )}

        <button
          type="button"
          onClick={restart}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Làm lại
        </button>
      </div>
    );
  }

  // running phase
  const q = questions[current];
  const selected = answers[q.id];
  const isLast = current === questions.length - 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Câu {current + 1} / {questions.length}
        </span>
        {bestScore !== null && (
          <span className="text-sm text-gray-500">
            Điểm cao nhất: {bestScore}%
          </span>
        )}
      </div>

      <fieldset className="rounded-lg border border-gray-200 bg-white p-5">
        <legend className="mb-3 px-1 font-medium text-gray-900">
          {q.question}
        </legend>
        <div className="space-y-2">
          {q.options.map((opt, i) => {
            const id = `${q.id}-opt-${i}`;
            return (
              <label
                key={id}
                htmlFor={id}
                className={`flex cursor-pointer items-center gap-3 rounded-md border px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-indigo-500 ${
                  selected === i
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  id={id}
                  type="radio"
                  name={q.id}
                  value={i}
                  checked={selected === i}
                  onChange={() =>
                    setAnswers((prev) => ({ ...prev, [q.id]: i }))
                  }
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span>{opt}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current <= 0}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-40"
        >
          ‹ Câu trước
        </button>
        {isLast ? (
          <button
            type="button"
            onClick={finish}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Nộp bài
          </button>
        ) : (
          <button
            type="button"
            onClick={() =>
              setCurrent((c) => Math.min(questions.length - 1, c + 1))
            }
            className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Câu sau ›
          </button>
        )}
      </div>
    </div>
  );
}
