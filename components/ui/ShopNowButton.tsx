"use client";
import React, { useState } from "react";
import BuyModal from "@/components/modals/BuyModal";

export default function ShopNowButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn inline-block w-fit bg-chiskop-red text-white font-bold px-6 py-2 rounded-md hover:bg-[#7c1217] transition-colors"
      >
        SHOP NOW
      </button>

      {open && <BuyModal open={open} onClose={() => setOpen(false)} />}
    </>
  );
}
