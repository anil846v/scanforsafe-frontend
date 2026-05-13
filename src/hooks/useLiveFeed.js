import { useState, useEffect, useRef } from 'react'
import { FEED_EVENTS, ADMIN_INITIAL_FEED } from '@/data/mockData'

export function useLiveFeed() {
  const [feed, setFeed] = useState(ADMIN_INITIAL_FEED)
  const fi = useRef(0)

  useEffect(() => {
    const timer = setInterval(() => {
      const event = FEED_EVENTS[fi.current % FEED_EVENTS.length]
      setFeed(prev => [{ col: event.col, text: event.text, ts: 'now' }, ...prev].slice(0, 7))
      fi.current++
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  return feed
}
