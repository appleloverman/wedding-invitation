// Inquiry.jsx
import React, { useState, useEffect } from "react";
import "./Inquiry.css";

const Inquiry = ({ onSubmit, editData }) => {
  const [userName, setUserName] = useState("");
  const [userTitle, setUserTitle] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userComment, setUserComment] = useState("");

  // 수정 모드일 때 editData로부터 값을 세팅
  useEffect(() => {
    if (editData) {
      setUserName(editData.name || "");
      setUserTitle(editData.title || "");
      setUserEmail(editData.email || "");
      setUserComment(editData.comment || "");
    } else {
      // editData가 없을 경우 초기화 (새 글 작성)
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
      comment: userComment
    };

    onSubmit(newInquiry); // 부모 컴포넌트로 전달

    // 입력 필드 초기화 (부모에서도 상태 초기화 처리해줄 것)
    setUserName("");
    setUserTitle("");
    setUserEmail("");
    setUserComment("");
  };

  return (
    <div className="inquiry-container">
      <h2>1:1 문의하기</h2>
      <p>궁금한 점이나 요청 사항을 남겨주세요.</p>
      <form className="inquiry-form" onSubmit={handleSubmit}>
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
              resize: "vertical"
            }}
          />
        </label>
        <button type="submit">
          {editData ? "문의 수정하기" : "문의 보내기"}
        </button>
      </form>
    </div>
  );
};

export default Inquiry;
