"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  productSlug: string;
}

export default function ReviewModal({ open, onClose, productSlug }: ReviewModalProps) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating]       = useState(0);
  const [name, setName]                     = useState("");
  const [email, setEmail]                   = useState("");
  const [phone, setPhone]                   = useState("");
  const [title, setTitle]                   = useState("");
  const [message, setMessage]               = useState("");
  const [recommend, setRecommend]           = useState<"yes" | "no" | null>(null);
  const [loading, setLoading]               = useState(false);
  const [submitted, setSubmitted]           = useState(false);
  const [error, setError]                   = useState("");
  const [fieldErrors, setFieldErrors]       = useState<Record<string, string>>({});

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_RE = /^[\d\s\-+()]{7,20}$/;
  const MIN_WORDS = 10;

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  function validateAll() {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required.";
    else if (name.trim().length < 2) errs.name = "Name must be at least 2 characters.";
    if (!email.trim()) errs.email = "Email is required.";
    else if (!EMAIL_RE.test(email.trim())) errs.email = "Please enter a valid email address.";
    if (!phone.trim()) errs.phone = "Contact number is required.";
    else if (!PHONE_RE.test(phone.trim())) errs.phone = "Please enter a valid phone number.";
    if (!title.trim()) errs.title = "Please summarise your review in a few words.";
    else if (title.trim().length < 4) errs.title = "Title must be at least 4 characters.";
    const wordCount = message.trim().split(/\s+/).filter(Boolean).length;
    if (!message.trim()) errs.message = "Please write your review.";
    else if (wordCount < MIN_WORDS) errs.message = `Please write at least ${MIN_WORDS} words (${wordCount}/${MIN_WORDS} so far).`;
    if (selectedRating === 0) errs.rating = "Please select a star rating.";
    if (recommend === null) errs.recommend = "Please let us know if you would recommend this product.";
    return errs;
  }

  const displayRating = hoverRating || selectedRating;

  const handleSubmit = async () => {
    const errs = validateAll();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;
    if (loading) return;

    setError("");
    setLoading(true);

    const { error: sbError } = await supabase
      .from("product_reviews")
      .insert({
        brand: "chiskop",
        productSlug,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        title: title.trim(),
        message: message.trim(),
        rating: selectedRating,
        recommend,
        approved: false,
      });

    setLoading(false);

    if (sbError) {
      console.error("Review submit error:", sbError.message, sbError.code, sbError.details, sbError.hint);
      setError("Something went wrong. Please try again.");
      return;
    }

    setSubmitted(true);
  };

  const fe = (key: string) =>
    fieldErrors[key] ? (
      <p className="text-red-500 text-[12px] mt-1">{fieldErrors[key]}</p>
    ) : null;

  const inputClass = "w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-chiskop-red";
  const labelClass = "block text-[14px] font-semibold mb-1";

  const modalContent = (
    <div className="fixed inset-0 z-10000 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4" onClick={onClose}>
      <div className="bg-white rounded-[10px] shadow-xl max-w-[640px] w-full p-8 relative text-chiskop-black max-h-[92vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-5 text-chiskop-gray hover:text-chiskop-black text-[22px] leading-none"
        >
          ×
        </button>

        {submitted ? (
          <div className="text-center py-10">
            <h3 className="text-[22px] font-bold text-chiskop-black mb-4 uppercase">
              Thank You!
            </h3>
            <p className="text-chiskop-gray text-[16px]">
              Your review is awaiting approval.
            </p>
            <button
              className="btn bg-chiskop-red text-white uppercase font-bold text-[15px] px-8 py-2.5 rounded-md mt-6"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-[22px] font-bold text-center text-chiskop-black mb-6 uppercase">
              Give Your Opinion
            </h3>

            <div className="flex flex-col gap-4">

              {/* Rating */}
              <div className="flex flex-col items-center">
                <p className="text-[14px] mb-2">Give a rating *</p>
                <div className="flex gap-1 text-[28px] cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => { setSelectedRating(star); setFieldErrors(e => ({ ...e, rating: "" })); }}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className={`transition-colors duration-100 ${star <= displayRating ? "text-chiskop-red" : "text-gray-300"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                {fe("rating")}
              </div>

              {/* Row 1: Name + Email */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Your Name *</label>
                  <input type="text" value={name} onChange={(e) => { setName(e.target.value); setFieldErrors(er => ({ ...er, name: "" })); }}
                    placeholder="e.g. John Doe" className={`${inputClass} ${fieldErrors.name ? "border-red-500" : ""}`} />
                  {fe("name")}
                </div>
                <div>
                  <label className={labelClass}>Email Address *</label>
                  <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setFieldErrors(er => ({ ...er, email: "" })); }}
                    placeholder="e.g. john@email.com" className={`${inputClass} ${fieldErrors.email ? "border-red-500" : ""}`} />
                  {fe("email")}
                </div>
              </div>

              {/* Row 2: Title + Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>In a few words *</label>
                  <input type="text" value={title} onChange={(e) => { setTitle(e.target.value); setFieldErrors(er => ({ ...er, title: "" })); }}
                    placeholder="e.g. Awesome blade alternative" className={`${inputClass} ${fieldErrors.title ? "border-red-500" : ""}`} />
                  {fe("title")}
                </div>
                <div>
                  <label className={labelClass}>Contact Number *</label>
                  <input type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); setFieldErrors(er => ({ ...er, phone: "" })); }}
                    placeholder="e.g. 082 555 1234" className={`${inputClass} ${fieldErrors.phone ? "border-red-500" : ""}`} />
                  {fe("phone")}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className={labelClass}>Tell us more *</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => { setMessage(e.target.value); setFieldErrors(er => ({ ...er, message: "" })); }}
                  placeholder="e.g. I've been using this for 3 weeks and my skin has never felt smoother..."
                  className={`${inputClass} resize-none ${fieldErrors.message ? "border-red-500" : ""}`}
                />
                <div className="flex items-center justify-between mt-1">
                  {fieldErrors.message
                    ? <p className="text-red-500 text-[12px]">{fieldErrors.message}</p>
                    : <span />
                  }
                  <p className="text-[11px] text-gray-400">
                    {message.trim().split(/\s+/).filter(Boolean).length} / {MIN_WORDS} words min
                  </p>
                </div>
              </div>

              {/* Recommend */}
              <div>
                <p className="text-[14px] font-semibold mb-2">Would you recommend this product? *</p>
                <div className="flex items-center gap-6">
                  {(["yes", "no"] as const).map((val) => (
                    <label key={val} className="flex items-center gap-2 text-[14px] cursor-pointer">
                      <input
                        type="radio"
                        name="recommend"
                        className="accent-chiskop-red w-4 h-4"
                        checked={recommend === val}
                        onChange={() => { setRecommend(val); setFieldErrors(er => ({ ...er, recommend: "" })); }}
                      />
                      {val === "yes" ? "Yes" : "No"}
                    </label>
                  ))}
                </div>
                {fe("recommend")}
              </div>

              {/* Error */}
              {error && <p className="text-red-500 text-[14px]">{error}</p>}

              {/* Submit */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="btn bg-chiskop-red text-white uppercase font-bold text-[15px] px-8 py-2.5 rounded-md hover:bg-[#7c1217] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Share My Comment"}
                </button>
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}