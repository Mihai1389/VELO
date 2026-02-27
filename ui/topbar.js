/**
 * ui/topbar.js
 * Renders the top navigation bar: brand tabs, language toggle, theme toggle.
 */

import { t, setLang, getLang } from '../core/i18n.js';
import { getBrands, getCurrentBrand, setBrand } from '../core/state.js';

export function renderTopbar() {
  const el = document.getElementById('smg-topbar');
  if (!el) return;
  el.innerHTML = _html();
  _bindEvents(el);
}

function _html() {
  const brands = getBrands();
  const current = getCurrentBrand();
  const lang = getLang();

  const brandTabs = brands.map(b => `
    <button
      class="topbar__brand-tab${b.id === current.id ? ' is-active' : ''}"
      data-brand="${b.id}"
      aria-label="Switch to ${b.label}"
      aria-pressed="${b.id === current.id}"
    >${b.label}</button>
  `).join('');

  return `
    <div class="topbar__inner">
      <div class="topbar__left">
        <span class="topbar__logo">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </span>
        <span class="topbar__title">${t('app.title')}</span>
      </div>
      <nav class="topbar__brands" role="tablist" aria-label="Brand">
        ${brandTabs}
      </nav>
      <div class="topbar__controls">
        <button
          class="lang-switch${lang === 'en' ? ' lang-switch--en' : ''}"
          aria-label="Toggle language"
          title="Switch language"
          role="switch"
          aria-checked="${lang === 'en'}"
        >
          <span class="lang-switch__option">RO</span>
          <span class="lang-switch__option">EN</span>
          <span class="lang-switch__thumb"></span>
        </button>
        <button class="topbar__ctrl-btn topbar__theme-toggle" aria-label="Toggle theme" title="Theme" id="smg-theme-toggle">
          <svg class="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          <svg class="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
      </div>
    </div>
  `;
}

function _bindEvents(el) {
  // Brand tabs
  el.querySelectorAll('.topbar__brand-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      setBrand(btn.dataset.brand);
      // Update active tab UI
      el.querySelectorAll('.topbar__brand-tab').forEach(b => {
        b.classList.toggle('is-active', b.dataset.brand === btn.dataset.brand);
        b.setAttribute('aria-pressed', b.dataset.brand === btn.dataset.brand);
      });
    });
  });

  // Helper: set label colors via inline style (bypasses CSS cache)
  function _updateSwitchColors(btn, lang) {
    const [roLabel, enLabel] = btn.querySelectorAll('.lang-switch__option');
    const ACTIVE = '#ffffff';
    const INACTIVE = 'rgba(255,255,255,0.25)';
    roLabel.style.color = lang === 'en' ? INACTIVE : ACTIVE;
    enLabel.style.color = lang === 'en' ? ACTIVE : INACTIVE;
  }

  // Language toggle
  const switchBtn = el.querySelector('.lang-switch');
  _updateSwitchColors(switchBtn, getLang()); // set correct colors on first render
  switchBtn.addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    const newLang = getLang() === 'ro' ? 'en' : 'ro';
    await setLang(newLang);
    btn.classList.toggle('lang-switch--en', newLang === 'en');
    btn.setAttribute('aria-checked', String(newLang === 'en'));
    _updateSwitchColors(btn, newLang);
  });

  // Theme toggle
  el.querySelector('.topbar__theme-toggle').addEventListener('click', () => {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('smg_theme', next);
  });
}

// On lang change: only update the title text (don't re-render — keeps switch animation)
document.addEventListener('smg:langchange', () => {
  const title = document.querySelector('#smg-topbar .topbar__title');
  if (title) title.textContent = t('app.title');
});
