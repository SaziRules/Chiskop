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
  variantIndex?: number; // Which variant (0, 1, 2, etc.)
}

interface StoreOption {
  logo: string;
  url: string;
}

interface ProductData {
  variants?: {
    sizeLabel?: string;
    shopOptions?: {
      online?: StoreOption[];
      instore?: StoreOption[];
    };
  }[];
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
  variantIndex = 0,
}: BuyModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(false);

  const active = open ?? isOpen;

  /* ───────────── FETCH VARIANT-SPECIFIC SHOP DATA ───────────── */
  useEffect(() => {
    if (!active || !productId) return;

    async function loadProduct() {
      console.log('🔍 BuyModal: Fetching data for variant index:', variantIndex);
      setLoading(true);
      
      try {
        const query = `
          *[_type == "product" && _id == $id][0]{
            variants[]{
              sizeLabel,
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
            },
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
        console.log('✅ BuyModal: Data fetched:', data);
        console.log('📦 Variant at index', variantIndex, ':', data?.variants?.[variantIndex]);
        setProduct(data);
      } catch (error) {
        console.error('❌ BuyModal: Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [active, productId, variantIndex]); // ⭐ All three dependencies

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
     GET VARIANT-SPECIFIC OR FALLBACK DATA
     ======================================================================= */

  const variantData = product?.variants?.[variantIndex];
  const variantShopOptions = variantData?.shopOptions;
  const fallbackShopOptions = product?.shopOptions;

  // Use variant-specific options if available, otherwise fallback to product-level
  const online = variantShopOptions?.online || fallbackShopOptions?.online || [];
  const instore = variantShopOptions?.instore || fallbackShopOptions?.instore || [];

  const noData = online.length === 0 && instore.length === 0;
  const variantLabel = variantData?.sizeLabel || "";

  console.log('🎯 BuyModal Render:', {
    variantIndex,
    variantLabel,
    onlineStores: online.length,
    instoreStores: instore.length,
    loading
  });

  /* ───────────── MODAL UI ───────────── */
  const handleBackdropClick = () => {
    console.log('🚪 Backdrop clicked - closing modal');
    setIsOpen(false);
    onClose?.();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent clicks inside modal from closing it
  };

  const ModalUI = (
    <div 
      className="fixed inset-0 z-10000 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={handleBackdropClick}
    >

      <div 
        className="bg-white rounded-[10px] shadow-xl max-w-[420px] w-full p-6 relative text-chiskop-black overflow-y-auto max-h-[90vh]"
        onClick={handleModalClick}
      >

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

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <p className="text-chiskop-gray">Loading stores...</p>
          </div>
        )}

        {/* ───────────── If NO DATA ───────────── */}
        {!loading && noData && (
          <div className="text-center py-6">
            {variantLabel && (
              <p className="text-[16px] font-semibold text-chiskop-black mb-2">
                {variantLabel}
              </p>
            )}
            <p className="text-[14px] text-chiskop-gray">
              Store information is not yet available for this variant.
            </p>
          </div>
        )}

        {/* ───────────── SHOP ONLINE ───────────── */}
        {!loading && !noData && (
          <>
            {/* Show variant label if available */}
            {variantLabel && (
              <div className="mb-4 pb-3 border-b border-chiskop-offWhite">
                <p className="text-[14px] text-chiskop-gray">
                  Shopping for:{" "}
                  <span className="font-semibold text-chiskop-black">
                    {variantLabel}
                  </span>
                </p>
              </div>
            )}

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