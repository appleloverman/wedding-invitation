/* ---------- 카운트다운 컴포넌트 ---------- */
function Countdown({ date, time, groomName, brideName }) {
  const [left, setLeft] = useState({
    totalMs: 0,
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });

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

  const names = `${groomName}, ${brideName}`;
  const done = left.totalMs === 0;

  return (
    <div className="mt-8 rounded-2xl border border-rose-100 bg-rose-50 p-6 text-center">
      <div className="mb-3 text-[10px] tracking-[0.25em] text-rose-400">
        DAYS&nbsp;&nbsp;&nbsp;HOUR&nbsp;&nbsp;&nbsp;MIN&nbsp;&nbsp;&nbsp;SEC
      </div>
      <div className="text-2xl tabular-nums text-rose-900">
        {left.d} <span className="mx-2">:</span> {pad2(left.h)}{" "}
        <span className="mx-2">:</span> {pad2(left.m)}{" "}
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
