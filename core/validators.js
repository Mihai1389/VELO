/**
 * core/validators.js
 * Input validation helpers — all return { ok: boolean, errorKey?: string }
 */

/** Card last 4 digits: exactly 4 numeric characters */
export function validateCard(value) {
    const v = String(value).trim();
    if (!v) return { ok: false, errorKey: 'validation.card' };
    if (!/^\d{4}$/.test(v)) return { ok: false, errorKey: 'validation.card' };
    return { ok: true };
}

/** Non-empty name */
export function validateName(value) {
    const v = String(value).trim();
    if (!v) return { ok: false, errorKey: 'validation.name' };
    return { ok: true };
}

/** Numeric positive amount */
export function validateAmount(value) {
    const v = String(value).trim();
    if (!v) return { ok: false, errorKey: 'validation.amount' };
    if (isNaN(Number(v)) || Number(v) <= 0) return { ok: false, errorKey: 'validation.amount' };
    return { ok: true };
}

/** Non-empty email or phone */
export function validateEmailOrPhone(value) {
    const v = String(value).trim();
    if (!v) return { ok: false, errorKey: 'validation.email' };
    return { ok: true };
}

/** Value must be in allowed list */
export function validateSelect(value, allowed) {
    if (!allowed.includes(value)) return { ok: false, errorKey: 'validation.select' };
    return { ok: true };
}

/** Non-empty string */
export function validateNonEmpty(value) {
    const v = String(value).trim();
    if (!v) return { ok: false, errorKey: 'validation.custom' };
    return { ok: true };
}
