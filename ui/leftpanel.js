/**
 * ui/leftpanel.js
 * Template controls panel — all category sections with inputs and actions.
 */

import { t, getLang } from '../core/i18n.js';
import { getCurrentBrand, push } from '../core/state.js';
import { showToast } from '../core/toast.js';
import {
  validateCard, validateName, validateAmount,
  validateEmailOrPhone, validateSelect, validateNonEmpty
} from '../core/validators.js';
import { identityTemplates, identityOptions } from '../templates/identity.js';
import { documentTemplates } from '../templates/documents.js';
import { cardTemplates } from '../templates/card.js';
import {
  requestEwallet, rejectEwallet,
  declarationEwallet, additionalIDWallet
} from '../templates/ewallet.js';
import { calculationTax } from '../templates/calculator.js';
import { deposit } from '../templates/deposit.js';
import { customMessage } from '../templates/custom.js';

export function renderLeftPanel() {
  const el = document.getElementById('smg-left-panel');
  if (!el) return;
  el.innerHTML = _html();
  _bindEvents(el);
}

function _html() {
  const brand = getCurrentBrand();

  // Identity options
  const identityOpts = identityOptions.map(o =>
    `<option value="${o.value}">${t(o.labelKey)}</option>`
  ).join('');

  // Other documents options (brand-specific)
  const docOpts = brand.otherDocOptions.map(o =>
    `<option value="${o.value}">${t(o.labelKey)}</option>`
  ).join('');

  return `
    <!-- Search -->
    <div class="panel-search">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input
        type="search"
        id="smg-search"
        class="panel-search__input"
        placeholder="${t('search.placeholder')}"
        aria-label="${t('search.placeholder')}"
        autocomplete="off"
      >
    </div>

    <!-- Category: Identity -->
    <section class="panel-section" data-section="identity" data-keywords="identity identitate kyc confirmare nume cnp buletin document">
      <button class="panel-section__header" aria-expanded="true">
        <span class="panel-section__icon">🪪</span>
        <span class="panel-section__title">${t('category.identity')}</span>
        <svg class="panel-section__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="panel-section__body">
        <div class="panel-row">
          <select id="smg-identity-select" class="smg-select" aria-label="${t('category.identity')}">
            <option value="" disabled selected>— ${t('category.identity')} —</option>
            ${identityOpts}
          </select>
          <button class="smg-btn smg-btn--primary" id="smg-identity-submit" aria-label="${t('btn.submit')}">
            ${t('btn.submit')}
          </button>
        </div>
        <div class="smg-error" id="smg-identity-error" aria-live="polite"></div>
      </div>
    </section>

    <!-- Category: Other Documents -->
    <section class="panel-section" data-section="documents" data-keywords="selfie document proof address video sport fata verso buletin card">
      <button class="panel-section__header" aria-expanded="true">
        <span class="panel-section__icon">📄</span>
        <span class="panel-section__title">${t('category.documents')}</span>
        <svg class="panel-section__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="panel-section__body">
        <div class="panel-row">
          <select id="smg-doc-select" class="smg-select" aria-label="${t('category.documents')}">
            <option value="" disabled selected>— ${t('category.documents')} —</option>
            ${docOpts}
          </select>
          <button class="smg-btn smg-btn--primary" id="smg-doc-submit" aria-label="${t('btn.submit')}">
            ${t('btn.submit')}
          </button>
        </div>
        <div class="smg-error" id="smg-doc-error" aria-live="polite"></div>
      </div>
    </section>

    <!-- Category: Card -->
    <section class="panel-section" data-section="card" data-keywords="card revolut salt bank statement declaration reminder">
      <button class="panel-section__header" aria-expanded="true">
        <span class="panel-section__icon">💳</span>
        <span class="panel-section__title">${t('category.card')}</span>
        <svg class="panel-section__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="panel-section__body">
        <div class="panel-inputs">
          <input type="text" id="smg-card-last4" class="smg-input" placeholder="${t('input.card_last4')}" maxlength="4" inputmode="numeric" aria-label="${t('input.card_last4')}">
          <input type="text" id="smg-card-name" class="smg-input" placeholder="${t('input.card_name')}" aria-label="${t('input.card_name')}">
        </div>
        <div class="smg-error" id="smg-card-error" aria-live="polite"></div>
        <div class="panel-btns">
          <button class="smg-btn" data-card-action="cardHolder">${t('btn.card')}</button>
          <button class="smg-btn" data-card-action="revolut">${t('btn.revolut')}</button>
          <button class="smg-btn" data-card-action="salt">${t('btn.salt')}</button>
          <button class="smg-btn" data-card-action="bankStatement">${t('btn.bank_statement')}</button>
          <button class="smg-btn" data-card-action="declaration">${t('btn.declaration_card')}</button>
          <button class="smg-btn" data-card-action="declarationPassport">${t('btn.declaration_passport')}</button>
          <button class="smg-btn" data-card-action="additionalID">${t('btn.additional_id')}</button>
          <button class="smg-btn" data-card-action="kindReminder">${t('btn.kind_reminder')}</button>
        </div>
      </div>
    </section>

    <!-- Category: E-Wallet -->
    <section class="panel-section" data-section="ewallet" data-keywords="ewallet paysafe skrill neteller aircash okto wallet email phone declaration">
      <button class="panel-section__header" aria-expanded="true">
        <span class="panel-section__icon">💶</span>
        <span class="panel-section__title">${t('category.ewallet')}</span>
        <svg class="panel-section__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="panel-section__body">
        <div class="panel-row">
          <select id="smg-wallet-select" class="smg-select" aria-label="${t('category.ewallet')}">
            <option value="" disabled selected>— E-Wallet —</option>
            <option value="Paysafe">Paysafe</option>
            <option value="Skrill">Skrill</option>
            <option value="Neteller">Neteller</option>
            <option value="Aircash" data-type="phone">Aircash (${t('ewallet.AircashPhone').split('(')[1]?.replace(')', '') || 'Phone'})</option>
            <option value="Aircash" data-type="mail">Aircash (${t('ewallet.AircashMail').split('(')[1]?.replace(')', '') || 'Email'})</option>
            <option value="OKTO">OKTO</option>
          </select>
        </div>
        <div class="panel-inputs">
          <input type="text" id="smg-wallet-input" class="smg-input" placeholder="${t('input.ewallet_email')}" aria-label="${t('input.ewallet_email')}">
          <input type="text" id="smg-wallet-name" class="smg-input" placeholder="${t('input.ewallet_name')}" aria-label="${t('input.ewallet_name')}">
        </div>
        <div class="smg-error" id="smg-wallet-error" aria-live="polite"></div>
        <div class="panel-btns">
          <button class="smg-btn" id="smg-wallet-request">${t('btn.request_ewallet')}</button>
          <button class="smg-btn" id="smg-wallet-reject">${t('btn.reject_ewallet')}</button>
          <button class="smg-btn" id="smg-wallet-decl">${t('btn.declaration_ewallet')}</button>
          <button class="smg-btn" id="smg-wallet-addid">${t('btn.additional_id_ewallet')}</button>
        </div>
      </div>
    </section>

    <!-- Category: Calculator -->
    <section class="panel-section" data-section="calculator" data-keywords="calculator debitare taxe bonus retragere">
      <button class="panel-section__header" aria-expanded="true">
        <span class="panel-section__icon">🧮</span>
        <span class="panel-section__title">${t('category.calculator')}</span>
        <svg class="panel-section__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="panel-section__body">
        <div class="panel-inputs">
          <input type="text" id="smg-calc-tax" class="smg-input" placeholder="${t('input.tax')}" inputmode="decimal" aria-label="${t('input.tax')}">
          <input type="text" id="smg-calc-limit" class="smg-input" placeholder="${t('input.max_wd')}" inputmode="decimal" aria-label="${t('input.max_wd')}">
          <input type="text" id="smg-calc-sum" class="smg-input" placeholder="${t('input.sum')}" inputmode="decimal" aria-label="${t('input.sum')}">
        </div>
        <div class="smg-error" id="smg-calc-error" aria-live="polite"></div>
        <div class="panel-btns">
          <button class="smg-btn smg-btn--primary" id="smg-calc-submit">${t('btn.submit')}</button>
        </div>
      </div>
    </section>

    <!-- Category: Deposit -->
    <section class="panel-section" data-section="deposit" data-keywords="deposit depunere suma bonus retragere">
      <button class="panel-section__header" aria-expanded="true">
        <span class="panel-section__icon">💰</span>
        <span class="panel-section__title">${t('category.deposit')}</span>
        <svg class="panel-section__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="panel-section__body">
        <div class="panel-inputs">
          <input type="text" id="smg-deposit-amount" class="smg-input" placeholder="${t('input.deposit_amount')}" inputmode="decimal" aria-label="${t('input.deposit_amount')}">
        </div>
        <div class="smg-error" id="smg-deposit-error" aria-live="polite"></div>
        <div class="panel-btns">
          <button class="smg-btn smg-btn--primary" id="smg-deposit-submit">${t('btn.submit')}</button>
        </div>
      </div>
    </section>

    <!-- Category: Custom Message -->
    <section class="panel-section" data-section="custom" data-keywords="custom mesaj personalizat liber">
      <button class="panel-section__header" aria-expanded="true">
        <span class="panel-section__icon">✏️</span>
        <span class="panel-section__title">${t('category.custom')}</span>
        <svg class="panel-section__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="panel-section__body">
        <textarea id="smg-custom-msg" class="smg-textarea" placeholder="${t('input.custom_message')}" rows="3" aria-label="${t('input.custom_message')}"></textarea>
        <div class="smg-error" id="smg-custom-error" aria-live="polite"></div>
        <div class="panel-btns">
          <button class="smg-btn smg-btn--primary" id="smg-custom-submit">${t('btn.submit')}</button>
        </div>
      </div>
    </section>
  `;
}

