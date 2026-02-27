/**
 * core/state.js
 * Central application state: brand selection and message stack.
 */

let _brands = [];
let _currentBrand = null;
let _messageStack = [];

/**
 * Load brands config and restore persisted state.
 */
export async function initState() {
    const resp = await fetch('./brands.json');
    _brands = await resp.json();

    // Restore last used brand
    const savedBrandId = localStorage.getItem('smg_brand') || _brands[0].id;
    _currentBrand = _brands.find(b => b.id === savedBrandId) || _brands[0];

    // Optionally restore message history
    try {
        const history = localStorage.getItem('smg_history');
        if (history) _messageStack = JSON.parse(history);
    } catch { _messageStack = []; }
}

/** Get all brands */
export function getBrands() { return _brands; }

/** Get current active brand */
export function getCurrentBrand() { return _currentBrand; }

/** Switch active brand and persist */
export function setBrand(brandId) {
    const brand = _brands.find(b => b.id === brandId);
    if (!brand) return;
    _currentBrand = brand;
    localStorage.setItem('smg_brand', brandId);
    document.dispatchEvent(new CustomEvent('smg:brandchange', { detail: { brand } }));
}

/** Get the full message stack (copy) */
export function getStack() { return [..._messageStack]; }

/** Append a message to the stack */
export function push(message) {
    _messageStack.push(message);
    _persist();
    _dispatch();
}

/** Remove the last message */
export function pop() {
    _messageStack.pop();
    _persist();
    _dispatch();
}

/** Remove message at specific index */
export function removeAt(index) {
    _messageStack.splice(index, 1);
    _persist();
    _dispatch();
}

/** Clear all messages */
export function clearAll() {
    _messageStack = [];
    _persist();
    _dispatch();
}

function _dispatch() {
    document.dispatchEvent(new CustomEvent('smg:stackchange', {
        detail: { stack: [..._messageStack] }
    }));
}

function _persist() {
    try {
        localStorage.setItem('smg_history', JSON.stringify(_messageStack));
    } catch { /* quota exceeded — ignore */ }
}
