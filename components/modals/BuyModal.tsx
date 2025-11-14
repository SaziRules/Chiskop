"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

interface BuyModalProps {
  standalone?: boolean;
  open?: boolean;
  onClose?: () => void;
  productId?: string; // Sanity _id
}

interface StoreOption {
  logo: string;
  url: string;
}

interface ProductData {
  shopOptions?: {
    online?: StoreOption[];
    instore?: StoreOption[];
  };
}

export default function BuyModal({
  standalone = false,
  open,
  onClose,
  productId,
}: BuyModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [product, setProduct] = useState<ProductData | null>(null);

  const active = open ?? isOpen;

  /* ───────────── FETCH MINIMAL SHOP DATA ───────────── */
  useEffect(() => {
    if (!active || !productId) return;

    async function loadProduct() {
      const query = `
        *[_type == "product" && _id == $id][0]{
          shopOptions{
            online[]{
              "logo": logo.asset->url,
              url
            },
            instore[]{
              "logo": logo.asset->url,
              url
            }
          }
        }
      `;
      const data = await client.fetch(query, { id: productId });
      setProduct(data);
    }

    loadProduct();
  }, [active, productId]);

  /* ───────────── MOUNT ───────────── */
  useEffect(() => setMounted(true), []);

  /* ───────────── SCROLL LOCK ───────────── */
  useEffect(() => {
    if (!mounted) return;
    if (active) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mounted, active]);

  /* =======================================================================
     FALLBACK LOGIC
     ======================================================================= */

  const online = product?.shopOptions?.online || [];
  const instore = product?.shopOptions?.instore || [];

  const noData = online.length === 0 && instore.length === 0;

  /* ───────────── MODAL UI (EXACT ORIGINAL LAYOUT) ───────────── */
  const ModalUI = (
    <div className="fixed inset-0 z-10000 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-[10px] shadow-xl max-w-[420px] w-full p-6 relative text-chiskop-black overflow-y-auto max-h-[90vh]">

        {/* Close */}
        <button
          onClick={() => {
            setIsOpen(false);
            onClose?.();
          }}
          className="absolute top-4 right-5 text-chiskop-gray hover:text-chiskop-black text-[22px]"
        >
          ×
        </button>

        {/* ───────────── If NO DATA ───────────── */}
        {noData && (
          <p className="text-center text-chiskop-gray text-[14px] py-6">
            Store information is not yet available.
          </p>
        )}

        {/* ───────────── SHOP ONLINE ───────────── */}
        {!noData && (
          <>
            <h3 className="text-[22px] font-semibold mb-1">Shop Online</h3>
            <p className="text-[14px] text-chiskop-gray mb-4">
              Get your Chiskop fix delivered to your door
            </p>

            <div className="space-y-3 mb-8">
              {online.map((store, i) => (
                <Link
                  key={i}
                  href={store.url || "#"}
                  target="_blank"
                  className="flex items-center justify-between bg-[#f9f9f9] border border-chiskop-offWhite
                  rounded-[10px] px-5 py-2.5 hover:bg-chiskop-offWhite transition-all"
                >
                  <span className="text-[13px] text-chiskop-gray uppercase tracking-wide">
                    Shop Online At
                  </span>

                  <Image
                    src={store.logo || "/images/store.png"}
                    alt="Store"
                    width={90}
                    height={28}
                    className="object-contain"
                  />
                </Link>
              ))}

              {online.length === 0 && (
                <p className="text-[13px] text-chiskop-gray">No online stores available.</p>
              )}
            </div>

            {/* ───────────── IN-STORE RETAILERS ───────────── */}
            <h3 className="text-[22px] font-semibold mb-1">Find In-store</h3>
            <p className="text-[14px] text-chiskop-gray mb-4">
              Get your Chiskop fix from your nearest store
            </p>

            <div className="space-y-3">
              {instore.map((store, i) => (
                <Link
                  key={i}
                  href={store.url || "#"}
                  target="_blank"
                  className="flex items-center justify-between bg-[#f9f9f9] border border-chiskop-offWhite
                  rounded-[10px] px-5 py-2.5 hover:bg-chiskop-offWhite transition-all"
                >
                  <span className="text-[13px] text-chiskop-gray uppercase tracking-wide">
                    Shop In-store
                  </span>

                  <Image
                    src={store.logo || "/images/store.png"}
                    alt="Store"
                    width={90}
                    height={28}
                    className="object-contain"
                  />
                </Link>
              ))}

              {instore.length === 0 && (
                <p className="text-[13px] text-chiskop-gray">No in-store retailers available.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      {standalone && !active && (
        <button
          onClick={() => setIsOpen(true)}
          className="absolute top-0 left-0 z-1 w-9 h-9 md:w-10 md:h-10"
        >
          <Image src="/images/cart.png" alt="Where to buy" width={40} height={40} />
        </button>
      )}

      {mounted && active && createPortal(ModalUI, document.body)}
    </>
  );
}
