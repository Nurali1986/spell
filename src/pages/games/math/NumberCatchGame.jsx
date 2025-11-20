import React, { useState, useEffect, useRef } from 'react';

export default function NumberCatchGame() {
  const [score, setScore] = useState(0);
  const [targetNumber, setTargetNumber] = useState(null);
  const [fallingNumbers, setFallingNumbers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [difficulty, setDifficulty] = useState('easy');
  const [basketPosition, setBasketPosition] = useState(50);
  const gameInterval = useRef(null);
  const timerInterval = useRef(null);

  // Yangi maqsad raqam yaratish
  const generateTarget = () => {
    if (difficulty === 'easy') {
      // Oddiy qo'shish
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      setTargetNumber({ equation: `${a} + ${b}`, answer: a + b });
    } else if (difficulty === 'medium') {
      // Qo'shish/Ayirish
      const a = Math.floor(Math.random() * 20) + 10;
      const b = Math.floor(Math.random() * 10) + 1;
      const isAdd = Math.random() > 0.5;
      if (isAdd) {
        setTargetNumber({ equation: `${a} + ${b}`, answer: a + b });
      } else {
        setTargetNumber({ equation: `${a} - ${b}`, answer: a - b });
      }
    } else {
      // Ko'paytirish
      const a = Math.floor(Math.random() * 10) + 2;
      const b = Math.floor(Math.random() * 10) + 2;
      setTargetNumber({ equation: `${a} × ${b}`, answer: a * b });
    }
  };

  // Tushayotgan raqam qo'shish
  const addFallingNumber = () => {
    if (!targetNumber) return;

    const isCorrect = Math.random() > 0.5;
    const number = isCorrect 
      ? targetNumber.answer 
      : targetNumber.answer + Math.floor(Math.random() * 10) - 5;

    if (number > 0) {
      const newNumber = {
        id: Date.now() + Math.random(),
        value: number,
        x: Math.random() * 80 + 10,
        y: -10,
        isCorrect: number === targetNumber.answer,
      };

      setFallingNumbers(prev => [...prev, newNumber]);
    }
  };

  // Raqamlarni tushirish
  useEffect(() => {
    if (!gameStarted) return;

    const interval = setInterval(() => {
      setFallingNumbers(prev => 
        prev
          .map(num => ({ ...num, y: num.y + 2 }))
          .filter(num => num.y < 100)
      );
    }, 50);

    return () => clearInterval(interval);
  }, [gameStarted]);

  // O'yinni boshlash
  const startGame = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setScore(0);
    setTimeLeft(30);
    setFallingNumbers([]);
    setGameStarted(true);
    setBasketPosition(50);
    generateTarget();

    // Raqamlar qo'shish
    gameInterval.current = setInterval(() => {
      addFallingNumber();
    }, 1500);

    // Vaqt sanash
    timerInterval.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // O'yinni tugatish
  const endGame = () => {
    setGameStarted(false);
    clearInterval(gameInterval.current);
    clearInterval(timerInterval.current);
  };

  // Savat harakati (sichqoncha)
  const handleMouseMove = (e) => {
    if (!gameStarted) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setBasketPosition(Math.max(5, Math.min(95, x)));
  };

  // Raqamni ushlash
  useEffect(() => {
    if (!gameStarted) return;

    const caught = fallingNumbers.filter(num => {
      const numX = num.x;
      const basketX = basketPosition;
      const distance = Math.abs(numX - basketX);
      return num.y >= 85 && num.y <= 95 && distance < 8;
    });

    if (caught.length > 0) {
      caught.forEach(num => {
        if (num.isCorrect) {
          setScore(prev => prev + 10);
          generateTarget();
        } else {
          setScore(prev => Math.max(0, prev - 5));
        }
      });

      setFallingNumbers(prev => 
        prev.filter(num => !caught.includes(num))
      );
    }
  }, [fallingNumbers, basketPosition, gameStarted]);

  if (!gameStarted && score === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-400 to-indigo-500 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-4xl">
          <div className="text-center mb-8">
            <div className="text-8xl mb-4">🧺</div>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Raqamlarni Ushla!</h1>
            <p className="text-2xl text-gray-600">Savat bilan to&#39;g&#39;ri javobni ushlang</p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => startGame('easy')}
              className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <div className="text-6xl mb-4">😊</div>
              <div className="text-2xl font-bold mb-2">Oson</div>
              <div className="text-lg">Qo&#39;shish (1-10)</div>
            </button>

            <button
              onClick={() => startGame('medium')}
              className="bg-gradient-to-br from-yellow-400 to-orange-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <div className="text-6xl mb-4">🤔</div>
              <div className="text-2xl font-bold mb-2">O&#39;rtacha</div>
              <div className="text-lg">+/- (10-30)</div>
            </button>

            <button
              onClick={() => startGame('hard')}
              className="bg-gradient-to-br from-red-400 to-red-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <div className="text-6xl mb-4">😎</div>
              <div className="text-2xl font-bold mb-2">Qiyin</div>
              <div className="text-lg">Ko&#39;paytirish</div>
            </button>
          </div>

          <div className="bg-blue-100 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">📖 Qanday o&#39;ynash:</h3>
            <ul className="text-gray-700 space-y-2">
              <li>🎯 Yuqorida misol ko&#39;rsatiladi</li>
              <li>🔢 Raqamlar yuqoridan tushadi</li>
              <li>🧺 Savatni sichqoncha bilan harakatlantiring</li>
              <li>✅ To&#39;g&#39;ri javobni ushlang (+10 ball)</li>
              <li>❌ Noto&#39;g&#39;ri javobni ushlamaslik kerak (-5 ball)</li>
              <li>⏱️ 30 soniya ichida ko&#39;proq ball to&#39;plang!</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (!gameStarted && score > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="text-8xl mb-6">🎉</div>
          <h2 className="text-5xl font-bold text-gray-800 mb-4">O&#39;yin tugadi!</h2>
          <div className="text-6xl font-bold text-purple-600 mb-8">{score} ball</div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setScore(0);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-5xl mb-2">⭐</div>
                <div className="text-3xl font-bold text-yellow-600">{score}</div>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-2">⏱️</div>
                <div className="text-3xl font-bold text-red-600">{timeLeft}s</div>
              </div>
            </div>
            <div className="text-center bg-purple-100 rounded-2xl px-6 py-3">
              <div className="text-4xl font-bold text-purple-600">
                {targetNumber?.equation} = ?
              </div>
            </div>
          </div>
        </div>

        {/* O'yin maydoni */}
        <div 
          className="relative bg-gradient-to-b from-sky-300 to-sky-500 rounded-3xl shadow-2xl overflow-hidden"
          style={{ height: '600px' }}
          onMouseMove={handleMouseMove}
        >
          {/* Tushayotgan raqamlar */}
          {fallingNumbers.map(num => (
            <div
              key={num.id}
              className={`absolute text-4xl font-bold transition-all duration-100 ${
                num.isCorrect 
                  ? 'text-white bg-green-500' 
                  : 'text-white bg-red-500'
              } rounded-2xl px-4 py-2 shadow-lg`}
              style={{
                left: `${num.x}%`,
                top: `${num.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {num.value}
            </div>
          ))}

          {/* Savat */}
          <div
            className="absolute bottom-4 transition-all duration-100"
            style={{
              left: `${basketPosition}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="text-7xl">🧺</div>
          </div>

          {/* Yerga tushgan chiziq */}
          <div className="absolute bottom-20 left-0 right-0 h-1 bg-yellow-400 opacity-50"></div>
        </div>

      </div>
    </div>
  );
}
