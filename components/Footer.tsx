import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#f9f7f6] text-chiskop-black">
      {/* ───────────── Footer Grid ───────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16">
        {/* ───────────── Column 1: Menu ───────────── */}
        <div>
          <h3 className="font-extrabold text-[17px] md:text-[18px] mb-2">MENU</h3>
          <ul className="space-y-1 text-[15px] md:text-[16px]">
            <li className="hover:text-chiskop-red cursor-pointer">HOME</li>
            <li className="hover:text-chiskop-red cursor-pointer">PRODUCTS</li>
            <li className="hover:text-chiskop-red cursor-pointer">CHISKOP ZONE</li>
            <li className="hover:text-chiskop-red cursor-pointer">SALON ZONE</li>
          </ul>
        </div>

        {/* ───────────── Column 2: Products ───────────── */}
        <div>
          <h3 className="font-extrabold text-[17px] md:text-[18px] mb-2">PRODUCTS</h3>
          <ul className="space-y-1 text-[15px] md:text-[16px]">
            <li>HAIR REMOVAL CREAM 80G</li>
            <li>SOOTHING BALM 50G</li>
            <li>HAIR REMOVAL CREAM 200G</li>
            <li>HAIR REMOVAL CREAM 950G</li>
          </ul>
        </div>

        {/* ───────────── Column 3: Quick Links ───────────── */}
        <div>
          <h3 className="font-extrabold text-[17px] md:text-[18px] mb-2">QUICK LINKS</h3>
          <ul className="space-y-1 text-[15px] md:text-[16px]">
            <li className="hover:text-chiskop-red cursor-pointer">ABOUT US</li>
            <li className="hover:text-chiskop-red cursor-pointer">STORE LOCATOR</li>
            <li className="hover:text-chiskop-red cursor-pointer">FAQS</li>
            <li className="hover:text-chiskop-red cursor-pointer">BLOG</li>
          </ul>
        </div>

        {/* ───────────── Column 4: Customer Care + Socials ───────────── */}
        <div className="flex flex-col gap-6 md:gap-4 text-[15px] md:text-[15px] items-start md:items-end">
          {/* Contact Info */}
          <div className="text-left md:text-right">
            <p className="font-bold mb-1">Customer Care</p>
            <p>08:00 – 17:00</p>
            <p>Monday – Friday</p>
            <p>0860 002 652</p>
          </div>

          <div className="text-left md:text-right">
            <p className="font-bold mb-1">WhatsApp</p>
            <p>+27 (0)60 996 6087</p>
          </div>

          <div className="text-left md:text-right">
            <p className="font-bold mb-1">Find us at</p>
            <p>14 Ellman Street</p>
            <p>Sunderland Ridge</p>
            <p>0157</p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-8 h-8 rounded-full bg-[#595959] flex items-center justify-center hover:bg-chiskop-red transition-colors duration-300 cursor-pointer">
              <FaFacebookF className="text-white text-[14px]" />
            </div>
            <div className="w-8 h-8 rounded-full bg-[#595959] flex items-center justify-center hover:bg-chiskop-red transition-colors duration-300 cursor-pointer">
              <FaInstagram className="text-white text-[14px]" />
            </div>
            <div className="w-8 h-8 rounded-full bg-[#595959] flex items-center justify-center hover:bg-chiskop-red transition-colors duration-300 cursor-pointer">
              <FaTiktok className="text-white text-[14px]" />
            </div>
            <div className="w-8 h-8 rounded-full bg-[#595959] flex items-center justify-center hover:bg-chiskop-red transition-colors duration-300 cursor-pointer">
              <FaYoutube className="text-white text-[14px]" />
            </div>
          </div>
        </div>
      </div>

      {/* ───────────── Divider & Copyright ───────────── */}
      <div className="border-t border-chiskop-gray mt-8 md:mt-10" />
      <p className="text-center py-4 md:py-6 text-[13px] tracking-wide">
        COPYRIGHT @CHISKOP FOR MEN FOR MEN 2025
      </p>
    </footer>
  );
}
