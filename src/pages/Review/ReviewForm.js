import React, { useState, useEffect } from "react";
import { StarRating } from "../../Util/ReviewStarRating";

function ReviewForm({ initialData, onSubmit, onCancel }) {
  const isEdit = Boolean(initialData); // 수정 모드 여부 확인

  // 리뷰 입력 상태 관리
  const [review, setReview] = useState({
    id: null, 
    name: "", 
    date: "", 
    rating: 5, 
    comment: "", 
    photos: [], 
  });

  // initialData가 있으면 해당 데이터로 세팅 (수정 모드), 없으면 초기화 (추가 모드)
  useEffect(() => {
    if (initialData) {
      setReview(initialData);
    } else {
      setReview({
        id: null,
        name: "",
        date: "",
        rating: 5,
        comment: "",
        photos: [],
      });
    }
  }, [initialData]);

  // 오늘 날짜 (date input 제한용)
  const getCurrentDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  // 입력 필드 값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({
      ...prev,
      [name]: value, // 각 필드 업데이트
    }));
  };

  // 별점 변경 처리
  const handleRating = (rating) => {
    setReview((prev) => ({
      ...prev,
      rating,
    }));
  };

  // 사진 업로드 처리 (FileReader 사용해 base64로 변환)
  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);

    const readPromises = files.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result); // base64 URL
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readPromises).then((urls) => {
      setReview((prev) => ({
        ...prev,
        photos: [...prev.photos, ...urls].slice(0, 5), // 최대 5장
      }));
    });
  };

  // 특정 사진 삭제
  const handlePhotoRemove = (idx) => {
    setReview((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== idx),
    }));
  };

  // 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!review.name.trim() || !review.comment.trim()) {
      return; // 이름/코멘트 없으면 제출 불가
    }
    onSubmit(review); // 부모 컴포넌트에 전달
    if (!isEdit) {
      // 추가 모드일 때만 초기화
      setReview({
        id: null,
        name: "",
        date: "",
        rating: 5,
        comment: "",
        photos: [],
      });
    }
  };

  return (
    <form className="cr-form" onSubmit={handleSubmit}>
      {/* 이름 입력 */}
      <input
        name="name"
        value={review.name}
        onChange={handleChange}
        className="cr-input name"
        placeholder="이름"
      />
      {/* 날짜 입력 (오늘 이전까지만 가능) */}
      <input
        name="date"
        type="date"
        value={review.date}
        onChange={handleChange}
        max={getCurrentDate()}
        className="cr-input date"
      />
      {/* 별점 선택 */}
      <StarRating rating={review.rating} setRating={handleRating} />
      {/* 후기 입력 */}
      <textarea
        name="comment"
        value={review.comment}
        onChange={handleChange}
        rows={2}
        className="cr-textarea"
        placeholder="후기 작성"
      />
      {/* 이미지 업로드 */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handlePhotoChange}
        className="cr-file-input"
      />
      {/* 업로드한 이미지 미리보기 */}
      {review.photos.length > 0 && (
        <div className="cr-thumb-preview">
          {review.photos.map((src, i) => (
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
      {/* 제출 버튼 (수정 모드냐 추가 모드냐에 따라 텍스트 변경) */}
      <button type="submit" className="cr-btn add">
        {isEdit ? "수정" : "추가"}
      </button>
      {/* 수정 모드일 경우 '취소' 버튼 표시 */}
      {isEdit && (
        <button type="button" className="cr-btn cancel" onClick={onCancel}>
          취소
        </button>
      )}
    </form>
  );
}

export default ReviewForm;
