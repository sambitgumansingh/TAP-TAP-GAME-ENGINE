import sudokuConfig from "../configs/sudoku.json"
import wordConfig from "../configs/wordgame.json"
import mathConfig from "../configs/mathblitz.json"
import memoryConfig from "../configs/memorymatch.json"


const allGames = [sudokuConfig, wordConfig, mathConfig, memoryConfig]

function GameSelector({ onSelectGame, onViewLeaderboard, onBack }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-8">

      <button onClick={onBack} className="absolute top-6 left-6 text-gray-500 hover:text-gray-300 text-sm">
        ← Home
      </button>

      <h1 className="text-4xl font-bold text-purple-400">🎮 Select a Game</h1>
      <p className="text-gray-400">Choose your challenge</p>

      <div className="flex gap-6 flex-wrap justify-center px-4">
        {allGames.map((game) => (
          <div
            key={game.id}
            onClick={() => onSelectGame(game)}
            className="bg-gray-800 hover:bg-purple-700 cursor-pointer rounded-2xl p-6 w-52 text-center transition-all duration-200 border border-gray-700 hover:border-purple-400 hover:scale-105"
          >
            <div className="text-4xl mb-3">
            {game.type === "grid" ? "🧩" : game.type === "word" ? "📝" : game.type === "math" ? "🔢" : "🃏"}
            </div>
            <h2 className="text-xl font-bold mb-2">{game.title}</h2>
            <p className="text-gray-400 text-sm mb-4">{game.description}</p>
            <span className="bg-purple-500 text-white text-xs px-3 py-1 rounded-full">
              {game.type.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onViewLeaderboard}
        className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-3 rounded-xl transition-all"
      >
        🏆 View Leaderboard
      </button>

    </div>
  )
}

export default GameSelector