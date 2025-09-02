// InquiryPage.jsx
import React, { useState } from "react";
import Inquiry from "./Inquiry";
import "./Inquiry.css";

const InquiryPage = () => {
  const [dataList, setDataList] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const handleSubmit = (newInquiry) => {
    if (newInquiry.id !== null) {
      setDataList((prevList) =>
        prevList.map((item) => (item.id === newInquiry.id ? newInquiry : item))
      );
    } else {
      const newId =
        dataList.length > 0
          ? Math.max(...dataList.map((item) => item.id)) + 1
          : 1;

      const createdAt = new Date().toLocaleDateString();
      setDataList((prevList) => [
        ...prevList,
        { ...newInquiry, id: newId, createdAt },
      ]);
    }

    setEditData(null);
    setShowForm(false);
  };

  const handleEdit = (inquiry) => {
    setEditData(inquiry);
    setShowForm(true);
  };

  // 삭제 기능 추가
  const handleDelete = (id) => {
    if (window.confirm("정말로 이 문의를 삭제하시겠습니까?")) {
      setDataList((prevList) => prevList.filter((item) => item.id !== id));
    }
  };

  return (
    <div>
      {showForm ? (
        <>
          <Inquiry
            onSubmit={handleSubmit}
            editData={editData}
            onMoveToList={() => setShowForm(false)}
          />
        </>
      ) : (
        <>
          <div className="inquiry-header">
            <h2>문의 목록</h2>
            <button
              type="button"
              onClick={() => {
                setShowForm(true);
                setSelectedInquiry(null);
              }}
              className="btn-primary"
            >
              새 문의 작성하기
            </button>
          </div>

          <div className="inquiry-list">
            <table className="inquiry-table">
              <thead>
                <tr>
                  <th>NO</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>이메일</th>
                  <th>등록일</th>
                  <th>수정/삭제</th>
                </tr>
              </thead>
              <tbody>
                {dataList.length > 0 ? (
                  dataList.map((list, index) => (
                    <tr key={list.id}>
                      <td>{index + 1}</td>
                      <td
                        className="title-click"
                        onClick={() => setSelectedInquiry(list)}
                      >
                        {list.title}
                      </td>
                      <td>{list.name}</td>
                      <td>{list.email}</td>
                      <td>{list.createdAt}</td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(list)}
                        >
                          수정
                        </button>
                        {/* 삭제 버튼 추가 */}
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(list.id)}
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-inquiries">
                      현재 제출된 문의가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {selectedInquiry && (
            <div className="inquiry-detail">
              <h3>문의 내용</h3>
              <p>{selectedInquiry.comment}</p>
              <button
                className="btn-secondary"
                onClick={() => setSelectedInquiry(null)}
              >
                닫기
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InquiryPage;
