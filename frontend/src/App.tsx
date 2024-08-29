import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { useAuthContext } from './context/AuthContext'
import { Loader } from 'lucide-react'

function App () {
  const { authUser, isLoading } = useAuthContext()

  if (isLoading) {
    return <Loader className='w-10 h-10 animate-spin' />
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
    </div>
  )
}

export default App
