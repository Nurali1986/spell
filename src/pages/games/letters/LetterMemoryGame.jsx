import React, { useState, useEffect } from 'react';

export default function LetterMemoryGame() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Harf juftlari
  const letterPairs = [
    { letter: 'A', word: 'OLMA', emoji: '🍎' },
    { letter: 'B', word: 'BALIQ', emoji: '🐟' },
    { letter: 'D', word: 'DARAXT', emoji: '🌳' },
    { letter: 'K', word: 'KITOB', emoji: '📚' },
    { letter: 'M', word: 'MUSHUK', emoji: '🐱' },
    { letter: 'O', word: 'OT', emoji: '🐴' },
    { letter: 'Q', word: 'QALAM', emoji: '✏️' },
    { letter: 'S', word: 'SUT', emoji: '🥛' },
  ];

  // O'yinni boshlash
  const startGame = () => {
    const pairsCount = Math.min(4 + level, 8);
    const selectedPairs = letterPairs.slice(0, pairsCount);
    
    // Kartochkalar yaratish
    const gameCards = [];
    selectedPairs.forEach((pair, index) => {
      gameCards.push({
        id: `letter-${index}`,
        type: 'letter',
        content: pair.letter,
        pairId: index,
        matched: false,
      });
      gameCards.push({
        id: `word-${index}`,
        type: 'word',
        content: pair.word,
        emoji: pair.emoji,
        pairId: index,
        matched: false,
      });
    });

    // Aralashtirib tashlash
    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameStarted(true);
  };

  // Kartochkani ochish
  const flipCard = (cardId) => {
    if (flippedCards.length >= 2) return;
    if (flippedCards.includes(cardId)) return;
    if (matchedPairs.includes(cards.find(c => c.id === cardId)?.pairId)) return;

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      checkMatch(newFlipped);
    }
  };

  // Juftlikni tekshirish
  const checkMatch = (flipped) => {
    const card1 = cards.find(c => c.id === flipped[0]);
    const card2 = cards.find(c => c.id === flipped[1]);

    if (card1.pairId === card2.pairId) {
      // Juftlik topildi!
      setMatchedPairs([...matchedPairs, card1.pairId]);
      setScore(score + 20);
      setFlippedCards([]);

      // Barcha juftliklar topildimi?
      if (matchedPairs.length + 1 === cards.length / 2) {
        setTimeout(() => {
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
            setLevel(level + 1);
            startGame();
          }, 2000);
        }, 500);
      }
    } else {
      // Juftlik emas
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  };

  // Kartochka ochiqmi?
  const isCardFlipped = (cardId) => {
    const card = cards.find(c => c.id === cardId);
    return flippedCards.includes(cardId) || matchedPairs.includes(card?.pairId);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-3xl text-center">
          <div className="text-8xl mb-6">🧠</div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Harf Xotira</h1>
          <p className="text-2xl text-gray-600 mb-8">
            Harf va so&#39;z juftliklarini toping!
          </p>

          {score > 0 && (
            <div className="bg-yellow-100 rounded-2xl p-6 mb-8">
              <div className="text-lg text-gray-700 mb-2">Sizning ballingiz:</div>
              <div className="text-5xl font-bold text-yellow-600 mb-4">{score}</div>
              <div className="text-lg text-gray-700">Erishilgan daraja: {level}</div>
            </div>
          )}

          <button
            onClick={startGame}
            className="w-full py-6 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl font-bold text-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all mb-8"
          >
            🎮 {score > 0 ? 'Davom etish' : 'Boshlash'}
          </button>

          <div className="bg-blue-100 rounded-2xl p-6 text-left">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📖 Qoidalar:</h3>
            <ul className="text-gray-700 space-y-2">
              <li>🔤 Kartochkalarni oching</li>
              <li>🎯 Harf va uning so&#39;zi juftligini toping</li>
              <li>💡 Masalan: A harfi va OLMA so&#39;zi</li>
              <li>⭐ Har bir juftlik uchun +20 ball</li>
              <li>🚀 Darajalar oshib boradi!</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">🧠 Harf Xotira</h1>
              <p className="text-gray-600 mt-2">Juftliklarni toping!</p>
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
              <div className="text-center">
                <div className="text-5xl mb-2">👆</div>
                <div className="text-3xl font-bold text-blue-600">{moves}</div>
                <div className="text-sm text-gray-600">Harakatlar</div>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Topilgan juftliklar</span>
              <span>{matchedPairs.length} / {cards.length / 2}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${(matchedPairs.length / (cards.length / 2)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* O'yin maydoni */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div 
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(cards.length))}, minmax(0, 1fr))`,
            }}
          >
            {cards.map((card) => {
              const isFlipped = isCardFlipped(card.id);
              
              return (
                <button
                  key={card.id}
                  onClick={() => flipCard(card.id)}
                  disabled={isFlipped}
                  className={`aspect-square rounded-2xl text-4xl font-bold shadow-lg transition-all duration-300 transform ${
                    isFlipped
                      ? card.type === 'letter'
                        ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white scale-105'
                        : 'bg-gradient-to-br from-green-400 to-green-600 text-white scale-105'
                      : 'bg-gradient-to-br from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white hover:scale-105'
                  }`}
                >
                  {isFlipped ? (
                    <div className="flex flex-col items-center justify-center">
                      {card.type === 'letter' ? (
                        <div className="text-7xl">{card.content}</div>
                      ) : (
                        <>
                          <div className="text-5xl mb-2">{card.emoji}</div>
                          <div className="text-xl">{card.content}</div>
                        </>
                      )}
                    </div>
                  ) : (
                    '?'
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setGameStarted(false);
              }}
              className="px-8 py-4 bg-gray-500 hover:bg-gray-600 text-white rounded-full font-bold text-xl shadow-lg transition-all"
            >
              🏠 Bosh sahifa
            </button>
          </div>
        </div>

        {/* Success modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-12 shadow-2xl text-center transform scale-110 animate-bounce">
              <div className="text-9xl mb-6">🎉</div>
              <h2 className="text-5xl font-bold text-green-600 mb-4">Ajoyib!</h2>
              <p className="text-3xl text-gray-700 mb-4">
                Barcha juftliklarni topdingiz!
              </p>
              <p className="text-2xl text-gray-600">
                Harakatlar soni: {moves}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
