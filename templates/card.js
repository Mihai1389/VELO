/**
 * templates/card.js
 * Card templates — bilingual (RO / EN). Professional tone.
 * vars: { card, name }
 */

const _ro = {
    cardHolder: ({ card }, b) =>
        `Vă rugăm să retrimiteți fotografiile față-verso ale cardului cu terminația ${card}. Pe față trebuie să fie vizibile primele 6 și ultimele 4 cifre ale numărului cardului, data de valabilitate și numele titularului. Pe spate, vă rugăm să acoperiți codul CVV.`,

    revolut: ({ card }, b) =>
        `Pentru validarea cardului virtual cu terminația ${card}, vă rugăm să încărcați un extras de cont care să includă numele dumneavoastră și o tranzacție efectuată către ${b.label}. Alternativ, puteți transmite o confirmare din aplicația Revolut (Cont – Documente – General – Confirmare card).`,

    salt: ({ card }, b) =>
        `Vă rugăm să ne transmiteți un screenshot din aplicația Salt Bank, din secțiunea Produse → Carduri, cu cardul cu terminația ${card} vizibil.`,

    bankStatement: ({ card }, b) =>
        `Vă rugăm să încărcați un extras de cont pentru cardul cu terminația ${card}, care să conțină: numele titularului, ultimele 4 cifre ale cardului și cel puțin o tranzacție efectuată către ${b.label}.`,

    declaration: ({ card, name }, b) =>
        `Vă rugăm să încărcați o declarație pe propria răspundere, redactată de mână, conform modelului următor:\n\n„Subsemnatul ${name}, titular al cărții de identitate seria ..., nr. ..., cu CNP ..., declar pe propria răspundere că autorizez toate plățile anterioare și viitoare efectuate de pe cardul cu terminația ${card} către ${b.domain}."\n\nDeclarația trebuie să conțină data și semnătura.`,

    declarationPassport: ({ card, name }, b) =>
        `Vă rugăm să încărcați o declarație pe propria răspundere, redactată de mână, conform modelului următor:\n\n„Subsemnatul ${name}, titular al pașaportului nr. ..., cu CNP ..., declar pe propria răspundere că autorizez toate plățile anterioare și viitoare efectuate de pe cardul cu terminația ${card} către ${b.domain}."\n\nDeclarația trebuie să conțină data și semnătura.`,

    additionalID: ({ card, name }, b) =>
        `Vă rugăm să încărcați o fotografie a actului de identitate aparținând titularului cardului cu terminația ${card} — ${name}.`,

    kindReminder: (v, b) =>
        `Vă informăm că efectuarea retragerilor este permisă exclusiv prin metodele de plată înregistrate pe numele dumneavoastră.`,
};

const _en = {
    cardHolder: ({ card }, b) =>
        `Please resubmit front and back photos of the card ending in ${card}. The front must show the first 6 and last 4 digits of the card number, the expiry date, and the cardholder's name. On the back, please cover the CVV code.`,

    revolut: ({ card }, b) =>
        `To validate the virtual card ending in ${card}, please upload a bank statement that includes your name and a transaction to ${b.label}. Alternatively, you may provide a card confirmation from the Revolut app (Account – Documents – General – Card confirmation).`,

    salt: ({ card }, b) =>
        `Please send us a screenshot from the Salt Bank app, under Products → Cards, showing the card ending in ${card}.`,

    bankStatement: ({ card }, b) =>
        `Please upload a bank statement for the card ending in ${card}, containing: the cardholder's name, the last 4 digits of the card, and at least one transaction to ${b.label}.`,

    declaration: ({ card, name }, b) =>
        `Please upload a handwritten self-declaration following the template below:\n\n"I, ${name}, holder of ID card series ..., no. ..., with CNP ..., hereby declare on my own responsibility that I authorise all past and future payments made from the card ending in ${card} to ${b.domain}."\n\nThe declaration must include the date and signature.`,

    declarationPassport: ({ card, name }, b) =>
        `Please upload a handwritten self-declaration following the template below:\n\n"I, ${name}, holder of passport no. ..., with CNP ..., hereby declare on my own responsibility that I authorise all past and future payments made from the card ending in ${card} to ${b.domain}."\n\nThe declaration must include the date and signature.`,

    additionalID: ({ card, name }, b) =>
        `Please upload a photo of the identity document belonging to ${name}, the holder of the card ending in ${card}.`,

    kindReminder: (v, b) =>
        `Please note that withdrawals are permitted exclusively through payment methods registered under your name.`,
};

export const cardTemplates = Object.fromEntries(
    Object.keys(_ro).map(key => [
        key,
        (vars, brand, lang = 'ro') => (lang === 'en' ? _en[key] : _ro[key])(vars, brand),
    ])
);
