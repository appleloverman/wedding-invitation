import React, { useState } from "react";
import Inquiry from "./Inquiry";
import "../../Css/Inquiry.css";

// 이 코드가 바로 '문의하기 페이지' 전체를 만드는 부분이에요.
const InquiryPage = () => {
  // 이 코드는 '문의하기' 페이지를 만드는 역할을 해요.
  // 사용자가 문의를 작성하고, 보고, 수정하고, 삭제할 수 있게 도와주죠.
  // === 우리 페이지가 기억할 4가지 중요한 정보 상자들 ===
  // React에서는 useState라는 마법의 상자를 써서 이 정보를 기억하고 필요할 때 바꿔줘요.

  const [dataList, setDataList] = useState([]);
  // 1. dataList: 제출된 모든 문의를 넣어두는 큰 목록 상자예요.

  const [editData, setEditData] = useState(null);
  // 2. editData: '수정하기' 버튼을 누르면, 수정할 내용을 잠시 담아두는 상자예요.
  //   처음에는 비어있어요 (null).

  const [showForm, setShowForm] = useState(true);
  // 3. showForm: '새 문의 작성하기' 화면을 보여줄지, 아니면 '문의 목록'을 보여줄지 결정하는 스위치예요.
  //   처음에는 true라서 작성 화면을 보여줘요.

  const [selectedInquiry, setSelectedInquiry] = useState(null);
  // 4. selectedInquiry: 문의 목록에서 제목을 누르면, 그 문의의 상세 내용을 담아두는 상자예요.

  const handleSubmit = (newInquiry) => {
    // 1. handleSubmit: '작성 완료' 버튼을 누르면 실행되는 규칙이에요.
    // === 사용자가 버튼을 눌렀을 때 실행되는 3가지 규칙(함수) ===
    // 이 규칙들은 사용자의 행동에 따라 위의 상자들(state)을 바꿔주는 역할을 해요.
    if (newInquiry.id !== null) {
      // 만약 문의에 이미 번호(id)가 있다면? (이건 수정할 때만 해당돼요)
      setDataList((prevList) =>
        // dataList 목록에서 같은 번호(id)를 가진 문의를 찾아, 새로운 내용으로 바꿔줘요.
        prevList.map((item) => (item.id === newInquiry.id ? newInquiry : item))
      );
    } else {
      // 문의에 번호가 없다면? (새로운 문의일 때)

      const newId =
        dataList.length > 0
          ? Math.max(...dataList.map((item) => item.id)) + 1
          : 1;
      // 목록에서 가장 큰 번호를 찾아서 +1을 더해주고, 없다면 1부터 시작하게 만들어요.
      const createdAt = new Date().toLocaleDateString(); // 오늘 날짜를 '작성일'로 만들어줘요.
      setDataList((prevList) => [
        // 기존 문의 목록에 새로운 문의를 추가해요.
        ...prevList,
        { ...newInquiry, id: newId, createdAt },
      ]);
    }
    setEditData(null);
    // 작업이 끝났으니, 수정 상자를 비워줘요.
    setShowForm(false);
    // 그리고 스위치(showForm)를 false로 바꿔서 '문의 목록' 화면을 보여줘요
  };

  const handleEdit = (inquiry) => {
    // 2. handleEdit: '수정' 버튼을 누르면 실행되는 규칙이에요.
    setEditData(inquiry);
    // 선택된 문의 내용을 수정 상자(editData)에 담아줘요.
    setShowForm(true);
    // 스위치(showForm)를 true로 바꿔서 '문의 작성' 화면으로 돌아가게 해요.
  };

  const handleDelete = (id) => {
    // 3. handleDelete: '삭제' 버튼을 누르면 실행되는 규칙이에요.
    if (window.confirm("정말로 이 문의를 삭제하시겠습니까?")) {
      // "정말 삭제할 건가요?" 하고 물어보고 '확인'을 누르면 다음 코드를 실행해요.
      setDataList((prevList) => prevList.filter((item) => item.id !== id));
      // dataList 목록에서 해당 번호(id)를 가진 문의만 빼고 나머지를 다시 목록으로 만들어요.
    }
  };

  // === 이 부분이 화면에 실제로 보여줄 내용을 만드는 부분이에요. ===
  return (
    <>
      {/* showForm 스위치가 true라면, Inquiry (문의 작성) 화면을 보여줘요. */}
      {showForm ? (
        <Inquiry
          onSubmit={handleSubmit} // 작성 완료 버튼을 누르면 handleSubmit 규칙을 실행하라고 연결해 줘요.
          editData={editData} // 수정할 내용이 있으면 Inquiry 화면에 보내줘요.
          onMoveToList={() => setShowForm(false)} // 목록으로 돌아가기 버튼을 누르면 스위치를 false로 바꿔줘요.
        />
      ) : (
        // showForm 스위치가 false라면, 문의 목록을 보여줘요.
        <div className="inquiry-page-container">
          <div className="inquiry-list-wrapper">
            <div className="inquiry-list">
              <div className="inquiry-header">
                <div className="inquiry-title-container">
                  {/* ... 이곳에 문의 목록 테이블과 상세 내용 코드가 들어갑니다 ... */}
                  <h2>문의 목록</h2>
                </div>
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
          </div>
        </div>
      )}
    </>
  );
};

export default InquiryPage;
