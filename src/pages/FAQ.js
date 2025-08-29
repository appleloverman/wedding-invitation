import React, { useState } from "react";

// 예시 데이터
const askedQuestions = [
  {
    id: 1,
    name: "고객",
    date: "2025-08-29",
    comment: "구매는 어떻게하나요?",
    answer: "구매는 사이트에서 제품을 선택한 후 결제하시면 됩니다.",
  },
  {
    id: 2,
    name: "담당자",
    date: "2025-08-29",
    comment: "결제 방식은 어떻게되나요?",
    answer: "결제는 신용카드, 카카오페이, 계좌이체 등이 가능합니다.",
  },
  {
    id: 3,
    name: "고객",
    date: "2025-08-30",
    comment: "배송 기간은 얼마나 걸리나요?",
    answer: "일반적으로 3-5일 소요됩니다.",
  },
];

const CustomerFAQ = () => {
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [selectedQuestion, setSelectedQuestion] = useState(null); // 선택된 질문

  // 질문 필터링
  const filteredQuestions = askedQuestions.filter((question) =>
    question.comment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 질문 클릭 시 답변 보여주기
  const handleQuestionClick = (question) => {
    setSelectedQuestion(selectedQuestion === question.id ? null : question.id); // 클릭 시 열고 닫기
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      {/* 검색창 */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="궁금한 점을 검색해보세요..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "10px",
            width: "80%",
            borderRadius: "20px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* 질문 리스트 */}
      <div>
        {filteredQuestions.map((question) => (
          <div
            key={question.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              onClick={() => handleQuestionClick(question)}
              style={{
                margin: "0 0 5px 0",
                cursor: "pointer",
                color: "#007BFF",
                fontSize: "18px",
              }}
            >
              {question.comment}
            </h3>
            {selectedQuestion === question.id && (
              <div style={{ marginTop: "10px", color: "#555" }}>
                <strong>답변: </strong>
                {question.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerFAQ;
