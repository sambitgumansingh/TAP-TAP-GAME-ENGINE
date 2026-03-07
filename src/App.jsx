import { useState, useEffect } from "react"
import HomeScreen from "./components/HomeScreen"
import GameSelector from "./components/GameSelector"
import GameRenderer from "./components/GameRenderer"
import Leaderboard from "./components/Leaderboard"

function App() {
  const [screen, setScreen] = useState("home")
  const [selectedGame, setSelectedGame] = useState(null)
  const [leaderboardEntries, setLeaderboardEntries] = useState(() => {
    const saved = localStorage.getItem("taptap-leaderboard")
    return saved ? JSON.parse(saved) : [
      { name: "Rahul", score: 120, game: "Sudoku Lite" },
      { name: "Priya", score: 95, game: "Word Builder" },
      { name: "Arjun", score: 80, game: "Sudoku Lite" },
    ]
  })

  useEffect(() => {
    localStorage.setItem("taptap-leaderboard", JSON.stringify(leaderboardEntries))
  }, [leaderboardEntries])

  function handleGameEnd(name, score, game) {
    setLeaderboardEntries((prev) => [...prev, { name, score, game }])
    setScreen("leaderboard")
  }

  if (screen === "home") {
    return (
      <HomeScreen
        onPlay={() => setScreen("select")}
        onLeaderboard={() => setScreen("leaderboard")}
      />
    )
  }

  if (screen === "leaderboard") {
    return (
      <Leaderboard
        entries={leaderboardEntries}
        onClose={() => setScreen("home")}
      />
    )
  }

  if (screen === "select") {
    return (
      <GameSelector
        onSelectGame={(game) => { setSelectedGame(game); setScreen("game") }}
        onViewLeaderboard={() => setScreen("leaderboard")}
        onBack={() => setScreen("home")}
      />
    )
  }

  if (screen === "game") {
    return (
      <GameRenderer
        config={selectedGame}
        onBack={() => setScreen("select")}
        onGameEnd={handleGameEnd}
      />
    )
  }
}

export default App