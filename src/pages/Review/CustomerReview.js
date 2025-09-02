import React, { useState } from "react";
import { StarRating } from "../../Util/ReviewStarRating";
import { useLocalStorage } from "../../hooks/useLocalStorage";

function CustomerReview() {
  const [reviews, setReviews] = useLocalStorage("customerReviews", [
    {
      id: 1,
      name: "박종민",
      date: "2025-08-27",
      rating: 5,
      comment:
        "여기저기 많이 만들어봤는데 젤 깔끔하고 제작도 쉬워서 선택했어요 너무 이쁩니다💛",
      photos: [],
    },
    {
      id: 2,
      name: "강민석",
      date: "2025-08-27",
      rating: 5,
      comment:
        "저렴한 가격에 완전 고퀄리티! 여기 완전 추천드려요. 만들기 엄청 쉽고 문의도 빨랐어요. 부모님이 완전 만족!",
      photos: [],
    },
    {
      id: 3,
      name: "전재석",
      date: "2025-08-27",
      rating: 5,
      comment: "너무 이쁘네요 감사합니다!",
      photos: [],
    },
    {
      id: 4,
      name: "이재오",
      date: "2025-08-27",
      rating: 5,
      comment: "강추합니다!",
      photos: [
        "https://plus.unsplash.com/premium_photo-1675003662150-2569448d2b3b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
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
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleRating = (rating) => {
    setForm({ ...form, rating });
  };
  const handleEdit = (review) => {
    setForm(review);
    setIsEdit(true);
  };
  const [isEdit, setIsEdit] = useState(false);
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
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
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
  const [photoOnly, setPhotoOnly] = useLocalStorage("photoOnlyFilter", false);
  const filteredReviews = photoOnly
    ? reviews.filter((r) => r.photos && r.photos.length > 0)
    : reviews;

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "'Noto Sans KR', '맑은 고딕', sans-serif",
        background: "#fff",
      }}
    >
      <h2
        style={{
          fontWeight: "bold",
          fontSize: "1.5rem",
          marginTop: "80px",
          marginBottom: "10px",
        }}
      >
        고객후기{" "}
        <span style={{ color: "#fa7e12", fontWeight: "bold" }}>
          {reviews.length}
        </span>
      </h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "14px",
          gap: "20px",
        }}
      >
        {/* 가로 정렬: label 내 줄바꿈 없이 flex 적용 */}
        <label
          style={{
            fontSize: "15px",
            color: "#2c2c2c",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginLeft: "0",
            whiteSpace: "nowrap",
          }}
        >
          <input
            type="checkbox"
            checked={photoOnly}
            onChange={() => setPhotoOnly((v) => !v)}
            style={{
              accentColor: "#fa7e12",
            }}
          />
          포토리뷰만 보기
        </label>
        <div
          style={{
            marginLeft: "auto",
            fontWeight: "bold",
            fontSize: "15px",
            display: "flex",
            gap: "12px",
          }}
        ></div>
      </div>
      {/* 등록/수정 폼 */}
      <form
        onSubmit={isEdit ? handleUpdateReview : handleAddReview}
        style={{
          marginBottom: "28px",
          background: "#f9f9f9",
          padding: "15px 12px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontSize: "15px",
          flexWrap: "wrap",
        }}
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="이름"
          style={{
            width: "120px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #eee",
          }}
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          max={getCurrentDate()}
          style={{
            width: "140px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #eee",
            cursor: "pointer",
          }}
        />
        <StarRating rating={form.rating} setRating={handleRating} />
        <textarea
          name="comment"
          value={form.comment}
          onChange={handleChange}
          placeholder="후기"
          rows={2}
          style={{
            width: "340px",
            resize: "none",
            borderRadius: "5px",
            border: "1px solid #eee",
            padding: "8px",
            fontSize: "15px",
          }}
        />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoChange}
          style={{ width: "110px" }}
        />
        {form.photos && form.photos.length > 0 && (
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {form.photos.map((src, i) => (
              <div key={i} style={{ position: "relative" }}>
                <img
                  src={src}
                  alt=""
                  style={{
                    width: "44px",
                    height: "44px",
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
        <button
          type="submit"
          style={{
            background: "#fa7e12",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "7px 16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {isEdit ? "수정" : "추가"}
        </button>
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
            style={{
              background: "#eee",
              color: "#333",
              border: "none",
              borderRadius: "6px",
              padding: "7px 16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            취소
          </button>
        )}
      </form>
      {/* 리뷰목록 */}
      {filteredReviews.map((review, idx) => (
        <div
          key={review.id}
          style={{
            padding: "16px 0 18px 0",
            borderBottom:
              idx !== filteredReviews.length - 1 ? "1px solid #ededed" : "none",
            display: "flex",
            alignItems: "flex-start",
            gap: "15px",
          }}
        >
          <div style={{ width: "125px", paddingLeft: "8px" }}>
            <StarRating rating={review.rating} />
            <div
              style={{
                fontSize: "15px",
                color: "#888",
                margin: "3px 0 0 0",
                fontWeight: "bold",
              }}
            >
              {review.name}
            </div>
            <div
              style={{ fontSize: "13px", color: "#c2c2c2", marginTop: "10px" }}
            >
              {review.date}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "15px",
                color: "#232323",
                marginBottom: review.photos.length ? "10px" : "50px",
              }}
            >
              {review.comment}
            </div>
            {review.photos && review.photos.length > 0 && (
              <div style={{ display: "flex", gap: "8px", marginBottom: "7px" }}>
                {review.photos.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "7px",
                      border: "1px solid #ddd",
                      objectFit: "cover",
                    }}
                  />
                ))}
              </div>
            )}
            <div
              style={{
                display: "flex",
                gap: "7px",
                fontSize: "13px",
                marginTop: "4px",
              }}
            >
              <button
                onClick={() => handleEdit(review)}
                style={{
                  background: "#fff",
                  color: "#ffa412",
                  border: "1px solid #ffa412",
                  borderRadius: "5px",
                  padding: "2px 11px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                수정
              </button>
              <button
                onClick={() => handleDelete(review.id)}
                style={{
                  background: "#fff",
                  color: "#888",
                  border: "1px solid #eee",
                  borderRadius: "5px",
                  padding: "2px 11px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
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
