import type { Lang } from '../types';
import { MODULES } from '../data/modules';
import { UI_STRINGS } from './strings';

const LANGS: Lang[] = ['vi', 'en'];

/**
 * Compiled non-empty guard (design §12.3, §12.4). Iterates every UI string and
 * every ModuleDef.description vi/en value and throws if any is blank. Called
 * once at module top-level in strings.ts so a build/load surfaces an empty value.
 */
export function assertStrings(): void {
  for (const lang of LANGS) {
    const table = UI_STRINGS[lang];
    for (const key of Object.keys(table) as (keyof typeof table)[]) {
      const value = table[key];
      if (!(typeof value === 'string' && value.trim().length > 0)) {
        throw new Error(`UI_STRINGS.${lang}.${key} is empty`);
      }
    }
  }

  for (const module of MODULES) {
    for (const lang of LANGS) {
      const value = module.description[lang];
      if (!(typeof value === 'string' && value.trim().length > 0)) {
        throw new Error(`MODULES[${module.id}].description.${lang} is empty`);
      }
    }
  }
}
