/**
 * templates/ewallet.js
 * E-wallet templates — bilingual (RO / EN). Professional tone.
 */

function _key(wallet, type) {
    if (wallet === 'Aircash') return type === 'phone' ? 'AircashPhone' : 'AircashMail';
    return wallet;
}

// ─── Request ──────────────────────────────────────────────────────────────────
const _reqRo = {
    Paysafe: ({ input }, b) => `Vă rugăm să ne transmiteți un screenshot realizat din browser al contului dumneavoastră Paysafe, în care să fie clar vizibile numele titularului și adresa de e-mail asociată contului (${input}).`,
    Skrill: ({ input }, b) => `Vă rugăm să ne transmiteți un screenshot din contul Skrill, în care să fie vizibile numele titularului și adresa de e-mail a contului (${input}).`,
    Neteller: ({ input }, b) => `Vă rugăm să ne transmiteți un screenshot din contul Neteller, în care să fie vizibile numele titularului și adresa de e-mail a contului (${input}).`,
    AircashPhone: ({ input }, b) => `Pentru validarea contului AIRCASH asociat numărului de telefon ${input}, vă rugăm să ne transmiteți un screenshot din aplicație în care să fie vizibile numele dumneavoastră și numărul de telefon.`,
    AircashMail: ({ input }, b) => `Pentru validarea contului AIRCASH asociat adresei de e-mail ${input}, vă rugăm să ne transmiteți un screenshot în care să fie vizibile numele dumneavoastră și adresa de e-mail.`,
    OKTO: ({ input }, b) => `Pentru validarea contului OKTO, vă rugăm să încărcați un screenshot din secțiunea Profil, în care să fie vizibile numele dumneavoastră și codul de client ${input}.`,
};
const _reqEn = {
    Paysafe: ({ input }, b) => `Please send us a browser screenshot of your Paysafe account clearly showing the account holder's name and the email address associated with the account (${input}).`,
    Skrill: ({ input }, b) => `Please send us a screenshot from your Skrill account showing the account holder's name and the account email address (${input}).`,
    Neteller: ({ input }, b) => `Please send us a screenshot from your Neteller account showing the account holder's name and the account email address (${input}).`,
    AircashPhone: ({ input }, b) => `To validate the AIRCASH account linked to phone number ${input}, please send us a screenshot from the app showing your name and phone number.`,
    AircashMail: ({ input }, b) => `To validate the AIRCASH account linked to email address ${input}, please send us a screenshot showing your name and email address.`,
    OKTO: ({ input }, b) => `To validate your OKTO account, please upload a screenshot from the Profile section showing your name and client code ${input}.`,
};

// ─── Reject ───────────────────────────────────────────────────────────────────
const _rejRo = {
    Paysafe: ({ input }, b) => `Documentele pot fi procesate numai după finalizarea verificării contului Paysafe. Vă rugăm să completați verificarea și să ne transmiteți un screenshot din browser, din secțiunea „Setări".`,
    AircashPhone: ({ input }, b) => `Validarea documentelor poate fi realizată numai după finalizarea verificării contului Aircash asociat numărului de telefon ${input}.`,
    AircashMail: ({ input }, b) => `Validarea documentelor poate fi realizată numai după finalizarea verificării contului Aircash asociat adresei de e-mail ${input}.`,
    OKTO: ({ input }, b) => `Validarea documentelor poate fi realizată numai după finalizarea verificării contului OKTO asociat codului de client ${input}.`,
};
const _rejEn = {
    Paysafe: ({ input }, b) => `Documents can be processed only after the Paysafe account verification is complete. Please finalise the verification and send us a browser screenshot from the "Settings" section.`,
    AircashPhone: ({ input }, b) => `Document validation can be carried out only after the verification of the Aircash account linked to phone number ${input} is complete.`,
    AircashMail: ({ input }, b) => `Document validation can be carried out only after the verification of the Aircash account linked to email address ${input} is complete.`,
    OKTO: ({ input }, b) => `Document validation can be carried out only after the verification of the OKTO account linked to client code ${input} is complete.`,
};

