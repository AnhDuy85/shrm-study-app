import type { Lang, Localized } from '../types';
import type { UiKey } from './strings';
import { UI_STRINGS } from './strings';

// Resolve a Localized *data* value. Pure function (not a hook) so it is usable
// in any render path, in list .map() callbacks, and in non-component helpers.
export function tc(value: Localized, lang: Lang): string {
  return value[lang];
}

// Resolve a UI *chrome* string by key.
export function tui(lang: Lang, key: UiKey): string {
  return UI_STRINGS[lang][key];
}
