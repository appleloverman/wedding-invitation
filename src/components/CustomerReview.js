import React from "react";

import img1 from "../art/abc.jpg";
import img2 from "../art/abc2.jpg";
import img3 from "../art/abc3.jpg";

const reviews = [
  {
    id: 1,
    name: "김지현",
    date: "2025-08-10",
    rating: 5,
    comment: "정말 아름다운 청첩장이었어요! 친구들도 모두 칭찬했답니다.",
    photo: img1,
  },
  {
    id: 2,
    name: "이준호",
    date: "2025-08-15",
    rating: 4,
    comment: "쉬운 사용법과 예쁜 디자인이 마음에 들었어요. 추천합니다!",
    photo: img2,
  },
  {
    id: 3,
    name: "박수진",
    date: "2025-08-20",
    rating: 5,
    comment: "맞춤형 디자인 덕분에 특별한 초대장을 만들 수 있었어요.",
    photo: img3,
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
            display: "flex",
            alignItems: "center",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            background: "#fff",
          }}
        >
          {/* 사진 */}
          <img
            src={review.photo}
            alt={`${review.name} 사진`}
            style={{
              width: "64px",
              height: "64px",
              objectFit: "cover",
              borderRadius: "50%",
              marginRight: "18px",
              flexShrink: 0,
            }}
          />
          {/* 텍스트 영역 */}
          <div>
            <h3 style={{ margin: "0 0 5px 0" }}>{review.name}</h3>
            <small style={{ color: "#777" }}>{review.date}</small>
            <StarRating rating={review.rating} />
            <p style={{ marginTop: "10px" }}>{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CustomerReview;
