import React from "react";
import { Link } from "react-router-dom";

const cards = [
  {
    id: 1,
    img: "https://d38fyys32noduv.cloudfront.net/commons/card_sample/XiWvmigDIO.png",
    url: "https://w.theirmood.com/card/XiWvmigDIO",
    title: "Wook & Juhyun",
    subtitle: "2025.10.01 SAT 2:00PM • Seoul Grand Hall",
    theme: "classic",
  },
  {
    id: 2,
    img: "https://d38fyys32noduv.cloudfront.net/commons/card_sample/BgIftGNgps.png",
    url: "https://w.theirmood.com/card/BgIftGNgps",
    title: "Dohyun & Hyojin",
    subtitle:
      "A successful marriage requires falling in love many times, always with the same person.",
    theme: "blush",
  },
  {
    id: 3,
    img: "https://d38fyys32noduv.cloudfront.net/commons/card_sample/dXHF8IHgPT.png",
    url: "https://w.theirmood.com/card/dXHF8IHgPT",
    title: "Dasol & Yewon",
    subtitle: "2026.10.10 SAT • With Our Dearest",
    theme: "sage",
  },
  {
    id: 4,
    img: "https://d38fyys32noduv.cloudfront.net/commons/card_sample/IhMIUxYKKt.png",
    url: "https://w.theirmood.com/card/IhMIUxYKKt",
    title: "With Love",
    subtitle: "Beautiful Moments Together",
    theme: "navy",
  },
];

// theirmood 감성: 뉴트럴 팔레트 + 아주 얇은 라인 + 미세한 그림자
const THEME = {
  classic: {
    accent: "text-stone-900",
    sub: "text-stone-500",
    ring: "ring-stone-200",
    chip: "bg-stone-100 text-stone-600",
  },
  blush: {
    accent: "text-rose-900",
    sub: "text-rose-500",
    ring: "ring-rose-100",
    chip: "bg-rose-50 text-rose-600",
  },
  sage: {
    accent: "text-emerald-900",
    sub: "text-emerald-600",
    ring: "ring-emerald-100",
    chip: "bg-emerald-50 text-emerald-600",
  },
  navy: {
    accent: "text-slate-900",
    sub: "text-slate-600",
    ring: "ring-slate-200",
    chip: "bg-slate-50 text-slate-600",
  },
};

function InviteCard({ card }) {
  const t = THEME[card.theme] ?? THEME.classic;

  return (
    <div className="group relative w-[320px] sm:w-[360px]">
      {/* 카드 외곽 – 얇은 헤어라인 + 아주 부드러운 그림자 */}
      <div className={`rounded-[28px] bg-white ring-1 ${t.ring} shadow-[0_6px_24px_rgba(0,0,0,0.06)] overflow-hidden transition-transform duration-300 group-hover:-translate-y-0.5`}>
        {/* 상단: 풀블리드 이미지 (자르지 않고 contain) */}
        <a href={card.url} target="_blank" rel="noopener noreferrer" className="block">
          <div className="relative">
            <div className="aspect-[3/4] w-full bg-white flex items-center justify-center overflow-hidden">
              <img
                src={card.img}
                alt={card.title}
                className="max-h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.015]"
                loading="lazy"
              />
            </div>

            {/* 좌상단 얇은 칩 (theirMood 느낌의 라벨) */}
            <div className="absolute left-4 top-4">
              <span className={`rounded-full px-2.5 py-1 text-[10px] tracking-wide ${t.chip} ring-1 ring-black/5`}>
                INVITATION
              </span>
            </div>
          </div>
        </a>

        {/* 컨텐츠 – 넓은 여백, 세리프 타이틀, 가는 보조텍스트 */}
        <div className="px-6 pb-6 pt-5">
          <h3 className={`text-xl font-semibold tracking-tight ${t.accent} font-serif`}>
            {card.title}
          </h3>

          <p className={`mt-2 text-sm leading-relaxed ${t.sub}`}>
            {card.subtitle}
          </p>

          {/* 아주 미세한 디바이더 */}
          <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent opacity-30" />

          {/* CTA – 라인 버튼(채우기 X), theirmood의 미니멀 무드 */}
          <div className="mt-4 flex gap-2">
            <a
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-xl border border-black/10 px-4 py-2.5 text-sm font-medium text-stone-800 transition hover:bg-stone-50 active:scale-[0.99]"
            >
              초대장 보기
            </a>
            {/* 보조 액션(예: 공유) – 선택사항 */}
            <button
              onClick={() => alert(`${card.title} 카드가 복사되었습니다.`)}
              className="rounded-xl border border-black/10 px-3 py-2 text-sm text-stone-600 transition hover:bg-stone-50"
              aria-label="링크 복사"
              type="button"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M3 8a5 5 0 0 1 5-5h3v2H8a3 3 0 0 0 0 6h3v2H8a5 5 0 0 1-5-5Zm8-3h5a5 5 0 0 1 0 10h-5v-2h5a3 3 0 0 0 0-6h-5V5Zm-3 6h8v2H8v-2Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 하단 미세한 그림자 퍼짐(카드가 떠 보이는 느낌) */}
      <div className="absolute inset-x-6 -bottom-3 h-6 rounded-[20px] bg-black/5 blur-xl opacity-40 pointer-events-none" />
    </div>
  );
}

export default function InvitationCards() {
  return (
    <div className="w-full bg-gradient-to-b from-stone-50 to-white py-12">
      <h2 className="text-center text-2xl font-semibold tracking-tight text-stone-800">
        청첩장 카드
      </h2>
      <p className="mt-2 text-center text-sm text-stone-500">
        미니멀한 여백과 풀블리드 이미지, 섬세한 라인으로 theirmood 감성을 담았어요.
      </p>

      {/* 가로 스크롤 리스트 */}
      <div className="mt-10 flex flex-nowrap items-start gap-8 overflow-x-auto px-6
                      [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                      snap-x snap-mandatory">
        {cards.map((card) => (
          <div key={card.id} className="shrink-0 snap-start">
            <InviteCard card={card} />
          </div>
        ))}
      </div>

      {/* ✅ 하단 CTA 버튼 */}
      <div className="mt-12 flex justify-center px-6">
        <Link to="/InvitationEdit"> 
        <a
          // 라우트 경로만 원하시는 걸로 바꿔주세요 (예: /maker, /editor 등)
          className="group relative inline-flex items-center gap-2 rounded-2xl border border-black/10 
                     bg-white/80 px-6 py-3 text-sm font-medium text-stone-800 
                     shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur
                     transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]
                     focus:outline-none focus:ring-2 focus:ring-stone-300"
        >
          {/* 은은한 유광 하이라이트 */}
          <span
            className="pointer-events-none absolute inset-0 rounded-2xl
                       bg-gradient-to-r from-white/0 via-white/45 to-white/0
                       opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />
          {/* 아이콘 */}
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              d="M12 3a1 1 0 0 1 1 1v7h7a1 1 0 1 1 0 2h-7v7a1 1 0 1 1-2 0v-7H4a1 1 0 1 1 0-2h7V4a1 1 0 0 1 1-1Z"
              fill="currentColor"
            />
          </svg>
          청첩장 제작하기
        </a>
        </Link>
      </div>
    </div>
  );
}
