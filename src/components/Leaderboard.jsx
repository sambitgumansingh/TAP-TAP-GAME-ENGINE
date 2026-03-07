function Leaderboard({ entries, onClose }) {
  const sorted = [...entries].sort((a, b) => b.score - a.score)

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-6">
      <h2 className="text-4xl font-bold text-purple-400">🏆 Leaderboard</h2>

      {sorted.length === 0 ? (
        <p className="text-gray-400">No scores yet. Play a game first!</p>
      ) : (
        <div className="w-96 flex flex-col gap-3">
          {sorted.map((entry, index) => (
            <div
              key={index}
              className={`flex justify-between items-center px-6 py-4 rounded-xl border
                ${index === 0 ? "bg-yellow-500/20 border-yellow-500 text-yellow-400" :
                  index === 1 ? "bg-gray-400/20 border-gray-400 text-gray-300" :
                  index === 2 ? "bg-orange-500/20 border-orange-500 text-orange-400" :
                  "bg-gray-800 border-gray-700 text-white"}`}
            >
              <span className="text-xl font-bold">
                {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
              </span>
              <span className="font-semibold">{entry.name}</span>
              <span className="font-bold">{entry.score} pts</span>
              <span className="text-sm text-gray-400">{entry.game}</span>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onClose}
        className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl font-bold"
      >
        ← Back
      </button>
    </div>
  )
}

export default Leaderboard