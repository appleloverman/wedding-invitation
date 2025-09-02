// import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Calendar } from "./Calendar";
import { FormatAll } from "./FormatAll";

const InvitationList = ({ invitationList, setInvitationList }) => {
  const deleteInvitationHandler = (ino) => {
    setInvitationList(invitationList.filter((i) => i.ino !== ino));
  };

  return (
    <div>
      <div className="flex min-h-screen bg-gray-100">
        {Array.isArray(invitationList) &&
          invitationList.map((i) => (
            <div
              key={i.ino}
              className="flex-1 flex items-center justify-center p-6"
            >
              <div className="w-[375px] h-[667px] bg-white shadow-lg rounded-xl p-6 text-center">
                {/* 상단 날짜/요일 */}
                <h2 className="meta meta--upper">
                  {FormatAll(i.date, i.time).dateSlash}
                </h2>
                <h2 className="meta meta--upper">
                  {FormatAll(i.date, i.time).weekdayUpperEn}
                </h2>

                {/* 이름 */}
                <p className="names">
                  {i.groomName} 🤵 · {i.brideName} 👰
                </p>

                {/* 한국어 날짜/시간 포맷 */}
                <div className="text-center">
                  <h2 className="meta">
                    {FormatAll(i.date, i.time).koDateTimeFull}
                  </h2>
                </div>

                {/* 소개/본문 */}
                <div className="intro">
                  <p className="intro__tag">INVITATION</p>
                  <p className="intro__title">{i.title1}</p>
                  <p className="intro__body">{i.content}</p>
                </div>

                {/* 버튼 */}
                <Link to="/InvitationEdit">
                  <button className="w-full mt-6 bg-blue-500 text-white py-2 rounded">
                    편집하기
                  </button>
                </Link>

                <button
                  className="w-full mt-6 bg-red-500 text-white py-2 rounded"
                  onClick={() => deleteInvitationHandler(i.ino)}
                >
                  삭제하기
                </button>
                <button className="w-full mt-6 bg-green-500 text-white py-2 rounded">
                  구매하기
                </button>
              </div>
            </div>
          ))}
        <Link to="/InvitationEdit">
          <button>추가하기</button>
        </Link>
      </div>
    </div>
  );
};

export default InvitationList;
