/**
 * templates/documents.js
 * Other Documents templates — bilingual (RO / EN). Professional tone.
 */

const _ro = {
    selfie: (v, b) =>
        `Vă rugăm să încărcați un selfie în care țineți cartea de identitate lângă față, cu fața dumneavoastră și toate datele documentului complet vizibile.`,

    selfie_id: (v, b) =>
        `Vă rugăm să încărcați un selfie în care țineți cartea de identitate lângă față, cu fața dumneavoastră și toate datele documentului complet vizibile.`,

    proof_of_adress: (v, b) =>
        `Vă rugăm să încărcați o factură de utilități sau telefonie emisă în ultimele 3 luni, pe care adresa din actul dumneavoastră de identitate să fie clar vizibilă.`,

    video_sport: (v, b) =>
        `Vă rugăm să transmiteți un videoclip de minimum 15 secunde la adresa ${b.contact}. Înregistrarea trebuie să conțină: site-ul ${b.domain} deschis la secțiunea SPORT, prezența dumneavoastră în cadru și username-ul vizibil.`,

    id_update: (v, b) =>
        `Vă rugăm să încărcați un act de identitate valid pentru verificarea contului, cu toate datele și marginile documentului clar vizibile.`,

    id_cc: (v, b) =>
        `Pentru a vă putea asista cât mai eficient, vă rugăm să ne transmiteți o fotografie care să includă atât actul dumneavoastră de identitate, cât și cardul cu terminația ${v.card}.`,

    selfie_cc: (v, b) =>
        `Vă rugăm să încărcați un selfie în care țineți cardul cu terminația ${v.card} lângă față, cu fața dumneavoastră și toate datele cardului complet vizibile.`,

    front_back: (v, b) =>
        `Vă rugăm să încărcați fotografii cu fața și spatele documentului.`,

    video_general: (v, b) =>
        `Vă rugăm să transmiteți un videoclip de minimum 15 secunde la adresa ${b.contact}. Înregistrarea trebuie să conțină: site-ul ${b.domain} deschis și vizibil, prezența dumneavoastră în cadru și username-ul vizibil.`,
};

const _en = {
    selfie: (v, b) =>
        `Please upload a selfie holding your ID card next to your face, with your face and all document details fully visible.`,

    selfie_id: (v, b) =>
        `Please upload a selfie holding your ID card next to your face, with your face and all document details fully visible.`,

    proof_of_adress: (v, b) =>
        `Please upload a utility or phone bill issued within the last 3 months, on which the address from your identity document is clearly visible.`,

    video_sport: (v, b) =>
        `Please send a video recording of at least 15 seconds to ${b.contact}. The recording must include: the ${b.domain} website open on the SPORT section, your presence in the frame, and your username visible.`,

    id_update: (v, b) =>
        `Please upload a valid identity document for account verification, with all details and document edges clearly visible.`,

    id_cc: (v, b) =>
        `To assist you as efficiently as possible, please send us a photo that includes both your identity document and the card ending in ${v.card}.`,

    selfie_cc: (v, b) =>
        `Please upload a selfie holding the card ending in ${v.card} next to your face, with your face and all card details fully visible.`,

    front_back: (v, b) =>
        `Please upload photos of both the front and back of the document.`,

    video_general: (v, b) =>
        `Please send a video recording of at least 15 seconds to ${b.contact}. The recording must include: the ${b.domain} website open and visible, your presence in the frame, and your username visible.`,
};

export const documentTemplates = Object.fromEntries(
    Object.keys(_ro).map(key => [
        key,
        (vars, brand, lang = 'ro') => (lang === 'en' ? _en[key] : _ro[key])(vars, brand),
    ])
);
