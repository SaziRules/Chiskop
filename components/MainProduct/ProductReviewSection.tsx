"use client";

import React, { useState } from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";
import ReviewModal from "@/components/modals/ReviewModal";

export default function ProductReviewsSection() {
  const [open, setOpen] = useState(false);

  const reviews = [
    {
      title: "Smooth Results Every Time!",
      rating: 5,
      message: [
        "I’ve tried a few hair removal creams before, but this one is in a different league.",
        "No burning, no irritation — just smooth skin in minutes!",
        "Definitely my go-to for quick clean-ups before events.",
      ],
      name: "Michael K.",
    },
    {
      title: "Works Exactly As Promised",
      rating: 4,
      message: [
        "Used it on my head and arms, and it worked perfectly within 7 minutes.",
        "There’s a mild scent, but it’s nothing compared to other products I’ve tried.",
        "Leaves skin soft and completely bump-free.",
      ],
      name: "Thabo N.",
    },
    {
      title: "A Must-Have For Every Guy!",
      rating: 5,
      message: [
        "Honestly, this product saved me a lot of time before my shoots.",
        "No razor burn, no irritation — it’s super easy to apply and remove.",
        "Highly recommend for anyone who wants clean results fast.",
      ],
      name: "Sizwe D.",
    },
  ];

  return (
    <Section variant="default" className="bg-white text-chiskop-black py-16 md:py-24">
      <Container className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* ───────────── Rating Header ───────────── */}
        <h2 className="text-[22px] md:text-[26px] font-bold uppercase text-chiskop-red mb-6 tracking-tight">
          Rate This Product
        </h2>

        {/* Rating Summary */}
        <div className="flex flex-col items-start gap-4 mb-12">
          {/* Score + Stars */}
          <div className="flex items-center gap-4">
            <span className="text-[58px] md:text-[72px] font-bold leading-none">
              4.5
            </span>
            <div className="flex flex-col">
              <div className="flex justify-center md:justify-start items-center gap-0.5 text-chiskop-black text-[20px] leading-none">
                <span>★★★★☆</span>
              </div>
              <p className="text-[15px] text-chiskop-gray uppercase mt-1">
                Great! (321 Ratings)
              </p>
            </div>
          </div>

          {/* Leave a Review Button (below score) */}
          <button
            onClick={() => setOpen(true)}
            className="btn bg-chiskop-red text-white text-[15px] uppercase font-bold px-6 py-2.5 rounded-[10px] hover:bg-[#7c1217] transition-colors"
          >
            Leave a Review
          </button>
        </div>

        {/* ───────────── Reviews Section ───────────── */}
        <h3 className="text-[17px] md:text-[20px] font-semibold text-chiskop-red mb-6">
          Hear it from the Chiskop Man
        </h3>

        <div className="space-y-5">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-chiskop-offWhite rounded-md p-5 md:p-6 transition-all duration-300"
            >
              <h4 className="font-semibold text-[19px] mb-1">
                {review.title}
              </h4>

              {/* Stars (static text-based) */}
              <div className="flex justify-start items-center gap-0.5 text-chiskop-red text-[18px] leading-none mb-2">
                <span>
                  {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                </span>
              </div>

              {/* Message */}
              <div className="text-[16px] text-chiskop-gray leading-relaxed mb-3">
                {review.message.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>

              <p className="text-[16px] text-chiskop-black font-medium">
                {review.name}
              </p>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="flex justify-center mt-8">
          <button className="btn bg-chiskop-red text-white text-[15px] uppercase font-bold px-6 py-2.5 rounded-md hover:bg-[#7c1217] transition-colors">
            View More Reviews
          </button>
        </div>

        {/* Review Modal */}
        {open && <ReviewModal open={open} onClose={() => setOpen(false)} />}
      </Container>
    </Section>
  );
}
