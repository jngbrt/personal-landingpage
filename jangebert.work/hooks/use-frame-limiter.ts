"use client"

import { useEffect, useRef } from "react"

// Custom hook to limit frame updates for performance
export function useFrameLimiter(fps = 30) {
  const lastUpdateTimeRef = useRef(0)
  const frameIntervalRef = useRef(1000 / fps)

  useEffect(() => {
    frameIntervalRef.current = 1000 / fps
  }, [fps])

  const shouldUpdate = () => {
    const now = performance.now()
    const elapsed = now - lastUpdateTimeRef.current

    if (elapsed > frameIntervalRef.current) {
      lastUpdateTimeRef.current = now
      return true
    }

    return false
  }

  return shouldUpdate
}

