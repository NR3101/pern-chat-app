import { useEffect, useRef } from 'react'

// hook to auto scroll chat messages to the bottom when a new message is sent
export const useChatScroll = (dep: any) => {
  const ref = useRef<HTMLElement>()

  useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight
      }
    }, 100)
  }, [dep])

  return ref
}
