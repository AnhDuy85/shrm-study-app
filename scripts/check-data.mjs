// scripts/check-data.mjs  (Node ESM; "type":"module"; no deps; Node 20/22/24)
// Required data sanity gate (design §12). Reads the three JSON data files with
// fs.readFileSync + JSON.parse (no import attributes) so it runs identically on
// Node 20/22/24, and resolves paths relative to this script so cwd does not matter.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const read = (rel) => JSON.parse(readFileSync(resolve(here, rel), 'utf8'));

const QUIZZES = read('../src/data/quiz.json');
const LESSONS = read('../src/data/lessons.json');
const FLASHCARDS = read('../src/data/flashcards.json');

const GROUP_IDS = ['people', 'organization', 'workplace', 'leadership', 'interpersonal', 'business'];

const errors = [];
const fail = (msg) => errors.push(msg);
const isNonEmpty = (s) => typeof s === 'string' && s.trim().length > 0;
const isLocalized = (v) => v && typeof v === 'object' && isNonEmpty(v.vi) && isNonEmpty(v.en);

// Helper: assert a Localized value at a labeled path (check #3).
const checkLocalized = (value, path) => {
  if (!isLocalized(value)) {
    fail(`[non-empty] ${path}: expected Localized { vi, en } with both non-empty`);
  }
};

// Check #1: GROUP_IDS exactly equals the key set of each data file, and each
// group has >=10 quiz questions.
const expected = [...GROUP_IDS].sort();
for (const [name, data] of [
  ['quiz.json', QUIZZES],
  ['lessons.json', LESSONS],
  ['flashcards.json', FLASHCARDS],
]) {
  const keys = Object.keys(data).sort();
  if (keys.length !== expected.length || keys.some((k, i) => k !== expected[i])) {
    fail(`[groups] ${name}: key set ${JSON.stringify(keys)} !== ${JSON.stringify(expected)}`);
  }
}

for (const group of GROUP_IDS) {
  const questions = QUIZZES[group];
  if (!Array.isArray(questions)) {
    fail(`[groups] quiz.json[${group}]: expected an array of questions`);
    continue;
  }
  if (questions.length < 10) {
    fail(`[count] quiz.json[${group}]: ${questions.length} questions (need >=10)`);
  }
}

// Checks #2, #3 (quiz), #4: per-question arity, index range, Localized, id format/uniqueness/contiguity.
const allIds = new Map();
for (const group of GROUP_IDS) {
  const questions = Array.isArray(QUIZZES[group]) ? QUIZZES[group] : [];
  const idRegex = new RegExp('^' + group + '-q\\d+$');
  const seenNumbers = [];
  questions.forEach((q, i) => {
    const at = `quiz.json[${group}][${i}]`;
    // #2: option arity + correctIndex range
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      fail(`[options] ${at} (id=${q.id}): expected exactly 4 options`);
    }
    if (!(Number.isInteger(q.correctIndex) && q.correctIndex >= 0 && q.correctIndex <= 3)) {
      fail(`[correctIndex] ${at} (id=${q.id}): must be an integer 0..3`);
    }
    // #3: Localized question, options, explanation
    checkLocalized(q.question, `${at}.question`);
    if (Array.isArray(q.options)) {
      q.options.forEach((opt, oi) => checkLocalized(opt, `${at}.options[${oi}]`));
    }
    checkLocalized(q.explanation, `${at}.explanation`);
    // #4: id format + uniqueness + contiguity
    if (typeof q.id !== 'string' || !idRegex.test(q.id)) {
      fail(`[id-format] ${at}: id ${JSON.stringify(q.id)} must match ^${group}-q\\d+$`);
    } else {
      if (allIds.has(q.id)) {
        fail(`[id-unique] ${at}: duplicate id ${q.id} (also at ${allIds.get(q.id)})`);
      } else {
        allIds.set(q.id, at);
      }
      seenNumbers.push(Number(q.id.slice((group + '-q').length)));
    }
  });
  // Contiguous from 1 with no gaps/dupes.
  const sorted = [...seenNumbers].sort((a, b) => a - b);
  sorted.forEach((n, i) => {
    if (n !== i + 1) {
      fail(
        `[id-contiguous] quiz.json[${group}]: numbering not contiguous from 1 ` +
          `(got ${JSON.stringify(sorted)})`,
      );
    }
  });
}

// Check #5 + #3 (lessons): lesson minimums and Localized fields.
for (const group of GROUP_IDS) {
  const lesson = LESSONS[group];
  const at = `lessons.json[${group}]`;
  if (!lesson || typeof lesson !== 'object') {
    fail(`[lesson] ${at}: missing lesson object`);
    continue;
  }
  const objectives = Array.isArray(lesson.objectives) ? lesson.objectives : [];
  const keyPoints = Array.isArray(lesson.keyPoints) ? lesson.keyPoints : [];
  const applications = Array.isArray(lesson.applications) ? lesson.applications : [];
  if (objectives.length < 6) fail(`[count] ${at}.objectives: ${objectives.length} (need >=6)`);
  if (keyPoints.length < 6) fail(`[count] ${at}.keyPoints: ${keyPoints.length} (need >=6)`);
  if (applications.length < 4) fail(`[count] ${at}.applications: ${applications.length} (need >=4)`);

  objectives.forEach((o, i) => checkLocalized(o, `${at}.objectives[${i}]`));
  keyPoints.forEach((kp, i) => {
    if (!isNonEmpty(kp && kp.term)) fail(`[term] ${at}.keyPoints[${i}].term: expected non-empty string`);
    checkLocalized(kp && kp.detail, `${at}.keyPoints[${i}].detail`);
  });
  applications.forEach((app, i) => {
    checkLocalized(app && app.title, `${at}.applications[${i}].title`);
    checkLocalized(app && app.description, `${at}.applications[${i}].description`);
  });
  checkLocalized(lesson.diagram, `${at}.diagram`);
}

// Check #3 (flashcards): Localized definitions.
for (const group of GROUP_IDS) {
  const cards = Array.isArray(FLASHCARDS[group]) ? FLASHCARDS[group] : [];
  cards.forEach((card, i) => {
    checkLocalized(card && card.definition, `flashcards.json[${group}][${i}].definition`);
  });
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('check-data: OK');
