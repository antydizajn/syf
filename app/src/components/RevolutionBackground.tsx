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

    let isDestroyed = false;
    let animId: number;
    let resizeObserver: ResizeObserver | null = null;
    let handleMouseMove: ((e: MouseEvent) => void) | null = null;

    const init = async () => {
      // Check for WebGPU support
      const supportsWebGPU = !!navigator.gpu;
      
      if (supportsWebGPU) {
        try {
          const adapter = await navigator.gpu.requestAdapter();
          if (adapter && !isDestroyed) {
            const worker = new Worker(new URL("../workers/revolution.worker.ts", import.meta.url))
            workerRef.current = worker

            const offscreen = canvas.transferControlToOffscreen()
            
            // Fast initial rect to avoid flicker
            const initialRect = { width: window.innerWidth, height: window.innerHeight, top: 0, left: 0 };
            rectRef.current = {
              left: initialRect.left,
              top: initialRect.top,
              width: initialRect.width,
              height: initialRect.height,
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

            resizeObserver = new ResizeObserver((entries) => {
              for (const entry of entries) {
                if (isDestroyed) return;
                const { width, height } = entry.contentRect;
                const { left, top } = entry.target.getBoundingClientRect();
                
                rectRef.current = { left, top, width, height, dpr: window.devicePixelRatio };
                
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
            
            handleMouseMove = (e: MouseEvent) => {
              const { left, top, height, dpr } = rectRef.current
              const x = (e.clientX - left) * dpr
              const y = (height - (e.clientY - top)) * dpr
              
              worker.postMessage({
                type: "mousemove",
                payload: { x, y }
              })
            }
            
            window.addEventListener("mousemove", handleMouseMove, { passive: true })
            return; // Successful WebGPU init
          }
        } catch (e) {
          console.warn('WebGPU init failed, falling back to 2D:', e);
        }
      }

      if (isDestroyed) return;

      // FALLBACK: Canvas 2D animation if WebGPU is unavailable or fails
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let width = window.innerWidth;
      let height = window.innerHeight;

      const updateCanvasSize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * (window.devicePixelRatio || 1);
        canvas.height = height * (window.devicePixelRatio || 1);
      };

      updateCanvasSize();

      const particles: {x: number, y: number, s: number, o: number}[] = Array.from({ length: 40 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        s: Math.random() * 2 + 1,
        o: Math.random()
      }));

      const render = (time: number) => {
        if (isDestroyed) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 255, 255, 0.15)';
        
        particles.forEach(p => {
          p.y -= p.s * 0.2;
          if (p.y < -10) p.y = canvas.height / (window.devicePixelRatio || 1) + 10;
          
          const opacity = (Math.sin(time * 0.001 + p.o * 10) * 0.5 + 0.5) * 0.2;
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.arc(p.x * (window.devicePixelRatio || 1), p.y * (window.devicePixelRatio || 1), p.s * (window.devicePixelRatio || 1), 0, Math.PI * 2);
          ctx.fill();
        });
        
        animId = requestAnimationFrame(render);
      };
      animId = requestAnimationFrame(render);

      const handleResize = () => {
        updateCanvasSize();
      };
      window.addEventListener('resize', handleResize, { passive: true });

      // Store cleanup for fallback
      (window as any)._rev_cleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', handleResize);
      };
    };

    init();

    return () => {
      isDestroyed = true;
      if (resizeObserver) resizeObserver.disconnect();
      if (handleMouseMove) window.removeEventListener("mousemove", handleMouseMove);
      if (workerRef.current) {
        workerRef.current.postMessage({ type: "cleanup" });
        workerRef.current.terminate();
      }
      if ((window as any)._rev_cleanup) (window as any)._rev_cleanup();
    }
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none" style={{ background: "#000510" }}>
      {/* 4x-100-performance-wizard: Render Canvas Off-Main-Thread */}
      <canvas 
        ref={canvasRef} 
        aria-label="Animowane tło systemowe (Revolution)"
        className="absolute inset-0 w-full h-full" 
      />
    </div>
  )
})

RevolutionBackground.displayName = "RevolutionBackground"

export default RevolutionBackground

