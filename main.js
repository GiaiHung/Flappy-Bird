import { updateBird, setupBird, getBirdRect } from './bird.js'
import { updatePipes, setupPipe, getPipeCount, getPipeRect } from './pipe.js'
document.addEventListener("keypress", handleStart, { once: true })
const title = document.querySelector("[data-title]")
const subtitle = document.querySelector("[data-subtitle]")

let lastTime

function updateLoop(time) {
  // Since the first time we run, lastTime is null so we need to set up an if statement for that
  if (lastTime == null) {
    lastTime = time
    requestAnimationFrame(updateLoop)
    return
  }
  const delta = time - lastTime; // delta is a variable to check we always move according to the last time frame  

  updateBird(delta)
  updatePipes(delta)

  // Check if the bird loses
  if (checkLose()) return handleLose()

  lastTime = time
  requestAnimationFrame(updateLoop)
}

function handleStart() {
  title.classList.add('hide')
  // Reset the time since when we lose the time still counting
  lastTime = null
  setupBird()
  setupPipe()
  window.requestAnimationFrame(updateLoop)
}

function checkLose() {
  const birdRect = getBirdRect()
  // some returs true if any of the element fits the condition
  const pipeRect = getPipeRect().some(pipeRect => isCollision(birdRect, pipeRect))
  let top = birdRect.top
  let bottom = birdRect.bottom
  if (top < 0 || bottom > window.innerHeight || pipeRect) return true
}

function handleLose() {
  // In case user hit space bar continuously
  setTimeout(() => {
    title.classList.remove('hide')
    subtitle.classList.remove('hide')
    subtitle.textContent = `${animateText(getPipeCount())}`
    // Restart the game
    document.addEventListener("keypress", handleStart, { once: true })
  }, 500)

  function animateText(count) {
    if (count > 5) {
      return count + ' Pipes' + '😎🤩'
    }
    else {
      return count + ' Pipes' + '🤣😂'
    }
  }
}

function isCollision(rect1, rect2) {
  // rect1 is the bird, rect2 is the pipe
  return (
    rect1.top < rect2.bottom &&
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top 
    )
}