import { useState } from 'react';
import type { Flashcard, GroupId } from '../types';
import { useAppState } from '../state/StateProvider';
import ProgressBar from './ProgressBar';

interface FlashcardDeckProps {
  group: GroupId;
  cards: Flashcard[];
}

export default function FlashcardDeck({ group, cards }: FlashcardDeckProps) {
  const { state, setCardState } = useAppState();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (cards.length === 0) {
    return <p className="text-sm text-gray-600">Chưa có thẻ ghi nhớ nào.</p>;
  }

  const card = cards[index];
  const cardStates = state.modules[group].cardStates;
  const reviewedCount = cards.filter((c) => cardStates[c.id]).length;
  const currentState = cardStates[card.id];

  function goTo(next: number) {
    const clamped = Math.max(0, Math.min(cards.length - 1, next));
    setIndex(clamped);
    setFlipped(false);
  }

  function handleFlipKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setFlipped((f) => !f);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm text-gray-600">
          Thẻ {index + 1} / {cards.length}
        </span>
        <span className="text-sm text-gray-600">
          Đã ôn: {reviewedCount} / {cards.length}
        </span>
      </div>
      <ProgressBar
        value={(reviewedCount / cards.length) * 100}
        label="Tiến độ ôn thẻ ghi nhớ"
      />

      {/* Flip card */}
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={handleFlipKey}
        aria-pressed={flipped}
        aria-label={
          flipped
            ? `Mặt sau của thẻ: ${card.term}. Nhấn để lật lại.`
            : `Mặt trước của thẻ: ${card.term}. Nhấn để xem định nghĩa.`
        }
        className="flex min-h-[200px] w-full flex-col items-center justify-center rounded-xl border-2 border-indigo-200 bg-white p-6 text-center shadow-sm transition hover:border-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        <span className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-500">
          {flipped ? 'Định nghĩa' : 'Thuật ngữ'}
        </span>
        <span
          className={flipped ? 'text-base text-gray-800' : 'text-xl font-bold text-gray-900'}
        >
          {flipped ? card.definition : card.term}
        </span>
        <span className="mt-4 text-xs text-gray-400">
          Nhấn (hoặc Enter / Space) để lật thẻ
        </span>
      </button>

      {/* Known / learning */}
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Đánh dấu mức độ thuộc thẻ"
      >
        <button
          type="button"
          onClick={() => setCardState(group, card.id, 'known')}
          aria-pressed={currentState === 'known'}
          className={`rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
            currentState === 'known'
              ? 'bg-green-600 text-white'
              : 'border border-green-600 text-green-700 hover:bg-green-50'
          }`}
        >
          Đã thuộc
        </button>
        <button
          type="button"
          onClick={() => setCardState(group, card.id, 'learning')}
          aria-pressed={currentState === 'learning'}
          className={`rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
            currentState === 'learning'
              ? 'bg-amber-500 text-white'
              : 'border border-amber-500 text-amber-700 hover:bg-amber-50'
          }`}
        >
          Đang học
        </button>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={index <= 0}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-40"
        >
          ‹ Thẻ trước
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={index >= cards.length - 1}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-40"
        >
          Thẻ sau ›
        </button>
      </div>
    </div>
  );
}
