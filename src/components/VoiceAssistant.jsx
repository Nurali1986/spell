import React, { useState, useEffect } from "react";
import { Mic, X } from "lucide-react";
import "./VoiceAssistant.css";

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setIsSupported(false);
      return;
    }
  }, []);

  useEffect(() => {
    if (!isSupported || !isListening) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.lang = "uz-UZ";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Ovozni tanishda xatolik:", event.error);
      setIsListening(false);
      setTranscript("Xatolik: " + event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (error) {
      console.error("Recognition start error:", error);
      setIsListening(false);
    }

    return () => {
      try {
        recognition.abort();
      } catch (error) {
        console.error("Recognition abort error:", error);
      }
    };
  }, [isListening, isSupported]);

  const handleMicClick = () => {
    // DIALOGNI OCHISH - har doim
    setIsDialogOpen(true);
    
    if (!isSupported) {
      setTranscript("Brauzeringiz ovozni tanishni qo'llab-quvvatlamaydi");
      return;
    }

    setIsListening(!isListening);
    if (!isListening) {
      setTranscript("Gapiring...");
    } else {
      setTranscript("");
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsListening(false);
    setTranscript("");
  };

  return (
    <div className="voice-assistant">
      {/* Asosiy mikrafon tugmasi */}
      <button
        onClick={handleMicClick}
        className={`mic-button ${isListening ? "listening" : ""}`}
      >
        <Mic size={24} color="white" />
        {isListening && (
          <>
            <div className="pulse-ring"></div>
            <div className="pulse-ring delay-1"></div>
          </>
        )}
      </button>

      {/* Dialog oyna - mikrafon yonida chiqadi */}
      {isDialogOpen && (
        <div className="voice-dialog">
          {/* Yopish tugmasi */}
          <button className="close-button" onClick={handleCloseDialog}>
            <X size={16} color="#666" />
          </button>

          {/* Holat ko'rsatkichi */}
          <div className="status-indicator">
            <div className={`status-dot ${isListening ? "listening" : "idle"}`}></div>
            <span>{isListening ? "Eshtilmoqda..." : "Tayyor"}</span>
          </div>

          {/* Transkripsiya */}
          {transcript && (
            <div className="transcript-box">
              <div className="transcript-text">
                {transcript}
              </div>
            </div>
          )}

  
        </div>
      )}
    </div>
  );
}
