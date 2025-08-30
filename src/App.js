import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import InvitationDesign from "./pages/InvitationDesign";
import Login from "./pages/Login";
import Review from "./pages/Review";
import FAQ from "./pages/FAQ";
import Ticket from "./pages/Ticket";
import InvitationList from "./pages/InvitationList";
import Letter from "./pages/Letter";
import Frame from "./pages/Frame";

const HEADER_HEIGHT = 60;

function App() {
  const [invitationList, setInvitationList] = useState([
    {
      ino: 1,
      date: "2025-08-29",
      time: "12:00",
      groomName: "홍길동",
      brideName: "김영희",
      theme: "classic"
    }
  ]);

  return (
    <Router>
      <Header />
      <main style={{ marginTop: `${HEADER_HEIGHT}px` }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/InvitationDesign"
            element={
              <InvitationDesign
                invitationList={invitationList}
                setInvitationList={setInvitationList}
              />
            }
          />
          <Route path="/Review" element={<Review />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/letter" element={<Letter />} />
          <Route path="/frame" element={<Frame />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/InvitationList"
            element={
              <InvitationList
                invitationList={invitationList}
                setInvitationList={setInvitationList}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
