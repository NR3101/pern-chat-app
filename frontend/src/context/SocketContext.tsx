import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuthContext } from './AuthContext'

interface SocketContextProps {
  socket: Socket | null
  onlineUsers: string[]
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined)

const socketURL =
  import.meta.env.MODE === 'development' ? 'http://localhost:5000' : '/'

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const socketRef = useRef<Socket | null>(null)
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])
  const { authUser, isLoading } = useAuthContext()

  useEffect(() => {
    if (authUser && !isLoading) {
      const socket = io(socketURL, {
        query: { userId: authUser.id }
      })

      socketRef.current = socket

      socket.on('getOnlineUsers', (users: string[]) => {
        setOnlineUsers(users)
      })

      return () => {
        socket.close()
        socketRef.current = null
      }
    } else if (!authUser && !isLoading) {
      if (socketRef.current) {
        socketRef.current.close()
        socketRef.current = null
      }
    }
  }, [authUser, isLoading])

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocketContext = (): SocketContextProps => {
  const context = useContext(SocketContext)

  if (!context) {
    throw new Error(
      'useSocketContext must be used within SocketContextProvider'
    )
  }

  return context
}

export default SocketContextProvider
