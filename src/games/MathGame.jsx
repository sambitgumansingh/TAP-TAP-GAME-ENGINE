import { useState, useRef } from "react"
import Timer from "../components/Timer"
import ScoreBoard from "../components/ScoreBoard"

function MathGame({ config, onBack, onGameEnd }) {
  const [levelIndex, setLevelIndex] = useState(0)
  const [input, setInput] = useState("")
  const [message, setMessage] = useState("")
  const [gameOver, setGameOver] = useState(false)
  const [playerName, setPlayerName] = useState("")
  const [nameEntered, setNameEntered] = useState(false)
  const [total, setTotal] = useState(0)
  const scoreRef = useRef(0)
  const [score, setScore] = useState(0)

  const currentLevel = config.levels[levelIndex]

  function handleSubmit() {
    if (!input.trim()) return
    const num = parseInt(input.trim())
    const isCorrect = num === currentLevel.answer

    if (isCorrect) {
      scoreRef.current += config.scoring.correct
      setScore(scoreRef.current)
      setMessage("✅ Correct!")
    } else {
      scoreRef.current += config.scoring.wrong
      setScore(scoreRef.current)
      setMessage(`❌ Wrong! Answer was: ${currentLevel.answer}`)
    }

    setTotal((prev) => prev + 1)
    setInput("")

    setTimeout(() => {
      setMessage("")
      if (levelIndex + 1 < config.levels.length) {
        setLevelIndex((prev) => prev + 1)
      } else {
        setGameOver(true)
        onGameEnd(playerName, scoreRef.current, config.title)
      }
    }, 1500)
  }

  function handleRestart() {
    scoreRef.current = 0
    setLevelIndex(0)
    setInput("")
    setScore(0)
    setTotal(0)
    setMessage("")
    setGameOver(false)
    setNameEntered(false)
    setPlayerName("")
  }

  if (!nameEntered) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-6">
        <div className="text-6xl">🔢</div>
        <h2 className="text-3xl font-bold text-purple-400">{config.title}</h2>
        <p className="text-gray-400">{config.description}</p>
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
        <div className="text-6xl">🎉</div>
        <h2 className="text-4xl font-bold text-purple-400">Game Over!</h2>
        <p className="text-2xl">Final Score: <span className="text-yellow-400 font-bold">{scoreRef.current}</span></p>
        <p className="text-gray-400">You answered {total} questions</p>
        <div className="flex gap-4">
          <button onClick={handleRestart} className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-xl font-bold">🔄 Play Again</button>
          <button onClick={onBack} className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl font-bold">← Back</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-8">
      <div className="text-5xl">🔢</div>
      <h2 className="text-3xl font-bold text-purple-400">{config.title}</h2>

      <div className="flex gap-8 items-center">
        <Timer timeLimit={config.timeLimit} onTimeUp={() => {
          setGameOver(true)
          onGameEnd(playerName, scoreRef.current, config.title)
        }} />
        <ScoreBoard score={score} total={total} />
      </div>

      <div className="bg-gray-800 rounded-2xl p-8 text-center border border-gray-700 w-80">
        <p className="text-gray-400 mb-2">
          Question {levelIndex + 1} of {config.levels.length}
        </p>
        <p className="text-gray-400 text-sm mb-4">
          Type: {currentLevel.hint}
        </p>
        <p className="text-5xl font-bold text-yellow-400 mb-6">
          {currentLevel.question}
        </p>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Your answer..."
          className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl text-center text-lg outline-none border border-gray-600 focus:border-purple-400 mb-4"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-purple-600 hover:bg-purple-500 py-3 rounded-xl font-bold text-lg transition-all"
        >
          Submit ✓
        </button>
        {message && <p className="mt-4 text-lg font-semibold">{message}</p>}
      </div>

      <button onClick={onBack} className="text-gray-500 hover:text-gray-300">
        ← Back to games
      </button>
    </div>
  )
}

export default MathGame