// ─── Declaration ──────────────────────────────────────────────────────────────
const _declRo = {
    AircashPhone: ({ name, input }, b) => `Vă rugăm să încărcați o declarație pe propria răspundere, redactată de mână, conform modelului următor:\n\n„Subsemnatul ${name}, titular al cărții de identitate seria..., nr..., cu CNP..., declar pe propria răspundere că autorizez tranzacțiile efectuate prin contul Aircash asociat numărului de telefon ${input} către ${b.domain}."\n\nDeclarația trebuie să conțină data și semnătura.`,
    AircashMail: ({ name, input }, b) => `Vă rugăm să încărcați o declarație pe propria răspundere, redactată de mână, conform modelului următor:\n\n„Subsemnatul ${name}, titular al cărții de identitate seria..., nr..., cu CNP..., declar pe propria răspundere că autorizez tranzacțiile efectuate prin contul Aircash asociat adresei de e-mail ${input} către ${b.domain}."\n\nDeclarația trebuie să conțină data și semnătura.`,
    OKTO: ({ name, input }, b) => `Vă rugăm să încărcați o declarație pe propria răspundere, redactată de mână, conform modelului următor:\n\n„Subsemnatul ${name}, titular al cărții de identitate seria..., nr..., cu CNP..., declar pe propria răspundere că autorizez tranzacțiile efectuate prin contul OKTO asociat codului de client ${input} către ${b.domain}."\n\nDeclarația trebuie să conțină data și semnătura.`,
};
const _declEn = {
    AircashPhone: ({ name, input }, b) => `Please upload a handwritten self-declaration following the template below:\n\n"I, ${name}, holder of ID card series..., no..., with CNP..., hereby declare on my own responsibility that I authorise the transactions made through the Aircash account linked to phone number ${input} to ${b.domain}."\n\nThe declaration must include the date and signature.`,
    AircashMail: ({ name, input }, b) => `Please upload a handwritten self-declaration following the template below:\n\n"I, ${name}, holder of ID card series..., no..., with CNP..., hereby declare on my own responsibility that I authorise the transactions made through the Aircash account linked to email address ${input} to ${b.domain}."\n\nThe declaration must include the date and signature.`,
    OKTO: ({ name, input }, b) => `Please upload a handwritten self-declaration following the template below:\n\n"I, ${name}, holder of ID card series..., no..., with CNP..., hereby declare on my own responsibility that I authorise the transactions made through the OKTO account linked to client code ${input} to ${b.domain}."\n\nThe declaration must include the date and signature.`,
};

// ─── Additional ID ────────────────────────────────────────────────────────────
const _addRo = {
    AircashPhone: ({ input }, b) => `Vă rugăm să ne transmiteți o fotografie clară a actului de identitate aparținând titularului contului Aircash asociat numărului de telefon [${input}].`,
    AircashMail: ({ input }, b) => `Vă rugăm să ne transmiteți o fotografie clară a actului de identitate aparținând titularului contului Aircash asociat adresei de e-mail [${input}].`,
    OKTO: ({ input }, b) => `Vă rugăm să ne transmiteți o fotografie clară a actului de identitate aparținând titularului contului OKTO asociat codului de client [${input}].`,
};
const _addEn = {
    AircashPhone: ({ input }, b) => `Please send us a clear photo of the identity document belonging to the holder of the Aircash account linked to phone number [${input}].`,
    AircashMail: ({ input }, b) => `Please send us a clear photo of the identity document belonging to the holder of the Aircash account linked to email address [${input}].`,
    OKTO: ({ input }, b) => `Please send us a clear photo of the identity document belonging to the holder of the OKTO account linked to client code [${input}].`,
};

const _defaultRo = ({ wallet, input }, b) =>
    `Vă rugăm să ne transmiteți un screenshot din contul dumneavoastră ${wallet} în care să fie vizibile numele titularului și adresa de e-mail sau numărul de telefon asociat (${input}).`;
const _defaultEn = ({ wallet, input }, b) =>
    `Please send us a screenshot from your ${wallet} account showing the account holder's name and the associated email address or phone number (${input}).`;

function _resolve(roMap, enMap, k, vars, brand, lang) {
    const map = lang === 'en' ? enMap : roMap;
    const fn = map[k] || (lang === 'en' ? _defaultEn : _defaultRo);
    return fn(vars, brand);
}

export function requestEwallet(vars, brand, lang = 'ro') {
    return _resolve(_reqRo, _reqEn, _key(vars.wallet, vars.type), vars, brand, lang);
}
export function rejectEwallet(vars, brand, lang = 'ro') {
    return _resolve(_rejRo, _rejEn, _key(vars.wallet, vars.type), vars, brand, lang);
}
export function declarationEwallet(vars, brand, lang = 'ro') {
    return _resolve(_declRo, _declEn, _key(vars.wallet, vars.type), vars, brand, lang);
}
export function additionalIDWallet(vars, brand, lang = 'ro') {
    return _resolve(_addRo, _addEn, _key(vars.wallet, vars.type), vars, brand, lang);
}
