/**
 * templates/custom.js
 * Passthrough custom message (user-typed).
 * vars: { message }
 */

export function customMessage({ message }) {
    return String(message).trim();
}
