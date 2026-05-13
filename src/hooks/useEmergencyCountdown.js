import { useState, useEffect } from 'react'

export function useEmergencyCountdown(active) {
  const [count, setCount] = useState(5)

  useEffect(() => {
    if (!active) {
      setCount(5)
      return
    }
    const timer = setInterval(() => {
      setCount(v => (v > 0 ? v - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [active])

  // strokeDashoffset for 5-second ring (circumference = 176)
  const dashOffset = 176 * (5 - count) / 5

  return { count, dashOffset }
}
