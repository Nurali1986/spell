import React, { useState, useEffect, useRef } from "react";
import "./HarfModal.css";

const HarfModal = ({ isOpen, onClose, card }) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const speechSynthRef = useRef(null);

  // Speech Synthesis ni ishga tushirish
  useEffect(() => {
    speechSynthRef.current = window.speechSynthesis;
    
    return () => {
      if (speechSynthRef.current) {
        speechSynthRef.current.cancel();
      }
    };
  }, []);

  // Modal ochilganda avtomatik o'qishni boshlash
  useEffect(() => {
    if (isOpen && card) {
      startReading();
    }
  }, [isOpen, card]);

  // Matnni o'qish funksiyasi
  const speakText = (text) => {
    if (!speechSynthRef.current) return;

    // Oldingi o'qishni to'xtatish
    speechSynthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // O'zbek tili sozlamalari
    utterance.lang = 'uz-UZ';
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsPlaying(true);
    };

    utterance.onend = () => {
      if (currentIndex < card.examples.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsPlaying(false);
        setCurrentIndex(-1);
      }
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
      setCurrentIndex(-1);
    };

    speechSynthRef.current.speak(utterance);
  };

  // Har bir index o'zgarganda yangi so'zni o'qish
  useEffect(() => {
    if (card && currentIndex >= 0 && currentIndex < card.examples.length) {
      speakText(card.examples[currentIndex]);
    }
  }, [currentIndex]);

  // O'qishni boshlash
  const startReading = () => {
    if (!card) return;
    
    // Oldingi o'qishni to'xtatish
    if (speechSynthRef.current) {
      speechSynthRef.current.cancel();
    }
    
    setCurrentIndex(-1);
    setIsPlaying(true);
    
    // Birinchi "Bu A harfi" ni o'qish
    setTimeout(() => {
      speakText(`${card.label} harfi`);
    }, 100);
  };

  // Modal yopilganda o'qishni to'xtatish
  const handleClose = () => {
    if (speechSynthRef.current) {
      speechSynthRef.current.cancel();
    }
    setIsPlaying(false);
    setCurrentIndex(-1);
    onClose();
  };

  if (!isOpen || !card) return null;

  return (
    <div className="harf-modal" onClick={handleClose}>
      <div className="harf-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="harf-modal-close" onClick={handleClose}>
          ×
        </button>
        
        <h2 className="harf-modal-title">{card.label}</h2>

        {/* Qayta o'qish tugmasi */}
        <div className="audio-controls">
          <button 
            className="reread-button"
            onClick={startReading}
          >
            🔄 Qayta o'qish
          </button>
        </div>

        {/* Progress ko'rsatgich */}
        {isPlaying && (
          <div className="progress-indicator">
            {currentIndex === -1 ? (
              "Harf o'qilyapti..."
            ) : (
              `O'qilyapti: ${currentIndex + 1} / ${card.examples.length}`
            )}
          </div>
        )}

        <div className="harf-img1">
          <div className="harf-img2">
            <div className={`harf-img3 ${currentIndex === 0 && isPlaying ? 'active' : ''}`}>
              <img src={card.exampleImages[0]} alt={card.examples[0]} className="example-image" />
              <div className="example-text">{card.examples[0]}</div>
              {currentIndex === 0 && isPlaying && <div className="playing-indicator">🔊</div>}
            </div>
            <div className={`harf-img3 ${currentIndex === 1 && isPlaying ? 'active' : ''}`}>
              <img src={card.exampleImages[1]} alt={card.examples[1]} className="example-image" />
              <div className="example-text">{card.examples[1]}</div>
              {currentIndex === 1 && isPlaying && <div className="playing-indicator">🔊</div>}
            </div>
          </div>
          <div className="harf-img2">
            <div className={`harf-img3 ${currentIndex === 2 && isPlaying ? 'active' : ''}`}>
              <img src={card.exampleImages[2]} alt={card.examples[2]} className="example-image" />
              <div className="example-text">{card.examples[2]}</div>
              {currentIndex === 2 && isPlaying && <div className="playing-indicator">🔊</div>}
            </div>
            <div className={`harf-img3 ${currentIndex === 3 && isPlaying ? 'active' : ''}`}>
              <img src={card.exampleImages[3]} alt={card.examples[3]} className="example-image" />
              <div className="example-text">{card.examples[3]}</div>
              {currentIndex === 3 && isPlaying && <div className="playing-indicator">🔊</div>}
            </div>
          </div>
        </div>

 

      </div>
    </div>
  );
};

export default HarfModal;
