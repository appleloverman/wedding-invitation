import React, { useState } from "react";


function StarRating({ rating, setRating }) {
  return (
    <div style={{ color: "#f5a623", cursor: setRating ? "pointer" : "default" }}>
      {[1,2,3,4,5].map(num => (
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
    },
    {
      id: 2,
      name: "강민석",
      date: "2025-08-15",
      rating: 4,
      comment: "강민석님 이해가 상당히 빠르십니다",
    },
    {
      id: 3,
      name: "김찬우",
      date: "2025-08-20",
      rating: 5,
      comment: "맞춤형 디자인 덕분에 특별한 초대장을 만들 수 있었어요.",
    }
  ]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    date: "",
    rating: 5,
    comment: "",
  
  });
  const [isEdit, setIsEdit] = useState(false);

  // 폼 입력값 변경 핸들러
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  // 별점 변경 핸들러
  const handleRating = (rating) => {
    setForm({...form, rating });
  };
  
  // 후기 추가
  const handleAddReview = (e) => {
    e.preventDefault();
    if (!form.name || !form.comment) return;
    setReviews([...reviews, { ...form, id: Date.now() }]);
    setForm({ id: null, name: "", date: "", rating: 5, comment: "", photo: "" });
    setIsEdit(false);
  };

  // 후기 수정 진입
  const handleEdit = (review) => {
    setForm(review);
    setIsEdit(true);
  };

  // 후기 수정 완료
  const handleUpdateReview = (e) => {
    e.preventDefault();
    setReviews(
      reviews.map(r => r.id === form.id ? form : r)
    );
    setForm({ id: null, name: "", date: "", rating: 5, comment: "", photo: "" });
    setIsEdit(false);
  };

  // 후기 삭제
  const handleDelete = (id) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "10px" }}>
      <h2 style={{ textAlign: "left" }}>고객 후기</h2>
      {/* 후기 입력/수정 폼 */}
      <form onSubmit={isEdit ? handleUpdateReview : handleAddReview} style={{ marginBottom: "24px", background: "#f9f9f9", padding: "16px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
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
          style={{ width: "800px", resize: "none" }}
        />
        
      
        <button type="submit">{isEdit ? "수정" : "추가"}</button>
        {isEdit && <button type="button" onClick={() => {setForm({ id: null, name: "", date: "", rating: 5, comment: "", photo: "" }); setIsEdit(false);}}>취소</button>}
      </form>
      {/* 후기 목록 */}
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
            boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
            background: "#fff",
          }}
        >
          
          <div style={{ flex: "1" }}>
            <h3 style={{ margin: "0 0 5px 0" }}>{review.name}</h3>
            <small style={{ color: "#777" }}>{review.date}</small>
            <StarRating rating={review.rating} />
            <p style={{ marginTop: "10px" }}>{review.comment}</p>
          </div>
          <button onClick={() => handleEdit(review)} style={{ marginRight: "6px" }}>수정</button>
          <button onClick={() => handleDelete(review.id)}>삭제</button>
        </div>
      ))}
    </div>
  );
}

export default CustomerReview;
