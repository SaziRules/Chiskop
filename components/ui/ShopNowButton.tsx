"use client";

import { useState } from "react";
import BuyModal from "../modals/BuyModal";

export default function ShopNowButton({ productId }: { productId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-chiskop-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-chiskop-red/90 transition"
      >
        Shop Now
      </button>

      {open && (
        <BuyModal
          open={open}
          onClose={() => setOpen(false)}
          productId={productId}   // ← Critical piece
        />
      )}
    </>
  );
}
