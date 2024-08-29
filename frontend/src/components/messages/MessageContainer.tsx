import { useAuthContext } from '../../context/AuthContext'
import ConversationStore from '../../store/conversationStore'
import MessageInput from './MessageInput'
import Messages from './Messages'

import { MessageCircle } from 'lucide-react'

const MessageContainer = () => {
  const { selectedConversation } = ConversationStore()

  return (
    <div className='w-full flex flex-col'>
      {selectedConversation ? (
        <>
          {/* Header */}
          <div className='bg-gradient-to-r from-violet-500 to-violet-700 px-4 py-2 mb-2 flex items-center'>
            <span className='label-text text-sm'>To :</span>
            <span className='text-gray-800 text-base ml-2 font-bold'>
              {selectedConversation.fullName}
            </span>
          </div>

          <Messages />
          <MessageInput />
        </>
      ) : (
        <NoChatSelected />
      )}
    </div>
  )
}
export default MessageContainer

const NoChatSelected = () => {
  const { authUser } = useAuthContext()

  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome 👋 {authUser?.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <MessageCircle className='text-3xl md:text-6xl text-center' />
      </div>
    </div>
  )
}
