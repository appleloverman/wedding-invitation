import { useState } from "react";
import { FormSections } from "./FormSections";
import { Calendar } from "./Calendar";

import "./InvitationEdit.css";
import { FormatAll } from "./FormatAll";
import { Link } from "react-router-dom";

/* ================= 메인: InvitationEdit ================= */
export default function InvitationEdit({ invitationList, setInvitationList }) {
  const [ino, setIno] = useState(1);
  const [date, setDate] = useState("2025-08-29");
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
    setInvitationList([
      ...(invitationList || []),
      {
        ino: ino + 1,
        date,
        time,
        groomName,
        brideName,
        bg,
        title1,
        content,
      },
    ]);
    setIno((v) => v + 1);
  };

  return (
    <div className="invitation-edit">
      {/* 왼쪽: 미리보기 */}
      <div key={ino} className="preview-pane">
        <div className="phone-canvas" style={{ "--preview-bg": bg }}>
          <div className="phone-scroll">
            {/* 상단 날짜/요일 */}
            <div className="section section--tight text-center">
              <h2 className="meta meta--upper">{fmt.dateSlash}</h2>
              <h2 className="meta meta--upper">{fmt.weekdayUpperEn}</h2>
            </div>

            {/* 이름 */}
            <p className="names">
              {groomName} 🤵 · {brideName} 👰
            </p>

            {/* 한국어 날짜/시간 포맷 */}
            <div className="text-center">
              <h2 className="meta">{fmt.koDateTimeFull}</h2>
            </div>

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

            {/* 달력*/}
            <Calendar value={date} onChange={setDate} />
          </div>
        </div>
      </div>

      {/* 오른쪽: 입력 폼 */}
      <div className="form-pane">
        <h2 className="form-title">청첩장 정보 입력</h2>

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

        <Link to="/InvitationList">
          <button className="primary-btn" onClick={setInvitationHandler}>
            추가하기
          </button>
        </Link>
      </div>
    </div>
  );
}
