import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { useAuthContext } from './context/AuthContext'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'

function App () {
  const { authUser, isLoading } = useAuthContext()

  if (isLoading) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <Loader className='w-12 h-12 animate-spin' />
      </div>
    )
  }

  return (
    <div className='p-4 flex items-center justify-center h-screen'>
      <Routes>
        <Route
          path='/'
          element={authUser ? <Home /> : <Navigate to='/login' />}
        />
        <Route
          path='/signup'
          element={!authUser ? <SignUp /> : <Navigate to='/' />}
        />
        <Route
          path='/login'
          element={!authUser ? <Login /> : <Navigate to='/' />}
        />
      </Routes>

      <Toaster toastOptions={{ duration: 2000 }} />
    </div>
  )
}

export default App
