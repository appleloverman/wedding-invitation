import { useState } from "react";
import { FormSections } from "./FormSections";
import { Calendar } from "./Calendar";
import "../../Css/InvitationAdd.css"; // 상위 폴더의 Css 경로
import { FormatAll } from "./FormatAll";
import { Link } from "react-router-dom";

/* ================= 메인: InvitationAdd ================= */
export default function InvitationAdd({ invitationList, setInvitationList }) {
  // 초기 ino 계산
  const getInitialIno = () => {
    if (invitationList && invitationList.length > 0) {
      const maxIno = Math.max(...invitationList.map((card) => card.ino));
      return maxIno + 1;
    }
    return 1;
  };

  const [ino, setIno] = useState(getInitialIno);
  const [date, setDate] = useState("2025-09-01");
  const [time, setTime] = useState("12:00");
  const [groomName, setGroomName] = useState("홍길동");
  const [brideName, setBrideName] = useState("김영희");
  const [bg, setBg] = useState("#F7F7F7");
  const [title1, setTitle1] = useState("소중한 분들을 초대합니다");
  const [content, setContent] = useState(
    `저희 두 사람의 작은 만남이

사랑의 결실을 이루어

소중한 결혼식을 올리게 되었습니다.

평생 서로 귀하게 여기며
첫 마음 그대로 존중하고 배려하며 살겠습니다.

오로지 믿음과 사랑을 약속하는 날
오셔서 축복해 주시면 더 없는 기쁨으로
간직하겠습니다.`
  );

  const fmt = FormatAll(date, time);

  const setInvitationHandler = () => {
    setInvitationList((prev) => [
      ...(prev || []),
      { ino, date, time, groomName, brideName, bg, title1, content }
    ]);
    // 목록 화면으로 이동하므로 여기서 ino 증가/리셋은 생략
  };

  return (
    <div className="invitation-edit ie-page">
      {/* 왼쪽: 미리보기 */}
      <div key={ino} className="preview-pane ie-preview">
        <div className="phone-frame" aria-label="모바일 청첩장 미리보기">
          <div className="phone-notch" aria-hidden="true" />
          <div className="phone-canvas" style={{ "--preview-bg": bg }}>
            <div className="phone-scroll">
              {/* 상단 날짜/요일 */}
              <div className="section section--tight text-center">
                <h2 className="meta meta--upper">{fmt.dateSlash}</h2>
                <h2 className="meta meta--upper">{fmt.weekdayUpperEn}</h2>
              </div>

              {/* 이름 */}
              <p className="names">
                <span className="name">{groomName}</span>
                <span className="dot">·</span>
                <span className="name">{brideName}</span>
              </p>

              {/* 한국어 날짜/시간 포맷 */}
              <div className="text-center">
                <h2 className="meta">{fmt.koDateTimeFull}</h2>
              </div>

              {/* 구분선 */}
              <div className="divider" aria-hidden="true" />

              {/* 소개/본문 */}
              <div className="intro">
                <p className="intro__tag">INVITATION</p>
                <p className="intro__title">{title1}</p>
                <p className="intro__body">{content}</p>
              </div>

              {/* 하단 포맷 */}
              <div className="section text-center">
                <h2 className="meta meta--upper">{fmt.dateDot}</h2>
                <h2 className="meta">{fmt.koDateTimeTail}</h2>
              </div>

              {/* 달력 */}
              <div className="section section--calendar">
                <Calendar value={date} onChange={setDate} />
              </div>
            </div>
          </div>
          <div className="phone-homebar" aria-hidden="true" />
        </div>
      </div>

      {/* 오른쪽: 입력 폼 */}
      <div className="form-pane ie-form">
        <header className="form-header">
          <h2 className="form-title">청첩장 정보 입력</h2>
          <p className="form-sub">
            내용을 입력하면 왼쪽 미리보기에 즉시 반영됩니다.
          </p>
        </header>

        <FormSections
          // 테마
          bg={bg}
          setBg={setBg}
          // 기본 정보
          date={date}
          setDate={setDate}
          time={time}
          setTime={setTime}
          groomName={groomName}
          setGroomName={setGroomName}
          brideName={brideName}
          setBrideName={setBrideName}
          // 인사말
          title1={title1}
          setTitle1={setTitle1}
          content={content}
          setContent={setContent}
        />

        <div className="sticky-actions">
          <Link
            to="/InvitationList"
            className="btn btn-primary"
            onClick={setInvitationHandler}
          >
            추가하기
          </Link>
          <Link to="/InvitationList" className="btn btn-ghost">
            목록으로
          </Link>
        </div>
      </div>
    </div>
  );
}
