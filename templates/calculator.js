/**
 * templates/calculator.js
 * Debiting calculator — bilingual (RO / EN). Professional tone.
 * vars: { taxOff, limit, sum }
 */

export function calculationTax({ taxOff, limit, sum }, brand, lang = 'ro') {
    const taxNum = parseFloat(String(taxOff).replace(/\s/g, ''));
    const limitNum = parseFloat(limit);
    const sumNum = parseFloat(sum);
    const calc = ((taxNum * 100) / 97) + (sumNum - limitNum);
    const debited = calc.toFixed(2);

    if (lang === 'en') {
        return `In accordance with the offer terms and conditions, the maximum permitted withdrawal amount is ${limitNum} RON. The eligible balance has been returned to your player account, and the amount of ${debited} RON has been cancelled in accordance with the applicable Terms and Conditions.`;
    }

    return `Conform termenilor și condițiilor ofertei, suma maximă permisă la retragere este de ${limitNum} RON. Suma eligibilă a fost reintrodusă în contul dumneavoastră de jucător, iar suma de ${debited} RON a fost anulată în conformitate cu Termenii și Condițiile aplicabile.`;
}
