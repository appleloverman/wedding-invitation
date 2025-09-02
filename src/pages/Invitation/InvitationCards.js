import React from "react";
import { Link } from "react-router-dom";
import { cards } from "../../data/InvitationCardsData";
import "./InvitationCards.css";

// theirmood 감성: 뉴트럴 팔레트 + 얇은 라인 + 미세한 그림자

function InviteCard({ card }) {
  const themeClass = `theme-${card.theme || "classic"}`;

  const handleCopy = () => {
    // 브라우저에서 허용되면 클립보드 복사
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(card.url).then(
        () => alert(`${card.title} 카드 링크가 복사되었습니다.`),
        () => alert(`${card.title} 카드 링크 복사에 실패했습니다.`)
      );
    } else {
      // 폴백
      prompt("아래 링크를 복사하세요:", card.url);
    }
  };

  return (
    <div className={`invite-card ${themeClass}`}>
      {/* 카드 외곽 – 얇은 헤어라인 + 아주 부드러운 그림자 */}
      <div className="invite-card__frame">
        {/* 상단: 풀블리드 이미지 (자르지 않고 contain) */}
        <a
          href={card.url}
          target="_blank"
          rel="noopener noreferrer"
          className="invite-card__anchor"
        >
          <div className="invite-card__image-wrap">
            <div className="invite-card__image-aspect">
              <img
                src={card.img}
                alt={card.title}
                className="invite-card__image"
                loading="lazy"
              />
            </div>

            {/* 좌상단 얇은 칩 (theirMood 느낌의 라벨) */}
            <div className="invite-card__chip-wrap">
              <span className="invite-card__chip">INVITATION</span>
            </div>
          </div>
        </a>

        {/* 컨텐츠 – 넓은 여백, 세리프 타이틀, 가는 보조텍스트 */}
        <div className="invite-card__body">
          <h3 className="invite-card__title">{card.title}</h3>
          <p className="invite-card__subtitle">{card.subtitle}</p>

          {/* 아주 미세한 디바이더 */}
          <div className="invite-card__divider" />

          {/* CTA – 라인 버튼(채우기 X), theirmood의 미니멀 무드 */}
          <div className="invite-card__cta">
            <a
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--line"
            >
              초대장 보기
            </a>

            {/* 보조 액션(예: 공유) – 선택사항 */}
            <button
              onClick={handleCopy}
              className="btn btn--icon"
              aria-label="링크 복사"
              type="button"
            >
              <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                <path
                  d="M3 8a5 5 0 0 1 5-5h3v2H8a3 3 0 0 0 0 6h3v2H8a5 5 0 0 1-5-5Zm8-3h5a5 5 0 0 1 0 10h-5v-2h5a3 3 0 0 0 0-6h-5V5Zm-3 6h8v2H8v-2Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 하단 미세한 그림자 퍼짐(카드가 떠 보이는 느낌) */}
      <div className="invite-card__shadow-bleed" />
    </div>
  );
}

export default function InvitationCards() {
  return (
    <div className="cards-page">
      {/* 가운데 정렬된 카드 그리드 */}
      <div className="cards-grid">
        {cards.map((card) => (
          <div key={card.id} className="cards-grid__item">
            <InviteCard card={card} />
          </div>
        ))}
      </div>

      {/* 하단 CTA 버튼 (Link 자체에 스타일 부여) */}
      <div className="cards-page__footer">
        <Link to="/InvitationEdit" className="cta-btn">
          {/* 은은한 유광 하이라이트 */}
          <span className="cta-btn__gloss" aria-hidden="true" />
          {/* 아이콘 */}
          <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
            <path
              d="M12 3a1 1 0 0 1 1 1v7h7a1 1 0 1 1 0 2h-7v7a1 1 0 1 1-2 0v-7H4a1 1 0 1 1 0-2h7V4a1 1 0 0 1 1-1Z"
              fill="currentColor"
            />
          </svg>
          청첩장 제작하기
        </Link>
      </div>
    </div>
  );
}
