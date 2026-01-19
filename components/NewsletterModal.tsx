"use client";

import Image from "next/image";
import { FaTimes } from "react-icons/fa";

interface NewsletterModalProps {
  open: boolean;
  onClose: () => void;
}

export default function NewsletterModal({
  open,
  onClose,
}: NewsletterModalProps) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-100 bg-black/60 flex items-center justify-center px-4"
        onClick={onClose}
      >
        {/* Modal */}
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
            <h2 className="text-[22px] font-bold leading-tight mb-2">
              Down for more?
              <br />
              We got you!
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              Subscribe for all the latest product drops, limited offers and
              in-store event info
            </p>

            <form className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="NAME"
                  className="input"
                />
                <input
                  type="text"
                  placeholder="SURNAME"
                  className="input"
                />
              </div>

              <input
                type="email"
                placeholder="EMAIL"
                className="input w-full"
              />
              <input
                type="tel"
                placeholder="PHONE"
                className="input w-full"
              />

              <button
                type="submit"
                className="w-full bg-chiskop-red text-white py-2 font-semibold"
              >
                Send
              </button>
            </form>

            <p className="text-[11px] text-gray-500 mt-4 leading-snug">
              If you subscribe to Chiskop, you agree to receive recurring
              promotional and marketing messages. Consent is not a condition of
              purchase.
              <br />
              <span className="underline cursor-pointer">
                Terms of Use and Privacy Policy
              </span>
            </p>
          </div>

          {/* Right: Image */}
          <div className="relative hidden md:block">
            <Image
              src="/images/newsletter.png"
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
