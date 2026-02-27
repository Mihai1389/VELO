/**
 * templates/deposit.js
 * Deposit template — bilingual (RO / EN). Professional tone.
 * vars: { amount }
 */

export function deposit({ amount }, brand, lang = 'ro') {
    if (lang === 'en') {
        return `In order to process the withdrawal of winnings generated through the active offer, a deposit of ${amount} RON is required on the same day as the withdrawal request, following the activation of the bonus.`;
    }
    return `Pentru a putea procesa retragerea câștigurilor generate prin oferta activă, este necesară efectuarea unei depuneri de ${amount} RON în aceeași zi cu solicitarea de retragere, ulterior activării bonusului.`;
}
