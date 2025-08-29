import { useState } from "react";

function InvitationDesign() {
  const [date, setDate] = useState("2025-08-29");
  const [time, setTime] = useState("12:00");
  const [groomName, setGroomName] = useState("홍길동");
  const [brideName, setBrideName] = useState("김영희");
  const [theme, setTheme] = useState("classic");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 왼쪽: 청첩장 미리보기 */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-[375px] h-[667px] bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-gray-500 text-sm">{date}</h2>
          <p className="text-gray-500 mb-4">{time}</p>
          <h1 className="text-2xl font-bold mb-2">INVITATION</h1>
          <p className="text-gray-600 mb-6">소중한 분들을 초대합니다</p>

          <p className="text-lg mb-2">{groomName} 🤵</p>
          <p className="text-lg mb-2">{brideName} 👰</p>

          <div className="mt-8 text-gray-500 text-sm">
            <p>평생 서로 귀하게 여기며</p>
            <p>사랑의 결실을 이루고자 합니다</p>
          </div>
        </div>
      </div>

      {/* 오른쪽: 입력 폼 */}
      <div className="w-[400px] bg-white shadow-lg p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">청첩장 정보 입력</h2>

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

        <div className="mb-4">
          <label className="block text-sm mb-1">테마 선택</label>
          <select
            className="w-full border p-2 rounded"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="classic">Classic</option>
            <option value="modern">Modern</option>
            <option value="floral">Floral</option>
          </select>
        </div>

        <button className="w-full bg-blue-500 text-white py-2 rounded">
          저장하기
        </button>
      </div>
    </div>
  );
}

export default InvitationDesign;
