"use client";

import { useEffect, useState } from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";
import ReviewModal from "@/components/modals/ReviewModal";

interface ProductReviewSectionProps {
  productSlug: string; // ⭐ REQUIRED
}

interface Review {
  id: string;
  title: string;
  rating: number;
  message: string;
  name: string;
  recommend: "yes" | "no";
  created_at: string;
}

export default function ProductReviewsSection({ productSlug }: ProductReviewSectionProps) {
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  console.log("Reviews slug received:", productSlug);


  // ⭐ Fetch approved reviews
  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch(`/api/reviews/${productSlug}`);
        const data = await res.json();

        if (Array.isArray(data)) setReviews(data);
      } catch (e) {
        console.error("Failed to load reviews", e);
      }
    }

    loadReviews();
  }, [productSlug]);

  return (
    <Section variant="default" className="bg-white text-chiskop-black py-16 md:py-24">
      <Container className="max-w-[1200px] mx-auto px-6 md:px-8">

        {/* ───────────── Rating Header ───────────── */}
        <h2 className="text-[22px] md:text-[26px] font-bold uppercase text-chiskop-red mb-6 tracking-tight">
          Rate This Product
        </h2>

        {/* Rating Summary */}
        <div className="flex flex-col items-start gap-4 mb-12">
          <div className="flex items-center gap-4">
            {/* Average Score */}
            <span className="text-[58px] md:text-[72px] font-bold leading-none">
              {reviews.length
                ? (
                    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
                  ).toFixed(1)
                : "0.0"}
            </span>

            {/* Stars */}
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5 text-chiskop-black text-[20px]">
                {reviews.length
                  ? "★".repeat(Math.round(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length)) +
                    "☆".repeat(
                      5 - Math.round(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length)
                    )
                  : "☆☆☆☆☆"}
              </div>

              <p className="text-[15px] text-chiskop-gray uppercase mt-1">
                {reviews.length ? `${reviews.length} Ratings` : "No Ratings Yet"}
              </p>
            </div>
          </div>

          {/* Leave a review */}
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

        {reviews.length ? (
          <div className="space-y-5">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-chiskop-offWhite rounded-md p-5 md:p-6"
              >
                <h4 className="font-semibold text-[19px] mb-1">
                  {review.title}
                </h4>

                {/* Stars */}
                <div className="flex items-center text-chiskop-red text-[18px] mb-2">
                  {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                </div>

                {/* Message */}
                <div className="text-[16px] text-chiskop-gray leading-relaxed mb-3">
                  {review.message.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>

                <p className="text-[16px] text-chiskop-black font-medium">
                  {review.name}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-chiskop-gray text-[16px] mt-4">
            No reviews yet. Be the first to leave one!
          </p>
        )}

        {/* View More */}
        {reviews.length > 3 && (
          <div className="flex justify-center mt-8">
            <button className="btn bg-chiskop-red text-white text-[15px] uppercase font-bold px-6 py-2.5 rounded-md hover:bg-[#7c1217] transition-colors">
              View More Reviews
            </button>
          </div>
        )}

        {/* Review Modal — ⭐ FIX: productSlug must be passed */}
        {open && (
          <ReviewModal
            open={open}
            onClose={() => setOpen(false)}
            productSlug={productSlug}
          />
        )}
      </Container>
    </Section>
  );
}
