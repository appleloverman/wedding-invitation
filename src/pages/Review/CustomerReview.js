import React, { useState } from "react";

function StarRating({ rating, setRating }) {
  return (
    <div
      style={{ color: "#f5a623", cursor: setRating ? "pointer" : "default" }}
    >
      {[1, 2, 3, 4, 5].map((num) => (
        <span
          key={num}
          onClick={() => setRating && setRating(num)}
          style={{ fontSize: "20px" }}
        >
          {rating >= num ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

function CustomerReview() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "박종민",
      date: "2025-08-10",
      rating: 5,
      comment: "박종민님 멋지십니다",
      photos: [],
    },
    {
      id: 2,
      name: "강민석",
      date: "2025-08-15",
      rating: 4,
      comment: "강민석님 이해가 상당히 빠르십니다",
      photos: [],
    },
    {
      id: 3,
      name: "김찬우",
      date: "2025-08-20",
      rating: 5,
      comment: "맞춤형 디자인 덕분에 특별한 초대장을 만들 수 있었어요.",
      photos: [],
    },
  ]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    date: "",
    rating: 5,
    comment: "",
    photos: [],
  });
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRating = (rating) => {
    setForm({ ...form, rating });
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
          })
      )
    ).then((photoUrls) => {
      setForm((prev) => ({
        ...prev,
        photos: [...prev.photos, ...photoUrls].slice(0, 5),
      }));
    });
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!form.name || !form.comment) return;
    setReviews([...reviews, { ...form, id: Date.now() }]);
    setForm({
      id: null,
      name: "",
      date: "",
      rating: 5,
      comment: "",
      photos: [],
    });
    setIsEdit(false);
  };

  const handleEdit = (review) => {
    setForm(review);
    setIsEdit(true);
  };

  const handleUpdateReview = (e) => {
    e.preventDefault();
    setReviews(reviews.map((r) => (r.id === form.id ? form : r)));
    setForm({
      id: null,
      name: "",
      date: "",
      rating: 5,
      comment: "",
      photos: [],
    });
    setIsEdit(false);
  };

  const handleDelete = (id) => {
    setReviews(reviews.filter((r) => r.id !== id));
  };

  const handlePhotoRemove = (idx) => {
    setForm((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== idx),
    }));
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "14px" }}>
      <h2
        style={{ textAlign: "left", fontSize: "1.3rem", marginBottom: "14px" }}
      >
        고객 후기
      </h2>
      <form
        onSubmit={isEdit ? handleUpdateReview : handleAddReview}
        style={{
          marginBottom: "24px",
          background: "#f9f9f9",
          padding: "16px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="이름"
          style={{ width: "120px" }}
        />
        <input
          name="date"
          value={form.date}
          onChange={handleChange}
          placeholder="날짜(예: 2025-08-20)"
          style={{ width: "130px" }}
        />
        <StarRating rating={form.rating} setRating={handleRating} />
        <textarea
          name="comment"
          value={form.comment}
          onChange={handleChange}
          placeholder="후기"
          rows={2}
          style={{ width: "450px", resize: "none" }}
        />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoChange}
          style={{ width: "120px" }}
        />
        {form.photos && form.photos.length > 0 && (
          <div style={{ display: "flex", gap: "6px" }}>
            {form.photos.map((src, i) => (
              <div key={i} style={{ position: "relative" }}>
                <img
                  src={src}
                  alt=""
                  style={{
                    width: "48px",
                    height: "48px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #eee",
                  }}
                />
                <button
                  type="button"
                  onClick={() => handlePhotoRemove(i)}
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -4,
                    fontSize: "12px",
                    background: "#fff",
                    color: "#999",
                    border: "none",
                    borderRadius: "50%",
                    width: "18px",
                    height: "18px",
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <button type="submit">{isEdit ? "수정" : "추가"}</button>
        {isEdit && (
          <button
            type="button"
            onClick={() => {
              setForm({
                id: null,
                name: "",
                date: "",
                rating: 5,
                comment: "",
                photos: [],
              });
              setIsEdit(false);
            }}
          >
            취소
          </button>
        )}
      </form>
      {reviews.map((review) => (
        <div
          key={review.id}
          style={{
            display: "flex",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
            background: "#fff",
            minHeight: "80px",
            position: "relative",
          }}
        >
          {/* 이름 왼쪽 한 줄 분리 */}
          <div
            style={{
              width: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "16px",
              color: "#333",
              borderRight: "1px solid #eee",
              marginRight: "15px",
            }}
          >
            {review.name}
          </div>
          {/* 내용 부분 */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <small style={{ color: "#777", marginBottom: "4px" }}>
              {review.date}
            </small>
            <StarRating rating={review.rating} />
            <p style={{ marginTop: "10px" }}>{review.comment}</p>
          </div>
          {/* 오른쪽 하단: 사진 썸네일 위, 아래 수정/삭제 버튼 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              minWidth: "92px",
              position: "relative",
            }}
          >
            {review.photos && review.photos.length > 0 && (
              <div
                style={{ display: "flex", gap: "8px", marginBottom: "10px" }}
              >
                {review.photos.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                ))}
              </div>
            )}
            <div
              style={{
                display: "flex",
                gap: "6px",
                fontSize: "13px",
                marginTop: "auto",
                alignItems: "center",
              }}
            >
              <button
                onClick={() => handleEdit(review)}
                style={{
                  fontSize: "12px",
                  padding: "3px 8px",
                  marginRight: "2px",
                }}
              >
                수정
              </button>
              <button
                onClick={() => handleDelete(review.id)}
                style={{ fontSize: "12px", padding: "3px 8px" }}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CustomerReview;
