import { pdfjs } from 'react-pdf';

// Serve the pdf.js worker locally (copied into public/ at install/build time)
// so the app stays fully offline. This version MUST match react-pdf's bundled
// pdfjs-dist (4.8.69) or pdf.js throws an API/Worker version mismatch.
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

// Imported for its side effect (worker config). No-op export to make the intent
// explicit and keep bundlers from tree-shaking the module away.
export const PDF_WORKER_CONFIGURED = true;
