"use client";

import { useState } from "react";
import { PortableText } from "@portabletext/react";
import FaqModal from "@/components/modals/FaqModal";
import ImageModal from "@/components/modals/ImageModal";

interface FaqItem {
  question: string;
  answer?: string; // Old field: plain text
  richAnswer?: any[]; // New field: portable text with links
  useModal?: boolean;
  modalContent?: {
    title?: string;
    content?: any[];
    image?: string;
    ctaText?: string;
    ctaLink?: string;
  };
}

export default function FaqAccordion({
  title,
  faqs,
}: {
  title?: string;
  faqs: FaqItem[];
}) {
  const [open, setOpen] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState<FaqItem["modalContent"] | null>(null);
  
  // ⭐ New state for image modal
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleFaqClick = (index: number, item: FaqItem) => {
    if (item.useModal && item.modalContent) {
      setSelectedModal(item.modalContent);
      setModalOpen(true);
    } else {
      setOpen(open === index ? null : index);
    }
  };

  // ⭐ Helper function to check if URL is an image
  const isImageUrl = (url: string) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    return imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
  };

  // ⭐ Custom components for rendering links with image detection
  const portableTextComponents = {
    marks: {
      link: ({ children, value }: any) => {
        const href = value?.href;
        
        // ⭐ If link is to an image, open in modal instead
        if (href && isImageUrl(href)) {
          return (
            <button
              onClick={(e) => {
                e.preventDefault();
                setSelectedImage(href);
                setImageModalOpen(true);
              }}
              className="text-chiskop-red underline hover:text-chiskop-red/80 transition-colors cursor-pointer"
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
            className="text-chiskop-red underline hover:text-chiskop-red/80 transition-colors"
          >
            {children}
          </a>
        );
      },
    },
  };

  return (
    <>
      <div className="space-y-6">
        {faqs.map((item, i) => (
          <div key={i} className="border-b border-gray-300 pb-3">
            <button
              onClick={() => handleFaqClick(i, item)}
              className="w-full flex items-center justify-between text-[17px] text-left font-semibold py-3 hover:text-chiskop-red transition-colors"
            >
              <span className="flex items-center gap-2">
                {item.question}
                {item.useModal && (
                  <span className="text-xs bg-chiskop-red text-white px-2 py-0.5 rounded">
                    More Info
                  </span>
                )}
              </span>
              <span className="text-xl">
                {item.useModal ? "→" : open === i ? "-" : "+"}
              </span>
            </button>

            {/* Render inline answer - prioritize richAnswer, fallback to answer */}
            {!item.useModal && open === i && (
              <div className="text-[14px] text-gray-600 pt-2 leading-relaxed">
                {item.richAnswer ? (
                  <PortableText 
                    value={item.richAnswer} 
                    components={portableTextComponents}
                  />
                ) : item.answer ? (
                  <p>{item.answer}</p>
                ) : null}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FAQ Modal */}
      {selectedModal && (
        <FaqModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedModal(null);
          }}
          content={selectedModal}
        />
      )}

      {/* ⭐ Image Modal */}
      <ImageModal
        open={imageModalOpen}
        onClose={() => {
          setImageModalOpen(false);
          setSelectedImage("");
        }}
        imageSrc={selectedImage}
        alt="FAQ Guide"
      />
    </>
  );
}