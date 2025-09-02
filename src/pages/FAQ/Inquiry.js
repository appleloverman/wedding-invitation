// Inquiry.jsx
import React, { useState, useEffect } from "react";
import "../../Css/Inquiry.css";

// onMoveToList props 추가
const Inquiry = ({ onSubmit, editData, onMoveToList }) => {
  // Inquiry 라는 이름의 특별한 도화지(컴포넌트)를 만들어요.
  // 이 도화지에는 'onSubmit' 같은 여러 도구들을 사용할 수 있어요.

  const [userName, setUserName] = useState("");
  // === 종이에 글씨를 쓸 준비를 해요 ===
  // useState는 마법의 스케치북이라고 생각하면 돼요.
  // 이 스케치북에 이름을 쓸 준비를 해요. 처음에는 아무것도 없어요("").

  const [userTitle, setUserTitle] = useState("");
  // 제목을 쓸 준비도 하고요.

  const [userEmail, setUserEmail] = useState("");
  // 이메일을 쓸 준비도 해요.

  const [userComment, setUserComment] = useState("");
  // 가장 중요한, 내용을 쓸 준비도 해요.

  useEffect(() => {
    // === 마법의 붓(useEffect)이 하는 일 ===
    // 마법의 붓은 'editData'라는 특별한 재료를 늘 지켜봐요.
    // 이 재료가 바뀔 때마다 붓이 마법을 부린답니다!
    if (editData) {
      // 마법 붓의 첫 번째 마법: 'editData' 재료가 있다면?
      // 'editData'는 전에 썼던 문의 내용이 담긴 상자예요.
      // 붓이 이 상자를 열어서...
      setUserName(editData.name || ""); // 상자 속 이름 종이를 꺼내 'userName' 스케치북에 똑같이 그려줘요.
      setUserTitle(editData.title || ""); // 상자 속 제목 종이를 꺼내 'userTitle' 스케치북에 똑같이 그려줘요.
      setUserEmail(editData.email || ""); // 상자 속 이메일 종이도 똑같이.
      setUserComment(editData.comment || ""); // 상자 속 내용 종이도 똑같이 그려줘요.
      // 이렇게 하면 '수정하기'를 누를 때, 전에 썼던 내용이 양식에 자동으로 나타나는 거예요.
    } else {
      // 마법 붓의 두 번째 마법: 'editData' 재료가 없다면?
      // 즉, 처음부터 새롭게 글을 쓰는 경우예요.
      // 붓이 모든 스케치북을 깨끗하게 지워줘요.
      setUserName(""); // 이름을 쓴 스케치북을 지우고요
      setUserTitle(""); // 제목도 지우고.
      setUserEmail(""); // 이메일도 지우고.
      setUserComment(""); // 내용도 깨끗하게 지워요.
    }
  }, [editData]); // 마법 붓은 오직 'editData' 재료가 바뀔 때만 마법을 부려요.

  const handleSubmit = (e) => {
    e.preventDefault();
    // 1. 이벤트의 기본 동작을 막습니다.
    // 'e'는 '이벤트(event)'의 약자로, 여기서 'e.preventDefault()'는
    // '보내기' 버튼을 눌렀을 때 웹페이지가 자동으로 새로고침되는 것을 막아줍니다.
    // 이렇게 하면 우리가 만든 코드가 정상적으로 실행될 시간을 벌 수 있어요.

    const newInquiry = {
      // 2. 새로운 문의 정보를 담을 상자를 만듭니다.
      // 이 상자(객체)에 사용자가 입력한 모든 데이터를 담을 거예요.
      id: editData?.id ?? null,
      // 'id'는 문의글의 고유한 번호표입니다.
      // 'editData?.id'는 '만약 수정 중이라면(editData가 있다면) 그 번호표를 가져와줘'라는 뜻입니다.
      // '?? null'은 '만약 수정하는 게 아니라 새로 쓰는 거라면 번호표를 일단 비워둬(null)'라는 뜻입니다
      name: userName,
      // 'name'이라는 이름표를 붙여서 userName 상태에 있는 이름을 저장합니다.
      title: userTitle,
      // 'title'이라는 이름표를 붙여서 userTitle 상태에 있는 제목을 저장합니다.
      email: userEmail,
      // 'email'이라는 이름표를 붙여서 userEmail 상태에 있는 이메일을 저장합니다.
      comment: userComment,
      // 'comment'라는 이름표를 붙여서 userComment 상태에 있는 내용을 저장합니다.
    };
    onSubmit(newInquiry);
    // 3. 만든 상자를 부모 컴포넌트로 보냅니다.
    // 'onSubmit'은 부모 컴포넌트(InquiryPage.js)로부터 받은 특별한 함수입니다.
    // 이 함수에 'newInquiry' 상자를 전달하면, 부모 컴포넌트가 이 데이터를 받아서
    // 목록에 추가하거나 기존 데이터를 업데이트하는 작업을 처리합니
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
