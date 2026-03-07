import GridGame from "../games/GridGame"
import WordGame from "../games/WordGame"

function GameRenderer({ config, onBack, onGameEnd }) {
  if (config.type === "grid") {
    return <GridGame config={config} onBack={onBack} onGameEnd={onGameEnd} />
  }
  if (config.type === "word") {
    return <WordGame config={config} onBack={onBack} onGameEnd={onGameEnd} />
  }
  return (
    <div className="text-white text-center mt-20">
      Unknown game type: {config.type}
    </div>
  )
}

export default GameRenderer