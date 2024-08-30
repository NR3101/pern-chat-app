import { useEffect, useState } from 'react'
import ConversationStore from '../store/conversationStore'
import toast from 'react-hot-toast'

// hook to get messages for the selected conversation
export const useGetMessages = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = ConversationStore()

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true)
      setMessages([])

      if (!selectedConversation) return

      try {
        const res = await fetch(`api/messages/${selectedConversation.id}`)
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || 'Something went wrong')
        }

        setMessages(data)
      } catch (error: any) {
        console.log(error.message)
        toast.error(error.message, {
          id: 'getMessagesError'
        })
      } finally {
        setLoading(false)
      }
    }

    getMessages()
  }, [selectedConversation, setMessages])

  return { messages, loading }
}
