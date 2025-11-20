import React, { useState, useEffect } from 'react';

export default function NumberChainGame() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [chain, setChain] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [options, setOptions] = useState([]);
  const [operation, setOperation] = useState('+');
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(0);

  // O'yinni boshlash
  const startGame = () => {
    setScore(0);
    setLevel(1);
    setChain([]);
    setTimeLeft(60);
    setGameStarted(true);
    generateNewRound(1);
  };

  // Yangi raund yaratish
  const generateNewRound = (currentLevel) => {
    let start;
    let op;
    
    if (currentLevel <= 3) {
      start = Math.floor(Math.random() * 10) + 1;
      op = '+';
    } else if (currentLevel <= 6) {
      start = Math.floor(Math.random() * 20) + 10;
      op = Math.random() > 0.5 ? '+' : '-';
    } else {
      start = Math.floor(Math.random() * 10) + 2;
      op = '×';
    }

    setCurrentNumber(start);
    setChain([start]);
    setOperation(op);
    generateOptions(start, op);
  };

  // Variantlar yaratish
  const generateOptions = (num, op) => {
    const opts = [];
    const correctRange = op === '×' ? 10 : 15;
    
    for (let i = 0; i < 4; i++) {
      const option = Math.floor(Math.random() * correctRange) + 1;
      if (!opts.includes(option)) {
        opts.push(option);
      } else {
        i--;
      }
    }
    
    setOptions(opts.sort(() => Math.random() - 0.5));
  };

  // Raqam tanlash
  const selectNumber = (num) => {
    let result;
    
    if (operation === '+') {
      result = currentNumber + num;
    } else if (operation === '-') {
      result = currentNumber - num;
    } else if (operation === '×') {
      result = currentNumber * num;
    }

    setCurrentNumber(result);
    setChain([...chain, num, result]);
    setScore(score + (level * 5));

    // Yangi variantlar
    generateOptions(result, operation);

    // Level oshirish
    if (chain.length >= level * 4) {
      setLevel(level + 1);
      setTimeout(() => {
        generateNewRound(level + 1);
      }, 500);
    }
  };

  // Vaqt sanash
  useEffect(() => {
    if (!gameStarted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameStarted(false);
          if (score > highScore) {
            setHighScore(score);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, timeLeft]);

  if (!gameStarted && chain.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-500 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-3xl">
          <div className="text-center mb-8">
            <div className="text-8xl mb-6">🔗</div>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Sonlar Zanjiri</h1>
            <p className="text-2xl text-gray-600 mb-6">
              Raqamlarni tanlab uzun zanjir yarating!
            </p>
            {highScore > 0 && (
              <div className="bg-yellow-100 rounded-2xl p-4 mb-6">
                <div className="text-lg text-gray-700">Eng yuqori ball:</div>
                <div className="text-4xl font-bold text-yellow-600">{highScore}</div>
              </div>
            )}
          </div>

          <button
            onClick={startGame}
            className="w-full py-6 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl font-bold text-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all mb-8"
          >
            🚀 Boshlash
          </button>

          <div className="bg-blue-100 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📖 Qoidalar:</h3>
            <ul className="text-gray-700 space-y-3">
              <li>🔢 Boshlang&#39;ich raqam beriladi</li>
              <li>➕ Raqamlarni tanlab zanjir yarating</li>
              <li>📊 Har bir tanlash yangi natija beradi</li>
              <li>⏱️ 60 soniya ichida ko&#39;proq ball to&#39;plang</li>
              <li>⭐ Darajalar oshib boradi!</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (!gameStarted && chain.length > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-2xl">
          <div className="text-8xl mb-6">🏆</div>
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Vaqt tugadi!</h2>
          <div className="text-7xl font-bold text-purple-600 mb-8">{score}</div>
          <div className="text-2xl text-gray-600 mb-4">
            Zanjir uzunligi: {chain.length} ta raqam
          </div>
          <div className="text-2xl text-gray-600 mb-8">
            Erishilgan daraja: {level}
          </div>
          {score > highScore && (
            <div className="bg-yellow-100 rounded-2xl p-4 mb-6 animate-bounce">
              <div className="text-3xl font-bold text-yellow-600">
                🎉 Yangi rekord!
              </div>
            </div>
          )}
          <div className="flex gap-4 justify-center">
            <button
              onClick={startGame}
              className="px-12 py-6 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-bold text-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              🔄 Qayta o&#39;ynash
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-8">
          <div className="flex justify-between items-center">
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
              <div className="text-center">
                <div className="text-5xl mb-2">🔗</div>
                <div className="text-3xl font-bold text-blue-600">{chain.length}</div>
                <div className="text-sm text-gray-600">Zanjir</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-6xl font-bold text-red-600">{timeLeft}s</div>
              <div className="text-sm text-gray-600">Qolgan vaqt</div>
            </div>
          </div>
        </div>

        {/* Hozirgi raqam */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">Hozirgi natija:</h2>
            <div className="text-9xl font-bold text-purple-600 mb-6 animate-pulse">
              {currentNumber}
            </div>
            <div className="text-3xl text-gray-600">
              Keyingi amal: <span className="font-bold text-blue-600">{operation}</span>
            </div>
          </div>
        </div>

        {/* Variantlar */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Raqam tanlang:
          </h3>
          <div className="grid grid-cols-4 gap-6">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => selectNumber(option)}
                className="aspect-square bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white rounded-2xl text-5xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all active:scale-95"
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Zanjir tarixi */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">📜 Zanjir tarixi:</h3>
          <div className="flex flex-wrap gap-3 items-center">
            {chain.map((item, index) => (
              <React.Fragment key={index}>
                <div className={`px-6 py-3 rounded-xl font-bold text-2xl shadow-md ${
                  index % 2 === 0 
                    ? 'bg-gradient-to-br from-green-400 to-green-600 text-white' 
                    : 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white'
                }`}>
                  {item}
                </div>
                {index < chain.length - 1 && index % 2 === 0 && (
                  <div className="text-3xl font-bold text-gray-600">{operation}</div>
                )}
                {index < chain.length - 1 && index % 2 === 1 && (
                  <div className="text-3xl font-bold text-gray-400">=</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
