// src/components/CustomerReview.js
import React from "react";

const reviews = [
  {
    id: 1,
    name: "김지현",
    date: "2025-08-10",
    rating: 5,
    comment: "박종민님 너무 멋져요",
  },
  {
    id: 2,
    name: "이준호",
    date: "2025-08-15",
    rating: 4,
    comment: "강민석님 천재십니다",
  },
  {
    id: 3,
    name: "박수진",
    date: "2025-08-20",
    rating: 5,
    comment: "김찬우",
  },
];

function StarRating({ rating }) {
  return (
    <div style={{ color: "#f5a623" }}>
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </div>
  );
}

function CustomerReview() {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>고객 후기</h2>
      {reviews.map((review) => (
        <div
          key={review.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ margin: "0 0 5px 0" }}>{review.name}</h3>
          <small style={{ color: "#777" }}>{review.date}</small>
          <StarRating rating={review.rating} />
          <p style={{ marginTop: "10px" }}>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default CustomerReview;
