import { useEffect, useState } from "react";

/* ============== 카운트다운 (간단 버전) ============== */
const DAY = 24 * 60 * 60 * 1000;
const HOUR = 60 * 60 * 1000;
const MIN = 60 * 1000;
const SEC = 1000;

const pad2 = (n) => String(n).padStart(2, "0");
const toLocalDateTime = (ymd, hhmm) => {
  const [y, m, d] = (ymd || "").split("-").map(Number);
  const [H, M] = (hhmm || "").split(":").map(Number);
  return new Date(y || 0, (m || 1) - 1, d || 1, H || 0, M || 0, 0);
};
const splitMs = (ms) => ({
  d: Math.floor(ms / DAY),
  h: Math.floor((ms % DAY) / HOUR),
  m: Math.floor((ms % HOUR) / MIN),
  s: Math.floor((ms % MIN) / SEC),
});

export function Countdown({ date, time, groomName, brideName }) {
  const target = toLocalDateTime(date, time);
  const [ms, setMs] = useState(() => Math.max(target - new Date(), 0));

  useEffect(() => {
    const t = toLocalDateTime(date, time);
    const tick = () => setMs(Math.max(t - new Date(), 0));
    tick(); // 초기 1회
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [date, time]);

  const { d, h, m, s } = splitMs(ms);
  const done = ms === 0;
  const names = `${groomName}, ${brideName}`;

  return (
    <div className="mt-6 rounded-2xl border border-rose-100 bg-rose-50 p-6 text-center">
      <div className="mb-3 text-[10px] tracking-[0.25em] text-rose-400">
        DAYS&nbsp;&nbsp;&nbsp;HOUR&nbsp;&nbsp;&nbsp;MIN&nbsp;&nbsp;&nbsp;SEC
      </div>
      <div className="text-2xl tabular-nums text-rose-900">
        {d} <span className="mx-2">:</span> {pad2(h)}
        <span className="mx-2">:</span> {pad2(m)}
        <span className="mx-2">:</span> {pad2(s)}
      </div>
      <p className="mt-4 text-sm text-rose-700">
        {done
          ? `${names}의 결혼식 날입니다.`
          : `${names}의 결혼식이 ${d}일 남았습니다.`}
      </p>
    </div>
  );
}
