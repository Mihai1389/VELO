/**
 * core/i18n.js
 * Lightweight internationalization system.
 * Loads JSON translation files and provides t(key, vars?) helper.
 */

let _translations = {};
let _lang = 'ro';

/**
 * Initialize i18n system. Loads the persisted or default language.
 */
export async function initI18n() {
  _lang = localStorage.getItem('smg_lang') || 'ro';
  await _load(_lang);
}

/**
 * Switch language at runtime and persist choice.
 * @param {string} lang - 'ro' | 'en'
 */
export async function setLang(lang) {
  _lang = lang;
  localStorage.setItem('smg_lang', lang);
  await _load(lang);
  // Dispatch event so UI components can re-render labels
  document.dispatchEvent(new CustomEvent('smg:langchange', { detail: { lang } }));
}

/** Get current language code */
export function getLang() {
  return _lang;
}

/**
 * Translate a key, optionally interpolating variables.
 * @param {string} key
 * @param {Object} [vars] - e.g. { name: 'Ion' }
 * @returns {string}
 */
export function t(key, vars = {}) {
  let str = _translations[key] ?? key;
  for (const [k, v] of Object.entries(vars)) {
    str = str.replaceAll(`{${k}}`, v);
  }
  return str;
}

async function _load(lang) {
  try {
    const resp = await fetch(`./i18n/${lang}.json`);
    if (!resp.ok) throw new Error(`Failed to load i18n/${lang}.json`);
    _translations = await resp.json();
  } catch (err) {
    console.warn('[i18n] Could not load translations:', err);
    _translations = {};
  }
}
