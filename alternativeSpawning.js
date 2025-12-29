// Logarithmic curve - very smooth
// This gives an arcade feel

spawnInterval = 2000 - Math.log(seconds + 1) * 300
spawnInterval = Math.max(800, spawnInterval)

//==================================================

// Step‑based difficulty - classic retro arcade
// Difficulty increases every 10 seconds, not every spawn.

if (seconds % 10 === 0) {
  spawnInterval = Math.max(700, spawnInterval - 100)
}

//==================================================

// Population‑based difficulty - dynamic
// This adapts to player performance.

if (enemyCount < 10) spawnInterval = 1200
else if (enemyCount < 20) spawnInterval = 1000
else if (enemyCount < 30) spawnInterval = 900
else spawnInterval = 800
