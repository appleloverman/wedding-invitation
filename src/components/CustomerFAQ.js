import React, { useState } from "react";
import "./CustomerFAQ.css";
import { Petals } from "./Petals";

export const askData = [
  {
    id: 1,
    title: "주문",
    comment: "구매는 어떻게하나요?",
    answer: "구매는 사이트에서 제품을 선택한 후 결제하시면 됩니다."
  },
  {
    id: 2,
    title: "주문",
    comment: "결제 방식은 어떻게되나요?",
    answer: "결제는 신용카드, 카카오페이, 계좌이체 등이 가능합니다."
  },
  {
    id: 4,
    title: "제품",
    comment: "제품 보증 기간은 어떻게 되나요?",
    answer: "모든 제품은 구매일로부터 1년간 무상 보증이 제공됩니다."
  },
  {
    id: 5,
    title: "주문",
    comment: "주문을 취소하고 싶은데 어떻게 하나요?",
    answer: "주문 내역 페이지에서 '주문 취소' 버튼을 클릭하시면 됩니다."
  },
  {
    id: 6,
    title: "배송",
    comment: "배송 조회는 어디서 하나요?",
    answer: "마이페이지 > 주문내역에서 송장번호로 조회 가능합니다."
  },
  {
    id: 7,
    title: "배송",
    comment: "해외 배송도 가능한가요?",
    answer: "현재는 국내 배송만 지원하고 있으며, 해외 배송은 준비 중입니다."
  },
  {
    id: 8,
    title: "제품",
    comment: "제품에 이상이 있을 경우 어떻게 처리되나요?",
    answer:
      "제품 수령 후 7일 이내에 고객센터로 문의주시면 교환 또는 환불이 가능합니다."
  },
  {
    id: 9,
    title: "기타",
    comment: "현금영수증 발급 가능한가요?",
    answer: "네, 결제 시 현금영수증 신청 옵션을 선택하시면 발급됩니다."
  },
  {
    id: 10,
    title: "주문",
    comment: "회원가입 없이도 주문할 수 있나요?",
    answer:
      "비회원 구매도 가능하지만, 회원가입 시 더 많은 혜택을 받으실 수 있습니다."
  },
  {
    id: 11,
    title: "제품",
    comment: "제품 색상은 실제와 차이가 있나요?",
    answer: "모니터 환경에 따라 약간의 색상 차이가 있을 수 있습니다."
  },
  {
    id: 12,
    title: "적립",
    comment: "포인트는 언제 적립되나요?",
    answer: "구매 확정 후 1~2일 내에 자동 적립됩니다."
  },
  {
    id: 13,
    title: "기타",
    comment: "전화 상담 가능한 시간은 어떻게 되나요?",
    answer: "평일 오전 9시부터 오후 6시까지 고객센터로 문의 가능합니다."
  },
  {
    id: 14,
    title: "주문",
    comment: "교환은 어떻게 신청하나요?",
    answer: "마이페이지 > 주문내역에서 교환 신청이 가능합니다."
  },
  {
    id: 15,
    title: "기타",
    comment: "세금계산서 발급 가능한가요?",
    answer: "사업자 등록번호 입력 시 세금계산서 발급이 가능합니다."
  },
  {
    id: 16,
    title: "배송",
    comment: "배송비는 얼마인가요?",
    answer:
      "3만원 이상 구매 시 무료배송이며, 그 이하는 3,000원의 배송비가 부과됩니다."
  },
  {
    id: 17,
    title: "배송",
    comment: "배송이 너무 늦어요. 어떻게 해야 하나요?",
    answer: "배송 지연 시 고객센터에 문의해주시면 빠르게 확인 도와드리겠습니다."
  },
  {
    id: 18,
    title: "제품",
    comment: "상품이 품절이면 다시 입고되나요?",
    answer:
      "인기 상품은 재입고 예정이 있으며, 상품 상세 페이지에서 알림 신청 가능합니다."
  },
  {
    id: 19,
    title: "회원",
    comment: "비밀번호를 잊어버렸어요.",
    answer: "로그인 페이지에서 '비밀번호 찾기'를 통해 재설정할 수 있습니다."
  },
  {
    id: 20,
    title: "제품",
    comment: "상품 리뷰는 어떻게 작성하나요?",
    answer: "상품 수령 후 마이페이지 > 리뷰 작성에서 작성 가능합니다."
  },
  {
    id: 21,
    title: "기타",
    comment: "할인 쿠폰은 어디서 받을 수 있나요?",
    answer: "이벤트 페이지 또는 회원가입 시 제공되는 쿠폰을 확인해주세요."
  },
  {
    id: 22,
    title: "배송",
    comment: "구매한 상품이 다른 상품과 바뀌었어요.",
    answer: "고객센터로 사진과 함께 문의 주시면 빠르게 처리해드리겠습니다."
  },
  {
    id: 23,
    title: "배송",
    comment: "주문 후 배송지 주소를 변경할 수 있나요?",
    answer: "상품 출고 전이라면 변경 가능합니다. 고객센터로 즉시 연락 주세요."
  },
  {
    id: 24,
    title: "회원",
    comment: "회원 탈퇴는 어떻게 하나요?",
    answer: "마이페이지 > 회원정보 수정에서 탈퇴 신청하실 수 있습니다."
  },
  {
    id: 25,
    title: "기타",
    comment: "다른 사람 명의로 결제해도 되나요?",
    answer: "가능하지만, 확인 절차가 있을 수 있으니 참고 부탁드립니다."
  },
  {
    id: 26,
    title: "적립",
    comment: "적립된 포인트 사용은 어떻게 하나요?",
    answer: "결제 페이지에서 포인트 사용 금액을 입력하시면 차감됩니다."
  },
  {
    id: 27,
    title: "기타",
    comment: "상품 포장이 너무 부실했어요.",
    answer: "포장 관련 불편은 고객센터에 알려주시면 개선에 반영하겠습니다."
  },
  {
    id: 28,
    title: "회원",
    comment: "회원 등급은 어떻게 올라가나요?",
    answer: "구매 금액과 횟수에 따라 매월 등급이 자동 조정됩니다."
  }
];

const CustomerFAQ = () => {
  const [search, setSearch] = useState(""); // 검색 키워드필터
  const [searchMenu, setSearchMenu] = useState(null); // 메뉴 버튼필터
  const [select, setSelect] = useState(null); // 질문 버튼 스테이트

  // 검색 키워드 & 메뉴 필터 통합필터링
  const filteredData = askData.filter(
    (i) => i.comment.includes(search) && (!searchMenu || i.title === searchMenu)
  );

  const handleClick = (i) => {
    setSelect(select === i.id ? null : i.id);
  };

  const handleClickMenu = (title) => {
    setSearchMenu(title);
  };

  return (
    <>
      <Petals />
      {/* 스크롤 시 고정 이미지 */}
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

      {/* FAQ 컨테이너 */}
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
    </>
  );
};

export default CustomerFAQ;
