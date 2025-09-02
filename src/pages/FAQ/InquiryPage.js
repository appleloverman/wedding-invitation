// InquiryPage.jsx
import React, { useState } from "react";
import Inquiry from "./Inquiry";
import "./Inquiry.css";

const InquiryPage = () => {
  const [dataList, setDataList] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(true); // 폼 보이기 여부

  // 문의 등록 or 수정 처리
  const handleSubmit = (newInquiry) => {
    if (newInquiry.id !== null) {
      // 수정
      setDataList((prevList) =>
        prevList.map((item) => (item.id === newInquiry.id ? newInquiry : item))
      );
    } else {
      // 새 문의 등록
      const newId =
        dataList.length > 0
          ? Math.max(...dataList.map((item) => item.id)) + 1
          : 1;
      setDataList((prevList) => [...prevList, { ...newInquiry, id: newId }]);
    }

    setEditData(null); // 수정 모드 종료
    setShowForm(false); // 목록으로 이동
  };

  const handleEdit = (inquiry) => {
    setEditData(inquiry);
    setShowForm(true); // 수정 시 폼 보여주기
  };

  return (
    <div>
      {/* 폼 보여주기/숨기기 토글 */}
      {showForm ? (
        <>
          <Inquiry onSubmit={handleSubmit} editData={editData} />
          {dataList.length > 0 && (
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{ margin: "20px", padding: "10px 16px" }}
            >
              문의 목록으로 이동하기
            </button>
          )}
        </>
      ) : (
        <>
          <div className="inquiry-list">
            <h3>문의 목록</h3>
            {dataList.length > 0 ? (
              dataList.map((list) => (
                <div key={list.id} className="inquiry-item">
                  <h4>{list.title}</h4>
                  <p>{list.comment}</p>
                  <p>작성자: {list.name}</p>
                  <p>이메일: {list.email}</p>
                  <button onClick={() => handleEdit(list)}>수정</button>
                </div>
              ))
            ) : (
              <p className="no-inquiries">현재 제출된 문의가 없습니다.</p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowForm(true)}
            style={{ margin: "20px", padding: "10px 16px" }}
          >
            새 문의 작성하기
          </button>
        </>
      )}
    </div>
  );
};

export default InquiryPage;
