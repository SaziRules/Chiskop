"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { isValidEmail, isValidPhone } from "@/lib/chiskopValidation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ─── Dial codes ───────────────────────────────────────────────────────────────

const DIAL_CODES = [
  { code: "+27",  iso: "za", name: "South Africa" },
  { code: "+267", iso: "bw", name: "Botswana" },
  { code: "+268", iso: "sz", name: "Eswatini" },
  { code: "+266", iso: "ls", name: "Lesotho" },
  { code: "+265", iso: "mw", name: "Malawi" },
  { code: "+258", iso: "mz", name: "Mozambique" },
  { code: "+264", iso: "na", name: "Namibia" },
  { code: "+255", iso: "tz", name: "Tanzania" },
  { code: "+260", iso: "zm", name: "Zambia" },
  { code: "+263", iso: "zw", name: "Zimbabwe" },
];

const FlagImg = ({ iso, size = 20 }: { iso: string; size?: number }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={`https://flagcdn.com/w40/${iso}.png`}
    srcSet={`https://flagcdn.com/w80/${iso}.png 2x`}
    alt=""
    className="rounded-[1px] shrink-0 block"
    style={{ width: size, height: "auto" }}
  />
);

// ─── Phone field ──────────────────────────────────────────────────────────────

function PhoneField({
  dialCode,
  onDialChange,
  value,
  onChange,
}: {
  dialCode: string;
  onDialChange: (code: string) => void;
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const selected = DIAL_CODES.find((d) => d.code === dialCode) ?? DIAL_CODES[0];

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <div className="contact-input flex items-center gap-0 p-0 overflow-hidden h-full">
        {/* Dial selector */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 px-3 self-stretch bg-transparent border-0 cursor-pointer shrink-0 group"
          aria-label="Select country code"
          aria-expanded={open}
        >
          <FlagImg iso={selected.iso} size={18} />
          <span className="text-[12px] font-normal text-gray-500 group-hover:text-chiskop-red transition-colors">
            {selected.code}
          </span>
          <svg
            width="8" height="8" viewBox="0 0 24 24" fill="none"
            stroke="#bbb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            className={`transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <div className="w-px self-stretch bg-gray-200 shrink-0" />

        <input
          type="tel"
          placeholder="Phone number"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/^0+/, ""))}
          className="flex-1 px-3 bg-transparent border-0 outline-none text-[14px] text-chiskop-black placeholder:text-gray-400 self-stretch"
          required
        />
      </div>

      {/* Dropdown */}
      <div
        className={`absolute left-0 top-[calc(100%+4px)] w-full z-50 overflow-hidden
          transition-all duration-200 ease-out origin-top
          ${open
            ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
          }`}
        style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)" }}
      >
        <div className="h-0.75 bg-chiskop-red" />
        <div className="bg-[#1a0002] px-4 py-2.5">
          <span className="text-[9px] font-bold tracking-[0.18em] text-white/50 uppercase">
            Select region
          </span>
        </div>
        <div className="bg-white overflow-y-auto" style={{ maxHeight: "196px" }}>
          {DIAL_CODES.map((d, i) => {
            const isActive = d.code === dialCode;
            return (
              <button
                key={d.code}
                type="button"
                onClick={() => { onDialChange(d.code); setOpen(false); }}
                className={`
                  group/row flex items-center gap-3 w-full px-4 py-2.5
                  bg-transparent border-0 cursor-pointer text-left
                  transition-colors duration-150
                  ${i !== DIAL_CODES.length - 1 ? "border-b border-gray-100" : ""}
                  ${isActive ? "bg-red-50" : "hover:bg-gray-50"}
                `}
              >
                <FlagImg iso={d.iso} size={18} />
                <span className={`flex-1 text-[12px] font-normal transition-colors
                  ${isActive ? "text-chiskop-red font-semibold" : "text-gray-600 group-hover/row:text-chiskop-black"}`}>
                  {d.name}
                </span>
                <span className={`text-[11px] font-light tabular-nums shrink-0 transition-colors
                  ${isActive ? "text-chiskop-red/60" : "text-gray-400 group-hover/row:text-gray-600"}`}>
                  {d.code}
                </span>
                {isActive && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-chiskop-red opacity-60">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
        <div className="h-0.5 bg-chiskop-red opacity-60" />
      </div>
    </div>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [fieldError, setFieldError]     = useState("");

  const [name, setName]         = useState("");
  const [surname, setSurname]   = useState("");
  const [phone, setPhone]       = useState("");
  const [dialCode, setDialCode] = useState("+27");
  const [email, setEmail]       = useState("");
  const [message, setMessage]   = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const trimEmail = email.trim();
    const trimPhone = phone.trim();

    // ── Strict validation ──
    if (!name.trim() || !surname.trim()) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    if (!isValidEmail(trimEmail)) {
      setFieldError("Please enter a valid email address (e.g. name@example.com).");
      setIsSubmitting(false);
      return;
    }

    if (trimPhone) {
      const phoneCheck = isValidPhone(trimPhone, dialCode);
      if (!phoneCheck.valid) {
        setFieldError(phoneCheck.message);
        setIsSubmitting(false);
        return;
      }
    }

    setFieldError("");
    const fullPhone = trimPhone ? `${dialCode}${trimPhone.replace(/\D/g, "")}` : "";

    const { error } = await supabase
      .from("contact_submissions")
      .insert({
        brand:   "chiskop",
        name:    `${name.trim()} ${surname.trim()}`.trim(),
        email:   email.trim(),
        message: `Phone: ${fullPhone}\n\n${message.trim()}`,
      });

    setIsSubmitting(false);

    if (error) {
      console.error("Contact submit error:", error.message, error.code, error.details);
      setSubmitStatus("error");
      return;
    }

    setSubmitStatus("success");
    setName(""); setSurname(""); setPhone(""); setEmail(""); setMessage("");
    setTimeout(() => setSubmitStatus("idle"), 5000);
  };

  return (
    <div className="pt-0 md:pt-2.5">
      <h1 className="text-[30px] md:text-[34px] font-extrabold uppercase leading-tight mb-8">
        Need help? The Chiskop<br />Crew is here for you.
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Top row: Name + Surname */}
        <div className="grid grid-cols-2 gap-4">
          <input
            className="contact-input"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="contact-input"
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>

        {/* Middle row: Phone + Email */}
        <div className="grid grid-cols-2 gap-4">
          <PhoneField
            dialCode={dialCode}
            onDialChange={setDialCode}
            value={phone}
            onChange={setPhone}
          />
          <input
            className="contact-input"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Message */}
        <textarea
          placeholder="Message"
          rows={5}
          className="contact-input resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        {/* Submit */}
        {fieldError && (
          <p className="text-red-600 text-[12px] font-medium">{fieldError}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#5A0004] text-white py-3 rounded-md font-semibold text-[15px] tracking-wide hover:bg-[#450003] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
        </button>

        {/* Status messages */}
        {submitStatus === "success" && (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <div className="w-12 h-12 rounded-full bg-chiskop-red/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="#5A0004" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <p className="text-[18px] font-extrabold uppercase text-chiskop-black">Message received!</p>
            <p className="text-[14px] font-normal text-chiskop-gray">We&apos;ll be in touch shortly.</p>
          </div>
        )}
        {submitStatus === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-center">
            <p className="text-red-700 text-sm font-medium">
              ✗ Something went wrong. Please try again or call us at 0860 002 652.
            </p>
          </div>
        )}

      </form>
    </div>
  );
}