import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import type { GroupId } from '../types';
import { useAppState } from '../state/StateProvider';

interface PdfViewerProps {
  group: GroupId;
  pdfs: string[]; // file names served from /pdfs/
}

const MIN_SCALE = 0.5;
const MAX_SCALE = 2.5;
const SCALE_STEP = 0.25;

export default function PdfViewer({ group, pdfs }: PdfViewerProps) {
  const { state, setReadPage } = useAppState();
  const [activeIndex, setActiveIndex] = useState(0);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const file = pdfs[activeIndex];
  const savedPage = state.modules[group].readPages[file] ?? 1;
  const [pageNumber, setPageNumber] = useState(savedPage);

  function switchPdf(index: number) {
    setActiveIndex(index);
    setNumPages(null);
    setError(null);
    const nextFile = pdfs[index];
    setPageNumber(state.modules[group].readPages[nextFile] ?? 1);
  }

  function goToPage(next: number) {
    if (numPages === null) return;
    const clamped = Math.max(1, Math.min(numPages, next));
    setPageNumber(clamped);
    setReadPage(group, file, clamped);
  }

  const url = `/pdfs/${file}`;

  return (
    <div className="space-y-4">
      {/* PDF switcher (only when the module maps to multiple PDFs) */}
      {pdfs.length > 1 && (
        <div>
          <label
            htmlFor="pdf-switcher"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Tài liệu
          </label>
          <select
            id="pdf-switcher"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:w-auto"
            value={activeIndex}
            onChange={(e) => switchPdf(Number(e.target.value))}
          >
            {pdfs.map((name, i) => (
              <option key={name} value={i}>
                {name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <div
          className="flex items-center gap-1"
          role="group"
          aria-label="Điều hướng trang"
        >
          <button
            type="button"
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-40"
            onClick={() => goToPage(pageNumber - 1)}
            disabled={pageNumber <= 1}
            aria-label="Trang trước"
          >
            ‹ Trước
          </button>
          <label htmlFor="page-input" className="sr-only">
            Số trang
          </label>
          <input
            id="page-input"
            type="number"
            min={1}
            max={numPages ?? undefined}
            value={pageNumber}
            onChange={(e) => goToPage(Number(e.target.value))}
            className="w-16 rounded-md border border-gray-300 px-2 py-1.5 text-center text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          />
          <span className="text-sm text-gray-600">
            / {numPages ?? '…'}
          </span>
          <button
            type="button"
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-40"
            onClick={() => goToPage(pageNumber + 1)}
            disabled={numPages !== null && pageNumber >= numPages}
            aria-label="Trang sau"
          >
            Sau ›
          </button>
        </div>

        <div
          className="flex items-center gap-1"
          role="group"
          aria-label="Thu phóng"
        >
          <button
            type="button"
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-40"
            onClick={() => setScale((s) => Math.max(MIN_SCALE, s - SCALE_STEP))}
            disabled={scale <= MIN_SCALE}
            aria-label="Thu nhỏ"
          >
            −
          </button>
          <span className="w-12 text-center text-sm text-gray-600">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-40"
            onClick={() => setScale((s) => Math.min(MAX_SCALE, s + SCALE_STEP))}
            disabled={scale >= MAX_SCALE}
            aria-label="Phóng to"
          >
            +
          </button>
          <button
            type="button"
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            onClick={() => setScale(1)}
            aria-label="Đặt lại thu phóng"
          >
            Đặt lại
          </button>
        </div>
      </div>

      {/* Document render */}
      <div className="flex justify-center overflow-auto rounded-md border border-gray-200 bg-gray-100 p-4">
        {error ? (
          <p className="py-10 text-sm text-red-600" role="alert">
            Không tải được tài liệu PDF ({file}). {error}
          </p>
        ) : (
          <Document
            file={url}
            onLoadSuccess={({ numPages: total }) => {
              setNumPages(total);
              setError(null);
              setPageNumber((p) => Math.max(1, Math.min(total, p)));
            }}
            onLoadError={(e) => setError(e.message)}
            loading={
              <p className="py-10 text-sm text-gray-600">Đang tải tài liệu…</p>
            }
            error={
              <p className="py-10 text-sm text-red-600" role="alert">
                Không tải được tài liệu PDF.
              </p>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer
              renderAnnotationLayer
              loading={
                <p className="py-10 text-sm text-gray-600">Đang tải trang…</p>
              }
            />
          </Document>
        )}
      </div>
    </div>
  );
}
