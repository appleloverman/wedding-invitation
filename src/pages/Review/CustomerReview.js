import React, { useState } from "react";
import { StarRating } from "../../Util/ReviewStarRating";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import "../../Css/CustomerReview.css"; // 스타일 분리

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
  const [isEdit, setIsEdit] = useState(false);
  const [photoOnly, setPhotoOnly] = useLocalStorage("photoOnlyFilter", false);

  const filteredReviews = photoOnly
    ? reviews.filter((r) => r.photos && r.photos.length > 0)
    : reviews;

  const getCurrentDate = () => new Date().toISOString().split("T")[0];

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleRating(rating) {
    setForm({ ...form, rating });
  }

  function handlePhotoChange(e) {
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
  }

  function handleAddReview(e) {
    e.preventDefault();
    if (!form.name || !form.comment) return;
    setReviews([
      ...reviews,
      { ...form, id: Date.now(), date: form.date || getCurrentDate() },
    ]);
    resetForm();
  }

  function handleUpdateReview(e) {
    e.preventDefault();
    setReviews(reviews.map((r) => (r.id === form.id ? form : r)));
    resetForm();
    setIsEdit(false);
  }

  function handleEdit(review) {
    setForm(review);
    setIsEdit(true);
  }

  function handleDelete(id) {
    setReviews(reviews.filter((r) => r.id !== id));
  }

  function handlePhotoRemove(idx) {
    setForm((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== idx),
    }));
  }

  function resetForm() {
    setForm({
      id: null,
      name: "",
      date: "",
      rating: 5,
      comment: "",
      photos: [],
    });
    setIsEdit(false);
  }

  return (
    <div className="cr-container">
      <h2 className="cr-title">
        고객후기 <span className="cr-count">{reviews.length}</span>
      </h2>

      <div className="cr-controls">
        <label className="cr-photo-filter">
          <input
            type="checkbox"
            checked={photoOnly}
            onChange={() => setPhotoOnly((v) => !v)}
          />{" "}
          포토리뷰만 보기
        </label>
      </div>

      <form
        className="cr-form"
        onSubmit={isEdit ? handleUpdateReview : handleAddReview}
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="cr-input name"
          placeholder="이름"
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          max={getCurrentDate()}
          className="cr-input date"
        />
        <StarRating rating={form.rating} setRating={handleRating} />
        <textarea
          name="comment"
          value={form.comment}
          onChange={handleChange}
          placeholder="후기"
          rows={2}
          className="cr-textarea"
        />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoChange}
          className="cr-file-input"
        />
        {form.photos.length > 0 && (
          <div className="cr-thumb-preview">
            {form.photos.map((src, i) => (
              <div key={i} className="cr-thumb-item">
                <img src={src} alt={`미리보기${i}`} />
                <button
                  type="button"
                  className="cr-thumb-remove"
                  onClick={() => handlePhotoRemove(i)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <button type="submit" className="cr-btn add">
          {isEdit ? "수정" : "추가"}
        </button>
        {isEdit && (
          <button type="button" className="cr-btn cancel" onClick={resetForm}>
            취소
          </button>
        )}
      </form>

      <div className="cr-list">
        {filteredReviews.map((review, idx) => (
          <div key={review.id} className="cr-item">
            <div className="cr-item-header">
              <StarRating rating={review.rating} />
              <div className="cr-meta">
                <span className="cr-name">{review.name}</span>
                <span className="cr-date">{review.date}</span>
              </div>
            </div>
            <p className="cr-comment">{review.comment}</p>

            {review.photos.length > 0 && (
              <div className="cr-photo-grid">
                {review.photos.slice(0, 5).map((src, i) => (
                  <div key={i} className="cr-photo-cell">
                    <img
                      src={src}
                      alt={`리뷰${i}`}
                      onClick={() => {
                        /* 모달 오픈 로직 */
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="cr-actions">
              <button
                onClick={() => handleEdit(review)}
                className="cr-btn edit"
              >
                수정
              </button>
              <button
                onClick={() => handleDelete(review.id)}
                className="cr-btn delete"
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerReview;
