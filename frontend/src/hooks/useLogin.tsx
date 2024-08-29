import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'

type LoginInputs = {
  username: string
  password: string
}

export const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext()

  const login = async (inputs: LoginInputs) => {
    try {
      setLoading(true)

      const res = await fetch('/api/auth/login', {
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
        id: 'login-error'
      })
    } finally {
      setLoading(false)
    }
  }

  return { loading, login }
}
