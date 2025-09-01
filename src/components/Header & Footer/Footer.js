import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { DiAndroid } from "react-icons/di";
import logo from "../../art/logo.png";

function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        backgroundColor: "#f8f8f8",
        borderTop: "1px solid #ddd",
        padding: "40px 20px",
        fontFamily: "'Noto Sans KR', sans-serif",
        fontSize: "13px",
        color: "#666",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        {/* 왼쪽: 로고 + 회사 정보 */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "16px",
            minWidth: "60%",
          }}
        >
          <img
            src={logo}
            alt="로고"
            style={{ width: "150px", height: "150px", objectFit: "contain" }}
          />
          <div>
            <strong
              style={{
                fontSize: "16px",
                color: "#333",
                display: "block",
                marginBottom: "8px",
              }}
            >
              신랑 & 신부의 청첩장
            </strong>
            <p>
              상호 : (주)세얼간이 | 대표 : 박종민 강민석 김찬우 | 사업자등록번호
              : 5959-9595-02659
            </p>
            <p>
              주소 : 서울특별시 강남구 테헤란로 505 | 고객센터 :
              Green505@helphelp.com
            </p>
            <p>운영시간 : 평일 09:30 - 18:10 (점심 13:10 - 14:20)</p>
            <p style={{ marginTop: "8px" }}>
              <a
                href="#"
                style={{
                  color: "#666",
                  textDecoration: "none",
                  marginRight: "15px",
                }}
              >
                개인정보처리방침
              </a>
              <a href="#" style={{ color: "#666", textDecoration: "none" }}>
                이용약관
              </a>
            </p>
            <p style={{ fontSize: "12px", color: "#999", marginTop: "6px" }}>
              COPYRIGHT © 2025 신랑 & 신부의 청첩장 ALL RIGHTS RESERVED
            </p>
          </div>
        </div>

        {/* 오른쪽: 패밀리 사이트 + SNS */}
        <div
          style={{ textAlign: "right", minWidth: "200px", marginTop: "80px" }}
        >
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <a
              href="http://localhost:3000/InvitationDesign"
              style={{ color: "#666" }}
            >
              <DiAndroid size={40} />
            </a>
            <a href="https://www.instagram.com/" style={{ color: "#666" }}>
              <FaInstagram size={40} />
            </a>
            <a
              href="https://www.facebook.com/?locale=ko_KR"
              style={{ color: "#666" }}
            >
              <FaFacebookF size={40} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
