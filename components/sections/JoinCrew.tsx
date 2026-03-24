"use client";

import Section from "@/components/Section";
import Container from "@/components/Container";
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

const FlagImg = ({ iso, size = 18 }: { iso: string; size?: number }) => (
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
  dialCode, onDialChange, value, onChange, inputClass,
}: {
  dialCode: string; onDialChange: (c: string) => void;
  value: string; onChange: (v: string) => void; inputClass: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const selected = DIAL_CODES.find((d) => d.code === dialCode) ?? DIAL_CODES[0];

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={wrapRef} className="relative flex-1 md:w-[230px]">
      <div className={`${inputClass} flex items-center gap-0 p-0 overflow-hidden`}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 px-3 self-stretch bg-transparent border-0 cursor-pointer shrink-0 group"
          aria-label="Select country code"
        >
          <FlagImg iso={selected.iso} size={16} />
          <span className="text-[13px] text-[#999] group-hover:text-chiskop-red transition-colors">
            {selected.code}
          </span>
          <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            className={`transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        <div className="w-px self-stretch bg-[#999]/50 shrink-0" />
        <input
          type="tel"
          placeholder="Phone number"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/^0+/, ""))}
          className="flex-1 px-3 self-stretch bg-transparent border-0 outline-none text-[15px] md:text-[16px] text-chiskop-black placeholder:text-[#999]"
        />
      </div>

      {/* Dropdown */}
      <div
        className={`absolute left-0 top-[calc(100%+4px)] w-[260px] z-50 overflow-hidden
          transition-all duration-200 ease-out origin-top
          ${open ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}`}
        style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.18)" }}
      >
        <div className="h-0.75 bg-chiskop-red" />
        <div className="bg-[#1a0002] px-4 py-2">
          <span className="text-[9px] font-bold tracking-[0.18em] text-white/50 uppercase">Select region</span>
        </div>
        <div className="bg-white overflow-y-auto" style={{ maxHeight: "180px" }}>
          {DIAL_CODES.map((d, i) => {
            const isActive = d.code === dialCode;
            return (
              <button key={d.code} type="button"
                onClick={() => { onDialChange(d.code); setOpen(false); }}
                className={`group/row flex items-center gap-3 w-full px-4 py-2.5 bg-transparent border-0 cursor-pointer text-left transition-colors
                  ${i !== DIAL_CODES.length - 1 ? "border-b border-gray-100" : ""}
                  ${isActive ? "bg-red-50" : "hover:bg-gray-50"}`}
              >
                <FlagImg iso={d.iso} size={16} />
                <span className={`flex-1 text-[12px] font-normal ${isActive ? "text-chiskop-red font-semibold" : "text-gray-600 group-hover/row:text-chiskop-black"}`}>
                  {d.name}
                </span>
                <span className={`text-[11px] font-light tabular-nums shrink-0 ${isActive ? "text-chiskop-red/60" : "text-gray-400"}`}>
                  {d.code}
                </span>
              </button>
            );
          })}
        </div>
        <div className="h-0.5 bg-chiskop-red opacity-60" />
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function JoinCrew() {
  const [name, setName]         = useState("");
  const [phone, setPhone]       = useState("");
  const [dialCode, setDialCode] = useState("+27");
  const [email, setEmail]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState(false);

  const inputClass = "border-2 border-chiskop-lightGray rounded-[10px] px-4 py-3 text-[15px] md:text-[16px] text-chiskop-black placeholder:text-[#999] focus:outline-none focus:ring-1 focus:ring-chiskop-red bg-transparent";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimEmail = email.trim();
    const trimPhone = phone.trim();

    if (!trimEmail && !trimPhone) {
      setError("Please provide at least an email or phone number.");
      return;
    }

    if (trimEmail && !isValidEmail(trimEmail)) {
      setError("That email address doesn't look right. Please check the format (e.g. name@example.com).");
      return;
    }

    if (trimPhone) {
      const phoneCheck = isValidPhone(trimPhone, dialCode);
      if (!phoneCheck.valid) {
        setError(phoneCheck.message);
        return;
      }
    }

    const fullPhone = trimPhone ? `${dialCode}${trimPhone.replace(/\D/g, "")}` : null;

    setLoading(true);

    const { error: sbError } = await supabase
      .from("subscriptions")
      .insert({
        brand: "chiskop",
        email: trimEmail || null,
        phone: fullPhone,
      });

    setLoading(false);

    if (sbError) {
      if (sbError.code === "23505") {
        setError("You're already on our list! 🎉");
      } else {
        console.error("JoinCrew submit error:", sbError.message);
        setError("Something went wrong. Please try again.");
      }
      return;
    }

    setSuccess(true);
    setName(""); setPhone(""); setEmail("");
  };

  return (
    <div style={{ aspectRatio: "1920 / 470" }}>
    <Section
      variant="default"
      className="relative w-full h-full bg-[url('/images/footer-bg-desktop.jpg')] bg-cover bg-center bg-no-repeat overflow-hidden"
    >
      <Container className="relative z-10 max-w-[1400px] h-full flex flex-col md:flex-row items-center justify-end gap-10 md:gap-20 py-10 md:py-0">

        {/* Form section */}
        <div className="w-full md:w-[48%] flex flex-col items-center md:items-end text-left md:text-right">
          <h2 className="uppercase text-chiskop-red font-extrabold text-[26px] md:text-[46px] leading-[1.05] mb-2 tracking-tight md:ml-auto max-w-none">
            Join the Chiskop Crew
          </h2>
          <p className="text-chiskop-black text-[15px] md:text-[18px] leading-[1.45] mt-1 md:mt-2 mb-8 max-w-[580px] md:ml-auto">
            Be the first to know about new drops, competitions, and Chiskop specials. Join now and keep your game sharp.
          </p>

          {success ? (
            <div className="flex flex-col items-center md:items-end gap-3 w-full max-w-[520px]">
              <div className="w-12 h-12 rounded-full bg-chiskop-red/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#5A0004" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-[20px] font-extrabold uppercase text-chiskop-black">You&apos;re in!</p>
              <p className="text-[14px] font-normal text-chiskop-gray">
                Welcome to the crew. Watch this space for drops, specials, and more.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 max-w-[520px]">

              {/* Row 1: Name + Phone */}
              <div className="flex flex-col md:flex-row gap-3 md:gap-4 md:justify-end">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`flex-1 md:w-[270px] ${inputClass}`}
                />
                <PhoneField
                  dialCode={dialCode}
                  onDialChange={setDialCode}
                  value={phone}
                  onChange={setPhone}
                  inputClass={inputClass}
                />
              </div>

              {/* Desktop row: Submit + Email */}
              <div className="hidden md:flex md:flex-row md:justify-end gap-3 md:gap-4 md:items-center">
                <button type="submit" disabled={loading}
                  className="btn bg-chiskop-red rounded-md text-white font-extrabold uppercase text-[15px] px-10 py-3 hover:bg-[#450003] transition disabled:opacity-50 disabled:cursor-not-allowed shrink-0">
                  {loading ? "..." : "Submit"}
                </button>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`flex-1 md:w-[420px] ${inputClass}`}
                />
              </div>

              {/* Mobile row: Email + Submit */}
              <div className="flex flex-col md:hidden gap-3">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full ${inputClass}`}
                />
                <button type="submit" disabled={loading}
                  className="btn bg-chiskop-red rounded-md text-white font-extrabold uppercase text-[13px] px-8 py-3 w-full hover:bg-[#450003] transition disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>

              {error && (
                <p className="text-red-600 text-[12px] font-medium text-right">{error}</p>
              )}
            </form>
          )}

          <a href="/terms"
            className="text-[12px] md:text-[12.5px] text-chiskop-gray underline mt-3 hover:text-chiskop-red transition-colors md:self-end">
            Terms &amp; Conditions
          </a>
        </div>

      </Container>
    </Section>
    </div>
  );
}