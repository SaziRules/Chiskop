"use client";

import { useEffect, useState } from "react";

interface Review {
  id: string;
  productSlug: string;
  name: string;
  title: string;
  message: string;
  rating: number;
  recommend: string;
  approved: boolean;
  created_at: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch ALL reviews (approved + pending)
  useEffect(() => {
    async function loadReviews() {
      const res = await fetch("/api/admin/reviews");
      const data = await res.json();
      setReviews(data);
      setLoading(false);
    }
    loadReviews();
  }, []);

  async function approveReview(id: string) {
    await fetch("/api/admin/reviews/approve", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, approved: true } : r))
    );
  }

  async function deleteReview(id: string) {
    await fetch("/api/admin/reviews/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    setReviews((prev) => prev.filter((r) => r.id !== id));
  }

  if (loading) return <p className="p-10">Loading reviews...</p>;

  return (
    <div className="p-10 max-w-[1100px] mx-auto">
      <h1 className="text-3xl font-bold mb-6">Review Moderation Dashboard</h1>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-5 border rounded-lg bg-white shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-bold text-xl">{review.title}</h2>
                <p className="text-gray-600">{review.message}</p>
                <p className="font-medium mt-2">By: {review.name}</p>
                <p className="text-sm text-gray-500">
                  Product: {review.productSlug}
                </p>
                <p className="text-yellow-500 text-lg">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {!review.approved ? (
                  <button
                    onClick={() => approveReview(review.id)}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                ) : (
                  <span className="text-green-600 font-semibold">Approved</span>
                )}

                <button
                  onClick={() => deleteReview(review.id)}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <p className="text-gray-500 text-center mt-10">No reviews yet.</p>
      )}
    </div>
  );
}
