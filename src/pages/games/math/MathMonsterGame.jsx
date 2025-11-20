import React, { useState, useEffect } from 'react';

export default function MathMonsterGame() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [monster, setMonster] = useState({ health: 100, maxHealth: 100 });
  const [showFeedback, setShowFeedback] = useState(null);
  const [combo, setCombo] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Yangi savol yaratish
  const generateQuestion = () => {
    let num1, num2, operation, correctAnswer;

    if (level <= 3) {
      // Oson: Qo'shish (1-10)
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      operation = '+';
      correctAnswer = num1 + num2;
    } else if (level <= 6) {
      // O'rtacha: Ayirish va katta qo'shish
      num1 = Math.floor(Math.random() * 20) + 10;
      num2 = Math.floor(Math.random() * 10) + 1;
      operation = Math.random() > 0.5 ? '+' : '-';
      correctAnswer = operation === '+' ? num1 + num2 : num1 - num2;
    } else {
      // Qiyin: Ko'paytirish
      num1 = Math.floor(Math.random() * 10) + 2;
      num2 = Math.floor(Math.random() * 10) + 2;
      operation = '×';
      correctAnswer = num1 * num2;
    }

    // Noto'g'ri javoblar yaratish
    const wrongAnswers = [];
    while (wrongAnswers.length < 3) {
      const wrong = correctAnswer + Math.floor(Math.random() * 10) - 5;
      if (wrong !== correctAnswer && wrong > 0 && !wrongAnswers.includes(wrong)) {
        wrongAnswers.push(wrong);
      }
    }

    // Aralashtirib javoblar yaratish
    const allAnswers = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);

    setQuestion({ num1, num2, operation, correctAnswer });
    setAnswers(allAnswers);
  };

  // Javobni tekshirish
  const checkAnswer = (selectedAnswer) => {
    const isCorrect = selectedAnswer === question.correctAnswer;

    if (isCorrect) {
      // To'g'ri javob
      const points = 10 * level * (combo + 1);
      setScore(score + points);
      setCombo(combo + 1);
      
      // Yirtqichni urish
      const newHealth = Math.max(0, monster.health - 20);
      setMonster({ ...monster, health: newHealth });

      setShowFeedback({ type: 'correct', points });

      // Yirtqichni mag'lub etish
      if (newHealth === 0) {
        setTimeout(() => {
          setLevel(level + 1);
          setMonster({ health: 100 + (level * 20), maxHealth: 100 + (level * 20) });
          generateQuestion();
        }, 1500);
      } else {
        setTimeout(() => {
          generateQuestion();
        }, 800);
      }
    } else {
      // Noto'g'ri javob
      setLives(lives - 1);
      setCombo(0);
      setShowFeedback({ type: 'wrong' });

      if (lives <= 1) {
        setGameOver(true);
      } else {
        setTimeout(() => {
          generateQuestion();
        }, 1000);
      }
    }

    setTimeout(() => setShowFeedback(null), 800);
  };

  // O'yinni boshlash
  useEffect(() => {
    generateQuestion();
  }, []);

  // Qayta boshlash
  const restart = () => {
    setScore(0);
    setLevel(1);
    setLives(3);
    setCombo(0);
    setGameOver(false);
    setMonster({ health: 100, maxHealth: 100 });
    generateQuestion();
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 via-orange-400 to-yellow-400 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-2xl">
          <div className="text-8xl mb-6">😢</div>
          <h2 className="text-5xl font-bold text-gray-800 mb-4">O&#39;yin tugadi!</h2>
          <div className="text-6xl font-bold text-purple-600 mb-8">{score} ball</div>
          <div className="text-2xl text-gray-600 mb-8">
            Siz {level} darajaga yetdingiz!
          </div>
          <button
            onClick={restart}
            className="px-12 py-6 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-bold text-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            🔄 Qayta o&#39;ynash
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              {/* Ball */}
              <div className="text-center">
                <div className="text-5xl mb-2">⭐</div>
                <div className="text-3xl font-bold text-yellow-600">{score}</div>
                <div className="text-sm text-gray-600">Ball</div>
              </div>
              {/* Level */}
              <div className="text-center">
                <div className="text-5xl mb-2">🎯</div>
                <div className="text-3xl font-bold text-purple-600">{level}</div>
                <div className="text-sm text-gray-600">Daraja</div>
              </div>
              {/* Combo */}
              {combo > 0 && (
                <div className="text-center animate-bounce">
                  <div className="text-5xl mb-2">🔥</div>
                  <div className="text-3xl font-bold text-orange-600">×{combo}</div>
                  <div className="text-sm text-gray-600">Combo</div>
                </div>
              )}
            </div>

            {/* Jonlar */}
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="text-5xl">
                  {i < lives ? '❤️' : '🖤'}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Yirtqich */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Yirtqich #{level}
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-500 to-red-700 rounded-full transition-all duration-500 flex items-center justify-center text-white font-bold"
                style={{ width: `${(monster.health / monster.maxHealth) * 100}%` }}
              >
                {monster.health} / {monster.maxHealth}
              </div>
            </div>
          </div>

          {/* Yirtqich rasmi */}
          <div className="flex justify-center mb-8">
            <div className={`text-9xl transition-all duration-300 ${monster.health < 50 ? 'animate-bounce' : ''}`}>
              {level <= 3 && '👾'}
              {level > 3 && level <= 6 && '👹'}
              {level > 6 && '🐲'}
            </div>
          </div>
        </div>

        {/* Savol */}
        {question && (
          <div className="bg-white rounded-3xl shadow-2xl p-12 mb-8">
            <div className="text-center mb-8">
              <div className="text-8xl font-bold text-gray-800 mb-4">
                {question.num1} {question.operation} {question.num2} = ?
              </div>
              <p className="text-2xl text-gray-600">To&#39;g&#39;ri javobni tanlang:</p>
            </div>

            {/* Javoblar */}
            <div className="grid grid-cols-2 gap-6">
              {answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => checkAnswer(answer)}
                  className="bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white rounded-2xl p-8 text-6xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all active:scale-95"
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Feedback */}
        {showFeedback && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
            {showFeedback.type === 'correct' ? (
              <div className="bg-green-500 text-white rounded-3xl p-12 shadow-2xl transform scale-110 animate-bounce">
                <div className="text-8xl mb-4">✅</div>
                <div className="text-4xl font-bold">To&#39;g&#39;ri!</div>
                <div className="text-3xl mt-4">+{showFeedback.points} ball</div>
              </div>
            ) : (
              <div className="bg-red-500 text-white rounded-3xl p-12 shadow-2xl transform scale-110 animate-bounce">
                <div className="text-8xl mb-4">❌</div>
                <div className="text-4xl font-bold">Noto&#39;g&#39;ri!</div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
