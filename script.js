const screens = document.querySelectorAll('.screen')
const chooseEnemyBtns = document.querySelectorAll('.choose-enemy-btn')
const startBtn = document.getElementById('start-btn')
const gameContainer = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')

let seconds = 0
let score = 0
let selectedEnemy = []

startBtn.addEventListener('click', () => screens[0].classList.add('up'))

function startGame() {}
function increaseTime() {}
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
  addEnemies()
}

function addEnemies() { 
  setTimeout(createEnemy, 1000)
  setTimeout(createEnemy, 1500)
}

function increaseScore() {
  score++
  if (score > 19) message.classList.add('visible')
  scoreEl.innerHTML = `Score: ${score}`
}
