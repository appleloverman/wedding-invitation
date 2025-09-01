import React, { useState } from "react";
import "./Inquiry.css"; // CSS 파일 임포트

const Inquiry = () => {
  // 1) 글 리스트
  const [dataList, setDataList] = useState([]);

  // 2) 상태 관리
  const [userName, setUserName] = useState(""); // 작성자
  const [userTitle, setUserTitle] = useState(""); // 문의종류
  const [userEmail, setUserEmail] = useState(""); // 이메일
  const [userComment, setUserComment] = useState(""); // 내용
  const [editId, setEditId] = useState(null); // 수정 모드일 때의 id

  // 3) id 관리 자동 증가
  const newId =
    dataList.length > 0 ? Math.max(...dataList.map((list) => list.id)) + 1 : 1;

  // 4) 폼 제출 핸들
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    const newInquiry = {
      id: editId || newId, // 수정 모드일 경우 editId 사용, 아니면 새 Id
      name: userName,
      title: userTitle,
      email: userEmail,
      comment: userComment,
    };
    if (editId) {
      setDataList((dataList) =>
        dataList.map((list) => (list.id === editId ? newInquiry : list))
      );
    } else {
      setDataList((dataList) => [...dataList, newInquiry]);
    }
    setUserName("");
    setUserTitle("");
    setUserEmail("");
    setUserComment("");
    setEditId(null); // 수정 모드 종료
  };

  // 수정 버튼을 눌렀을 때 해당 항목을 수정하도록 처리
  const handleEdit = (list) => {
    //수정 버튼을 누르면 그 사람의 수정하려는 id가 타고 들어온다
    console.log("수정버튼이 눌렸다 ", list);
    setUserName(list.name);
    setUserTitle(list.title);
    setUserEmail(list.email);
    setUserComment(list.comment);
    setEditId(list.id); // 수정 모드로 설정 =>
  };

  // const handleDelete = (e) => {};

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
            rows="5" // 텍스트 박스의 높이를 설정 (5줄 높이)
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "16px",
              resize: "vertical",
            }} // 스타일 추가
          />
        </label>
        <button type="submit">문의 보내기</button>
      </form>

      {/* 문의 목록 출력 */}
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
              {/* <button onClick={() => handleDelete(data.id)}>삭제</button> */}
            </div>
          ))
        ) : (
          <p className="no-inquiries">현재 제출된 문의가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Inquiry;
