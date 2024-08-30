import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import ConversationStore from '../store/conversationStore'

import notificationSound from '../assets/sounds/notification.mp3'

// hook to listen for new messages in real-time and update the messages state
export const useListenMessages = () => {
  const { socket } = useSocketContext()
  const { messages, setMessages } = ConversationStore()

  // useEffect to listen for new messages and update the messages state
  useEffect(() => {
    socket?.on('newMessage', newMessage => {
      newMessage.shouldShake = true // add a shouldShake property to the new message
      const sound = new Audio(notificationSound)
      sound.play() // play a notification sound when a new message is received
      setMessages([...messages, newMessage])
    })

    // cleanup function to remove the event listener
    return () => {
      socket?.off('newMessage')
    }
  }, [socket, messages, setMessages])
}
