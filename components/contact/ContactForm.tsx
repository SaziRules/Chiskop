"use client";

export default function ContactForm() {
  return (
    <div className="pt-0 md:pt-2.5">
      <h1 className="text-[30px] md:text-[34px] font-extrabold uppercase leading-tight mb-8">
        Need help? The Chiskop<br />Crew is here for you.
      </h1>


      <form className="space-y-4">
        {/* Top row */}
        <div className="grid grid-cols-2 gap-4">
          <input className="contact-input" placeholder="Name" />
          <input className="contact-input" placeholder="Surname" />
        </div>

        {/* Middle row */}
        <div className="grid grid-cols-2 gap-4">
          <input className="contact-input" placeholder="+27" />
          <input className="contact-input" placeholder="Email" />
        </div>

        {/* Message */}
        <textarea
          placeholder="Message"
          rows={5}
          className="contact-input resize-none"
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#5A0004] text-white py-3 rounded-md font-semibold text-[15px] tracking-wide hover:bg-[#450003] transition"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}
