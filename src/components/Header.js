import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        borderBottom: "1px solid #eee",
        zIndex: 9999,
        padding: "15px 0"
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px", // 메뉴 간격 넓게
          fontSize: "15px",
          fontWeight: "400"
        }}
      >
        {[
          { to: "/", label: "Home" },
          { to: "/InvitationDesign", label: "모바일 청첩장 디자인" },
          { to: "/InvitationList", label: "모바일 청첩장 List" },
          { to: "/ticket", label: "식권" },
          { to: "/letter", label: "편지봉투" },
          { to: "/frame", label: "액자" },
          { to: "/Review", label: "고객후기" },
          { to: "/FAQ", label: "자주 묻는 질문" },
          { to: "/login", label: "로그인" }
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="menu-link"
            style={{
              position: "relative",
              textDecoration: "none",
              color: "#000",
              paddingBottom: "5px"
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Hover 애니메이션 스타일 */}
      <style>
        {`
          .menu-link::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 0%;
            height: 2px;
            background-color: #ff7fa9;
            transition: width 0.3s ease;
          }

          .menu-link:hover::after {
            width: 100%;
          }

          .menu-link:hover {
            color: #ff7fa9;
          }
        `}
      </style>
    </header>
  );
}

export default Header;
