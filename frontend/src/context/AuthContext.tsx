import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'

// Auth user type
type AuthUserType = {
  id: string
  email: string
  fullName: string
  profilePic: string
  gender: string
}

// Auth context
const AuthContext = createContext<{
  authUser: AuthUserType | null
  setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>
  isLoading: boolean
}>({
  authUser: null,
  setAuthUser: () => {},
  isLoading: true
})

// Auth context provider
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUserType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me')
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || 'Something went wrong')
        }

        setAuthUser(data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser() // Fetch user on mount
  }, [])

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use the auth context
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext)
}
