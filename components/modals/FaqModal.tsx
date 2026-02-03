"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import ImageModal from "./ImageModal";

interface FaqModalProps {
  open: boolean;
  onClose: () => void;
  content: {
    title?: string;
    content?: any[];
    image?: string;
    ctaText?: string;
    ctaLink?: string;
  };
}

export default function FaqModal({ open, onClose, content }: FaqModalProps) {
  const [mounted, setMounted] = useState(false);
  
  // ⭐ Image modal state
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

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

  const handleBackdropClick = () => {
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // ⭐ Helper function to check if URL is an image
  const isImageUrl = (url: string) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    return imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
  };

  // ⭐ Custom PortableText components with image link detection
  const portableTextComponents = {
    block: {
      h2: ({ children }: any) => (
        <h2 className="text-2xl font-bold text-chiskop-black mb-3 mt-6">
          {children}
        </h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-xl font-semibold text-chiskop-black mb-2 mt-4">
          {children}
        </h3>
      ),
      normal: ({ children }: any) => (
        <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-chiskop-red pl-4 italic my-4 text-gray-600">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">
          {children}
        </ul>
      ),
      number: ({ children }: any) => (
        <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => <li className="ml-2">{children}</li>,
      number: ({ children }: any) => <li className="ml-2">{children}</li>,
    },
    marks: {
      strong: ({ children }: any) => (
        <strong className="font-semibold text-chiskop-black">{children}</strong>
      ),
      em: ({ children }: any) => <em className="italic">{children}</em>,
      underline: ({ children }: any) => <u className="underline">{children}</u>,
      // ⭐ Custom link rendering with image detection
      link: ({ children, value }: any) => {
        const href = value?.href;
        
        // ⭐ If link is to an image, open in image modal
        if (href && isImageUrl(href)) {
          return (
            <button
              onClick={(e) => {
                e.preventDefault();
                setSelectedImage(href);
                setImageModalOpen(true);
              }}
              className="text-chiskop-red underline hover:text-chiskop-red/80 font-medium transition-colors cursor-pointer"
            >
              {children}
            </button>
          );
        }

        // Regular link
        const target = value?.openInNewTab ? "_blank" : "_self";
        const rel = value?.openInNewTab ? "noopener noreferrer" : undefined;
        
        return (
          <a
            href={href}
            target={target}
            rel={rel}
            className="text-chiskop-red underline hover:text-chiskop-red/80 font-medium transition-colors"
          >
            {children}
          </a>
        );
      },
    },
  };

  if (!mounted || !open) return null;

  const ModalUI = (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-[10px] shadow-xl max-w-[700px] w-full max-h-[90vh] overflow-y-auto relative"
        onClick={handleModalClick}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <span className="text-gray-600 text-xl">×</span>
        </button>

        <div className="p-6 md:p-8">
          {/* Modal Title */}
          {content.title && (
            <h2 className="text-[24px] md:text-[28px] font-bold text-chiskop-black mb-6">
              {content.title}
            </h2>
          )}

          {/* Modal Image */}
          {content.image && (
            <div className="mb-6 rounded-lg overflow-hidden">
              <Image
                src={content.image}
                alt={content.title || "FAQ"}
                width={700}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Modal Content (Rich Text with Links) */}
          {content.content && (
            <div className="mb-6">
              <PortableText 
                value={content.content} 
                components={portableTextComponents}
              />
            </div>
          )}

          {/* CTA Button */}
          {content.ctaText && content.ctaLink && (
            <div className="mt-8 flex justify-center md:justify-start">
              <Link
                href={content.ctaLink}
                target={content.ctaLink.startsWith("http") ? "_blank" : "_self"}
                className="bg-chiskop-red text-white px-6 py-3 rounded-[10px] font-semibold text-[15px] hover:bg-chiskop-red/90 transition"
              >
                {content.ctaText}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ⭐ Image Modal (nested - only opens when link clicked inside this modal) */}
      {imageModalOpen && (
        <ImageModal
          open={imageModalOpen}
          onClose={() => {
            setImageModalOpen(false);
            setSelectedImage("");
          }}
          imageSrc={selectedImage}
          alt="FAQ Guide"
        />
      )}
    </div>
  );

  return createPortal(ModalUI, document.body);
}