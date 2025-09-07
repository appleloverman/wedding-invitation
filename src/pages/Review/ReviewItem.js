import React from "react";
import { StarRating } from "../../Util/ReviewStarRating";

function ReviewItem({ review, onEdit, onDelete }) {
  return (
    <div className="cr-item">
      {/* 리뷰 상단: 별점 + 이름 + 날짜 */}
      <div className="cr-item-header">
        <StarRating rating={review.rating} /> {/* 별점 표시 */}
        <div className="cr-meta">
          <span className="cr-name">{review.name}</span> {/* 작성자 이름 */}
          <span className="cr-date">{review.date}</span> {/* 작성일 */}
        </div>
      </div>

      {/* 리뷰 코멘트 */}
      <p className="cr-comment">{review.comment}</p>

      {/* 첨부된 사진이 있을 경우 사진 미리보기 (최대 5장) */}
      {review.photos.length > 0 && (
        <div className="cr-photo-grid">
          {review.photos.slice(0, 5).map((src, i) => (
            <div key={i} className="cr-photo-cell">
              <img src={src} alt={`리뷰${i}`} />
            </div>
          ))}
        </div>
      )}

      {/* 액션 버튼 (수정 / 삭제) */}
      <div className="cr-actions">
        <button onClick={onEdit} className="cr-btn edit">
          수정
        </button>
        <button onClick={onDelete} className="cr-btn delete">
          삭제
        </button>
      </div>
    </div>
  );
}

export default ReviewItem;
