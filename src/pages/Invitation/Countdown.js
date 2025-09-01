import { useEffect, useState } from "react";

export function Countdown({ date, time, groomName = "", brideName = "" }) {
  const pad = (n) => String(n).padStart(2, "0");

  // "YYYY-MM-DD" + "HH:MM" → 로컬 Date
  const makeTarget = (d, t) => {
    const [y, m, dd] = (d || "").split("-").map(Number);
    const [H, M] = (t || "").split(":").map(Number);
    return new Date(y || 0, (m || 1) - 1, dd || 1, H || 0, M || 0, 0);
  };

  const target = makeTarget(date, time);
  const leftNow = () => Math.max(+target - Date.now(), 0);

  const [left, setLeft] = useState(leftNow);

  useEffect(() => {
    setLeft(leftNow());                 // 즉시 1회 동기화
    const id = setInterval(() => setLeft(leftNow()), 1000); // 1초마다 갱신
    return () => clearInterval(id);
  }, [date, time]);

  const days  = Math.floor(left / 86400000);
  const hours = Math.floor((left % 86400000) / 3600000);
  const mins  = Math.floor((left % 3600000) / 60000);
  const secs  = Math.floor((left % 60000) / 1000);

  const done = left === 0;
  const names = [groomName, brideName].filter(Boolean).join(", ");

  return (
    <div className="mt-6 rounded-2xl border border-rose-100 bg-rose-50 p-6 text-center">
      <div className="mb-3 text-[10px] tracking-[0.25em] text-rose-400">
        DAYS&nbsp;&nbsp;&nbsp;HOUR&nbsp;&nbsp;&nbsp;MIN&nbsp;&nbsp;&nbsp;SEC
      </div>
      <div className="text-2xl tabular-nums text-rose-900">
        {days} <span className="mx-2">:</span> {pad(hours)}
        <span className="mx-2">:</span> {pad(mins)}
        <span className="mx-2">:</span> {pad(secs)}
      </div>
      <p className="mt-4 text-sm text-rose-700">
        {done ? `${names}의 결혼식 날입니다.` : `${names}의 결혼식이 ${days}일 남았습니다.`}
      </p>
    </div>
  );
}
