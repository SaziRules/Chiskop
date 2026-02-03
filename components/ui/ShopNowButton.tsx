"use client";

import { useState } from "react";
import BuyModal from "@/components/modals/BuyModal";

interface ShopNowButtonProps {
  productId: string;
  variantIndex?: number; // Which variant is selected (0, 1, 2, etc.)
  className?: string;
}

export default function ShopNowButton({ 
  productId, 
  variantIndex = 0,
  className = ""
}: ShopNowButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    console.log('🛒 ShopNowButton clicked:', { productId, variantIndex });
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`bg-chiskop-red text-white text-[15px] md:text-[16px] font-semibold 
          px-8 py-3 rounded-[10px] hover:bg-chiskop-red/90 transition-colors ${className}`}
      >
        Shop Now
      </button>

      <BuyModal
        open={isModalOpen}
        onClose={() => {
          console.log('🚪 Modal closing');
          setIsModalOpen(false);
        }}
        productId={productId}
        variantIndex={variantIndex}
      />
    </>
  );
}