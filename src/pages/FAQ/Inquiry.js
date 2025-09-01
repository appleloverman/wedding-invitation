import React, { useState } from "react";

const Inquiry = () => {
  //1)
  const [inquiries, setInquiries] = useState([]); // 글 리스트 상태

  //2)
  const [userName, setUserName] = useState(""); //작성자
  const [userTitle, setUserTitle] = useState(""); //문의종류
  const [userEmail, setUserEmail] = useState(""); //이메일
  const [userComment, setUserComment] = useState(""); //내용

  //3)

  return (
    <div className="inquiry-container">
      <h2>1:1 문의하기</h2>
      <p>궁금한 점이나 요청 사항을 남겨주세요.</p>
      <form className="inquiry-form">
        <label>
          이름:
          <input
            type="text"
            name="name"
            value={userName}
            // onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          문의종류:
          <input
            type="text"
            name="title"
            value={userTitle}
            // onChange={(e) => setUserTitle(e.target.value)}
          />
        </label>
        <label>
          이메일:
          <input
            type="email"
            name="email"
            value={userEmail}
            // onChange={setUserEmail(e.target.value)}
          />
        </label>
        <label>
          문의 내용:
          <textarea name="text" rows="1" />
        </label>
        <button type="submit">문의 보내기</button>
      </form>
    </div>
  );
};

export default Inquiry;
