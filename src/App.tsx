import { MODULES } from './data/modules';
import { StateProvider, useAppState } from './state/StateProvider';
import type { ModuleDef } from './types';

function ModuleList() {
  const { state } = useAppState();

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-2 text-2xl font-bold">SHRM Study App</h1>
      <p className="mb-6 text-gray-600">
        Ứng dụng học SHRM-CP/SCP (chạy cục bộ, dữ liệu lưu trên trình duyệt).
      </p>
      <ul className="space-y-3">
        {MODULES.map((m: ModuleDef) => (
          <li key={m.id} className="rounded border border-gray-200 p-4">
            <h2 className="font-semibold">
              {m.title}{' '}
              <span className="text-sm font-normal text-gray-500">
                ({m.kind})
              </span>
            </h2>
            <p className="text-sm text-gray-600">{m.description}</p>
            <p className="mt-1 text-xs text-gray-400">
              {m.pdfs.length} tài liệu PDF ·{' '}
              {state.modules[m.id].studied ? 'Đã học' : 'Chưa học'}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default function App() {
  return (
    <StateProvider>
      <ModuleList />
    </StateProvider>
  );
}
