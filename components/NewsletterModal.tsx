"use client";

import Image from "next/image";
import { FaTimes } from "react-icons/fa";
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
      <div className="input flex items-center gap-0 p-0 overflow-hidden w-full">
        {/* Dial selector */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 px-2.5 self-stretch bg-transparent border-0 cursor-pointer shrink-0 group"
          aria-label="Select country code"
          aria-expanded={open}
        >
          <FlagImg iso={selected.iso} size={16} />
          <span className="text-[11px] font-normal text-gray-500 group-hover:text-chiskop-red transition-colors">
            {selected.code}
          </span>
          <svg
            width="7" height="7" viewBox="0 0 24 24" fill="none"
            stroke="#bbb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            className={`transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <div className="w-px self-stretch bg-gray-200 shrink-0" />

        <input
          type="tel"
          placeholder="PHONE"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/^0+/, ""))}
          className="flex-1 px-2.5 self-stretch bg-transparent border-0 outline-none text-[13px] placeholder:text-gray-400 placeholder:text-[11px] placeholder:tracking-widest"
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
        <div className="bg-[#1a0002] px-4 py-2">
          <span className="text-[9px] font-bold tracking-[0.18em] text-white/50 uppercase">Select region</span>
        </div>
        <div className="bg-white overflow-y-auto" style={{ maxHeight: "180px" }}>
          {DIAL_CODES.map((d, i) => {
            const isActive = d.code === dialCode;
            return (
              <button
                key={d.code}
                type="button"
                onClick={() => { onDialChange(d.code); setOpen(false); }}
                className={`
                  group/row flex items-center gap-3 w-full px-4 py-2
                  bg-transparent border-0 cursor-pointer text-left transition-colors duration-150
                  ${i !== DIAL_CODES.length - 1 ? "border-b border-gray-100" : ""}
                  ${isActive ? "bg-red-50" : "hover:bg-gray-50"}
                `}
              >
                <FlagImg iso={d.iso} size={16} />
                <span className={`flex-1 text-[12px] font-normal transition-colors
                  ${isActive ? "text-chiskop-red font-semibold" : "text-gray-600 group-hover/row:text-chiskop-black"}`}>
                  {d.name}
                </span>
                <span className={`text-[11px] font-light tabular-nums shrink-0
                  ${isActive ? "text-chiskop-red/60" : "text-gray-400"}`}>
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

// ─── Modal ────────────────────────────────────────────────────────────────────

interface NewsletterModalProps {
  open: boolean;
  onClose: () => void;
}

export default function NewsletterModal({ open, onClose }: NewsletterModalProps) {
  const [name, setName]         = useState("");
  const [surname, setSurname]   = useState("");
  const [email, setEmail]       = useState("");
  const [phone, setPhone]       = useState("");
  const [dialCode, setDialCode] = useState("+27");
  const [loading, setLoading]   = useState(false);
  const [status, setStatus]     = useState<"idle" | "success" | "error">("idle");
  const [error, setError]       = useState("");

  // Reset on open
  useEffect(() => {
    if (open) { setStatus("idle"); setError(""); }
  }, [open]);

  if (!open) return null;

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

    const fullPhone = trimPhone
      ? `${dialCode}${trimPhone.replace(/\D/g, "")}`
      : null;

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
      // Unique constraint — already subscribed
      if (sbError.code === "23505") {
        setError("You're already on our list! 🎉");
      } else {
        console.error("Newsletter submit error:", sbError.message);
        setError("Something went wrong. Please try again.");
      }
      return;
    }

    setStatus("success");
    setName(""); setSurname(""); setEmail(""); setPhone("");
  };

  return (
    <>
      <div
        className="fixed inset-0 z-100 bg-black/60 flex items-center justify-center px-4"
        onClick={onClose}
      >
        <div
          className="relative bg-white w-full max-w-[820px] h-[480px] grid grid-cols-1 md:grid-cols-2 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-chiskop-black hover:text-black transition"
            aria-label="Close modal"
          >
            <FaTimes />
          </button>

          {/* Left: Form */}
          <div className="p-8 flex flex-col justify-center">

            {status === "success" ? (
              <div className="flex flex-col items-center gap-4 text-center py-4">
                <div className="w-12 h-12 rounded-full bg-chiskop-red/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5A0004" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-[20px] font-extrabold uppercase text-chiskop-black">You&apos;re in!</p>
                <p className="text-[13px] font-normal text-gray-500 leading-relaxed">
                  Thanks for subscribing. Watch this space for<br />product drops, offers, and event news.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 bg-chiskop-red text-white px-8 py-2 font-semibold text-[13px] hover:bg-[#450003] transition"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-[22px] font-bold leading-tight mb-2">
                  Down for more?<br />We got you!
                </h2>

                <p className="text-sm text-gray-600 mb-6">
                  Subscribe for all the latest product drops, limited offers and in-store event info
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="NAME"
                      className="input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="SURNAME"
                      className="input"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                    />
                  </div>

                  <input
                    type="email"
                    placeholder="EMAIL"
                    className="input w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <PhoneField
                    dialCode={dialCode}
                    onDialChange={setDialCode}
                    value={phone}
                    onChange={setPhone}
                  />

                  {error && (
                    <p className="text-[11.5px] text-red-500 font-medium">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-chiskop-red text-white py-2 font-semibold hover:bg-[#450003] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "Send"}
                  </button>
                </form>

                <p className="text-[11px] text-gray-500 mt-4 leading-snug">
                  If you subscribe to Chiskop, you agree to receive recurring promotional and marketing messages. Consent is not a condition of purchase.
                  <br />
                  <a href="/terms" className="underline cursor-pointer hover:text-chiskop-black transition-colors">Terms of Use</a>
                  {" and "}
                  <a href="/privacy" className="underline cursor-pointer hover:text-chiskop-black transition-colors">Privacy Policy</a>
                </p>
              </>
            )}

          </div>

          {/* Right: Image */}
          <div className="relative hidden md:block">
            <Image
              src="/images/newsletter-modal.jpg"
              alt="Newsletter visual"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
}