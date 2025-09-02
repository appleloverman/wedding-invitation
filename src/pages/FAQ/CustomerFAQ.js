import React, { useState } from "react";
import "../../Css/CustomerFAQ.css";
import { Petals } from "../../Util/Petals";
import { useNavigate } from "react-router-dom";
import { askData } from "../../data/FaqData";

const CustomerFAQ = () => {
  const [search, setSearch] = useState(""); // 검색 키워드 필터
  const [searchMenu, setSearchMenu] = useState(null); // 메뉴 필터
  const [select, setSelect] = useState(null); // 질문 토글 상태

  const navigate = useNavigate(); // ✅ React Router navigate 이동 기능

  // 필터된 데이터
  const filteredData = askData.filter(
    (i) => i.comment.includes(search) && (!searchMenu || i.title === searchMenu)
  );
  // .filter() 메서드를 사용하여 askData 배열의 각 항목(i)을 하나씩 접근
  // 조건 1) i.comment.includes(search)
  // askData 배열의 각 항목(i)에서 'comment'(내용) 필드에 접근하고
  // .includes(search) 메서드를 사용하여 'comment'에 search(검색창에 입력된 값)이 포함되어 있는지 확인
  // 그리고, 이 조건이 '참(true)'일 때만 다음 조건으로 넘어감
  // (includes()는 특정 문자열에 특정 문자열이 포함되어 있는지 확인하는 기능)

  // 조건 2) !searchMenu || i.title === searchMenu
  // 이 조건은 '논리 OR(||)' 연산자로 연결되어 있음
  // 첫 번째 부분(!searchMenu)은 'searchMenu' 상태가 비어있거나 'null', 'undefined'일 때 '참(true)'가 된다
  // '참'인 경우, 두 번째 부분(i.title === searchMenu)은 무시하고 전체 조건이 '참'이 된다.
  // (즉, 카테고리를 선택하지 않았을 때는 검색어만으로 필터링된다)
  // 두 번째 부분은 'searchMenu' 상태에 값이 있을 때 동작
  // 이 경우, 'i.title'(데이터의 제목)이 'searchMenu'와 정확히 일치하는지 확인.
  // 최종적으로 두 조건(condition 1 && condition 2)을 모두 만족하는 데이터만
  // filteredData 변수에 askData 배열을 필터링한 결과가 담음

  // 질문 클릭
  const handleClick = (i) => {
    setSelect(select === i.id ? null : i.id);
  };
  // `setSelect` State함수를 사용하여 `select` 상태를 업데이트한다
  // 이 업데이트는 클릭한 항목의 ID를 기준으로 토글(켜고 끄기)하는 역할을 한다.
  // 삼항 연산자(ternary operator)를 사용한 조건부 업데이트 :
  // ■ 전체코드 => (select === i.id ? null : i.id);
  // select === i.id
  // `select` 현재 상태와 클릭된 항목(i)의 ID가 같은지 확인합니다.
  // 조건이 'true'일 때:
  // 현재 선택된 항목을 다시 클릭한 경우입니다.
  // 'null' 값을 할당하여 선택을 해제합니다.
  // ? null
  // 조건이 'false'일 때:
  // 현재 선택된 항목이 없거나, 다른 항목을 클릭한 경우입니다.
  // 클릭된 항목(i)의 ID를 새로운 'select' 값으로 할당하여 해당 항목을 선택합니다.

  // 메뉴 클릭
  const handleClickMenu = (title) => {
    setSearchMenu(title);
  };

  // 문의하기 버튼 클릭
  const handleInquiryClick = () => {
    navigate("/FAQquery");
  };

  const handleButtonTel = () => {
    alert("현재 구현중 입니다");
  };

  return (
    <>
      <Petals />
      {/* 좌우 고정 이미지 */}
      <img
        src="https://moiitee.com/Resource/mainasset/templates/DesignArch.png"
        alt="왼쪽 이미지"
        className="floating-image-left"
        draggable={false}
      />
      <img
        src="https://moiitee.com/Resource/mainasset/templates/DesignSimple_line_01.png"
        alt="오른쪽 이미지"
        className="floating-image-right"
        draggable={false}
      />

      {/* FAQ 영역 */}
      <div className="faq-container">
        <h2 className="faq-title">Q. 자주 묻는 질문</h2>
        <p className="faq-subtitle">궁금하신 내용을 찾을 수 있습니다.</p>

        {/* 메뉴 버튼 */}
        <div className="faq-menu-buttons">
          {["전체보기", "주문", "제품", "배송", "적립", "회원", "기타"].map(
            (menu) => (
              <button
                key={menu}
                className={`faq-menu-button ${
                  searchMenu === menu ||
                  (menu === "전체보기" && searchMenu === null)
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleClickMenu(menu === "전체보기" ? null : menu)
                }
              >
                {menu}
              </button>
            )
          )}

          {/* ✅ 문의하기 버튼만 navigate로 처리 */}
          <button
            className="faq-menu-button inquiry-button"
            onClick={handleInquiryClick}
          >
            문의하기
          </button>
        </div>

        {/* 검색창 */}
        <div className="faq-search">
          <input
            type="text"
            placeholder="궁금한 키워드를 입력해주세요"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* 질문 리스트 */}
        <div className="faq-list">
          {filteredData.length === 0 ? (
            <div className="faq-empty">검색 결과가 없습니다.</div>
          ) : (
            filteredData.map((i) => (
              <div key={i.id} className="faq-item">
                <div className="faq-question" onClick={() => handleClick(i)}>
                  <span className="faq-q-icon">Q</span> {i.comment}
                  <span className="faq-toggle-icon">
                    {select === i.id ? "▲" : "▼"}
                  </span>
                </div>
                {select === i.id && (
                  <div className="faq-answer">{i.answer}</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* 문의 카드 영역 */}
      <div className="contact-cards">
        <div className="contact-card">
          <img
            src="https://img.hankyung.com/photo/202004/d744af8c6b5cbe6d52746566f5ccb4ed.jpg"
            alt="카카오톡 문의"
          />
          <h3>
            <strong>카카오톡 문의</strong>
          </h3>
          <p>
            담당자와 1:1 채팅으로 <br />
            친절하게 상담 해드립니다
          </p>
          <a href="https://www.kakao.com/notices?lang=ko">
            <span> 클릭 </span>
          </a>
        </div>

        <div className="contact-card">
          <img
            src="https://diverse-webstatic-files.s3.ap-northeast-2.amazonaws.com/cdn/itscard_upgrade/asset/image/main_notice_04_1.svg"
            alt="전화 문의"
          />
          <h3>
            <strong>전화 문의</strong>
          </h3>
          <p>
            1544-2637 <br />
            정확! 신속! 친절하게
          </p>
          <p>상담해드립니다.</p>
          <span onClick={handleButtonTel}> 클릭 </span>
        </div>

        <div className="contact-card">
          <img
            src="https://diverse-webstatic-files.s3.ap-northeast-2.amazonaws.com/cdn/itscard_upgrade/asset/image/main_notice_03_1.svg"
            alt="제휴 문의"
          />
          <h3>
            <strong>제휴 문의</strong>
          </h3>
          <p>새롭고 다양한 제휴 기회들을 기다리고 있습니다.</p>
          <span onClick={handleButtonTel}> 클릭 </span>
        </div>
      </div>
    </>
  );
};

export default CustomerFAQ;
