


// Hozircha komponentlar import qilinmaganida placeholder
const LetterHuntGame = ({ onBack }) => <div className="p-8"><button onClick={onBack}>Orqaga</button></div>;
const WordBuilderGame = ({ onBack }) => <div className="p-8"><button onClick={onBack}>Orqaga</button></div>;
const LetterMemoryGame = ({ onBack }) => <div className="p-8"><button onClick={onBack}>Orqaga</button></div>;
const LetterSafariGame = ({ onBack }) => <div className="p-8"><button onClick={onBack}>Orqaga</button></div>;
const MathMonsterGame = ({ onBack }) => <div className="p-8"><button onClick={onBack}>Orqaga</button></div>;
const NumberCatchGame = ({ onBack }) => <div className="p-8"><button onClick={onBack}>Orqaga</button></div>;
const MathPuzzleGame = ({ onBack }) => <div className="p-8"><button onClick={onBack}>Orqaga</button></div>;
const NumberChainGame = ({ onBack }) => <div className="p-8"><button onClick={onBack}>Orqaga</button></div>;

export default function GamesHub() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // O'yinlar kategoriyalari
  const categories = {
    letters: {
      id: 'letters',
      name: 'Harflar va So\'zlar',
      icon: '🔤',
      color: 'from-pink-400 to-purple-500',
      description: 'Harf va so\'z o\'yinlari',
      games: [
        {
          id: 'letter-hunt',
          name: 'Harf Ovchisi',
          icon: '🎯',
          description: 'Uchib kelayotgan harflarni tut',
          color: 'from-pink-400 to-red-500',
          component: LetterHuntGame,
        },
        {
          id: 'word-builder',
          name: 'So\'z Qurish',
          icon: '🔤',
          description: 'Harflardan so\'z tuzing',
          color: 'from-cyan-400 to-blue-500',
          component: WordBuilderGame,
        },
        {
          id: 'letter-memory',
          name: 'Harf Xotira',
          icon: '🧠',
          description: 'Harf juftliklarini toping',
          color: 'from-purple-400 to-pink-500',
          component: LetterMemoryGame,
        },
        {
          id: 'letter-safari',
          name: 'Harf Safari',
          icon: '🦁',
          description: 'Ketma-ketlikni eslang',
          color: 'from-green-400 to-teal-500',
          component: LetterSafariGame,
        },
      ],
    },
    math: {
      id: 'math',
      name: 'Matematika',
      icon: '🔢',
      color: 'from-blue-400 to-indigo-500',
      description: 'Matematik o\'yinlar',
      games: [
        {
          id: 'math-monster',
          name: 'Matematik Yirtqich',
          icon: '👾',
          description: 'Yirtqichni mag\'lub eting',
          color: 'from-purple-400 to-red-500',
          component: MathMonsterGame,
        },
        {
          id: 'number-catch',
          name: 'Raqamlarni Ushla',
          icon: '🧺',
          description: 'Savat bilan to\'g\'ri javobni ushla',
          color: 'from-blue-400 to-purple-500',
          component: NumberCatchGame,
        },
        {
          id: 'math-puzzle',
          name: 'Matematik Pazel',
          icon: '🧩',
          description: 'Maqsad yig\'indiga yeting',
          color: 'from-indigo-400 to-pink-500',
          component: MathPuzzleGame,
        },
        {
          id: 'number-chain',
          name: 'Sonlar Zanjiri',
          icon: '🔗',
          description: 'Uzun zanjir yarating',
          color: 'from-teal-400 to-cyan-500',
          component: NumberChainGame,
        },
      ],
    },
  };

  // Agar o'yin tanlangan bo'lsa
  if (selectedGame) {
    const GameComponent = selectedGame.component;
    return <GameComponent onBack={() => setSelectedGame(null)} />;
  }

  // Agar kategoriya tanlangan bo'lsa
  if (selectedCategory) {
    const category = categories[selectedCategory];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 mb-6 sm:mb-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 font-semibold text-lg transition-colors"
            >
              <span className="text-2xl">←</span> Orqaga
            </button>
            <div className="text-center">
              <div className="text-6xl sm:text-8xl mb-4">{category.icon}</div>
              <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-2">
                {category.name}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600">{category.description}</p>
            </div>
          </div>

          {/* O'yinlar ro'yxati */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
            {category.games.map((game) => (
              <button
                key={game.id}
                onClick={() => setSelectedGame(game)}
                className={`bg-gradient-to-br ${game.color} rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-white text-left group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl sm:text-7xl group-hover:scale-110 transition-transform">
                    {game.icon}
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold">
                    O&#39;ynash →
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">{game.name}</h3>
                <p className="text-base sm:text-lg text-white/90">{game.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Bosh sahifa - Kategoriyalar
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-12 mb-6 sm:mb-8 text-center">
          <div className="text-6xl sm:text-9xl mb-4 sm:mb-6">🎮</div>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 mb-3 sm:mb-4">
            O&#39;yinlar Dunyosi
          </h1>
          <p className="text-lg sm:text-2xl text-gray-600">
            O&#39;rganish va o&#39;ynash - birga!
          </p>
        </div>

        {/* Kategoriyalar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {Object.values(categories).map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`bg-gradient-to-br ${category.color} rounded-3xl p-8 sm:p-12 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-white group`}
            >
              <div className="text-center">
                <div className="text-7xl sm:text-9xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-4">
                  {category.name}
                </h2>
                <p className="text-lg sm:text-xl text-white/90 mb-4 sm:mb-6">
                  {category.description}
                </p>
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 inline-block font-bold text-lg sm:text-xl">
                  {category.games.length} ta o&#39;yin →
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Statistika */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
          {[
            { icon: '🎯', label: 'Jami o\'yinlar', value: '8' },
            { icon: '⭐', label: 'Yulduzlar', value: '0' },
            { icon: '🏆', label: 'Yutuqlar', value: '0' },
            { icon: '🔥', label: 'Kun ketma-ket', value: '0' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg text-center"
            >
              <div className="text-3xl sm:text-5xl mb-2">{stat.icon}</div>
              <div className="text-2xl sm:text-4xl font-bold text-purple-600 mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-6 sm:mt-8 bg-white rounded-3xl shadow-xl p-6 sm:p-8">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
              💡 Nima uchun o&#39;ynash foydali?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-left">
              <div className="bg-blue-50 rounded-2xl p-4 sm:p-6">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🧠</div>
                <h4 className="font-bold text-gray-800 mb-2 text-base sm:text-lg">
                  Xotira rivojlanadi
                </h4>
                <p className="text-sm sm:text-base text-gray-600">
                  O&#39;yinlar orqali xotira va diqqat kuchliroq bo&#39;ladi
                </p>
              </div>
              <div className="bg-green-50 rounded-2xl p-4 sm:p-6">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">📚</div>
                <h4 className="font-bold text-gray-800 mb-2 text-base sm:text-lg">
                  O&#39;rganish oson
                </h4>
                <p className="text-sm sm:text-base text-gray-600">
                  O&#39;yin orqali o&#39;rganish qiziqarli va samarali
                </p>
              </div>
              <div className="bg-purple-50 rounded-2xl p-4 sm:p-6">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🎯</div>
                <h4 className="font-bold text-gray-800 mb-2 text-base sm:text-lg">
                  Maqsadga intilish
                </h4>
                <p className="text-sm sm:text-base text-gray-600">
                  Ball to&#39;plash orqali motivatsiya oshadi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
