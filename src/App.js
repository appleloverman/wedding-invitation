import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import InvitationDesign from "./pages/InvitationDesign";
import Login from "./pages/Login";
import Review from "./pages/Review";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Header />
      <main style={{ paddingBottom: "60px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/InvitationDesign" element={<InvitationDesign />} />
          <Route path="/Review" element={<Review />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
