/**
 * core/clipboard.js
 * Copy message stack to clipboard as plain text or HTML.
 */

import { showToast } from './toast.js';
import { t } from './i18n.js';

/**
 * Copy messages as plain text (newline separated).
 * @param {string[]} stack
 */
export async function copyPlain(stack) {
    if (!stack.length) return;

    // Strip HTML tags for plain text
    const plain = stack
        .map(msg => msg.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, ''))
        .join('\n\n');

    try {
        await navigator.clipboard.writeText(plain);
        showToast(t('toast.copied_plain'), 'success');
    } catch {
        _fallbackCopy(plain);
        showToast(t('toast.copied_plain'), 'success');
    }
}

/**
 * Copy messages as HTML (br-separated).
 * @param {string[]} stack
 */
export async function copyHTML(stack) {
    if (!stack.length) return;

    const html = stack.join('<br><br>');

    try {
        await navigator.clipboard.write([
            new ClipboardItem({ 'text/html': new Blob([html], { type: 'text/html' }) })
        ]);
        showToast(t('toast.copied_html'), 'success');
    } catch {
        // ClipboardItem may not be supported — fall back to text
        const plain = stack
            .map(msg => msg.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, ''))
            .join('\n\n');
        _fallbackCopy(plain);
        showToast(t('toast.copied_plain'), 'success');
    }
}

function _fallbackCopy(text) {
    const el = document.createElement('textarea');
    el.value = text;
    el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}
