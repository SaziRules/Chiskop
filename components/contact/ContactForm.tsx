"use client";

import { useState } from "react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const json = await response.json();
      
      console.log("Web3Forms Response:", json); // For debugging

      // Check if response indicates success
      if (json.success === true || response.status === 200) {
        setSubmitStatus("success");
        form.reset();
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        console.error("Submission failed:", json);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Network error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-0 md:pt-2.5">
      <h1 className="text-[30px] md:text-[34px] font-extrabold uppercase leading-tight mb-8">
        Need help? The Chiskop<br />Crew is here for you.
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Hidden Web3Forms access key */}
        <input type="hidden" name="access_key" value="0cddb7fb-097e-420c-97cf-6ca219c839d1" />

        {/* Top row */}
        <div className="grid grid-cols-2 gap-4">
          <input 
            className="contact-input" 
            placeholder="Name" 
            name="name"
            required
          />
          <input 
            className="contact-input" 
            placeholder="Surname" 
            name="surname"
            required
          />
        </div>

        {/* Middle row */}
        <div className="grid grid-cols-2 gap-4">
          <input 
            className="contact-input" 
            placeholder="+27" 
            name="phone"
            type="tel"
            required
          />
          <input 
            className="contact-input" 
            placeholder="Email" 
            name="email"
            type="email"
            required
          />
        </div>

        {/* Message */}
        <textarea
          placeholder="Message"
          rows={5}
          className="contact-input resize-none"
          name="message"
          required
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#5A0004] text-white py-3 rounded-md font-semibold text-[15px] tracking-wide hover:bg-[#450003] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
        </button>

        {/* Status messages */}
        {submitStatus === "success" && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
            <p className="text-green-700 text-sm font-medium">
              ✓ Thank you! Your message has been sent successfully.
            </p>
          </div>
        )}
        {submitStatus === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-center">
            <p className="text-red-700 text-sm font-medium">
              ✗ Something went wrong. Please try again or call us at 0860 002 652.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}