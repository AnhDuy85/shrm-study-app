import { useEffect, useRef, useState } from 'react';
import type { GroupId } from '../types';
import { useAppState } from '../state/StateProvider';

interface NotesEditorProps {
  group: GroupId;
}

const AUTOSAVE_DELAY = 600; // ms

export default function NotesEditor({ group }: NotesEditorProps) {
  const { state, setNotes } = useAppState();
  const [value, setValue] = useState(state.modules[group].notes);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reload notes when switching modules.
  useEffect(() => {
    setValue(state.modules[group].notes);
    setSavedAt(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group]);

  // Debounced autosave.
  useEffect(() => {
    if (value === state.modules[group].notes) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setNotes(group, value);
      setSavedAt(new Date().toLocaleTimeString());
    }, AUTOSAVE_DELAY);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, group]);

  return (
    <div className="space-y-2">
      <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
        Ghi chú của bạn
      </label>
      <textarea
        id="notes"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={12}
        placeholder="Viết ghi chú ôn tập của bạn tại đây… (tự động lưu)"
        className="w-full rounded-md border border-gray-300 p-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      />
      <p className="text-xs text-gray-500" aria-live="polite">
        {savedAt ? `Đã lưu lúc ${savedAt}` : 'Tự động lưu vào trình duyệt'}
      </p>
    </div>
  );
}
