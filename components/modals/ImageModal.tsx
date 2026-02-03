"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface ImageModalProps {
  open: boolean;
  onClose: () => void;
  imageSrc: string;
  alt?: string;
}

export default function ImageModal({ open, onClose, imageSrc, alt = "Image" }: ImageModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mounted, open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  const handleBackdropClick = () => {
    onClose();
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!mounted || !open) return null;

  const ModalUI = (
    <div
      className="fixed inset-0 z-10000 flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
      onClick={handleBackdropClick}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition"
        aria-label="Close"
      >
        <span className="text-gray-600 text-2xl">×</span>
      </button>

      {/* Image Container */}
      <div
        className="relative max-w-[90vw] max-h-[90vh]"
        onClick={handleImageClick}
      >
        <Image
          src={imageSrc}
          alt={alt}
          width={1200}
          height={900}
          className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
        />
      </div>

      {/* Helper text */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
        Press ESC or click outside to close
      </div>
    </div>
  );

  return createPortal(ModalUI, document.body);
}