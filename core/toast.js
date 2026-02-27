/**
 * core/toast.js
 * Non-blocking toast notification system.
 * Replaces all alert() calls.
 */

let _container = null;

function _ensureContainer() {
    if (_container) return;
    _container = document.createElement('div');
    _container.id = 'smg-toast-container';
    _container.setAttribute('aria-live', 'polite');
    _container.setAttribute('aria-atomic', 'false');
    document.body.appendChild(_container);
}

/**
 * Show a toast notification.
 * @param {string} message
 * @param {'success'|'error'|'warning'|'info'} [type='info']
 * @param {number} [duration=3000] - ms before auto-dismiss
 */
export function showToast(message, type = 'info', duration = 3000) {
    _ensureContainer();

    const toast = document.createElement('div');
    toast.className = `smg-toast smg-toast--${type}`;
    toast.setAttribute('role', 'status');

    const icon = _getIcon(type);
    toast.innerHTML = `<span class="smg-toast__icon">${icon}</span><span class="smg-toast__msg">${message}</span>`;

    // Dismiss on click
    toast.addEventListener('click', () => _dismiss(toast));

    _container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => toast.classList.add('smg-toast--visible'));

    // Auto-dismiss
    setTimeout(() => _dismiss(toast), duration);
}

function _dismiss(toast) {
    toast.classList.remove('smg-toast--visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
}

function _getIcon(type) {
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ',
    };
    return icons[type] ?? icons.info;
}
