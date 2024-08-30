import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'

type SignUpInputs = {
  fullName: string
  username: string
  password: string
  confirmPassword: string
  gender: string
}

// hook to handle user signup
export const useSignup = () => {
  const [loading, setloading] = useState(false)
  const { setAuthUser } = useAuthContext()

  const signup = async (inputs: SignUpInputs) => {
    setloading(true)

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong!')
      }

      setAuthUser(data)
    } catch (error: any) {
      console.error(error)
      toast.error(error.message, {
        id: 'signup-error'
      })
    } finally {
      setloading(false)
    }
  }

  return { loading, signup }
}
