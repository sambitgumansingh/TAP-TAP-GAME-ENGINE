# 🎮 TapTap Game Engine

Built by **Team Coders Creed** for the TapTap Hackathon 2026

---

## 🔗 Live Link
👉 **[Click here to play](https://tap-tap-game-engine.vercel.app)**

---

## What is this project?

So basically we built a game engine — not just one game, but a system that can run multiple different games.

The idea is simple. Instead of hardcoding each game, we made the engine read a JSON file and load whatever game is described in it. So if you want to add a new game, you just create a new JSON file. You don't have to touch the main engine code at all.

We got this idea from how real game engines like Unity work — they don't make one game, they make a system that can run any game.

---

## 🎮 Games we built

We have 4 games right now:

- 🧩 **Sudoku Lite** — Fill a 4x4 grid with numbers 1 to 4
- 📝 **Word Builder** — You get a jumbled word, unscramble it before time runs out
- 🔢 **Math Blitz** — Simple math questions, solve as many as you can in 60 seconds
- 🃏 **Memory Match** — Flip cards and find the matching pairs

All 4 games share the same timer, scoring system and leaderboard. That's the engine part.

---

## How does the engine actually work?

Here's the simple flow:

```
1. User opens the app
2. Engine reads the JSON config files
3. Shows game cards based on what's in the JSON
4. User picks a game
5. Engine checks the "type" field in the JSON
6. Loads the right game component
7. Timer starts, scoring starts
8. Game ends → score goes to leaderboard
```

The key file is `GameRenderer.jsx`. It reads `config.type` from the JSON and decides which game to show. That's the whole engine logic in one place.

---

## JSON Structure

Each game has one JSON file that looks like this:

```json
{
  "id": "mathblitz",
  "title": "Math Blitz",
  "type": "math",
  "timeLimit": 60,
  "scoring": {
    "correct": 20,
    "wrong": -5
  },
  "description": "Solve equations before time runs out!",
  "levels": [
    { "level": 1, "question": "5 + 3 = ?", "answer": 8 }
  ]
}
```

The engine reads this and does everything else automatically.

---

## How to add a new game

We tried to make this as simple as possible:

1. Create a new JSON file in `src/configs/`
2. Create a new game component in `src/games/`
3. Add one if-condition in `GameRenderer.jsx`

That's it. The timer, leaderboard and scoring all work automatically for the new game too.

---

## Folder structure

```
src/
├── components/      ← Shared engine parts (Timer, Score, Leaderboard)
├── games/           ← Individual game components
├── configs/         ← JSON files for each game
└── App.jsx          ← Main file
```

---

## How to run it locally

```bash
git clone https://github.com/sambitgumansingh/TAP-TAP-GAME-ENGINE.git
cd TAP-TAP-GAME-ENGINE
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## Tech we used

- **React** — for building the UI
- **Vite** — for running and building the project
- **TailwindCSS** — for styling
- **JSON** — for game configuration
- **localStorage** — to save leaderboard scores even after refresh

---

## What we learned

Honestly this project taught us a lot about how real software is structured. We learned about component architecture, JSON driven systems and how to make code reusable. The hardest part was making the engine modular so that adding a new game doesn't break anything else.

---

## Team

**Team Coders Creed** — TapTap Hackathon 2026
