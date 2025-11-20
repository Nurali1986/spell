import React, { useState, useEffect } from 'react';

export default function LetterHuntGame() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [targetLetter, setTargetLetter] = useState(null);
  const [flyingLetters, setFlyingLetters] = useState([]);
  const [lives, setLives] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(null);
  const [difficulty, setDifficulty] = useState('easy');

  // Harf to'plamlari
  const letterSets = {
    easy: ['A', 'O', 'I', 'U', 'E'],
    medium: ['B', 'D', 'L', 'M', 'N', 'R', 'S', 'T'],
    hard: ['G', 'K', 'P', 'Q', 'V', 'X', 'Y', 'Z', 'SH', 'CH'],
  };

  // Yangi maqsad harf
  const generateTarget = () => {
    const letters = letterSets[difficulty];
    const target = letters[Math.floor(Math.random() * letters.length)];
    setTargetLetter(target);
  };

  // Uchuvchi harflar yaratish
  const addFlyingLetter = () => {
    const letters = letterSets[difficulty];
    const isCorrect = Math.random() > 0.3;
    const letter = isCorrect 
      ? targetLetter 
      : letters[Math.floor(Math.random() * letters.length)];

    const newLetter = {
      id: Date.now() + Math.random(),
      letter: letter,
      x: Math.random() * 90,
      y: -10,
      speed: 1 + (level * 0.2),
      isCorrect: letter === targetLetter,
    };

    setFlyingLetters(prev => [...prev, newLetter]);
  };

  // Harflarni harakatlantirish
  useEffect(() => {
    if (!gameStarted) return;

    const interval = setInterval(() => {
      setFlyingLetters(prev => 
        prev
          .map(letter => ({ 
            ...letter, 
            y: letter.y + letter.speed 
          }))
          .filter(letter => {
            if (letter.y > 100) {
              if (letter.isCorrect) {
                setLives(l => l - 1);
                if (lives <= 1) endGame();
              }
              return false;
            }
            return true;
          })
      );
    }, 50);

    return () => clearInterval(interval);
  }, [gameStarted, lives]);

  // Harf qo'shish
  useEffect(() => {
    if (!gameStarted) return;

    const interval = setInterval(() => {
      addFlyingLetter();
    }, 2000 - (level * 100));

    return () => clearInterval(interval);
  }, [gameStarted, targetLetter, level]);

  // O'yinni boshlash
  const startGame = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setScore(0);
    setLevel(1);
    setLives(3);
    setFlyingLetters([]);
    setGameStarted(true);
    
    // Maqsad harfni yaratish
    setTimeout(() => {
      const letters = letterSets[selectedDifficulty];
      setTargetLetter(letters[0]);
    }, 100);
  };

  // O'yinni tugatish
  const endGame = () => {
    setGameStarted(false);
    setFlyingLetters([]);
  };

  // Harfni bosish
  const catchLetter = (letterId) => {
    const letter = flyingLetters.find(l => l.id === letterId);
    if (!letter) return;

    if (letter.isCorrect) {
      setScore(score + 10);
      setShowFeedback({ type: 'correct', letter: letter.letter });
      
      if ((score + 10) % 50 === 0) {
        setLevel(level + 1);
        generateTarget();
      }
    } else {
      setLives(lives - 1);
      setShowFeedback({ type: 'wrong', letter: letter.letter });
      if (lives <= 1) endGame();
    }

    setFlyingLetters(prev => prev.filter(l => l.id !== letterId));
    setTimeout(() => setShowFeedback(null), 500);
  };

  // Dastlab maqsad yaratish
  useEffect(() => {
    if (targetLetter && gameStarted) {
      generateTarget();
    }
  }, [level]);

  if (!gameStarted && score === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-4xl">
          <div className="text-center mb-8">
            <div className="text-8xl mb-4">🎯</div>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Harf Ovchisi!</h1>
            <p className="text-2xl text-gray-600">To&#39;g&#39;ri harflarni tut!</p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => startGame('easy')}
              className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <div className="text-6xl mb-4">😊</div>
              <div className="text-2xl font-bold mb-2">Oson</div>
              <div className="text-lg">Unlilar: A, O, I...</div>
            </button>

            <button
              onClick={() => startGame('medium')}
              className="bg-gradient-to-br from-yellow-400 to-orange-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <div className="text-6xl mb-4">🤔</div>
              <div className="text-2xl font-bold mb-2">O&#39;rtacha</div>
              <div className="text-lg">Undoshlar: B, D, L...</div>
            </button>

            <button
              onClick={() => startGame('hard')}
              className="bg-gradient-to-br from-red-400 to-red-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <div className="text-6xl mb-4">😎</div>
              <div className="text-2xl font-bold mb-2">Qiyin</div>
              <div className="text-lg">Qiyin harflar</div>
            </button>
          </div>

          <div className="bg-blue-100 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">📖 Qanday o&#39;ynash:</h3>
            <ul className="text-gray-700 space-y-2">
              <li>🎯 Yuqorida maqsad harf ko&#39;rsatiladi</li>
              <li>✈️ Harflar yuqoridan uchib tushadi</li>
              <li>👆 Faqat to&#39;g&#39;ri harfni bosing</li>
              <li>❤️ Noto&#39;g&#39;ri harfni bossangiz yoki o&#39;tkazib yuborsangiz jon yo&#39;qotasiz</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (!gameStarted && score > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-400 to-pink-500 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="text-8xl mb-6">🏆</div>
          <h2 className="text-5xl font-bold text-gray-800 mb-4">O&#39;yin tugadi!</h2>
          <div className="text-7xl font-bold text-purple-600 mb-8">{score}</div>
          <div className="text-2xl text-gray-600 mb-8">Daraja: {level}</div>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 p-8">
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
                <div className="text-5xl mb-2">🎯</div>
                <div className="text-3xl font-bold text-purple-600">{level}</div>
              </div>
            </div>

            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="text-5xl">
                  {i < lives ? '❤️' : '🖤'}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Maqsad harf */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Shu harfni ushla:</h2>
            <div className="text-9xl font-bold text-purple-600 animate-pulse">
              {targetLetter}
            </div>
          </div>
        </div>

        {/* O'yin maydoni */}
        <div className="relative bg-gradient-to-b from-sky-200 to-green-200 rounded-3xl shadow-2xl overflow-hidden" style={{ height: '500px' }}>
          {/* Uchuvchi harflar */}
          {flyingLetters.map(letter => (
            <button
              key={letter.id}
              onClick={() => catchLetter(letter.id)}
              className={`absolute text-5xl font-bold transition-all duration-100 rounded-2xl px-6 py-4 shadow-lg transform hover:scale-110 ${
                letter.isCorrect
                  ? 'bg-gradient-to-br from-green-400 to-green-600 text-white'
                  : 'bg-gradient-to-br from-red-400 to-red-600 text-white'
              }`}
              style={{
                left: `${letter.x}%`,
                top: `${letter.y}%`,
              }}
            >
              {letter.letter}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
            {showFeedback.type === 'correct' ? (
              <div className="bg-green-500 text-white rounded-3xl p-12 shadow-2xl transform scale-110 animate-bounce">
                <div className="text-9xl mb-4">✅</div>
                <div className="text-5xl font-bold">{showFeedback.letter}</div>
              </div>
            ) : (
              <div className="bg-red-500 text-white rounded-3xl p-12 shadow-2xl transform scale-110 animate-bounce">
                <div className="text-9xl mb-4">❌</div>
                <div className="text-5xl font-bold">{showFeedback.letter}</div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
