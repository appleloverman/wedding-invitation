import React, { useState, useEffect } from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import "../../Css/CustomerReview.css";

// 초기 리뷰 데이터 (로컬스토리지 비어있을 때 기본값)
const initialReviews = [
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
    name: "김찬우",
    date: "2025-08-27",
    rating: 5,
    comment: "강추합니다!",
    photos: ["https://plus.unsplash.com/..."],
  },
];

function CustomerReview() {
  // 현재 날짜 반환 함수
  const getCurrentDate = () => new Date().toISOString().split("T")[0];


  // 수정 모드일 때 현재 수정할 리뷰
  const [editingReview, setEditingReview] = useState(null);

  // 리뷰 상태 관리 (localStorage에 저장된 값 불러오기, 없으면 기본 initialReviews 사용)
  const [reviews, setReviews] = useState(() => {
    const stored = localStorage.getItem("customerReviews");
    return stored ? JSON.parse(stored) : initialReviews;
  });

  // 포토 리뷰 필터 상태 (true이면 사진 첨부된 리뷰만 보여줌)
  const [photoOnly, setPhotoOnly] = useState(
    () => localStorage.getItem("photoOnlyFilter") === "true"
  );

  // reviews 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("customerReviews", JSON.stringify(reviews));
  }, [reviews]);

  // photoOnly 상태 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("photoOnlyFilter", photoOnly);
  }, [photoOnly]);

  // 새 리뷰 추가 함수
  const handleAdd = (newReview) => {
    setReviews([
      ...reviews,
      {
        ...newReview,
        id: Date.now(), // 고유 id 생성
        date: newReview.date || getCurrentDate(), // 날짜 없으면 현재 날짜
      },
    ]);
  };

  // 리뷰 수정 함수
  const handleUpdate = (updated) => {
    setReviews(reviews.map((r) => (r.id === updated.id ? updated : r)));
    setEditingReview(null); // 수정 완료 후 초기화
  };

  // 리뷰 삭제 함수
  const handleDelete = (id) => setReviews(reviews.filter((r) => r.id !== id));

  // 수정 모드 활성화 함수
  const handleEdit = (review) => setEditingReview(review);

  // 포토리뷰만 보기 여부에 따른 필터링
  const filtered = photoOnly
    ? reviews.filter((r) => r.photos.length > 0)
    : reviews;

  return (
    <div className="cr-container">
      {/* 제목과 총 리뷰 수 표시 */}
      <h2 className="cr-title">
        고객후기 <span className="cr-count">{reviews.length}</span>
      </h2>

      {/* 포토리뷰 필터 체크박스 */}
      <div className="cr-controls">
        <label className="cr-photo-filter">
          <input
            type="checkbox"
            checked={photoOnly}
            onChange={() => setPhotoOnly((v) => !v)} // 체크 상태 반전
          />
          포토리뷰만 보기
        </label>
      </div>

      {/* 리뷰 작성/수정 폼 */}
      <ReviewForm
        key={editingReview ? editingReview.id : "new"}
        initialData={editingReview} // 수정할 경우 기본값 전달
        onCancel={() => setEditingReview(null)} // 취소시 수정 상태 초기화
        onSubmit={editingReview ? handleUpdate : handleAdd} // 수정/추가 구분
      />

      {/* 리뷰 리스트 출력 */}
      <ReviewList
        reviews={filtered}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default CustomerReview;
