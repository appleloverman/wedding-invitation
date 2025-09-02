import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header & Footer/Header";
import Footer from "./components/Header & Footer/Footer";
import Home from "./pages/Main/Home";
import InvitationCards from "./pages/Invitation/InvitationCards";
import InvitationAdd from "./pages/Invitation/InvitationAdd"; //새로운 청첩장 추가 컴포넌트
import InvitationList from "./pages/Invitation/InvitationList"; //만든 청첩장 리스트 컴포넌트
import FAQ from "./pages/FAQ/FAQ";
import Frame from "./pages/Frame/Frame";
import Letter from "./pages/Letter/Letter";
import Ticket from "./pages/Ticket/Ticket";
import Login from "./pages/Login/Login";
import Review from "./pages/Review/Review";
import InquiryPage from "./pages/FAQ/InquiryPage";
import InvitationEdit from "./pages/Invitation/InvitationEdit"; //청첩장 편집 컴포넌트

const HEADER_HEIGHT = 60;

function App() {
  const [invitationList, setInvitationList] = useState([
    {
      ino: 1,
      date: "2025-09-01",
      time: "12:00",
      groomName: "홍길동",
      brideName: "김영희",
      bg: "#F7F7F7",
      title1: "소중한 분들을 초대합니다",
      content: `저희 두 사람의 작은 만남이

    사랑의 결실을 이루어

    소중한 결혼식을 올리게 되었습니다.

    평생 서로 귀하게 여기며
    첫 마음 그대로 존중하고 배려하며 살겠습니다.

    오로지 믿음과 사랑을 약속하는 날
    오셔서 축복해 주시면 더 없는 기쁨으로
    간직하겠습니다.`,
    },
  ]);

  return (
    <Router>
      <Header />
      <main style={{ marginTop: `${HEADER_HEIGHT}px` }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/InvitationCards" element={<InvitationCards />} />
          <Route
            path="/InvitationAdd"
            element={
              <InvitationAdd
                invitationList={invitationList}
                setInvitationList={setInvitationList}
              />
            }
          />
          <Route
            path="/InvitationEdit/:ino"
            element={
              <InvitationEdit
                invitationList={invitationList}
                setInvitationList={setInvitationList}
              />
            }
          />
          <Route
            path="/InvitationList"
            element={
              <InvitationList
                invitationList={invitationList}
                setInvitationList={setInvitationList}
              />
            }
          />
          <Route path="/Review" element={<Review />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/FAQquery" element={<InquiryPage />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/letter" element={<Letter />} />
          <Route path="/frame" element={<Frame />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
