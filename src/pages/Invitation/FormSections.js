import { AccordionSection } from "./AccordionSection";

/** 폼 섹션 (InvitationEdit에서 그대로 꽂아 쓰면 됨) */
export function FormSections({
  //테마
  bg,
  setBg,

  // 기본 정보
  date,
  setDate,
  time,
  setTime,
  groomName,
  setGroomName,
  brideName,
  setBrideName,

  // 메인 화면
  title1,
  setTitle1,
  content,
  setContent,
}) {
  const presets = ["#FFFFFF", "#F7F3EE", "#FFF0F6", "#E6F7FF", "#F0FFF4"];

  return (
    <div className="space-y-3">
      {/* 테마 */}
      <AccordionSection title="테마" defaultOpen>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center gap-3">
            <label className="w-24 text-sm text-gray-600">배경 색상</label>
          </div>

          <div className="flex items-center gap-2 flex-wrap pl-24">
            {presets.map((c) => (
              <button
                key={c}
                type="button"
                className="h-7 w-7 rounded-full border border-gray-200"
                style={{ backgroundColor: c }}
                onClick={() => setBg?.(c)}
                title={c}
              />
            ))}
          </div>
        </div>
      </AccordionSection>

      {/* 기본 정보 */}
      <AccordionSection title="기본 정보">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center gap-3">
            <label className="w-24 text-sm text-gray-600">날짜</label>
            <input
              type="date"
              className="h-10 flex-1 rounded border border-gray-300 px-2"
              value={date}
              onChange={(e) => setDate?.(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="w-24 text-sm text-gray-600">시간</label>
            <input
              type="time"
              className="h-10 flex-1 rounded border border-gray-300 px-2"
              value={time}
              onChange={(e) => setTime?.(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="w-24 text-sm text-gray-600">신랑</label>
            <input
              className="h-10 flex-1 rounded border border-gray-300 px-2"
              value={groomName}
              onChange={(e) => setGroomName?.(e.target.value)}
              placeholder="신랑 이름"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="w-24 text-sm text-gray-600">신부</label>
            <input
              className="h-10 flex-1 rounded border border-gray-300 px-2"
              value={brideName}
              onChange={(e) => setBrideName?.(e.target.value)}
              placeholder="신부 이름"
            />
          </div>
        </div>
      </AccordionSection>

      {/* 인사말 */}
      <AccordionSection title="인사말">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center gap-3">
            <label className="w-24 text-sm text-gray-600">제목</label>
            <input
              className="h-10 flex-1 rounded border border-gray-300 px-2"
              value={title1}
              onChange={(e) => setTitle1(e.target.value)}
              placeholder="예: INVITATION"
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="w-24 text-sm text-gray-600">내용</label>
            <input
              className="h-10 flex-1 rounded border border-gray-300 px-2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="예: 소중한 분들을 초대합니다"
            />
          </div>
        </div>
      </AccordionSection>
    </div>
  );
}
