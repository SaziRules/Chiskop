"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ReviewModal({ open, onClose }: ReviewModalProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const modalContent = (
    <div className="fixed inset-0 z-10000 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-[10px] shadow-xl max-w-[500px] w-full p-8 relative text-chiskop-black">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-5 text-chiskop-gray hover:text-chiskop-black text-[22px] leading-none"
        >
          ×
        </button>

        {/* Header */}
        <h3 className="text-[22px] font-bold text-center text-chiskop-black mb-6 uppercase">
          Give Your Opinion
        </h3>

        {/* Rating */}
        <div className="flex flex-col items-center mb-6">
          <p className="text-[14px] mb-2">Give a rating *</p>
          <div className="flex justify-center items-center gap-0.5 text-chiskop-red text-[24px] leading-none">
            <span>★★★★★</span>
          </div>
        </div>

        {/* Short Title */}
        <label className="block text-[14px] font-semibold mb-1">
          In a few words *
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-chiskop-red"
          placeholder="Summarize your review..."
        />

        {/* Message */}
        <label className="block text-[14px] font-semibold mb-1">
          Tell us more *
        </label>
        <textarea
          rows={4}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-chiskop-red"
          placeholder="Write your detailed review..."
        ></textarea>

        {/* Recommend Question */}
        <p className="text-[14px] font-semibold mb-2">
          Would you recommend this product to a friend? *
        </p>
        <div className="flex items-center gap-6 mb-8">
          <label className="flex items-center gap-2 text-[14px]">
            <input
              type="radio"
              name="recommend"
              className="accent-chiskop-red w-4 h-4"
            />
            Yes
          </label>
          <label className="flex items-center gap-2 text-[14px]">
            <input
              type="radio"
              name="recommend"
              className="accent-chiskop-red w-4 h-4"
            />
            No
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button className="btn bg-chiskop-red text-white uppercase font-bold text-[15px] px-8 py-2.5 rounded-md hover:bg-[#7c1217] transition-colors">
            Share My Comment
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
