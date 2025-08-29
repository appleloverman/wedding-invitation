import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header
      style={{
        padding: "10px",
        textAlign: "center",
        backgroundColor: "#fff",
        borderBottom: "1px solid #eee",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          fontSize: "14px",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/InvitationDesign">모바일 청첩장 디자인</Link>
        <Link to="/Review">고객후기</Link>
        <Link to="/FAQ">자주 묻는 질문</Link>
        <Link to="/login">로그인</Link>
        <Link to="/contact">현재미정</Link>
      </nav>
    </header>
  );
}

export default Header;
