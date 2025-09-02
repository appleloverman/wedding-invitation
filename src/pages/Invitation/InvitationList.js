// src/components/InvitationList.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FormatAll } from "./FormatAll";
import "../../Css/InvitationList.css";

const InvitationList = ({ invitationList, setInvitationList }) => {
  const onDelete = (ino) => {
    setInvitationList((list) => list.filter((i) => i.ino !== ino));
  };

  if (!Array.isArray(invitationList) || invitationList.length === 0) {
    return (
      <div className="wl-page">
        <div className="wl-empty">
          <h2>아직 청첩장이 없어요</h2>
          <p>
            첫 카드를 만들어보세요. 예식 정보와 커버 이미지를 넣으면 자동으로
            예쁘게 구성돼요.
          </p>
          <Link to="/InvitationEdit" className="wl-btn wl-btn--primary">
            새 카드 만들기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wl-page">
      <div className="wl-grid">
        {invitationList.map((i) => {
          const f = FormatAll(i.date, i.time);
          const bg = i.bg || "#fff8f7";
          return (
            <article
              key={i.ino}
              className="wl-card"
              style={{ backgroundColor: bg }}
            >
              <div className="wl-ribbon">
                <span>{f.dateSlash}</span>
              </div>
              {i.cover ? (
                <div className="wl-cover">
                  <img src={i.cover} alt="" loading="lazy" />
                </div>
              ) : (
                <div
                  className="wl-cover wl-cover--pattern"
                  aria-hidden="true"
                />
              )}
              <h1 className="wl-names">
                <span className="wl-name">{i.groomName}</span>
                <span className="wl-amp">&</span>
                <span className="wl-name">{i.brideName}</span>
              </h1>
              <div className="wl-meta">
                <div className="wl-dot" />
                <span className="wl-datetime">{f.koDateTimeFull}</span>
                <div className="wl-dot" />
              </div>
              <section className="wl-intro">
                <p className="wl-tag">INVITATION</p>
                {i.title1 && <h2 className="wl-title">{i.title1}</h2>}
                {i.content && <p className="wl-body">{i.content}</p>}
              </section>
              <footer className="wl-actions">
                <Link
                  to={`/InvitationEdit/${i.ino}`}
                  className="wl-btn wl-btn--primary"
                >
                  편집하기
                </Link>
                <button
                  type="button"
                  className="wl-btn wl-btn--ghost"
                  onClick={() => onDelete(i.ino)}
                >
                  삭제하기
                </button>
                <Link
                  to={`/checkout/${i.ino}`}
                  className="wl-btn wl-btn--accent"
                >
                  구매하기
                </Link>
              </footer>
            </article>
          );
        })}
      </div>

      {/* 플로팅 대신 카드 리스트 아래에 배치 */}
      <div className="wl-add-container">
        <Link
          to="/InvitationAdd"
          className="wl-btn wl-btn--primary wl-btn--large"
        >
          청첩장 추가하기
        </Link>
      </div>
    </div>
  );
};

export default InvitationList;
