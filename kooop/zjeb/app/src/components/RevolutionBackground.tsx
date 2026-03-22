"use client";

import React, { useEffect, useRef, useState, memo } from "react"
import { gsap } from "gsap"

/**
 * REVOLUTION BACKGROUND - Uber Auditor Edition (Phase 6.3)
 * Optimized for React 19 Zero-Render stability.
 * Uses OffscreenCanvas + WebWorker + GPGPU Compute.
 */
const RevolutionBackground = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const workerRef = useRef<Worker | null>(null)
  const intensityTweenRef = useRef<gsap.core.Tween | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const intensityRef = useRef(1.0)

  useEffect(() => {
    if (!canvasRef.current) return

    // 1. Initialize Worker
    const worker = new Worker(new URL("../workers/revolution.worker.js", import.meta.url))
    workerRef.current = worker

    // 2. Transfer Control to Offscreen
    const canvas = canvasRef.current
    try {
      const offscreen = canvas.transferControlToOffscreen()
      
      // 3. Initialize Worker with dimensions
      const width = window.innerWidth * window.devicePixelRatio
      const height = window.innerHeight * window.devicePixelRatio
      
      worker.postMessage({
        type: "init",
        canvas: offscreen,
        width,
        height
      }, [offscreen])
      
      setIsLoaded(true)
    } catch (e) {
      console.warn("OffscreenCanvas already transferred or unsupported", e)
      setIsLoaded(true)
    }

    // 4. Handle Resize - Decoupled
    const handleResize = () => {
      workerRef.current?.postMessage({
        type: "resize",
        width: window.innerWidth * window.devicePixelRatio,
        height: window.innerHeight * window.devicePixelRatio
      })
    }

    // 5. Handle Mouse - Zero-Reflow / Zero-Render
    const handleMouseMove = (e: MouseEvent) => {
      if (workerRef.current) {
        workerRef.current.postMessage({
          type: "mouse",
          x: e.clientX * window.devicePixelRatio,
          y: (window.innerHeight - e.clientY) * window.devicePixelRatio
        })
      }

      // GSAP orchestration directly on worker messages
      if (intensityTweenRef.current) intensityTweenRef.current.kill()
      
      const targetObj = { intensity: intensityRef.current }
      intensityTweenRef.current = gsap.to(
        targetObj,
        {
          intensity: 1.15,
          duration: 0.2,
          ease: "power2.out",
          onUpdate: function () {
            const val = this.targets()[0].intensity
            intensityRef.current = val
            workerRef.current?.postMessage({ type: "intensity", intensity: val })
          },
          onComplete: () => {
            intensityTweenRef.current = gsap.to(
              targetObj,
              {
                intensity: 1.0,
                duration: 0.8,
                delay: 0.05,
                ease: "power2.out",
                onUpdate: function () {
                  const val = this.targets()[0].intensity
                  intensityRef.current = val
                  workerRef.current?.postMessage({ type: "intensity", intensity: val })
                },
              }
            )
          }
        }
      )
    }

    // Phase 6.4: Enforce Passive Listeners
    window.addEventListener("resize", handleResize, { passive: true })
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      worker.terminate()
    }
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full -z-1 pointer-events-none overflow-hidden">
      {/* LCP Skeleton (Zero-State) */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
        style={{
          background: "radial-gradient(circle at 50% 50%, #1a0533 0%, #000510 100%)",
        }}
      />
      
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full" 
        style={{ background: "#000510" }} 
      />

      {/* Dither/Noise Hybrid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  )
})

RevolutionBackground.displayName = "RevolutionBackground"

export default RevolutionBackground
