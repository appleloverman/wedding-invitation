/* ---------- 달력 컴포넌트 ---------- */
function Calendar({ value, onChange }) {
  // value: "YYYY-MM-DD"
  const [viewYear, setViewYear] = useState(() => Number(value.slice(0, 4)));
  const [viewMonth, setViewMonth] = useState(
    () => Number(value.slice(5, 7)) - 1
  ); // 0~11

  // date가 바뀌면 달력 뷰도 맞춰 줌
  useEffect(() => {
    setViewYear(Number(value.slice(0, 4)));
    setViewMonth(Number(value.slice(5, 7)) - 1);
  }, [value]);

  const firstDay = new Date(viewYear, viewMonth, 1);
  const firstWeekday = firstDay.getDay(); // 0(일)~6(토)
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();

  // 6주(6*7=42칸) 그리드 만들기
  const cells = Array.from({ length: 42 }).map((_, i) => {
    let day, monthOffset; // -1: 이전달, 0: 이번달, +1: 다음달
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

  const gotoPrevMonth = () => {
    if (viewMonth === 0) {
      setViewYear(viewYear - 1);
      setViewMonth(11);
    } else setViewMonth(viewMonth - 1);
  };
  const gotoNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear(viewYear + 1);
      setViewMonth(0);
    } else setViewMonth(viewMonth + 1);
  };

  const ymdOf = (y, m, d) => `${y}-${pad2(m + 1)}-${pad2(d)}`;

  const handleClick = (cell) => {
    if (cell.monthOffset === 0) {
      onChange(ymdOf(viewYear, viewMonth, cell.day));
    } else if (cell.monthOffset === -1) {
      const y = viewMonth === 0 ? viewYear - 1 : viewYear;
      const m = viewMonth === 0 ? 11 : viewMonth - 1;
      onChange(ymdOf(y, m, cell.day));
    } else {
      const y = viewMonth === 11 ? viewYear + 1 : viewYear;
      const m = viewMonth === 11 ? 0 : viewMonth + 1;
      onChange(ymdOf(y, m, cell.day));
    }
  };

  const weekdayLabels = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="mt-6 rounded-2xl border border-rose-100 bg-rose-50 p-4">
      {/* 헤더 */}
      <div className="mb-2 flex items-center justify-between">
        <button
          onClick={gotoPrevMonth}
          className="h-8 w-8 rounded-full hover:bg-white/70"
          aria-label="이전 달"
        >
          ‹
        </button>
        <div className="text-sm font-medium tracking-wide text-rose-700">
          {viewYear}년 {viewMonth + 1}월
        </div>
        <button
          onClick={gotoNextMonth}
          className="h-8 w-8 rounded-full hover:bg-white/70"
          aria-label="다음 달"
        >
          ›
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 text-center text-[12px] tracking-wider text-rose-400">
        {weekdayLabels.map((w) => (
          <div key={w} className="py-1">
            {w}
          </div>
        ))}
      </div>

      {/* 날짜 셀 */}
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
            today.getFullYear() === viewYear &&
            today.getMonth() === viewMonth &&
            today.getDate() === c.day;

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
