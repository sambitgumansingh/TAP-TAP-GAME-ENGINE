import { useState, useEffect, useRef } from "react"
import Timer from "../components/Timer"
import ScoreBoard from "../components/ScoreBoard"

function GridGame({ config, onBack, onGameEnd }) {
  const level = config.levels[0]
  const scoreRef = useRef(0)
  const [grid, setGrid] = useState(level.grid.map((row) => [...row]))
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [message, setMessage] = useState("")
  const [playerName, setPlayerName] = useState("")
  const [nameEntered, setNameEntered] = useState(false)

  function handleInput(row, col, value) {
    const num = parseInt(value)
    if (isNaN(num)) return

    const newGrid = grid.map((r) => [...r])
    newGrid[row][col] = num
    setGrid(newGrid)

    const correct = level.solution[row][col]
    if (num === correct) {
      scoreRef.current += config.scoring.correct
      setScore(scoreRef.current)
      setMessage("✅ Correct!")
    } else {
      scoreRef.current += config.scoring.wrong
      setScore(scoreRef.current)
      setMessage("❌ Wrong!")
    }

    setTotal((prev) => prev + 1)
    setTimeout(() => setMessage(""), 1000)
  }

  useEffect(() => {
    if (!nameEntered) return
    const allCorrect = grid.every((row, rIdx) =>
      row.every((cell, cIdx) => cell === level.solution[rIdx][cIdx])
    )
    if (allCorrect) {
      setTimeout(() => {
        setGameOver(true)
        onGameEnd(playerName, scoreRef.current, config.title)
      }, 500)
    }
  }, [grid])

  function handleRestart() {
    scoreRef.current = 0
    setGrid(level.grid.map((row) => [...row]))
    setScore(0)
    setTotal(0)
    setGameOver(false)
    setMessage("")
    setNameEntered(false)
    setPlayerName("")
  }

  if (!nameEntered) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-6">
        <h2 className="text-3xl font-bold text-purple-400">{config.title}</h2>
        <p className="text-gray-400">Enter your name to start</p>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && playerName.trim() && setNameEntered(true)}
          placeholder="Your name..."
          className="bg-gray-700 text-white px-4 py-3 rounded-xl text-center outline-none border border-gray-600 focus:border-purple-400 w-64"
        />
        <button
          onClick={() => playerName.trim() && setNameEntered(true)}
          className="bg-purple-600 hover:bg-purple-500 px-8 py-3 rounded-xl font-bold"
        >
          Start Game 🚀
        </button>
        <button onClick={onBack} className="text-gray-500 hover:text-gray-300">← Back</button>
      </div>
    )
  }

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-6">
        <h2 className="text-4xl font-bold text-purple-400">🎉 Completed!</h2>
        <p className="text-2xl">Final Score: <span className="text-yellow-400 font-bold">{scoreRef.current}</span></p>
        <p className="text-gray-400">You answered {total} cells</p>
        <div className="flex gap-4">
          <button onClick={handleRestart} className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-xl font-bold">🔄 Play Again</button>
          <button onClick={onBack} className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl font-bold">← Back</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-8">
      <h2 className="text-3xl font-bold text-purple-400">{config.title}</h2>

      <div className="flex gap-8 items-center">
        <Timer timeLimit={config.timeLimit} onTimeUp={() => {
          setGameOver(true)
          onGameEnd(playerName, scoreRef.current, config.title)
        }} />
        <ScoreBoard score={score} total={total} />
      </div>

      <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
        <p className="text-gray-400 text-center mb-4">{config.description}</p>
        <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {grid.map((row, rIdx) =>
            row.map((cell, cIdx) => {
              const isFixed = level.grid[rIdx][cIdx] !== 0
              return (
                <input
                  key={`${rIdx}-${cIdx}`}
                  type="number"
                  min="1"
                  max="4"
                  value={cell === 0 ? "" : cell}
                  disabled={isFixed}
                  onChange={(e) => handleInput(rIdx, cIdx, e.target.value)}
                  className={`w-14 h-14 text-center text-xl font-bold rounded-lg border outline-none
                    ${isFixed
                      ? "bg-gray-600 text-gray-300 border-gray-500 cursor-not-allowed"
                      : "bg-gray-700 text-white border-gray-600 focus:border-purple-400"
                    }`}
                />
              )
            })
          )}
        </div>
        {message && <p className="text-center mt-4 text-lg font-semibold">{message}</p>}
      </div>

      <button onClick={onBack} className="text-gray-500 hover:text-gray-300">← Back to games</button>
    </div>
  )
}

export default GridGame