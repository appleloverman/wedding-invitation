import { useEffect, useState } from "react";

/* ================= 달력 ================= */
function Calendar({ value, onChange }) {
  const [viewYear, setViewYear] = useState(() => Number(value.slice(0, 4)));
  const [viewMonth, setViewMonth] = useState(
    () => Number(value.slice(5, 7)) - 1
  );
  useEffect(() => {
    setViewYear(Number(value.slice(0, 4)));
    setViewMonth(Number(value.slice(5, 7)) - 1);
  }, [value]);

  const firstDay = new Date(viewYear, viewMonth, 1);
  const firstWeekday = firstDay.getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();

  const cells = Array.from({ length: 42 }).map((_, i) => {
    let day, monthOffset;
    if (i < firstWeekday) {
      day = prevMonthDays - firstWeekday + 1 + i;
      monthOffset = -1;
    } else if (i >= firstWeekday + daysInMonth) {
      day = i - (firstWeekday + daysInMonth) + 1;
      monthOffset = 1;
    } else {
      day = i - firstWeekday + 1;
      monthOffset = 0;
    }
    return { day, monthOffset, index: i };
  });

  const selY = Number(value.slice(0, 4));
  const selM = Number(value.slice(5, 7)) - 1;
  const selD = Number(value.slice(8, 10));
  const today = new Date();

  const pad2 = (n) => String(n).padStart(2, "0");
  const ymdOf = (y, m, d) => `${y}-${pad2(m + 1)}-${pad2(d)}`;

  const changeMonth = (delta) => {
    const m = viewMonth + delta;
    if (m < 0) {
      setViewYear(viewYear - 1);
      setViewMonth(11);
    } else if (m > 11) {
      setViewYear(viewYear + 1);
      setViewMonth(0);
    } else setViewMonth(m);
  };

  const handleClick = (c) => {
    if (c.monthOffset === 0) onChange(ymdOf(viewYear, viewMonth, c.day));
    else if (c.monthOffset === -1) {
      const y = viewMonth === 0 ? viewYear - 1 : viewYear;
      const m = viewMonth === 0 ? 11 : viewMonth - 1;
      onChange(ymdOf(y, m, c.day));
    } else {
      const y = viewMonth === 11 ? viewYear + 1 : viewYear;
      const m = viewMonth === 11 ? 0 : viewMonth + 1;
      onChange(ymdOf(y, m, c.day));
    }
  };

  const weekdayLabels = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4">
      <div className="mb-2 flex items-center justify-between">
        <button
          onClick={() => changeMonth(-1)}
          className="h-8 w-8 rounded-full hover:bg-white/70"
          aria-label="이전 달"
        >
          ‹
        </button>
        <div className="text-sm font-medium tracking-wide text-rose-700">
          {viewYear}년 {viewMonth + 1}월
        </div>
        <button
          onClick={() => changeMonth(1)}
          className="h-8 w-8 rounded-full hover:bg-white/70"
          aria-label="다음 달"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-[12px] tracking-wider text-rose-400">
        {weekdayLabels.map((w) => (
          <div key={w} className="py-1">
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center">
        {cells.map((c) => {
          const isCurrent = c.monthOffset === 0;
          const isSelected =
            isCurrent &&
            viewYear === selY &&
            viewMonth === selM &&
            c.day === selD;
          const isToday =
            isCurrent &&
            new Date().getFullYear() === viewYear &&
            new Date().getMonth() === viewMonth &&
            new Date().getDate() === c.day;

          const base =
            "mx-auto my-1 flex h-9 w-9 items-center justify-center rounded-full text-sm";
          const color = isCurrent ? "text-rose-900" : "text-rose-300";
          const selected = isSelected
            ? "bg-rose-300 text-white"
            : isToday
            ? "ring-2 ring-rose-300"
            : "hover:bg-white/70";

          return (
            <button
              key={c.index}
              onClick={() => handleClick(c)}
              className={`${base} ${color} ${selected}`}
            >
              {c.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ================= 카운트다운 ================= */
const parseLocalDateTime = (ymd, hhmm) => {
  const [y, m, d] = ymd.split("-").map(Number);
  const [H, M] = hhmm.split(":").map(Number);
  return new Date(y, m - 1, d, H || 0, M || 0, 0);
};
const pad2 = (n) => String(n).padStart(2, "0");

function Countdown({ date, time, groomName, brideName }) {
  const [left, setLeft] = useState({ totalMs: 0, d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = parseLocalDateTime(date, time);
    const tick = () => {
      const now = new Date();
      const diff = Math.max(target - now, 0);
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setLeft({ totalMs: diff, d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [date, time]);

  const done = left.totalMs === 0;
  const names = `${groomName}, ${brideName}`;

  return (
    <div className="mt-6 rounded-2xl border border-rose-100 bg-rose-50 p-6 text-center">
      <div className="mb-3 text-[10px] tracking-[0.25em] text-rose-400">
        DAYS&nbsp;&nbsp;&nbsp;HOUR&nbsp;&nbsp;&nbsp;MIN&nbsp;&nbsp;&nbsp;SEC
      </div>
      <div className="text-2xl tabular-nums text-rose-900">
        {left.d} <span className="mx-2">:</span> {pad2(left.h)}
        <span className="mx-2">:</span> {pad2(left.m)}
        <span className="mx-2">:</span> {pad2(left.s)}
      </div>
      <p className="mt-4 text-sm text-rose-700">
        {done
          ? `${names}의 결혼식 날입니다.`
          : `${names}의 결혼식이 ${left.d}일 남았습니다.`}
      </p>
    </div>
  );
}

/* ================= 방명록: 리스트 ================= */
function GuestbookList({ items }) {
  if (!items.length) return null;
  return (
    <div className="mt-6 space-y-3 text-left">
      <h3 className="text-sm font-medium text-neutral-600">축하 글</h3>
      {items.map((it) => (
        <div key={it.id} className="rounded-lg border border-neutral-200 p-3">
          <div className="mb-1 text-sm font-medium">{it.name}</div>
          <p className="whitespace-pre-wrap text-sm text-neutral-700">
            {it.message}
          </p>
          <div className="mt-2 text-[11px] text-neutral-400">
            {new Date(it.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ================= 방명록: 모달(슬라이드업) ================= */
function GuestbookModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");
  const maxLen = 500;

  // 모달이 닫힐 때 입력 초기화
  useEffect(() => {
    if (!open) {
      setName("");
      setPw("");
      setMsg("");
    }
  }, [open]);

  return (
    <div
      className={`absolute inset-0 z-10 ${open ? "" : "pointer-events-none"}`}
    >
      {/* dim */}
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      {/* drawer */}
      <div
        className={`absolute left-3 right-3 bottom-3 h-[85%] rounded-2xl bg-white shadow-xl transition-transform duration-300
        ${open ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="flex items-center justify-between px-5 pt-4">
          <h3 className="text-base font-semibold">방명록 (축하 글) 작성</h3>
          <button onClick={onClose} className="text-xl leading-none">
            ×
          </button>
        </div>
        <hr className="my-3 border-neutral-200" />
        <form
          className="h-[calc(100%-72px)] overflow-y-auto px-5 pb-5 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!name.trim() || !pw.trim() || !msg.trim())
              return alert("이름/비밀번호/내용을 모두 입력해 주세요.");
            onSubmit({
              id: Date.now(),
              name: name.trim(),
              message: msg.trim(),
              createdAt: new Date().toISOString(),
              // pw는 데모용으로만 저장(실서비스면 서버에 안전하게 저장/검증 필요)
              pw,
            });
          }}
        >
          <div className="space-y-1">
            <label className="text-sm font-medium">
              이름 <span className="text-rose-500">*</span>
            </label>
            <input
              className="w-full rounded border border-neutral-300 p-2 text-sm"
              placeholder="이름을 입력해 주세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">
              비밀번호 <span className="text-rose-500">*</span>
            </label>
            <input
              type="password"
              className="w-full rounded border border-neutral-300 p-2 text-sm"
              placeholder="비밀번호를 입력해 주세요."
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
            <p className="text-[11px] text-neutral-400">
              * 글 수정/삭제용(데모). 실제 서비스는 서버 검증 필요.
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">
              내용 <span className="text-rose-500">*</span>
            </label>
            <textarea
              className="h-40 w-full resize-none rounded border border-neutral-300 p-2 text-sm"
              placeholder="내용을 입력해 주세요. (최대 500자)"
              maxLength={maxLen}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <div className="text-right text-[11px] text-neutral-400">
              {msg.length} / {maxLen}
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded bg-black py-3 text-sm font-medium text-white hover:bg-neutral-800"
          >
            신랑 & 신부에게 축하 글 전달하기
          </button>
        </form>
      </div>
    </div>
  );
}

/* ================= 메인: InvitationEdit ================= */
export default function InvitationEdit({
  invitationList = [],
  setInvitationList = () => {},
}) {
  const [ino, setIno] = useState(1);
  const [date, setDate] = useState("2025-08-29");
  const [time, setTime] = useState("12:00");
  const [groomName, setGroomName] = useState("홍길동");
  const [brideName, setBrideName] = useState("김영희");
  const [theme, setTheme] = useState("classic");
  const [bg, setBg] = useState("#F7F7F7");
  const [alpha, setAlpha] = useState(1);

  // 방명록 상태
  const [guestbookOpen, setGuestbookOpen] = useState(false);
  const [guestbook, setGuestbook] = useState([]);

  const setInvitationHandler = () => {
    setInvitationList([
      ...invitationList,
      { ino: ino + 1, date, time, groomName, brideName, theme },
    ]);
    setIno(ino + 1);
  };

  const presets = ["#FFFFFF", "#F7F3EE", "#FFF0F6", "#E6F7FF", "#F0FFF4"];
  const rgba = (hex, a = 1) => {
    const v = hex.replace("#", "");
    const r = parseInt(v.slice(0, 2), 16);
    const g = parseInt(v.slice(2, 4), 16);
    const b = parseInt(v.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  function getWeekdayKo(ymd) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(ymd)) return "";
    const [y, m, d] = ymd.split("-").map(Number);
    const wd = new Date(y, m - 1, d).getDay();
    const days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];
    return days[wd];
  }
  function formatDateSlash(ymd) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(ymd)) return ymd;
    const [y, m, d] = ymd.split("-");
    return `${y} / ${m} / ${d}`;
  }
  function formatDateDot(ymd) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(ymd)) return ymd;
    const [y, m, d] = ymd.split("-");
    return `${y}.${m}.${d}`;
  }
  function formatKoDateTime(ymd, hhmm) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd);
    if (!m) return "";
    const y = +m[1],
      mo = +m[2],
      d = +m[3];
    const wd = new Date(y, mo - 1, d).getDay();
    const WD = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    const [H, M] = hhmm.split(":").map(Number);
    let label = "",
      h12 = H;
    if (H === 0) {
      label = "자정";
      h12 = 12;
    } else if (H < 12) {
      label = "오전";
      h12 = H;
    } else if (H === 12) {
      label = "낮";
      h12 = 12;
    } else {
      label = "오후";
      h12 = H - 12;
    }
    const minuteText = M > 0 ? ` ${M}분` : "";
    return `${y}년 ${mo}월 ${d}일 ${WD[wd]}, ${label} ${h12}시${minuteText}`;
  }
  function formatKoDateTime2(ymd, hhmm) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd);
    if (!m) return "";
    const y = +m[1],
      mo = +m[2],
      d = +m[3];
    const wd = new Date(y, mo - 1, d).getDay();
    const WD = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    const [H, M] = hhmm.split(":").map(Number);
    let label = "",
      h12 = H;
    if (H === 0) {
      label = "자정";
      h12 = 12;
    } else if (H < 12) {
      label = "오전";
      h12 = H;
    } else if (H === 12) {
      label = "낮";
      h12 = 12;
    } else {
      label = "오후";
      h12 = H - 12;
    }
    const minuteText = M > 0 ? ` ${M}분` : "";
    return `${WD[wd]} ${label} ${h12}시${minuteText}`;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 왼쪽: 미리보기(스크롤 + 모달 오버레이) */}
      <div key={ino} className="flex-1 flex items-center justify-center p-6">
        <div
          className="relative w-[375px] h-[667px] bg-white shadow-lg rounded-xl overflow-hidden"
          style={{ background: rgba(bg, alpha) }}
        >
          {/* 스크롤 영역 */}
          <div className="h-full overflow-y-auto px-6 py-6 space-y-4">
            {/* 상단 날짜/요일 */}
            <div className="space-y-1 text-center">
              <h2 className="text-[12px] tracking-widest text-neutral-500 uppercase">
                {formatDateSlash(date)}
              </h2>
              <h2 className="text-[12px] tracking-widest text-neutral-500 uppercase">
                {getWeekdayKo(date)}
              </h2>
            </div>

            {/* 이름 */}
            <p className="text-center text-lg">
              {groomName} 🤵 · {brideName} 👰
            </p>

            {/* 한국어 날짜/시간 포맷 */}
            <div className="text-center">
              <h2 className="text-[12px] tracking-widest text-neutral-500">
                {formatKoDateTime(date, time)}
              </h2>
            </div>

            {/* 소개/본문 */}
            <div className="mt-2 text-gray-600 text-sm space-y-1 text-center">
              <p className="tracking-[0.2em] text-[11px] text-neutral-400 uppercase">
                invitation
              </p>
              <p>소중한 분들을 초대합니다</p>
              <p>저희 두 사람의 작은 만남이 사랑의 결실을 이루어</p>
              <p>소중한 결혼식을 올리게 되었습니다.</p>
              <p>
                평생 서로 귀하게 여기며 첫 마음 그대로 존중하고 배려하며
                살겠습니다.
              </p>
              <p>
                오로지 믿음과 사랑을 약속하는 날 축복해 주시면 더 없는 기쁨으로
                간직하겠습니다.
              </p>
            </div>

            {/* 부모 라인 */}
            <div className="text-center">
              <p className="text-lg">아들 {groomName}</p>
              <p className="text-lg">딸 {brideName}</p>
            </div>

            {/* 하단 포맷 */}
            <div className="space-y-1 text-center">
              <h2 className="text-[12px] tracking-widest text-neutral-500 uppercase">
                {formatDateDot(date)}
              </h2>
              <h2 className="text-[12px] tracking-widest text-neutral-500">
                {formatKoDateTime2(date, time)}
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

            {/* 방명록 버튼 */}
            <button
              onClick={() => setGuestbookOpen(true)}
              className="mt-2 w-full rounded bg-black py-3 text-sm font-medium text-white hover:bg-neutral-800"
            >
              신랑 & 신부에게 축하 글 남기기
            </button>

            {/* 방명록 리스트 */}
            <GuestbookList items={guestbook} />
          </div>

          {/* 방명록 모달(카드 내부에 오버레이) */}
          {guestbookOpen && (
            <GuestbookModal
              onClose={() => setGuestbookOpen(false)}
              onSubmit={(data) => {
                setGuestbook((p) => [data, ...p]);
                setGuestbookOpen(false);
              }}
            />
          )}
        </div>
      </div>

      {/* 오른쪽: 입력 폼(그대로) */}
      <div className="w-[400px] bg-white shadow-lg p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">청첩장 정보 입력</h2>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium w-28">배경 색상</span>
          <div className="flex flex-wrap gap-2">
            {presets.map((c) => (
              <button
                key={c}
                onClick={() => setBg(c)}
                className="h-8 w-8 rounded-full border border-gray-200"
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">날짜</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">시간</label>
          <input
            type="time"
            className="w-full border p-2 rounded"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">신랑 이름</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={groomName}
            onChange={(e) => setGroomName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">신부 이름</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={brideName}
            onChange={(e) => setBrideName(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-blue-500 text-white py-2 rounded"
          onClick={setInvitationHandler}
        >
          저장하기
        </button>
      </div>
    </div>
  );
}
