let pipes = []
const PIPE_INTERVAL = 2000
const PIPE_SPEED = .3
let timeSinceLastPipe 
let pipeCount

export function setupPipe() {
    timeSinceLastPipe = PIPE_INTERVAL
    pipeCount = 0
    // We want to remove all the pipes from the last game
    pipes.forEach(pipe => pipe.remove())
}

export function updatePipes(delta) {
    // Timer 
    timeSinceLastPipe += delta

    // Create pipe every 1500ms
    if(timeSinceLastPipe > PIPE_INTERVAL) {
        timeSinceLastPipe -= PIPE_INTERVAL
        createPipe()
    }

    // Move pipe to the left
    pipes.forEach(pipe => {
        // Check if the pipe off the screen
        if(pipe.left + 120 < 0) {
            pipe.remove()
            // It also means that we pass the pipe so we plus the point!
            pipeCount++
        }
        pipe.left = pipe.left - delta * PIPE_SPEED
    })
}

export function getPipeCount() {
    return pipeCount
}

export function getPipeRect() {
    // flatMap converts multiple arrays to one single array
    return pipes.flatMap(pipe => pipe.rects())
}

function createPipe() {
    const pipeElement = document.createElement('div')
    pipeElement.classList.add('pipe')
    const topElement = createSegment('top')
    const bottomElement = createSegment('bottom')
    pipeElement.append(topElement)
    pipeElement.append(bottomElement)

    // Set hole top, 120 and 100 are just random number for not letting the hole off the screen
    pipeElement.style.setProperty('--hole-top', randomBetween(120 * 1.5, window.innerHeight - 100))

    // Create helper function
    const pipe = {
        // We will use sth like set(get...)
        get left() {
            return parseFloat(getComputedStyle(pipeElement).getPropertyValue('--pipe-left'))
        },
        
        set left(value) {
            pipeElement.style.setProperty('--pipe-left', value)
        },
        // remove the pipe when it is off the page and from the pipes array
        remove() {
            pipes = pipes.filter(p => p !== pipe)
            pipeElement.remove()
        }, 
        // Remove rect of top and bottom of the pipe
        rects() {
            return [
                topElement.getBoundingClientRect(),
                bottomElement.getBoundingClientRect()
            ]
        }
    }
    pipe.left = window.innerWidth //Put the pipe by default very far from our screen
    document.body.append(pipeElement)
    pipes.push(pipe)
}

function createSegment(position) {
    const segment = document.createElement('div')
    segment.classList.add('segment', position)
    return segment
}

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}