import GridGame from "../games/GridGame"
import WordGame from "../games/WordGame"
import MathGame from "../games/MathGame"
import MemoryGame from "../games/MemoryGame"

function GameRenderer({ config, onBack, onGameEnd }) {
  if (config.type === "grid") {
    return <GridGame config={config} onBack={onBack} onGameEnd={onGameEnd} />
  }
  if (config.type === "word") {
    return <WordGame config={config} onBack={onBack} onGameEnd={onGameEnd} />
  }
  if (config.type === "math") {
    return <MathGame config={config} onBack={onBack} onGameEnd={onGameEnd} />
  }
  if (config.type === "memory") {
    return <MemoryGame config={config} onBack={onBack} onGameEnd={onGameEnd} />
  }
  return (
    <div className="text-white text-center mt-20">
      Unknown game type: {config.type}
    </div>
  )
}

export default GameRenderer