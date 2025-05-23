import React, { useState, useEffect } from "react";
import axios from "axios";

const ReviewProduct = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    email: "",
    comment: "",
    rating: 0, // default = no rating selected
  });

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/reviews/${productId}`);
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err.message);
      }
    };
    if (productId) fetchReviews();
  }, [productId]);

  // Submit new review
  const handleReviewSubmit = async () => {
    if (!newReview.email || !newReview.comment || !newReview.rating) {
      alert("Please fill all fields and select a rating.");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:4000/api/reviews/${productId}`, newReview);
      setReviews([res.data.review, ...reviews]);
      setNewReview({ email: "", comment: "", rating: 0 }); // reset
    } catch (err) {
      console.error("Failed to submit review:", err.message);
      alert("Failed to submit review.");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>

      {/* Review Form */}
      <div className="mb-6">
        <input
          type="email"
          className="border p-2 w-full mb-2 rounded"
          placeholder="Your email"
          value={newReview.email}
          onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
        />
        <textarea
          className="border p-2 w-full mb-2 rounded"
          placeholder="Your comment"
          rows="3"
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
        />

        {/* Star Rating */}
        <div className="flex gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              onClick={() => setNewReview({ ...newReview, rating: star })}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={newReview.rating >= star ? "blue" : "gray"}
              className="w-6 h-6 cursor-pointer transition duration-200"
            >
              <path d="M12 2l2.9 6.9H22l-5.6 4.9 2 7.2L12 17l-6.4 4 2-7.2L2 8.9h7.1z" />
            </svg>
          ))}
        </div>

        <button
          onClick={handleReviewSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Review
        </button>
      </div>

      {/* Display Reviews */}
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((r) => (
          <div key={r._id} className="border p-3 mb-3 rounded bg-gray-50">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">{r.email}</span>
              <span className="text-yellow-500">⭐ {r.rating}/5</span>
            </div>
            <p className="mb-1">{r.comment}</p>
            <p className="text-xs text-gray-500">
              {new Date(r.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewProduct;
