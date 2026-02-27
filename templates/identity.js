/**
 * templates/identity.js
 * Identity / KYC templates — bilingual (RO / EN). Professional tone.
 */

const _ro = {
    name_incorrect: (v, b) =>
        `Numele înregistrat în contul dumneavoastră nu corespunde cu cel din documentul transmis. Vă rugăm să ne trimiteți un selfie în care țineți actul de identitate lângă față, cu fața și toate datele documentului clar vizibile, pentru a finaliza procesul de verificare.`,

    cnp_incorect: (v, b) =>
        `CNP-ul din contul dumneavoastră nu coincide cu cel din documentul transmis. Vă rugăm să creați un cont nou utilizând datele corecte.`,

    name_change: (v, b) =>
        `Există o discrepanță între numele de pe documentul transmis și cel înregistrat în contul dumneavoastră. În cazul în care v-ați schimbat recent numele, vă rugăm să ne transmiteți certificatul de căsătorie sau de divorț pentru actualizarea datelor.`,

    doc_rezolution: (v, b) =>
        `Documentul transmis nu are o rezoluție suficientă pentru a fi procesat. Vă rugăm să refaceți fotografia la o calitate superioară, astfel încât toate informațiile să fie clare și lizibile.`,

    data_visibility: (v, b) =>
        `Anumite informații din documentul primit nu sunt complet vizibile. Vă rugăm să ne transmiteți o nouă fotografie color, în care toate detaliile și marginile documentului să fie clar vizibile.`,

    doc_framed: (v, b) =>
        `Documentul nu este fotografiat complet. Vă rugăm să încărcați o imagine în care toate marginile și informațiile documentului să fie vizibile.`,

    doc_ss: (v, b) =>
        `Capturile de ecran nu sunt acceptate în cadrul procesului de verificare. Vă rugăm să fotografiați documentul original direct cu camera.`,

    doc_expired: (v, b) =>
        `Documentul transmis nu mai este în termenul de valabilitate. Vă rugăm să ne transmiteți un act de identitate valid.`,

    doc_invalid: (v, b) =>
        `Documentul furnizat nu este acceptat pentru verificarea contului. Vă rugăm să trimiteți o fotografie clară a unuia dintre documentele acceptate: Carte de identitate, Primele două pagini ale pașaportului sau Permis de ședere.`,

    doc_another_country: (v, b) =>
        `Nu acceptăm documente emise în afara României. Vă rugăm să furnizați un document emis în România: Carte de identitate, Primele două pagini ale pașaportului sau Permis de ședere.`,

    doc_passaport: (v, b) =>
        `Vă rugăm să fotografiați pașaportul astfel încât primele două pagini să fie complet vizibile în aceeași imagine, cu numele, CNP-ul, data expirării și numărul pașaportului clar lizibile.`,
};

const _en = {
    name_incorrect: (v, b) =>
        `The name registered on your account does not match the one on the submitted document. To complete the verification process, please send a selfie holding your ID card next to your face, with your face and all document details clearly visible.`,

    cnp_incorect: (v, b) =>
        `The personal identification number (CNP) on your account does not match the one on the submitted document. Please create a new account using the correct details.`,

    name_change: (v, b) =>
        `There is a discrepancy between the name on the submitted document and the one registered on your account. If you have recently changed your name, please send your marriage or divorce certificate so we can update your details.`,

    doc_rezolution: (v, b) =>
        `The submitted document does not have sufficient resolution to be processed. Please retake the photo at a higher quality, ensuring all information is clear and legible.`,

    data_visibility: (v, b) =>
        `Certain details in the received document are not fully visible. Please send a new colour photo in which all document details and edges are clearly visible.`,

    doc_framed: (v, b) =>
        `The document is not fully captured in the image. Please upload a photo showing all edges and all information on the document.`,

    doc_ss: (v, b) =>
        `Screenshots are not accepted as part of the verification process. Please photograph the original document directly with your camera.`,

    doc_expired: (v, b) =>
        `The submitted document is no longer valid. Please send a current identity document within its validity period.`,

    doc_invalid: (v, b) =>
        `The submitted document is not accepted for account verification. Please provide a clear photo of one of the accepted documents: National ID card, First two pages of your passport, or Residence permit.`,

    doc_another_country: (v, b) =>
        `We do not accept documents issued outside Romania. Please provide a document issued in Romania: National ID card, First two pages of your passport, or Residence permit.`,

    doc_passaport: (v, b) =>
        `Please photograph your passport so that the first two pages are fully visible in the same image, with your name, CNP, expiry date, and passport number clearly legible.`,
};

export const identityTemplates = Object.fromEntries(
    Object.keys(_ro).map(key => [
        key,
        (vars, brand, lang = 'ro') => (lang === 'en' ? _en[key] : _ro[key])(vars, brand),
    ])
);

export const identityOptions = [
    { value: 'name_incorrect', labelKey: 'identity.name_incorrect' },
    { value: 'cnp_incorect', labelKey: 'identity.cnp_incorect' },
    { value: 'name_change', labelKey: 'identity.name_change' },
    { value: 'doc_rezolution', labelKey: 'identity.doc_rezolution' },
    { value: 'data_visibility', labelKey: 'identity.data_visibility' },
    { value: 'doc_framed', labelKey: 'identity.doc_framed' },
    { value: 'doc_ss', labelKey: 'identity.doc_ss' },
    { value: 'doc_expired', labelKey: 'identity.doc_expired' },
    { value: 'doc_invalid', labelKey: 'identity.doc_invalid' },
    { value: 'doc_another_country', labelKey: 'identity.doc_another_country' },
    { value: 'doc_passaport', labelKey: 'identity.doc_passaport' },
];
