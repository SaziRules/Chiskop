"use client";

import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Hide on Sanity Studio routes
  if (pathname?.startsWith("/studio")) return null;

  return (
    <footer className="bg-[#f9f7f6] text-chiskop-black">
      {/* ───────────────── FOOTER GRID ───────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* ───────────── Column 1: MENU + PRODUCTS (same as screenshot) ───────────── */}
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="font-extrabold text-[17px] md:text-[18px] mb-2">MENU</h3>
            <ul className="space-y-1 text-[15px] md:text-[16px] leading-tight">
              <li className="hover:text-chiskop-red cursor-pointer">HOME</li>
              <li className="hover:text-chiskop-red cursor-pointer">PRODUCTS</li>
              <li className="hover:text-chiskop-red cursor-pointer">CHISKOP ZONE</li>
              <li className="hover:text-chiskop-red cursor-pointer">SALON ZONE</li>
            </ul>
          </div>

          <div>
            <h3 className="font-extrabold text-[17px] md:text-[18px] mb-2">PRODUCTS</h3>
            <ul className="space-y-1 text-[15px] md:text-[16px] leading-tight">
              <li>HAIR REMOVAL CREAM 80G</li>
              <li>SOOTHING BALM 50G</li>
              <li>HAIR REMOVAL CREAM 200G</li>
              <li>HAIR REMOVAL CREAM 950G</li>
            </ul>
          </div>
        </div>

        {/* ───────────── Column 2: CUSTOMER CARE (exact text position) ───────────── */}
        <div className="text-left md:text-left">
          <h3 className="font-extrabold text-[17px] md:text-[18px] mb-2">CUSTOMER CARE</h3>
          <ul className="space-y-1 text-[15px] md:text-[16px] leading-tight">
            <li className="hover:text-chiskop-red cursor-pointer">CONTACT US</li>
            <li className="hover:text-chiskop-red cursor-pointer">TERMS & CONDITIONS</li>
            <li className="hover:text-chiskop-red cursor-pointer">PRIVACY POLICY</li>
          </ul>
        </div>

        {/* ───────────── Column 3: HOURS + WHATSAPP + ADDRESS + SOCIALS ───────────── */}
        <div className="flex flex-col gap-6 text-left md:text-right text-[15px] md:text-[15px]">

          <div>
            <p className="font-bold mb-1">Customer Care</p>
            <p>08:00 – 17:00</p>
            <p>Monday – Friday</p>
            <p>0860 002 652</p>
          </div>

          <div>
            <p className="font-bold mb-1">WhatsApp</p>
            <p>+27 (0)60 996 6087</p>
          </div>

          <div>
            <p className="font-bold mb-1">Find us at</p>
            <p>14 Ellman Street</p>
            <p>Sunderland Ridge</p>
            <p>0157</p>
          </div>

          {/* Social icons exactly as screenshot */}
          <div className="flex items-center md:justify-end justify-center gap-4 mt-4">
            <IconCircle>
              <FaFacebookF className="text-white text-[14px]" />
            </IconCircle>
            <IconCircle>
              <FaInstagram className="text-white text-[14px]" />
            </IconCircle>
            <IconCircle>
              <FaTiktok className="text-white text-[14px]" />
            </IconCircle>
            <IconCircle>
              <FaYoutube className="text-white text-[14px]" />
            </IconCircle>
          </div>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="border-t border-chiskop-gray mt-4" />
      <p className="text-center py-4 md:py-6 text-[13px] tracking-wide">
  COPYRIGHT © CHISKOP FOR MEN {new Date().getFullYear()}
</p>

    </footer>
  );
}

/* Small helper for cleaner icon circles */
function IconCircle({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-8 h-8 rounded-full bg-[#595959] flex items-center justify-center hover:bg-chiskop-red transition-colors duration-300 cursor-pointer">
      {children}
    </div>
  );
}
