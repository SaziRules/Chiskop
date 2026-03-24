// ─── Email validation ─────────────────────────────────────────────────────────
// Strict RFC-5321 inspired pattern:
//   - local part: alphanumeric + . _ + - (no consecutive dots, no leading/trailing dot)
//   - @ separator
//   - domain: at least one label, each label alphanumeric + hyphen, no leading/trailing hyphen
//   - TLD: 2–12 alpha characters only

export function isValidEmail(value: string): boolean {
  const v = value.trim();
  if (!v) return false;

  const EMAIL_RE =
    /^(?!\.)(?!.*\.\.)[a-zA-Z0-9._%+\-]+(?<!\.)@[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,12}$/;

  return EMAIL_RE.test(v);
}

// ─── Phone validation ─────────────────────────────────────────────────────────
// Per-country rules based on ITU-T E.164 subscriber number lengths.
// Input `local` is the number WITHOUT the country code and WITHOUT a leading zero.
// (leading zero already stripped by the input onChange handler)

const PHONE_RULES: Record<string, { digits: number | number[]; pattern?: RegExp; label: string }> = {
  "+27": {
    // South Africa: 9 digits after country code (no leading 0)
    // Mobile: 6x, 7x, 8x (60–89 series)
    // Landline: 1x–5x (geographic) + 87 (VoIP)
    digits: 9,
    pattern: /^[1-9]\d{8}$/,
    label: "South African",
  },
  "+267": {
    // Botswana: 7–8 digits, starts with 2–8
    digits: [7, 8],
    pattern: /^[2-8]\d{6,7}$/,
    label: "Botswana",
  },
  "+268": {
    // Eswatini: 8 digits, starts with 2 (landline) or 7/6 (mobile)
    digits: 8,
    pattern: /^[267]\d{7}$/,
    label: "Eswatini",
  },
  "+266": {
    // Lesotho: 8 digits, starts with 2 (landline) or 5/6 (mobile)
    digits: 8,
    pattern: /^[256]\d{7}$/,
    label: "Lesotho",
  },
  "+265": {
    // Malawi: 9 digits (mobile) or 7 digits (landline), starts with 1/2/7/8/9
    digits: [7, 9],
    pattern: /^[12789]\d{6,8}$/,
    label: "Malawi",
  },
  "+258": {
    // Mozambique: 9 digits, starts with 2 (landline) or 8 (mobile)
    digits: 9,
    pattern: /^[28]\d{8}$/,
    label: "Mozambique",
  },
  "+264": {
    // Namibia: 9 digits (mobile 8x) or 6 digits (landline 6x)
    digits: [6, 9],
    pattern: /^[68]\d{5,8}$/,
    label: "Namibia",
  },
  "+255": {
    // Tanzania: 9 digits, starts with 6/7 (mobile) or 2 (landline)
    digits: 9,
    pattern: /^[267]\d{8}$/,
    label: "Tanzania",
  },
  "+260": {
    // Zambia: 9 digits, starts with 9/7 (mobile) or 2 (landline)
    digits: 9,
    pattern: /^[279]\d{8}$/,
    label: "Zambia",
  },
  "+263": {
    // Zimbabwe: 9 digits, starts with 7/8 (mobile) or 2–4 (landline)
    digits: [7, 9],
    pattern: /^[2-489]\d{6,8}$/,
    label: "Zimbabwe",
  },
};

export function isValidPhone(local: string, dialCode: string): { valid: boolean; message: string } {
  const digits = local.replace(/\D/g, "");

  if (!digits) {
    return { valid: false, message: "Phone number is required." };
  }

  const rule = PHONE_RULES[dialCode];
  if (!rule) {
    // Unknown dial code — just check it's reasonable length
    if (digits.length < 7 || digits.length > 12) {
      return { valid: false, message: "Please enter a valid phone number." };
    }
    return { valid: true, message: "" };
  }

  const allowedLengths = Array.isArray(rule.digits) ? rule.digits : [rule.digits];

  if (!allowedLengths.includes(digits.length)) {
    const expected = allowedLengths.join(" or ");
    return {
      valid: false,
      message: `${rule.label} numbers must be ${expected} digits after the area code (you entered ${digits.length}).`,
    };
  }

  if (rule.pattern && !rule.pattern.test(digits)) {
    return {
      valid: false,
      message: `That doesn't look like a valid ${rule.label} number. Please check and try again.`,
    };
  }

  return { valid: true, message: "" };
}