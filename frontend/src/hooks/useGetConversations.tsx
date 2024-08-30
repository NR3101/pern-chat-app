import { useEffect, useState } from 'react'
import { ConversationType } from '../store/conversationStore'
import toast from 'react-hot-toast'

// hook to fetch conversations
export const useGetConversations = () => {
  const [loading, setLoading] = useState(false)
  const [conversations, setConversations] = useState<ConversationType[]>([])

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true)

      try {
        const res = await fetch('api/messages/conversations')
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || 'Something went wrong')
        }

        setConversations(data)
      } catch (error: any) {
        console.error(error.message)
        toast.error(error.message, {
          id: 'getConversationsError'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchConversations()
  }, [])

  return { loading, conversations }
}
