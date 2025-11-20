import React, { useState, useEffect } from 'react';

export default function MathPuzzleGame() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [puzzle, setPuzzle] = useState(null);
  const [selectedCells, setSelectedCells] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [stars, setStars] = useState(0);

  // Pazel yaratish
  const generatePuzzle = (currentLevel) => {
    const size = Math.min(currentLevel + 2, 5); // 3x3 dan 5x5 gacha
    const targetSum = (currentLevel + 1) * 5;
    
    // Grid yaratish
    const grid = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push({
          value: Math.floor(Math.random() * 10) + 1,
          row: i,
          col: j,
          selected: false,
        });
      }
      grid.push(row);
    }

    setPuzzle({
      grid,
      targetSum,
      size,
    });
    setSelectedCells([]);
  };

  // Katak tanlash
  const toggleCell = (row, col) => {
    const cellKey = `${row}-${col}`;
    const isSelected = selectedCells.some(c => c.key === cellKey);

    if (isSelected) {
      setSelectedCells(selectedCells.filter(c => c.key !== cellKey));
    } else {
      const value = puzzle.grid[row][col].value;
      setSelectedCells([...selectedCells, { key: cellKey, value, row, col }]);
    }
  };

  // Javobni tekshirish
  const checkAnswer = () => {
    const sum = selectedCells.reduce((acc, cell) => acc + cell.value, 0);
    
    if (sum === puzzle.targetSum) {
      // To'g'ri!
      const points = puzzle.size * 10;
      setScore(score + points);
      setStars(stars + 1);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        if (stars >= 4) {
          setLevel(level + 1);
          setStars(0);
        }
        generatePuzzle(stars >= 4 ? level + 1 : level);
      }, 1500);
    } else {
      // Noto'g'ri - qizil rangga o'zgartirish
      setTimeout(() => {
        setSelectedCells([]);
      }, 500);
    }
  };

  // Dastlab pazel yaratish
  useEffect(() => {
    generatePuzzle(1);
  }, []);

  // Hozirgi yig'indi
  const currentSum = selectedCells.reduce((acc, cell) => acc + cell.value, 0);
  const isCorrectSum = currentSum === puzzle?.targetSum;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">🧩 Matematik Pazel</h1>
              <p className="text-gray-600 mt-2">Raqamlarni tanlab maqsad yig&#39;indiga yeting!</p>
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

          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Keyingi daraja uchun:</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="text-3xl">
                    {i < stars ? '⭐' : '☆'}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Maqsad */}
        {puzzle && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Maqsad yig&#39;indi:</h2>
              <div className="text-8xl font-bold text-purple-600 mb-4">
                {puzzle.targetSum}
              </div>
              <div className="text-2xl text-gray-600">
                Hozirgi yig&#39;indi: 
                <span className={`font-bold ml-2 ${
                  currentSum > puzzle.targetSum ? 'text-red-600' : 
                  isCorrectSum ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {currentSum}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Pazel grid */}
        {puzzle && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <div className="flex justify-center">
              <div 
                className="grid gap-3"
                style={{ 
                  gridTemplateColumns: `repeat(${puzzle.size}, minmax(0, 1fr))`,
                  maxWidth: `${puzzle.size * 100}px`
                }}
              >
                {puzzle.grid.map((row, rowIndex) => 
                  row.map((cell, colIndex) => {
                    const isSelected = selectedCells.some(
                      c => c.row === rowIndex && c.col === colIndex
                    );
                    
                    return (
                      <button
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => toggleCell(rowIndex, colIndex)}
                        className={`aspect-square rounded-2xl text-4xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all ${
                          isSelected
                            ? 'bg-gradient-to-br from-green-400 to-green-600 text-white scale-110'
                            : 'bg-gradient-to-br from-blue-400 to-blue-600 text-white'
                        }`}
                      >
                        {cell.value}
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Tugmalar */}
            <div className="flex gap-4 justify-center mt-8">
              <button
                onClick={() => setSelectedCells([])}
                className="px-8 py-4 bg-gray-500 hover:bg-gray-600 text-white rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-all"
              >
                🔄 Tozalash
              </button>
              <button
                onClick={checkAnswer}
                disabled={selectedCells.length === 0}
                className={`px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-all ${
                  selectedCells.length > 0
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                ✅ Tekshirish
              </button>
            </div>
          </div>
        )}

        {/* Maslahatlar */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-5xl text-center mb-3">💡</div>
            <h3 className="font-bold text-gray-800 text-center mb-2">Maslahat 1</h3>
            <p className="text-gray-600 text-center">
              Katta raqamlardan boshlang
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-5xl text-center mb-3">🧮</div>
            <h3 className="font-bold text-gray-800 text-center mb-2">Maslahat 2</h3>
            <p className="text-gray-600 text-center">
              Yig&#39;indini hisoblang
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-5xl text-center mb-3">🎯</div>
            <h3 className="font-bold text-gray-800 text-center mb-2">Maslahat 3</h3>
            <p className="text-gray-600 text-center">
              Turli kombinatsiyalarni sinab ko&#39;ring
            </p>
          </div>
        </div>

        {/* Success animation */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-white rounded-3xl p-12 shadow-2xl text-center transform scale-110 animate-bounce">
              <div className="text-9xl mb-6">🎉</div>
              <h2 className="text-5xl font-bold text-green-600 mb-4">Ajoyib!</h2>
              <p className="text-3xl text-gray-700">To&#39;g&#39;ri javob!</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
