import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DesktopNavbar from "./components/DesktopNavbar";
import MobileNavbar from "./components/MobileNavbar";
import Footer from "./components/Footer";
import Alifbe from "./pages/Alifbe";
import GamesHub from "./pages/games/GamesHub";
import VoiceAssistant from "./components/VoiceAssistant";
import "./App.css";

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      <div className="container">
        {isMobile ? <MobileNavbar /> : <DesktopNavbar />}
        
        <Routes>
          <Route path="/" element={<Alifbe />} />
          <Route path="/games" element={<GamesHub />} />
        </Routes>
        
        <Footer />
        <VoiceAssistant />
      </div>
    </Router>
  );
}
