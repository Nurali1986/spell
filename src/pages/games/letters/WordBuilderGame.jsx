import React, { useState, useEffect } from 'react';

export default function WordBuilderGame() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentWord, setCurrentWord] = useState(null);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [availableLetters, setAvailableLetters] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [lives, setLives] = useState(3);

  // So'zlar bazasi
  const words = {
    1: [
      { word: 'OT', image: '🐴', hint: 'Hayvon, chavandoz minadi' },
      { word: 'IT', image: '🐕', hint: 'Sadoqatli hayvon' },
      { word: 'KOT', image: '🐱', hint: 'Miyovlaydi' },
    ],
    2: [
      { word: 'OLMA', image: '🍎', hint: 'Qizil meva' },
      { word: 'NON', image: '🍞', hint: 'Buğdodan tayyorlanadi' },
      { word: 'SUT', image: '🥛', hint: 'Oq ichimlik' },
      { word: 'BOL', image: '🍯', hint: 'Asalari shirin' },
    ],
    3: [
      { word: 'KITOB', image: '📚', hint: 'O\'qish uchun' },
      { word: 'QALAM', image: '✏️', hint: 'Yozish uchun' },
      { word: 'DAFTAR', image: '📓', hint: 'Maktabda kerak' },
    ],
    4: [
      { word: 'GULLAR', image: '🌹', hint: 'Bog\'da o\'sadi' },
      { word: 'DARAXT', image: '🌳', hint: 'Katta o\'simlik' },
      { word: 'MUSHUK', image: '😺', hint: 'Uy hayvoni' },
    ],
  };

  // Yangi so'z yaratish
  const generateNewWord = () => {
    const levelWords = words[Math.min(level, 4)];
    const wordData = levelWords[Math.floor(Math.random() * levelWords.length)];
    setCurrentWord(wordData);
    setSelectedLetters([]);

    // Harflarni aralashtirib berish
    const correctLetters = wordData.word.split('');
    const extraLetters = ['X', 'Z', 'Q', 'J', 'V', 'W'];
    const wrongLetters = extraLetters.slice(0, Math.min(3, correctLetters.length));
    
    const allLetters = [...correctLetters, ...wrongLetters]
      .sort(() => Math.random() - 0.5)
      .map((letter, index) => ({
        id: index,
        letter: letter,
        used: false,
      }));

    setAvailableLetters(allLetters);
    setShowHint(false);
  };

  // Dastlab so'z yaratish
  useEffect(() => {
    generateNewWord();
  }, []);

  // Harf tanlash
  const selectLetter = (letterId) => {
    const letter = availableLetters.find(l => l.id === letterId);
    if (!letter || letter.used) return;

    setSelectedLetters([...selectedLetters, letter.letter]);
    setAvailableLetters(
      availableLetters.map(l => 
        l.id === letterId ? { ...l, used: true } : l
      )
    );
  };

  // Harfni qaytarish
  const removeLetter = (index) => {
    const removedLetter = selectedLetters[index];
    setSelectedLetters(selectedLetters.filter((_, i) => i !== index));
    
    const letterToRestore = availableLetters.find(
      l => l.letter === removedLetter && l.used
    );
    if (letterToRestore) {
      setAvailableLetters(
        availableLetters.map(l =>
          l.id === letterToRestore.id ? { ...l, used: false } : l
        )
      );
    }
  };

  // Javobni tekshirish
  const checkAnswer = () => {
    const answer = selectedLetters.join('');
    
    if (answer === currentWord.word) {
      // To'g'ri!
      const points = currentWord.word.length * 10;
      setScore(score + points);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        
        // Har 3 ta so'zdan keyin daraja oshir
        if ((score + points) % 50 === 0) {
          setLevel(level + 1);
        }
        
        generateNewWord();
      }, 2000);
    } else {
      // Noto'g'ri
      setLives(lives - 1);
      setSelectedLetters([]);
      setAvailableLetters(
        availableLetters.map(l => ({ ...l, used: false }))
      );
    }
  };

  // Hint ko'rsatish
  const showHintToggle = () => {
    setShowHint(!showHint);
  };

  if (lives <= 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 via-orange-400 to-yellow-400 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="text-8xl mb-6">😢</div>
          <h2 className="text-5xl font-bold text-gray-800 mb-4">O&#39;yin tugadi!</h2>
          <div className="text-7xl font-bold text-purple-600 mb-8">{score}</div>
          <div className="text-2xl text-gray-600 mb-8">Erishilgan daraja: {level}</div>
          <button
            onClick={() => {
              setScore(0);
              setLevel(1);
              setLives(3);
              generateNewWord();
            }}
            className="px-12 py-6 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-bold text-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            🔄 Qayta o&#39;ynash
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-500 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">🔤 So&#39;z Qurish</h1>
              <p className="text-gray-600 mt-2">Harflardan so&#39;z tuzing!</p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-5xl mb-2">⭐</div>
                <div className="text-3xl font-bold text-yellow-600">{score}</div>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-2">🎯</div>
                <div className="text-3xl font-bold text-purple-600">{level}</div>
              </div>
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="text-4xl">
                    {i < lives ? '❤️' : '🖤'}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Rasm va hint */}
        {currentWord && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <div className="text-center">
              <div className="text-9xl mb-6">{currentWord.image}</div>
              {showHint && (
                <div className="bg-yellow-100 rounded-2xl p-4 mb-4 animate-bounce">
                  <p className="text-2xl text-gray-800 font-semibold">
                    💡 {currentWord.hint}
                  </p>
                </div>
              )}
              <button
                onClick={showHintToggle}
                className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full font-bold text-lg shadow-lg transition-all"
              >
                {showHint ? '🙈 Yashirish' : '💡 Maslahat'}
              </button>
            </div>
          </div>
        )}

        {/* Tanlangan harflar */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            So&#39;zingiz:
          </h3>
          <div className="flex justify-center gap-3 mb-6 min-h-[100px] flex-wrap">
            {currentWord && [...Array(currentWord.word.length)].map((_, index) => (
              <div
                key={index}
                onClick={() => selectedLetters[index] && removeLetter(index)}
                className={`w-20 h-24 rounded-2xl border-4 flex items-center justify-center text-5xl font-bold cursor-pointer transition-all ${
                  selectedLetters[index]
                    ? 'bg-gradient-to-br from-green-400 to-green-600 text-white border-green-600 shadow-lg'
                    : 'bg-gray-100 border-gray-300 border-dashed'
                }`}
              >
                {selectedLetters[index] || ''}
              </div>
            ))}
          </div>

          {selectedLetters.length === currentWord?.word.length && (
            <div className="text-center">
              <button
                onClick={checkAnswer}
                className="px-12 py-6 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-bold text-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                ✅ Tekshirish
              </button>
            </div>
          )}
        </div>

        {/* Mavjud harflar */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Harflar:
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {availableLetters.map((letter) => (
              <button
                key={letter.id}
                onClick={() => selectLetter(letter.id)}
                disabled={letter.used}
                className={`w-16 h-20 rounded-xl text-4xl font-bold shadow-lg transition-all ${
                  letter.used
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-br from-purple-400 to-pink-500 text-white hover:scale-110 cursor-pointer active:scale-95'
                }`}
              >
                {letter.letter}
              </button>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setSelectedLetters([]);
                setAvailableLetters(
                  availableLetters.map(l => ({ ...l, used: false }))
                );
              }}
              className="px-8 py-4 bg-gray-500 hover:bg-gray-600 text-white rounded-full font-bold text-lg shadow-lg transition-all"
            >
              🔄 Qayta boshlash
            </button>
          </div>
        </div>

        {/* Success modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-12 shadow-2xl text-center transform scale-110 animate-bounce">
              <div className="text-9xl mb-6">🎉</div>
              <h2 className="text-5xl font-bold text-green-600 mb-4">Ajoyib!</h2>
              <div className="text-6xl font-bold text-purple-600 mb-4">
                {currentWord.word}
              </div>
              <p className="text-2xl text-gray-700">+{currentWord.word.length * 10} ball</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
