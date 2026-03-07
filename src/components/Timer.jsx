import { useState, useEffect } from "react"

function Timer({ timeLimit, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(timeLimit)

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp()
      return
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [timeLeft])

  const color = timeLeft <= 10 ? "text-red-400" : "text-green-400"

  return (
    <div className={`text-2xl font-bold ${color}`}>
      ⏱ {timeLeft}s
    </div>
  )
}

export default Timer