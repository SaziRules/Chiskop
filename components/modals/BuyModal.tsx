"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";

interface BuyModalProps {
  /** if true, renders only modal (no floating icon) */
  standalone?: boolean;
  /** if you want to control it externally (e.g., ShopNowButton) */
  open?: boolean;
  onClose?: () => void;
}

export default function BuyModal({ standalone = false, open, onClose }: BuyModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mount state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll lock
  useEffect(() => {
    if (!mounted) return;
    const active = open ?? isOpen;
    if (active) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen, open, mounted]);

  // Actual modal markup
  const ModalUI = (
    <div className="fixed inset-0 z-10000 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-[10px] shadow-xl max-w-[420px] w-full p-6 relative text-chiskop-black overflow-y-auto max-h-[90vh]">
        <button
          onClick={() => {
            setIsOpen(false);
            onClose?.();
          }}
          aria-label="Close"
          className="absolute top-4 right-5 text-chiskop-gray hover:text-chiskop-black text-[22px] leading-none"
        >
          ×
        </button>

        {/* Shop Online */}
        <h3 className="text-[22px] font-semibold mb-1 text-chiskop-black">Shop Online</h3>
        <p className="text-[14px] text-chiskop-gray mb-4">
          Get your Chiskop fix delivered to your door
        </p>

        <div className="space-y-3 mb-8">
          {[1, 2].map((i) => (
            <Link
              key={`online-${i}`}
              href="#"
              className="flex items-center justify-between bg-[#f9f9f9] border border-chiskop-offWhite rounded-[10px] px-5 py-2.5 hover:bg-chiskop-offWhite transition-all"
            >
              <span className="text-[13px] text-chiskop-gray uppercase tracking-wide">
                Shop Online At
              </span>
              <Image
                src="/images/store.png"
                alt="Store"
                width={90}
                height={28}
                className="object-contain"
              />
            </Link>
          ))}
        </div>

        {/* Find In-store */}
        <h3 className="text-[22px] font-semibold mb-1 text-chiskop-black">Find In-store</h3>
        <p className="text-[14px] text-chiskop-gray mb-4">
          Get your Chiskop fix from your nearest store
        </p>

        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Link
              key={`store-${i}`}
              href="#"
              className="flex items-center justify-between bg-[#f9f9f9] border border-chiskop-offWhite rounded-[10px] px-5 py-2.5 hover:bg-chiskop-offWhite transition-all"
            >
              <span className="text-[13px] text-chiskop-gray uppercase tracking-wide">
                Shop In-store
              </span>
              <Image
                src="/images/store.png"
                alt="Store"
                width={90}
                height={28}
                className="object-contain"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  // Render modal through portal
  const active = open ?? isOpen;
  return (
    <>
      {/* Optional floating trigger icon (only if standalone) */}
      {standalone && !active && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Where to buy"
          className="absolute top-0 left-0 z-1 w-9 h-9 md:w-10 md:h-10"
        >
          <Image
            src="/images/cart.png"
            alt="Where to buy"
            width={40}
            height={40}
            className="object-contain"
          />
        </button>
      )}

      {mounted && active && createPortal(ModalUI, document.body)}
    </>
  );
}
