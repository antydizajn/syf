"use client"

import React, { useEffect, useRef } from "react"

const workerCache = new WeakMap<HTMLCanvasElement, Worker>();

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
    let resizeObserver: ResizeObserver | null = null;
    let handleMouseMove: ((e: MouseEvent) => void) | null = null;

    const init = () => {
      try {
        let worker = workerCache.get(canvas);
        
        if (!worker) {
          worker = new Worker(new URL("../workers/revolution.worker.ts", import.meta.url));
          workerCache.set(canvas, worker);
          
          // Only transfer if not already done
          if (!(canvas as any)._isTransferred) {
            try {
              const offscreen = canvas.transferControlToOffscreen();
              ;(canvas as any)._isTransferred = true;
              
              worker.postMessage({
                type: "init",
                payload: { 
                  canvas: offscreen,
                  width: rectRef.current.width * rectRef.current.dpr,
                  height: rectRef.current.height * rectRef.current.dpr
                },
              }, [offscreen]);
            } catch (transferErr) {
              console.warn('Offscreen transfer failed (possibly already transferred):', transferErr);
            }
          }
        }
        
        workerRef.current = worker;

        // Always send a resize to ensure it's up to date
        worker.postMessage({
          type: "resize",
          payload: {
            width: canvas.clientWidth * window.devicePixelRatio,
            height: canvas.clientHeight * window.devicePixelRatio,
          },
        });

        resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            if (isDestroyed || !workerRef.current) return;
            const { width, height } = entry.contentRect;
            rectRef.current = { left: 0, top: 0, width, height, dpr: window.devicePixelRatio };
            
            workerRef.current.postMessage({
              type: "resize",
              payload: {
                width: width * rectRef.current.dpr,
                height: height * rectRef.current.dpr,
              },
            });
          }
        });
        resizeObserver.observe(canvas);
        
        handleMouseMove = (e: MouseEvent) => {
          if (!workerRef.current) return;
          const { left, top, height, dpr } = rectRef.current;
          const x = (e.clientX - left) * dpr;
          const y = (height - (e.clientY - top)) * dpr;
          
          workerRef.current.postMessage({
            type: "mousemove",
            payload: { x, y }
          });
        };
        
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
      } catch (e) {
        console.error('RevolutionBackground Worker init failed:', e);
      }
    };

    init();

    return () => {
      isDestroyed = true;
      if (resizeObserver) resizeObserver.disconnect();
      if (handleMouseMove) window.removeEventListener("mousemove", handleMouseMove);
      // We DO NOT terminate the worker here because it's cached in workerCache 
      // and might be reused by the next mount in Strict Mode.
      // The worker itself handles "cleanup" if we send it, but we only want to 
      // terminate if the canvas is truly gone from the DOM.
    }
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none" style={{ background: "#000510" }}>
      <canvas 
        ref={canvasRef} 
        role="img"
        aria-label="Animowane tło systemowe (Off-Main-Thread)"
        className="absolute inset-0 w-full h-full" 
      />
    </div>
  )
})

RevolutionBackground.displayName = "RevolutionBackground"

export default RevolutionBackground
