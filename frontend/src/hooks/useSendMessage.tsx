import { useState } from 'react'
import ConversationStore from '../store/conversationStore'
import toast from 'react-hot-toast'

// hook to send a message
export const useSendMessage = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = ConversationStore()

  const sendMessage = async (message: string) => {
    if (!selectedConversation) return
    setLoading(true)

    try {
      const res = await fetch(`api/messages/send/${selectedConversation.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setMessages([...messages, data])
    } catch (error: any) {
      console.error(error.message)
      toast.error(error.message, {
        id: 'sendMessageError'
      })
    } finally {
      setLoading(false)
    }
  }

  return { sendMessage, loading }
}
