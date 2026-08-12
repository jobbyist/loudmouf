/**
 * South African ID number utilities — "VerifyNow" style client-side verification.
 * Format: YYMMDD SSSS C A Z  (13 digits, Luhn check digit).
 */

export interface SaidResult {
  valid: boolean;
  reason?: string;
  dateOfBirth?: string; // ISO yyyy-mm-dd
  age?: number;
  citizen?: boolean;
  last4?: string;
}

function luhnValid(value: string): boolean {
  let sum = 0;
  let double = false;
  for (let i = value.length - 1; i >= 0; i--) {
    let d = Number(value[i]);
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  return sum % 10 === 0;
}

export function verifySaid(raw: string): SaidResult {
  const id = (raw || "").replace(/\D/g, "");
  if (id.length !== 13) return { valid: false, reason: "ID number must be 13 digits." };

  const yy = Number(id.slice(0, 2));
  const mm = Number(id.slice(2, 4));
  const dd = Number(id.slice(4, 6));
  if (mm < 1 || mm > 12 || dd < 1 || dd > 31) {
    return { valid: false, reason: "ID number contains an invalid date of birth." };
  }

  const now = new Date();
  const currentYY = now.getFullYear() % 100;
  const century = yy > currentYY ? 1900 : 2000;
  const year = century + yy;
  const dob = new Date(Date.UTC(year, mm - 1, dd));
  if (dob.getUTCMonth() !== mm - 1 || dob.getUTCDate() !== dd) {
    return { valid: false, reason: "ID number contains an invalid date of birth." };
  }

  if (!luhnValid(id)) return { valid: false, reason: "ID number failed the checksum test." };

  let age = now.getUTCFullYear() - year;
  const hadBirthday =
    now.getUTCMonth() > mm - 1 || (now.getUTCMonth() === mm - 1 && now.getUTCDate() >= dd);
  if (!hadBirthday) age -= 1;

  if (age < 18) return { valid: false, reason: "You must be 18 or older to join the collective." };

  return {
    valid: true,
    dateOfBirth: dob.toISOString().slice(0, 10),
    age,
    citizen: id[10] === "0",
    last4: id.slice(-4),
  };
}
