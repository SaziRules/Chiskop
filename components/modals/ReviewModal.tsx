"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  productSlug: string; // ⭐ Needed for dynamic linking
}

export default function ReviewModal({ open, onClose, productSlug }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [recommend, setRecommend] = useState<"yes" | "no" | null>(null);
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Prevent background scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const handleSubmit = async () => {
    setError("");

    // ⭐ Validation
    if (!rating) return setError("Please choose a rating.");
    if (!title.trim()) return setError("Please enter a review title.");
    if (!message.trim()) return setError("Please enter a detailed review.");
    if (!recommend) return setError("Please indicate if you recommend this product.");
    if (!name.trim()) return setError("Please enter your name.");

    setLoading(true);

    try {
      const res = await fetch("/api/reviews/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productSlug,
          name,
          title,
          message,
          rating,
          recommend,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setLoading(false);
        return;
      } else {
        setError(data.error || "Something went wrong.");
        setLoading(false);
      }
    } catch (err) {
      setError("Network error, please try again.");
      setLoading(false);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-10000 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-[10px] shadow-xl max-w-[500px] w-full p-8 relative text-chiskop-black">

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-5 text-chiskop-gray hover:text-chiskop-black text-[22px] leading-none"
        >
          ×
        </button>

        {/* Submitted State */}
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
            {/* Header */}
            <h3 className="text-[22px] font-bold text-center text-chiskop-black mb-6 uppercase">
              Give Your Opinion
            </h3>

            {/* Rating */}
            <div className="flex flex-col items-center mb-6">
              <p className="text-[14px] mb-2">Give a rating *</p>
              <div className="flex gap-1 text-[28px] text-chiskop-red cursor-pointer">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    className={star <= rating ? "text-chiskop-red" : "text-gray-300"}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* Name */}
            <label className="block text-[14px] font-semibold mb-1">
              Your Name *
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-chiskop-red"
              placeholder="Your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Short Title */}
            <label className="block text-[14px] font-semibold mb-1">
              In a few words *
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-chiskop-red"
              placeholder="Summarize your review..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Message */}
            <label className="block text-[14px] font-semibold mb-1">
              Tell us more *
            </label>
            <textarea
              rows={4}
              className="w-full border border-gray-300 rounded-md p-2 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-chiskop-red"
              placeholder="Write your detailed review..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            {/* Recommend */}
            <p className="text-[14px] font-semibold mb-2">
              Would you recommend this product? *
            </p>
            <div className="flex items-center gap-6 mb-8">
              <label className="flex items-center gap-2 text-[14px]">
                <input
                  type="radio"
                  name="recommend"
                  className="accent-chiskop-red w-4 h-4"
                  onChange={() => setRecommend("yes")}
                />
                Yes
              </label>
              <label className="flex items-center gap-2 text-[14px]">
                <input
                  type="radio"
                  name="recommend"
                  className="accent-chiskop-red w-4 h-4"
                  onChange={() => setRecommend("no")}
                />
                No
              </label>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-[14px] mb-4">{error}</p>
            )}

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                className="btn bg-chiskop-red text-white uppercase font-bold text-[15px] px-8 py-2.5 rounded-md hover:bg-[#7c1217] transition-colors"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Share My Comment"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
