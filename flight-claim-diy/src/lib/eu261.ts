export function calculateCompensation(distanceKm: number, delayHours: number): number {
  if (delayHours < 3) return 0;

  if (distanceKm <= 1500) {
    return 250;
  } else if (distanceKm > 1500 && distanceKm <= 3500) {
    return 400;
  } else if (distanceKm > 3500) {
    // If delay is between 3 and 4 hours on a flight > 3500km, airlines can reduce compensation by 50%
    if (delayHours >= 3 && delayHours < 4) {
      return 300;
    }
    return 600;
  }

  return 0;
}

export function generateLegalLetter(
  name: string,
  address: string,
  airline: string,
  flightNumber: string,
  date: string,
  departure: string,
  arrival: string,
  compensation: number
) {
  return `
[Your Name]: ${name}
[Your Address]: ${address}

To:
Customer Service Department
${airline}

Date: ${new Date().toLocaleDateString()}

Subject: Claim for compensation according to Art. 7 Regulation (EC) No 261/2004
Flight: ${flightNumber} on ${date}

Dear Sir/Madam,

I am writing to you regarding flight ${flightNumber} on ${date} from ${departure} to ${arrival}.

My flight was delayed at the final destination by more than 3 hours, and the delay was not caused by extraordinary circumstances which could not have been avoided even if all reasonable measures had been taken.

Therefore, according to Art. 7 of Regulation (EC) No 261/2004, I am entitled to compensation in the amount of €${compensation}.

I hereby request that you transfer this amount to my bank account within 14 days.

[Bank Details to be added by user]
Account Holder: ${name}
IBAN:
BIC:

If you do not comply with this request within the deadline, I will be forced to take further legal action and involve the national enforcement body.

Yours faithfully,

${name}
  `.trim();
}
