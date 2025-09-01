import { useEffect, useState } from "react";

/* ============ 간단 달력 ============ */
export function Calendar({ value, onChange }) {
  // value: "YYYY-MM-DD"
  const parseYMD = (v) => {
    const [y, m, d] = (v || "").split("-").map(Number);
    const today = new Date();
    return {
      y: Number.isFinite(y) ? y : today.getFullYear(),
      m: Number.isFinite(m) ? m - 1 : today.getMonth(),
      d: Number.isFinite(d) ? d : today.getDate(),
    };
  };

  const { y, m } = parseYMD(value);
  const [view, setView] = useState(() => new Date(y, m, 1));

  // 외부 value가 바뀌면 해당 달로 뷰 이동
  useEffect(() => {
    const { y, m } = parseYMD(value);
    setView(new Date(y, m, 1));
  }, [value]);

  const pad2 = (n) => String(n).padStart(2, "0");
  const ymdOf = (d) =>
    `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

  const changeMonth = (delta) => {
    setView(new Date(view.getFullYear(), view.getMonth() + delta, 1));
  };

  // 달력 그리드 시작일(해당 달 1일의 요일만큼 앞당긴 일요일/월요일 시작)
  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const start = new Date(first);
  start.setDate(1 - first.getDay()); // 일(0) 시작 기준

  // 6주(6x7=42) 셀 채우기: start부터 하루씩 증가
  const cells = Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });

  const weekdayLabels = ["일", "월", "화", "수", "목", "금", "토"];
  const todayYMD = ymdOf(new Date());
  const selectedYMD = value;

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
          {view.getFullYear()}년 {view.getMonth() + 1}월
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
        {cells.map((d, idx) => {
          const inViewMonth =
            d.getFullYear() === view.getFullYear() &&
            d.getMonth() === view.getMonth();
          const isSelected = ymdOf(d) === selectedYMD && inViewMonth;
          const isToday = ymdOf(d) === todayYMD && inViewMonth;

          const base =
            "mx-auto my-1 flex h-9 w-9 items-center justify-center rounded-full text-sm";
          const color = inViewMonth ? "text-rose-900" : "text-rose-300";
          const selected = isSelected
            ? "bg-rose-300 text-white"
            : isToday
            ? "ring-2 ring-rose-300"
            : "hover:bg-white/70";

          return (
            <button
              key={idx}
              onClick={() => onChange(ymdOf(d))}
              className={`${base} ${color} ${selected}`}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
