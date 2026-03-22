"use client"

import React, { useEffect, useRef } from "react"

const RevolutionBackground = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const workerRef = useRef<Worker | null>(null)
  const rectRef = useRef<{ left: number; top: number; width: number; height: number; dpr: number }>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    dpr: 1
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const timer = setTimeout(() => {
      const worker = new Worker(new URL("../workers/revolution.worker.ts", import.meta.url))
      workerRef.current = worker

      const offscreen = canvas.transferControlToOffscreen()
      
      const initialRect = canvas.getBoundingClientRect()
      rectRef.current = {
        left: initialRect.left,
        top: initialRect.top,
        width: initialRect.width || window.innerWidth,
        height: initialRect.height || window.innerHeight,
        dpr: window.devicePixelRatio || 1
      }

      worker.postMessage({
        type: "init",
        payload: { 
          canvas: offscreen,
          width: rectRef.current.width * rectRef.current.dpr,
          height: rectRef.current.height * rectRef.current.dpr
        },
      }, [offscreen])

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { left, top, width, height } = entry.target.getBoundingClientRect()
          rectRef.current = { left, top, width, height, dpr: window.devicePixelRatio }
          
          worker.postMessage({
            type: "resize",
            payload: {
              width: width * rectRef.current.dpr,
              height: height * rectRef.current.dpr,
            },
          })
        }
      })
      resizeObserver.observe(canvas)
      
      const handleMouseMove = (e: MouseEvent) => {
        const { left, top, height, dpr } = rectRef.current
        const x = (e.clientX - left) * dpr
        const y = (height - (e.clientY - top)) * dpr
        
        worker.postMessage({
          type: "mousemove",
          payload: { x, y }
        })
      }
      
      window.addEventListener("mousemove", handleMouseMove, { passive: true })

      // Cleanup logic moved inside or handled by external state? No, we need it here.
    }, 1000); // 1s delay for main UI priority

    return () => {
      clearTimeout(timer);
      if (workerRef.current) {
        workerRef.current.postMessage({ type: "cleanup" });
        workerRef.current.terminate();
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none" style={{ background: "#000510" }}>
      {/* 4x-100-performance-wizard: Render Canvas Off-Main-Thread */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full" 
      />
    </div>
  )
})

RevolutionBackground.displayName = "RevolutionBackground"

export default RevolutionBackground

