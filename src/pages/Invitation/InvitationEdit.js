import { useState } from "react";
import { FormSections } from "./FormSections";
import { Calendar } from "./Calendar";
import { Countdown } from "./Countdown";

/** ====== 정규식 없는 초간단 날짜/시간 유틸 ====== */
const WD_KO = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];
const WD_EN_UP = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];
const pad2 = (n) => String(n).padStart(2, "0");

function toDate(ymd) {
  if (typeof ymd !== "string") return null;
  const parts = ymd.split("-");
  if (parts.length !== 3) return null;
  const y = Number(parts[0]);
  const m = Number(parts[1]);
  const d = Number(parts[2]);
  if (!Number.isInteger(y) || !Number.isInteger(m) || !Number.isInteger(d))
    return null;
  if (m < 1 || m > 12 || d < 1 || d > 31) return null; // 간단 검증
  return new Date(y, m - 1, d); // 로컬 자정
}

function parseHHmm(hhmm) {
  const parts = (hhmm || "").split(":");
  const H = Number(parts[0] ?? 0);
  const M = Number(parts[1] ?? 0);
  return {
    H: Number.isFinite(H) ? H : 0,
    M: Number.isFinite(M) ? M : 0,
  };
}

function labelKo(H) {
  if (H === 0) return { label: "자정", h12: 12 };
  if (H < 12) return { label: "오전", h12: H };
  if (H === 12) return { label: "낮", h12: 12 };
  return { label: "오후", h12: H - 12 };
}

/** 한 번에 필요한 문자열 전부 뽑기 */
function formatAll(dateStr, timeStr) {
  const d = toDate(dateStr);
  if (!d) {
    // 날짜가 이상하면 최소한 원본은 보여주자
    return {
      dateSlash: dateStr,
      dateDot: dateStr,
      weekdayUpperEn: "",
      koDateTimeFull: "",
      koDateTimeTail: "",
    };
  }
  const { H, M } = parseHHmm(timeStr);
  const { label, h12 } = labelKo(H);
  const minuteText = M > 0 ? ` ${M}분` : "";

  const yyyy = d.getFullYear();
  const mm = pad2(d.getMonth() + 1);
  const dd = pad2(d.getDate());
  const wdIdx = d.getDay();

  return {
    dateSlash: `${yyyy} / ${mm} / ${dd}`,
    dateDot: `${yyyy}.${mm}.${dd}`,
    weekdayUpperEn: WD_EN_UP[wdIdx],
    koDateTimeFull: `${yyyy}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${
      WD_KO[wdIdx]
    }, ${label} ${h12}시${minuteText}`,
    koDateTimeTail: `${WD_KO[wdIdx]} ${label} ${h12}시${minuteText}`,
  };
}

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

  // 포맷 전부 한 번에
  const fmt = formatAll(date, time);

  const setInvitationHandler = () => {
    setInvitationList([
      ...(invitationList || []),
      { ino: ino + 1, date, time, groomName, brideName },
    ]);
    setIno((v) => v + 1);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 왼쪽: 미리보기 (시각 동일) */}
      <div key={ino} className="flex-1 flex items-center justify-center p-6">
        <div
          className="relative w-[375px] h-[667px] bg-white shadow-lg rounded-xl overflow-hidden"
          style={{ background: bg }}
        >
          <div className="h-full overflow-y-auto px-6 py-6 space-y-4">
            {/* 상단 날짜/요일 */}
            <div className="space-y-1 text-center">
              <h2 className="text-[12px] tracking-widest text-neutral-500 uppercase">
                {fmt.dateSlash}
              </h2>
              <h2 className="text-[12px] tracking-widest text-neutral-500 uppercase">
                {fmt.weekdayUpperEn}
              </h2>
            </div>

            {/* 이름 */}
            <p className="text-center text-lg">
              {groomName} 🤵 · {brideName} 👰
            </p>

            {/* 한국어 날짜/시간 포맷 */}
            <div className="text-center">
              <h2 className="text-[12px] tracking-widest text-neutral-500">
                {fmt.koDateTimeFull}
              </h2>
            </div>

            {/* 소개/본문 */}
            <div className="mt-2 text-gray-600 text-sm space-y-1 text-center">
              <p>INVITATION</p>
              <p className="tracking-[0.2em] text-[11px] text-neutral-400 uppercase">
                {title1}
              </p>
              <p>{content}</p>
            </div>

            {/* 하단 포맷 */}
            <div className="space-y-1 text-center">
              <h2 className="text-[12px] tracking-widest text-neutral-500 uppercase">
                {fmt.dateDot}
              </h2>
              <h2 className="text-[12px] tracking-widest text-neutral-500">
                {fmt.koDateTimeTail}
              </h2>
            </div>

            {/* 달력 & 카운트다운 */}
            <Calendar value={date} onChange={setDate} />
            <Countdown
              date={date}
              time={time}
              groomName={groomName}
              brideName={brideName}
            />
          </div>
        </div>
      </div>

      {/* 오른쪽: 입력 폼 */}
      <div className="w-[400px] bg-white shadow-lg p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">청첩장 정보 입력</h2>

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

        <button
          className="mt-6 w-full rounded bg-blue-500 text-white py-2"
          onClick={setInvitationHandler}
        >
          저장하기
        </button>
      </div>
    </div>
  );
}
