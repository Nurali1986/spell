import React, { useState, useEffect } from 'react';

export default function LetterSafariGame() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');

  // Harf to'plamlari
  const letterSets = {
    easy: ['A', 'O', 'I', 'E', 'U'],
    medium: ['A', 'B', 'D', 'K', 'L', 'M', 'N', 'O'],
    hard: ['A', 'B', 'D', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T'],
  };

  const availableLetters = letterSets[difficulty];

  // Yangi ketma-ketlik yaratish
  const generateSequence = (length) => {
    const newSequence = [];
    for (let i = 0; i < length; i++) {
      const randomLetter = availableLetters[Math.floor(Math.random() * availableLetters.length)];
      newSequence.push(randomLetter);
    }
    return newSequence;
  };

  // O'yinni boshlash
  const startGame = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setScore(0);
    setLevel(1);
    setGameOver(false);
    setGameStarted(true);
    startRound(1);
  };

  // Raundni boshlash
  const startRound = (currentLevel) => {
    const newSequence = generateSequence(2 + currentLevel);
    setSequence(newSequence);
    setPlayerSequence([]);
    setCurrentIndex(-1);
    
    setTimeout(() => {
      showSequence(newSequence);
    }, 1000);
  };

  // Ketma-ketlikni ko'rsatish
  const showSequence = async (seq) => {
    setIsShowing(true);
    
    for (let i = 0; i < seq.length; i++) {
      setCurrentIndex(i);
      await new Promise(resolve => setTimeout(resolve, 800));
      setCurrentIndex(-1);
      await new Promise(resolve => setTimeout(resolve, 400));
    }
    
    setIsShowing(false);
  };

  // Harf tanlash
  const selectLetter = (letter) => {
    if (isShowing) return;

    const newPlayerSeq = [...playerSequence, letter];
    setPlayerSequence(newPlayerSeq);

    const currentPos = newPlayerSeq.length - 1;
    
    if (newPlayerSeq[currentPos] !== sequence[currentPos]) {
      // Noto'g'ri!
      setGameOver(true);
      setGameStarted(false);
    } else if (newPlayerSeq.length === sequence.length) {
      // To'g'ri! Keyingi daraja
      const points = sequence.length * 10;
      setScore(score + points);
      
      setTimeout(() => {
        setLevel(level + 1);
        startRound(level + 1);
      }, 1000);
    }
  };

  if (!gameStarted && !gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-teal-400 to-blue-500 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-4xl">
          <div className="text-center mb-8">
            <div className="text-8xl mb-4">🦁</div>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Harf Safari</h1>
            <p className="text-2xl text-gray-600">Harflar ketma-ketligini eslang!</p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => startGame('easy')}
              className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <div className="text-6xl mb-4">😊</div>
              <div className="text-2xl font-bold mb-2">Oson</div>
              <div className="text-lg">5 ta unli</div>
            </button>

            <button
              onClick={() => startGame('medium')}
              className="bg-gradient-to-br from-yellow-400 to-orange-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <div className="text-6xl mb-4">🤔</div>
              <div className="text-2xl font-bold mb-2">O&#39;rtacha</div>
              <div className="text-lg">8 ta harf</div>
            </button>

            <button
              onClick={() => startGame('hard')}
              className="bg-gradient-to-br from-red-400 to-red-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <div className="text-6xl mb-4">😎</div>
              <div className="text-2xl font-bold mb-2">Qiyin</div>
              <div className="text-lg">13 ta harf</div>
            </button>
          </div>

          <div className="bg-blue-100 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">📖 Qanday o&#39;ynash:</h3>
            <ul className="text-gray-700 space-y-2">
              <li>👀 Harflar ketma-ketligini diqqat bilan kuzating</li>
              <li>🧠 Harflarni eslang</li>
              <li>👆 Xuddi o&#39;sha tartibda harflarni bosing</li>
              <li>⬆️ Har bir darajada ketma-ketlik uzayadi</li>
              <li>🏆 Qancha uzoqqa borishingizni sinab ko&#39;ring!</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 via-orange-400 to-yellow-400 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="text-8xl mb-6">😢</div>
          <h2 className="text-5xl font-bold text-gray-800 mb-4">O&#39;yin tugadi!</h2>
          <div className="text-7xl font-bold text-purple-600 mb-4">{score}</div>
          <div className="text-2xl text-gray-600 mb-8">
            Erishilgan daraja: {level}
          </div>
          <div className="bg-blue-100 rounded-2xl p-6 mb-8">
            <p className="text-lg text-gray-700 mb-2">To&#39;g&#39;ri ketma-ketlik:</p>
            <div className="flex gap-2 justify-center flex-wrap">
              {sequence.map((letter, index) => (
                <div
                  key={index}
                  className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-xl flex items-center justify-center text-3xl font-bold shadow-lg"
                >
                  {letter}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setGameOver(false);
                setGameStarted(false);
              }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              🏠 Bosh sahifa
            </button>
            <button
              onClick={() => startGame(difficulty)}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              🔄 Qayta o&#39;ynash
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-green-400 to-emerald-500 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">🦁 Harf Safari</h1>
              <p className="text-gray-600 mt-2">Ketma-ketlikni eslang!</p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-5xl mb-2">⭐</div>
                <div className="text-3xl font-bold text-yellow-600">{score}</div>
                <div className="text-sm text-gray-600">Ball</div>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-2">🎯</div>
                <div className="text-3xl font-bold text-purple-600">{level}</div>
                <div className="text-sm text-gray-600">Daraja</div>
              </div>
            </div>
          </div>
        </div>

        {/* Holat */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <div className="text-center">
            {isShowing ? (
              <>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  👀 Diqqat bilan kuzating!
                </h2>
                <div className="text-7xl mb-4">🧠</div>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Endi siz bosing!
                </h2>
                <div className="flex gap-3 justify-center flex-wrap mb-6">
                  {playerSequence.map((letter, index) => (
                    <div
                      key={index}
                      className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-xl flex items-center justify-center text-3xl font-bold shadow-lg"
                    >
                      {letter}
                    </div>
                  ))}
                  {[...Array(sequence.length - playerSequence.length)].map((_, index) => (
                    <div
                      key={`empty-${index}`}
                      className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center text-3xl font-bold border-2 border-dashed border-gray-400"
                    >
                      ?
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Ko'rsatilayotgan ketma-ketlik */}
        {isShowing && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <div className="flex gap-4 justify-center flex-wrap">
              {sequence.map((letter, index) => (
                <div
                  key={index}
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl font-bold shadow-lg transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white scale-125'
                      : index < currentIndex
                      ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {index <= currentIndex ? letter : '?'}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Harf tugmalari */}
        {!isShowing && (
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Harflarni tanlang:
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {availableLetters.map((letter, index) => (
                <button
                  key={index}
                  onClick={() => selectLetter(letter)}
                  className="aspect-square bg-gradient-to-br from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white rounded-2xl text-4xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all active:scale-95"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
