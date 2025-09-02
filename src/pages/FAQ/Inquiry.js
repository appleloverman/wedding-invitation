// Inquiry.jsx
import React, { useState, useEffect } from "react";
import "./Inquiry.css";

// onMoveToList props 추가
const Inquiry = ({ onSubmit, editData, onMoveToList }) => {
  const [userName, setUserName] = useState("");
  const [userTitle, setUserTitle] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userComment, setUserComment] = useState("");

  useEffect(() => {
    if (editData) {
      setUserName(editData.name || "");
      setUserTitle(editData.title || "");
      setUserEmail(editData.email || "");
      setUserComment(editData.comment || "");
    } else {
      setUserName("");
      setUserTitle("");
      setUserEmail("");
      setUserComment("");
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newInquiry = {
      id: editData?.id ?? null,
      name: userName,
      title: userTitle,
      email: userEmail,
      comment: userComment,
    };

    onSubmit(newInquiry);
  };

  return (
    <div className="inquiry-container">
      <h2>1:1 문의하기</h2>
      <p>궁금한 점이나 요청 사항을 남겨주세요.</p>
      {/* 폼과 버튼 그룹을 하나로 묶기 위해 form 태그 제거 */}
      <div className="inquiry-form" onSubmit={handleSubmit}>
        <label>
          이름:
          <input
            type="text"
            name="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="이름을 입력하세요"
          />
        </label>
        <label>
          문의종류:
          <input
            type="text"
            name="title"
            value={userTitle}
            onChange={(e) => setUserTitle(e.target.value)}
            placeholder="문의 종류를 입력하세요"
          />
        </label>
        <label>
          이메일:
          <input
            type="email"
            name="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
          />
        </label>
        <label>
          문의 내용:
          <textarea
            name="comment"
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            placeholder="문의 내용을 입력하세요"
            rows="5"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "16px",
              resize: "vertical",
            }}
          />
        </label>
        <div className="button-group">
          {/* button type을 submit으로 유지하여 form 제출 기능 활용 */}
          <button type="submit" onClick={handleSubmit}>
            {editData ? "문의 수정하기" : "문의 보내기"}
          </button>
          {/* a 태그 대신 button 태그를 사용하고 props로 받은 onMoveToList 함수 호출 */}
          <button
            type="button"
            className="btn-secondary"
            onClick={onMoveToList}
          >
            문의목록으로 이동하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
