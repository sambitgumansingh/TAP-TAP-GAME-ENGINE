import { useState, useRef, useEffect } from "react"
import Timer from "../components/Timer"
import ScoreBoard from "../components/ScoreBoard"

function MemoryGame({ config, onBack, onGameEnd }) {
  const level = config.levels[0]
  const scoreRef = useRef(0)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [playerName, setPlayerName] = useState("")
  const [nameEntered, setNameEntered] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [disabled, setDisabled] = useState(false)

  const pairs = level.pairs
  const cards = [...pairs, ...pairs]
    .map((card, i) => ({ ...card, uniqueId: i }))
    .sort(() => Math.random() - 0.5)

  const [shuffled] = useState(cards)

  function handleFlip(card) {
    if (disabled) return
    if (flipped.find(f => f.uniqueId === card.uniqueId)) return
    if (matched.includes(card.id)) return

    const newFlipped = [...flipped, card]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setDisabled(true)
      if (newFlipped[0].id === newFlipped[1].id) {
        scoreRef.current += config.scoring.correct
        setScore(scoreRef.current)
        setMatched((prev) => [...prev, card.id])
        setTotal((prev) => prev + 1)
        setFlipped([])
        setDisabled(false)
      } else {
        scoreRef.current += config.scoring.wrong
        setScore(scoreRef.current)
        setTotal((prev) => prev + 1)
        setTimeout(() => {
          setFlipped([])
          setDisabled(false)
        }, 1000)
      }
    }
  }

  useEffect(() => {
    if (matched.length === pairs.length && nameEntered) {
      setTimeout(() => {
        setGameOver(true)
        onGameEnd(playerName, scoreRef.current, config.title)
      }, 800)
    }
  }, [matched])

  function handleRestart() {
    scoreRef.current = 0
    setScore(0)
    setTotal(0)
    setFlipped([])
    setMatched([])
    setDisabled(false)
    setGameOver(false)
    setNameEntered(false)
    setPlayerName("")
  }

  if (!nameEntered) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-6">
        <div className="text-6xl">🃏</div>
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
        <h2 className="text-4xl font-bold text-purple-400">All Matched!</h2>
        <p className="text-2xl">Final Score: <span className="text-yellow-400 font-bold">{scoreRef.current}</span></p>
        <p className="text-gray-400">You made {total} attempts</p>
        <div className="flex gap-4">
          <button onClick={handleRestart} className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-xl font-bold">🔄 Play Again</button>
          <button onClick={onBack} className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl font-bold">← Back</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-8">
      <div className="text-5xl">🃏</div>
      <h2 className="text-3xl font-bold text-purple-400">{config.title}</h2>

      <div className="flex gap-8 items-center">
        <Timer timeLimit={config.timeLimit} onTimeUp={() => {
          setGameOver(true)
          onGameEnd(playerName, scoreRef.current, config.title)
        }} />
        <ScoreBoard score={score} total={total} />
      </div>

      <div className="grid grid-cols-4 gap-3">
        {shuffled.map((card) => {
          const isFlipped = flipped.find(f => f.uniqueId === card.uniqueId)
          const isMatched = matched.includes(card.id)
          return (
            <div
              key={card.uniqueId}
              onClick={() => handleFlip(card)}
              className={`w-16 h-16 rounded-xl text-3xl flex items-center justify-center cursor-pointer transition-all duration-300 border-2
                ${isMatched
                  ? "bg-green-700 border-green-400 cursor-not-allowed"
                  : isFlipped
                  ? "bg-purple-700 border-purple-400"
                  : "bg-gray-700 border-gray-600 hover:border-purple-400"
                }`}
            >
              {isFlipped || isMatched ? card.value : "❓"}
            </div>
          )
        })}
      </div>

      <p className="text-gray-400 text-sm">
        Matched: {matched.length} / {pairs.length} pairs
      </p>

      <button onClick={onBack} className="text-gray-500 hover:text-gray-300">
        ← Back to games
      </button>
    </div>
  )
}

export default MemoryGame