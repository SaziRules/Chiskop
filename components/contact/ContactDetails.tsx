export default function ContactDetails() {
  return (
    <div className="pt-0 md:pt-[120px]">
      <div className="space-y-6 text-[15px] leading-relaxed max-w-[260px]">
        <div>
          <p className="font-bold">Customer Care</p>
          <p>08:00 – 17:00</p>
          <p>Monday – Friday</p>
          <p>0860 002 652</p>
        </div>

        <div>
          <p className="font-bold">WhatsApp</p>
          <p>+27 (0)60 996 6087</p>
        </div>

        <div>
          <p className="font-bold">Find us at</p>
          <p>14 Ellman Street</p>
          <p>Sunderland Ridge</p>
          <p>0157</p>
        </div>

        <div className="flex gap-4 pt-2">
          <i className="bi bi-facebook"></i>
          <i className="bi bi-instagram"></i>
          <i className="bi bi-tiktok"></i>
          <i className="bi bi-youtube"></i>
        </div>
      </div>
    </div>
  );
}
