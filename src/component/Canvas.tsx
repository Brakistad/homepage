import { useRef, useEffect } from 'react'
import './Canvas.css'
let drew: boolean;
drew = false;

interface MouseTrail {
  // array of mouse positions
  trail: Array<{ x: number, y: number }>,
}


// clear canvas using spacebar
function clearCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === ' ') {
      clearCanvas(canvas)
      drawText(canvas)
    }
  }

  window.addEventListener('keydown', onKeyDown)
}

// draw text in canvas
function drawText(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (ctx) {
    let m_x: number;
    let m_y: number;
    m_x = canvas.width / 2
    m_y = canvas.height / 2

    ctx.font = '48px serif'
    ctx.fillStyle = '#7EB297'
    ctx.textAlign = 'center'
    ctx.fillText('YOUR DREAM               OUR RESPONSIBILITY', m_x, m_y - 450)
    ctx.fillStyle = '#90B5A2'
    ctx.fillText('SPACEBAR TO CLEAR CANVAS', m_x, m_y)
  }
}

// draw in canvas using the mouse
function drawMouse(canvas: HTMLCanvasElement, mt: MouseTrail) {
  const ctx = canvas.getContext('2d')
  if (ctx === null) {
    return
  }

  let isDrawing = false
  let x = 0
  let y = 0

  function onMouseDown(event: MouseEvent) {
    x = event.offsetX
    y = event.offsetY
    isDrawing = true
    mt.trail.push({ x, y })
    update(canvas, mt)
  }

  function onMouseMove(event: MouseEvent) {
    if (isDrawing === true && ctx !== null) {
      x = event.offsetX
      y = event.offsetY
      mt.trail.push({ x, y })
      update(canvas, mt)
    }
  }

  function onMouseUp(event: MouseEvent) {
    if (isDrawing === true && ctx !== null) {
      x = 0
      y = 0
      isDrawing = false
      update(canvas, mt)
    }
  }

  canvas.addEventListener('mousedown', onMouseDown)
  canvas.addEventListener('mousemove', onMouseMove)
  canvas.addEventListener('mouseup', onMouseUp)
}

function update(canvas: HTMLCanvasElement, mt: MouseTrail) {
  // update the mouse trail
  mt.trail.shift()

  // draw the mouse trail
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawText(canvas)
    ctx.beginPath()
    ctx.strokeStyle = '#40B3A2'
    ctx.lineWidth = 4
     // max distance between points
     const maxDist = 80
    ctx.moveTo(mt.trail[0].x, mt.trail[0].y)
    for (let i = 1; i < mt.trail.length; i++) {
      const dist = Math.sqrt(
        Math.pow(mt.trail[i].x - mt.trail[i - 1].x, 2) +
          Math.pow(mt.trail[i].y - mt.trail[i - 1].y, 2)
      )
      if (dist < maxDist) {
        ctx.lineTo(mt.trail[i].x, mt.trail[i].y)
      } else {
        ctx.moveTo(mt.trail[i].x, mt.trail[i].y)
      }
    }
    ctx.stroke()
    ctx.closePath()
  }

}


function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const w = 1600
  const h = 1000

  let trail: Array<{ x: number, y: number }> = []
  for (let i = 0; i < 500; i++) {
    trail.push({ x: 0, y: 0 })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas !== null) {
      canvas.width = w
      canvas.height = h
      drawMouse(canvas, { trail })

      // clear canvas using spacebar
      clearCanvas(canvas)

      // draw text in canvas
      drawText(canvas)
    }
  }, [w, h])

  return (
    <canvas
      ref={canvasRef}
      width={w}
      height={h}
      className="canvas"
    />
  )
}


export default Canvas
