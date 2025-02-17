"use client"

import type React from "react"
import { useRef, useEffect } from "react"

interface Emoji {
  x: number
  y: number
  speedX: number
  speedY: number
  emoji: string
  size: number
}

interface Star {
  x: number
  y: number
  size: number
}

const EMOJIS = ["💻", "🖥️", "⌨️", "🖱️", "🚀", "⚛️", "🐍", "☕", "🌐", "📱"]

const FloatingEmojis: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const emojisRef = useRef<Emoji[]>([])
  const starsRef = useRef<Star[]>([])
  const mouseRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Initialize emojis
    /*for (let i = 0; i < 10; i++) {
      emojisRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speedX: (Math.random() - 0.5) * 0.5, // Réduire la vitesse initiale
        speedY: (Math.random() - 0.5) * 0.5, // Réduire la vitesse initiale
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        size: 20 + Math.random() * 20,
      })
    }*/

    // Initialize stars
    for (let i = 0; i < 50; i++) {
      starsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw and update stars
      ctx.fillStyle = "white"
      starsRef.current.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        star.y += 0.2
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })

      // Draw and update emojis
      emojisRef.current.forEach((emoji) => {
        ctx.font = `${emoji.size}px Arial`
        ctx.fillText(emoji.emoji, emoji.x, emoji.y)

        emoji.x += emoji.speedX * 0.2 // Ralentir le mouvement horizontal
        emoji.y += emoji.speedY * 0.2 // Ralentir le mouvement vertical

        if (emoji.x < 0 || emoji.x > canvas.width) emoji.speedX *= -1
        if (emoji.y < 0 || emoji.y > canvas.height) emoji.speedY *= -1

        // Interact with mouse
        if (mouseRef.current) {
          const dx = mouseRef.current.x - emoji.x
          const dy = mouseRef.current.y - emoji.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            emoji.speedX += dx * 0.001 // Réduire la vitesse d'attraction
            emoji.speedY += dy * 0.001 // Réduire la vitesse d'attraction
          }
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />
}

export default FloatingEmojis

