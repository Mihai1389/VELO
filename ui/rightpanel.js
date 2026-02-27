/**
 * ui/rightpanel.js
 * Message preview panel — renders stack, copy/undo/clear actions.
 */

import { t } from '../core/i18n.js';
import { getStack, pop, removeAt, clearAll } from '../core/state.js';
import { copyPlain, copyHTML } from '../core/clipboard.js';
import { showToast } from '../core/toast.js';

export function renderRightPanel() {
    const el = document.getElementById('smg-right-panel');
    if (!el) return;
    el.innerHTML = _html(getStack());
    _bindEvents(el);
}

function _html(stack) {
    const count = stack.length;
    const countLabel = count === 1
        ? `1 ${t('preview.count_one')}`
        : `${count} ${t('preview.count_many')}`;

    return `
    <div class="preview__header">
      <h2 class="preview__title">${t('preview.title')}</h2>
      <span class="preview__count${count ? '' : ' is-hidden'}" aria-live="polite">${countLabel}</span>
    </div>

    <div class="preview__messages" id="smg-messages" role="log" aria-live="polite" aria-label="${t('preview.title')}">
      ${count === 0 ? _emptyState() : stack.map((msg, i) => _messageCard(msg, i)).join('')}
    </div>

    <div class="preview__actions${count === 0 ? ' is-hidden' : ''}">
      <div class="preview__actions-row preview__actions-row--primary">
        <button class="smg-btn smg-btn--accent" id="smg-copy-plain" aria-label="${t('btn.copy_plain')}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          ${t('btn.copy_plain')}
        </button>
        <button class="smg-btn smg-btn--secondary" id="smg-copy-html" aria-label="${t('btn.copy_html')}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          ${t('btn.copy_html')}
        </button>
      </div>
      <div class="preview__actions-row preview__actions-row--secondary">
        <button class="smg-btn smg-btn--ghost" id="smg-undo" aria-label="${t('btn.undo')}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>
          ${t('btn.undo')}
        </button>
        <button class="smg-btn smg-btn--danger" id="smg-clear" aria-label="${t('btn.clear')}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
          ${t('btn.clear')}
        </button>
      </div>
    </div>
  `;
}

function _emptyState() {
    const lines = t('preview.empty').split('\n');
    return `
    <div class="preview__empty">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      <p>${lines[0]}</p>
      ${lines[1] ? `<p class="preview__empty-sub">${lines[1]}</p>` : ''}
    </div>
  `;
}

function _messageCard(msg, index) {
    // Convert \n to <br> for display, preserve existing <br> tags
    const display = msg.replace(/\n/g, '<br>');
    return `
    <article class="msg-card" data-index="${index}">
      <div class="msg-card__body">${display}</div>
      <button
        class="msg-card__remove"
        data-remove="${index}"
        aria-label="Remove message ${index + 1}"
        title="Remove"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </article>
  `;
}

function _bindEvents(el) {
    // Remove individual message
    el.querySelectorAll('[data-remove]').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.remove, 10);
            removeAt(idx);
        });
    });

    // Copy plain
    el.querySelector('#smg-copy-plain')?.addEventListener('click', () => {
        copyPlain(getStack());
    });

    // Copy HTML
    el.querySelector('#smg-copy-html')?.addEventListener('click', () => {
        copyHTML(getStack());
    });

    // Undo
    el.querySelector('#smg-undo')?.addEventListener('click', () => {
        if (getStack().length === 0) return;
        pop();
        showToast(t('toast.undo'), 'info', 2000);
    });

    // Clear all
    el.querySelector('#smg-clear')?.addEventListener('click', () => {
        if (getStack().length === 0) return;
        clearAll();
        showToast(t('toast.cleared'), 'info', 2500);
    });
}

// Re-render when language changes
document.addEventListener('smg:langchange', renderRightPanel);

// Re-render when stack changes
document.addEventListener('smg:stackchange', renderRightPanel);
