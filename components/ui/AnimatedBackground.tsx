'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Create an array for the pulses
  const rings = Array.from({ length: 5 })

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-black flex items-center justify-center">
      {/* Central Pulse Rings */}
      {rings.map((_, i) => (
        <motion.div
          key={`center-${i}`}
          animate={{
            scale: [0, 4],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 1.6, // Stagger the animations
          }}
          className="absolute w-[30vw] h-[30vw] rounded-full border-[2px] border-primary/40 shadow-[0_0_50px_rgba(255,69,0,0.3)]"
        />
      ))}

      {/* Top Left Pulse Rings */}
      {rings.map((_, i) => (
        <motion.div
          key={`tl-${i}`}
          animate={{
            scale: [0, 3],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 2,
          }}
          className="absolute -top-[10%] -left-[10%] w-[20vw] h-[20vw] rounded-full border border-white/20"
        />
      ))}

      {/* Bottom Right Pulse Rings */}
      {rings.map((_, i) => (
        <motion.div
          key={`br-${i}`}
          animate={{
            scale: [0, 5],
            opacity: [0.4, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 2.4,
          }}
          className="absolute -bottom-[20%] -right-[10%] w-[40vw] h-[40vw] rounded-full border border-primary/20"
        />
      ))}
      
      {/* Ambient static glow so it's not totally dark in the background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-primary/5 blur-[120px]" />
    </div>
  )
}
