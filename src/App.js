import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import InvitationDesign from "./pages/InvitationDesign";
import Login from "./pages/Login";
import Review from "./pages/Review";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import InvitationList from "./pages/InvitationList";

function App() {
  const [invitationList, setInvitationList] = useState([
    {
      ino: 1,
      date: "2025-08-29",
      time: "12:00",
      groomName: "홍길동",
      brideName: "김영희",
      theme: "classic",
    },
  ]);
  return (
    <Router>
      <Header />
      <main style={{ paddingBottom: "60px" }}>
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
          <Route path="/contact" element={<Contact />} />
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
