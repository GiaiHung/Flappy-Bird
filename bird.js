const birdElement = document.querySelector('[data-bird]')
const BIRD_SPEED = .3
const BIRD_DURATION = 200 // 150ms is the time our jump lasts
let timeSinceLastJump = Number.POSITIVE_INFINITY // Default set up large number

export function setupBird() {
  setTop(window.innerHeight / 2)
  window.removeEventListener('keydown', handleJump)
  window.addEventListener('keydown', handleJump)
}

export function updateBird(delta) {
  if(timeSinceLastJump < BIRD_DURATION) {
    setTop(getTop() - BIRD_SPEED * delta)
  }
  else {
    setTop(getTop() + BIRD_SPEED * delta)
  }
  
  timeSinceLastJump += delta
} 

export function getBirdRect() {
  return birdElement.getBoundingClientRect()
}

// Set the top of the bird which takes the argument in getTop()
function setTop(top) {
  birdElement.style.setProperty('--bird-top', top)
}

// Return top position of the bird
function getTop() {
  // Translate string to number
  return parseFloat(getComputedStyle(birdElement).getPropertyValue('--bird-top'))
}

function handleJump(e) {
  if(e.code !== "Space") return

  timeSinceLastJump = 0
}

