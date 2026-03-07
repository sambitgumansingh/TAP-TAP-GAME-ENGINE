function ScoreBoard({ score, total }) {
  return (
    <div className="flex gap-6 text-lg font-semibold">
      <div className="bg-gray-800 px-4 py-2 rounded-xl border border-gray-700">
        ⭐ Score: <span className="text-yellow-400">{score}</span>
      </div>
      <div className="bg-gray-800 px-4 py-2 rounded-xl border border-gray-700">
        📋 Answered: <span className="text-blue-400">{total}</span>
      </div>
    </div>
  )
}

export default ScoreBoard