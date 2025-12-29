const screens = document.querySelectorAll('.screen')
const chooseEnemyBtns = document.querySelectorAll('.choose-enemy-btn')
const startBtn = document.getElementById('start-btn')
const gameContainer = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')

let seconds = 0
let score = 0
let selectedEnemy = null

let timer = null
let gameRunning = false
let enemyCount = 0

// 
let spawnInterval = 2000
let lastSpawnTime = 0

// 
let restartBtn = null

startBtn.addEventListener('click', () => screens[0].classList.add('up'))

chooseEnemyBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img')
    selectedEnemy = {
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt')
    }

    screens[1].classList.add('up')
    startGame()
  })
})

function startGame() {
  resetGameState()

  gameRunning = true
  timer = setInterval(increaseTime, 1000)

  requestAnimationFrame(gameLoop)
}

function resetGameState() {
  seconds = 0
  score = 0
  enemyCount = 0
  spawnInterval = 2000
  lastSpawnTime = 0

  timeEl.innerHTML = "Time: 00:00"
  scoreEl.innerHTML = "Score: 0"
  message.classList.remove('visible')

  document.querySelectorAll('.enemy').forEach(e => e.remove())
 
  if (restartBtn) restartBtn.remove()
}

function increaseTime() { 
  let m = Math.floor(seconds / 60)
  let s = seconds % 60
  m = m < 10 ? `0${m}` : m
  s = s < 10 ? `0${s}` : s
  timeEl.innerHTML = `Time: ${m}:${s}`
  seconds++
}

function gameLoop(timestamp) {
  if (!gameRunning) return

  if (timestamp - lastSpawnTime > spawnInterval) {
    createEnemy()
    lastSpawnTime = timestamp

    spawnInterval = Math.max(300, spawnInterval - 50)
  }

  if (enemyCount >= 50) {
    endGame()
    return
  }

  requestAnimationFrame(gameLoop)
}

function createEnemy() {
  const enemy = document.createElement('div')
  enemy.classList.add('enemy')
  const { x, y } = getRandomLocation()
  enemy.style.top = `${y}px`
  enemy.style.left = `${x}px`
  enemy.innerHTML = `
    <img
      src='${selectedEnemy.src}' 
      alt='${selectedEnemy.alt}' 
      style='transform: rotate(${Math.random() * 360}deg)'
    />
  `
  enemy.addEventListener('click', catchEnemy)
  gameContainer.appendChild(enemy)

  enemyCount++
}

function getRandomLocation() {
  const width = window.innerWidth
  const height = window.innerHeight
  const x = Math.random() * (width - 200) + 100
  const y = Math.random() * (height - 200) + 100
  return { x, y }
}

function catchEnemy() { 
  increaseScore()
  this.classList.add('caught')
  setTimeout(() => this.remove(), 2000)
  enemyCount--
}

function increaseScore() {
  score++
  scoreEl.innerHTML = `Score: ${score}`
}

function endGame() {
  gameRunning = false
  clearInterval(timer)

  message.innerText = "The horde overwhelms you. Darkness claims you."
  message.classList.add('visible')

  createRestartButton()
}

function createRestartButton() {
  restartBtn = document.createElement('button')
  restartBtn.classList.add('btn')
  restartBtn.innerText = "Restart"
  restartBtn.style.marginTop = "200px"

  restartBtn.addEventListener('click', startGame)

  gameContainer.appendChild(restartBtn)
}
