// Copies the pdf.js worker shipped with pdfjs-dist into public/ so the app can
// serve it locally (offline, no CDN). react-pdf points GlobalWorkerOptions.workerSrc
// at '/pdf.worker.min.mjs'. Run as postinstall and prebuild.
import { existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

const source = resolve(
  projectRoot,
  'node_modules/pdfjs-dist/build/pdf.worker.min.mjs',
);
const publicDir = resolve(projectRoot, 'public');
const dest = resolve(publicDir, 'pdf.worker.min.mjs');

if (!existsSync(source)) {
  console.error(
    `[copy-pdf-worker] Source worker not found: ${source}\n` +
      'Make sure pdfjs-dist@4.8.69 is installed (run npm install first).',
  );
  process.exit(1);
}

if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

copyFileSync(source, dest);
console.log(`[copy-pdf-worker] Copied pdf.js worker -> ${dest}`);
