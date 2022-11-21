import React, { useRef, useEffect } from 'react'
import './Canvas.css'

interface CanvasProps {
  width: number
  height: number
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
    }
  }

  window.addEventListener('keydown', onKeyDown)
}

// draw in canvas using the mouse
function drawMouse(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (ctx === null) {
    return
  }

  let isDrawing = false
  let x = 0
  let y = 0

  function drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
    ctx.beginPath()
    ctx.strokeStyle = '#F78277'
    ctx.lineWidth = 2
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.closePath()
  }

  function onMouseDown(event: MouseEvent) {
    x = event.offsetX
    y = event.offsetY
    isDrawing = true
  }

  function onMouseMove(event: MouseEvent) {
    if (isDrawing === true && ctx !== null) {
      drawLine(ctx, x, y, event.offsetX, event.offsetY)
      x = event.offsetX
      y = event.offsetY
    }
  }

  function onMouseUp(event: MouseEvent) {
    if (isDrawing === true && ctx !== null) {
      drawLine(ctx, x, y, event.offsetX, event.offsetY)
      x = 0
      y = 0
      isDrawing = false
    }
  }

  canvas.addEventListener('mousedown', onMouseDown)
  canvas.addEventListener('mousemove', onMouseMove)
  canvas.addEventListener('mouseup', onMouseUp)
}


function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const w = 1000
  const h = 1000

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas !== null) {
      canvas.width = w
      canvas.height = h
      drawMouse(canvas)

      // clear canvas using spacebar
      clearCanvas(canvas)
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
