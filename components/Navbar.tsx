"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
   // DO NOT RENDER NAVBAR ON SANITY STUDIO ROUTES
  if (pathname?.startsWith("/studio")) return null;
  const [open, setOpen] = useState(false);

  const links = [
    { name: "HOME", href: "/" },
    { name: "PRODUCTS", href: "/products" },
    { name: "CHISKOP ZONE", href: "/chiskop-zone" },
    { name: "SALON", href: "/salon" },
    { name: "CONTACT US", href: "/contact-us" },
  ];

  const isActive = (href: string) => {
  if (href === "/") return pathname === "/";
  if (href === "/products") {
    return pathname?.startsWith("/products") || pathname?.startsWith("/product");
  }
  return pathname?.startsWith(href);
};


  // Close drawer with Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <header className="relative z-50">
      {/* ───────────── Top Dark Strip ───────────── */}
      <div className="h-10 w-full bg-chiskop-gray" />

      {/* ───────────── Main White Bar ───────────── */}
      <div className="relative w-full bg-white border-b border-[#e5e5e5]">
        <div className="max-w-[1700px] mx-auto flex items-center justify-between px-3 md:px-5 h-[85px] relative">
          {/* ───────────── Logo (Overlaps Down) ───────────── */}
          <Link
            href="/"
            className="absolute left-[18px] bottom-[-34px] z-20"
          >
            <Image
              src="/images/logo.png"
              alt="Chiskop Logo"
              width={200}
              height={100}
              priority
              className="h-[88px] w-auto object-contain"
            />
          </Link>

          {/* ───────────── Desktop Nav Links ───────────── */}
          <nav className="ml-auto hidden md:flex items-center gap-[46px]">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={[
                    "relative uppercase tracking-tight font-extrabold text-[17px] leading-none select-none",
                    active
                      ? "text-chiskop-red"
                      : "text-chiskop-black hover:text-chiskop-red transition-colors",
                  ].join(" ")}
                >
                  <span className="relative inline-block">
                    {link.name}
                    {active && (
                      <span
                        className="absolute left-0 -bottom-2 h-[5px] w-full 
                                   bg-linear-to-r from-chiskop-red to-transparent"
                      />
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* ───────────── Mobile Menu Button ───────────── */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-chiskop-gray font-bold text-3xl ml-auto mr-1.5"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

    {/* ───────────── Mobile Drawer ───────────── */}
<div
  className={`fixed inset-0 z-40 bg-black/35 transition-opacity ${
    open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
  }`}
  onClick={() => setOpen(false)}
>
  <div
    role="dialog"
    aria-modal="true"
    className={`absolute right-0 top-0 h-full w-[72%] max-w-[300px] bg-chiskop-offWhite border-l border-[#e6e6e6] shadow-lg transform transition-transform duration-300 ${
      open ? "translate-x-0" : "translate-x-full"
    }`}
    onClick={(e) => e.stopPropagation()}
  >
    {/* Close Button */}
    <button
      onClick={() => setOpen(false)}
      className="absolute top-6 right-4 text-[22px] text-chiskop-lightGray"
      aria-label="Close menu"
    >
      ✕
    </button>

    {/* Nav Links */}
    <nav className="flex flex-col gap-4 px-6 pt-16 uppercase font-extrabold text-menu tracking-tight text-chiskop-black">
      {[
        ...links,
        { name: "TERMS & CONDITIONS", href: "/terms" },
        { name: "PRIVACY POLICY", href: "/privacy" },
      ].map((link) => {
        const active = isActive(link.href);
        return (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setOpen(false)}
            className={`${
              active
                ? "text-chiskop-red"
                : "hover:text-chiskop-red transition-colors"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  </div>
</div>


    </header>
  );
}
