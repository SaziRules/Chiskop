"use client";

import { useState } from "react";

export default function FaqAccordion({
  title,
  faqs,
}: {
  title?: string;
  faqs: { question: string; answer: string }[];
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      

      {faqs.map((item, i) => (
        <div key={i} className="border-b border-gray-300 pb-3">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between text-[17px] font-semibold py-3"
          >
            {item.question}
            <span className="text-xl">{open === i ? "-" : "+"}</span>
          </button>

          {open === i && (
            <p className="text-[14px] text-gray-600 pt-2">{item.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
}
