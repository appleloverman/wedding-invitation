// import React, { useState } from "react";

const InvitationList = ({ invitationList, setInvitationList }) => {
  const deleteInvitationHandler = (ino) => {
    setInvitationList(invitationList.filter((i) => i.ino !== ino));
  };

  return (
    <div>
      InvitationList
      <div className="flex min-h-screen bg-gray-100">
        {Array.isArray(invitationList) &&
          invitationList.map((i) => (
            <div
              key={i.ino}
              className="flex-1 flex items-center justify-center p-6"
            >
              <div className="w-[375px] h-[667px] bg-white shadow-lg rounded-xl p-6 text-center">
                <h2 className="text-gray-500 text-sm">{i.date}</h2>
                <p className="text-gray-500 mb-4">{i.time}</p>
                <h1 className="text-2xl font-bold mb-2">INVITATION</h1>
                <p className="text-gray-600 mb-6">소중한 분들을 초대합니다</p>

                <p className="text-lg mb-2">{i.groomName} 🤵</p>
                <p className="text-lg mb-2">{i.brideName} 👰</p>

                <div className="mt-8 text-gray-500 text-sm">
                  <p>평생 서로 귀하게 여기며</p>
                  <p>사랑의 결실을 이루고자 합니다</p>
                </div>
                <button
                  className="w-full mt-6 bg-red-500 text-white py-2 rounded"
                  onClick={() => deleteInvitationHandler(i.ino)}
                >
                  삭제하기
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default InvitationList;