function _err(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg; el.classList.toggle('is-visible', !!msg); }
}
function _clearErr(id) { _err(id, ''); }

function _bindEvents(el) {
  const brand = () => getCurrentBrand();

  // ── Collapsible sections ──────────────────────────────────────────────────
  el.querySelectorAll('.panel-section__header').forEach(header => {
    header.addEventListener('click', () => {
      const expanded = header.getAttribute('aria-expanded') === 'true';
      header.setAttribute('aria-expanded', String(!expanded));
      const body = header.nextElementSibling;
      body.classList.toggle('is-collapsed', expanded);
    });
  });

  // ── Search / filter ───────────────────────────────────────────────────────
  const searchInput = el.querySelector('#smg-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      el.querySelectorAll('.panel-section').forEach(section => {
        const keywords = (section.dataset.keywords || '') + ' ' +
          section.querySelector('.panel-section__title')?.textContent.toLowerCase();
        const match = !q || keywords.includes(q);
        section.style.display = match ? '' : 'none';
      });
    });
  }

  // ── Identity ──────────────────────────────────────────────────────────────
  el.querySelector('#smg-identity-submit')?.addEventListener('click', () => {
    _clearErr('smg-identity-error');
    const sel = el.querySelector('#smg-identity-select');
    const val = sel.value;
    if (!val) { _err('smg-identity-error', t('validation.select')); return; }
    const fn = identityTemplates[val];
    if (!fn) return;
    push(fn({}, brand(), getLang()));
    showToast(t('toast.added'), 'success', 2000);
    sel.value = '';
  });

  // ── Other Documents ───────────────────────────────────────────────────────
  el.querySelector('#smg-doc-submit')?.addEventListener('click', () => {
    _clearErr('smg-doc-error');
    const sel = el.querySelector('#smg-doc-select');
    const val = sel.value;
    if (!val) { _err('smg-doc-error', t('validation.select')); return; }

    const card = el.querySelector('#smg-card-last4')?.value.trim() || '';
    const fn = documentTemplates[val];
    if (!fn) return;

    // id_cc and selfie_cc need a card number
    if ((val === 'id_cc' || val === 'selfie_cc') && !card) {
      _err('smg-doc-error', t('validation.card'));
      return;
    }

    push(fn({ card }, brand(), getLang()));
    showToast(t('toast.added'), 'success', 2000);
    sel.value = '';
  });

  // ── Card buttons ──────────────────────────────────────────────────────────
  el.querySelectorAll('[data-card-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      _clearErr('smg-card-error');
      const action = btn.dataset.cardAction;
      const card = el.querySelector('#smg-card-last4')?.value.trim() || '';
      const name = el.querySelector('#smg-card-name')?.value.trim() || '';
      const fn = cardTemplates[action];
      if (!fn) return;

      // Actions that only need card
      const cardOnly = ['cardHolder', 'revolut', 'salt', 'bankStatement', 'kindReminder'];
      // Actions that need card + name
      const cardAndName = ['declaration', 'declarationPassport', 'additionalID'];

      if (action !== 'kindReminder') {
        const cardValid = validateCard(card);
        if (!cardValid.ok) { _err('smg-card-error', t(cardValid.errorKey)); return; }
      }
      if (cardAndName.includes(action)) {
        const nameValid = validateName(name);
        if (!nameValid.ok) { _err('smg-card-error', t(nameValid.errorKey)); return; }
      }

      push(fn({ card, name }, brand(), getLang()));
      showToast(t('toast.added'), 'success', 2000);
    });
  });

  // ── E-Wallet ──────────────────────────────────────────────────────────────
  function _getWalletVars() {
    const sel = el.querySelector('#smg-wallet-select');
    const opt = sel.options[sel.selectedIndex];
    return {
      wallet: opt?.value || '',
      type: opt?.dataset?.type || null,
      input: el.querySelector('#smg-wallet-input')?.value.trim() || '',
      name: el.querySelector('#smg-wallet-name')?.value.trim() || '',
    };
  }

  const WALLET_ALLOWED = ['Paysafe', 'Skrill', 'Neteller', 'Aircash', 'OKTO'];

  el.querySelector('#smg-wallet-request')?.addEventListener('click', () => {
    _clearErr('smg-wallet-error');
    const vars = _getWalletVars();
    if (!WALLET_ALLOWED.includes(vars.wallet)) { _err('smg-wallet-error', t('validation.select')); return; }
    if (!vars.input) { _err('smg-wallet-error', t('validation.email')); return; }
    push(requestEwallet(vars, brand(), getLang()));
    showToast(t('toast.added'), 'success', 2000);
  });

  el.querySelector('#smg-wallet-reject')?.addEventListener('click', () => {
    _clearErr('smg-wallet-error');
    const vars = _getWalletVars();
    if (!WALLET_ALLOWED.includes(vars.wallet)) { _err('smg-wallet-error', t('validation.select')); return; }
    if (!vars.input) { _err('smg-wallet-error', t('validation.email')); return; }
    if (!vars.name) { _err('smg-wallet-error', t('validation.name')); return; }
    push(rejectEwallet(vars, brand(), getLang()));
    showToast(t('toast.added'), 'success', 2000);
  });

  el.querySelector('#smg-wallet-decl')?.addEventListener('click', () => {
    _clearErr('smg-wallet-error');
    const vars = _getWalletVars();
    if (!WALLET_ALLOWED.includes(vars.wallet)) { _err('smg-wallet-error', t('validation.select')); return; }
    if (!vars.input) { _err('smg-wallet-error', t('validation.email')); return; }
    if (!vars.name) { _err('smg-wallet-error', t('validation.name')); return; }
    push(declarationEwallet(vars, brand(), getLang()));
    showToast(t('toast.added'), 'success', 2000);
  });

  el.querySelector('#smg-wallet-addid')?.addEventListener('click', () => {
    _clearErr('smg-wallet-error');
    const vars = _getWalletVars();
    if (!WALLET_ALLOWED.includes(vars.wallet)) { _err('smg-wallet-error', t('validation.select')); return; }
    if (!vars.input) { _err('smg-wallet-error', t('validation.email')); return; }
    if (!vars.name) { _err('smg-wallet-error', t('validation.name')); return; }
    push(additionalIDWallet(vars, brand(), getLang()));
    showToast(t('toast.added'), 'success', 2000);
  });

  // ── Calculator ────────────────────────────────────────────────────────────
  el.querySelector('#smg-calc-submit')?.addEventListener('click', () => {
    _clearErr('smg-calc-error');
    const taxOff = el.querySelector('#smg-calc-tax')?.value.trim();
    const limit = el.querySelector('#smg-calc-limit')?.value.trim();
    const sum = el.querySelector('#smg-calc-sum')?.value.trim();

    for (const v of [taxOff, limit, sum]) {
      const r = validateAmount(v);
      if (!r.ok) { _err('smg-calc-error', t(r.errorKey)); return; }
    }

    push(calculationTax({ taxOff, limit, sum }, brand(), getLang()));
    showToast(t('toast.added'), 'success', 2000);
  });

  // ── Deposit ───────────────────────────────────────────────────────────────
  el.querySelector('#smg-deposit-submit')?.addEventListener('click', () => {
    _clearErr('smg-deposit-error');
    const amount = el.querySelector('#smg-deposit-amount')?.value.trim();
    const r = validateAmount(amount);
    if (!r.ok) { _err('smg-deposit-error', t(r.errorKey)); return; }
    push(deposit({ amount }, brand(), getLang()));
    showToast(t('toast.added'), 'success', 2000);
    el.querySelector('#smg-deposit-amount').value = '';
  });

  // ── Custom ────────────────────────────────────────────────────────────────
  el.querySelector('#smg-custom-submit')?.addEventListener('click', () => {
    _clearErr('smg-custom-error');
    const msg = el.querySelector('#smg-custom-msg')?.value;
    const r = validateNonEmpty(msg);
    if (!r.ok) { _err('smg-custom-error', t(r.errorKey)); return; }
    push(customMessage({ message: msg }));
    showToast(t('toast.added'), 'success', 2000);
    el.querySelector('#smg-custom-msg').value = '';
  });
}

// Re-render when language or brand changes
document.addEventListener('smg:langchange', renderLeftPanel);
document.addEventListener('smg:brandchange', renderLeftPanel);
