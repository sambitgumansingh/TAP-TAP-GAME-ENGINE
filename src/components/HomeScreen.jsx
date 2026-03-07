import { useState, useEffect } from "react"

function HomeScreen({ onPlay, onLeaderboard }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  return (
    <div className={`min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
      
      {/* Logo */}
      <div className="text-center">
        <div className="text-7xl mb-4">🎮</div>
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          TapTap
        </h1>
        <h2 className="text-2xl font-bold text-gray-300 mt-2">Game Engine</h2>
        <p className="text-gray-500 mt-3 text-sm tracking-widest uppercase">
          Learn • Play • Compete
        </p>
      </div>

      {/* Stats Row */}
      <div className="flex gap-6 mt-4">
        {[
          { label: "Games", value: "2+" },
          { label: "Players", value: "6L+" },
          { label: "Levels", value: "10+" },
        ].map((stat) => (
          <div key={stat.label} className="bg-gray-800 border border-gray-700 rounded-2xl px-6 py-4 text-center">
            <p className="text-2xl font-black text-purple-400">{stat.value}</p>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 w-64">
        <button
          onClick={onPlay}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-xl py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-purple-900"
        >
          🚀 Play Now
        </button>
        <button
          onClick={onLeaderboard}
          className="bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-yellow-500 text-white font-bold text-lg py-4 rounded-2xl transition-all duration-200"
        >
          🏆 Leaderboard
        </button>
      </div>

      {/* Footer */}
      <p className="text-gray-600 text-xs absolute bottom-6">
         Built by Team Coders Creed • TapTap Hackathon 2026

      </p>

    </div>
  )
}

export default HomeScreen