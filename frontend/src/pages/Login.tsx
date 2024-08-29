import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg bg-purple-500 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 border border-transparent shadow-xl'>
        <h1 className='text-3xl font-semibold text-center text-white'>
          Login{' '}
          <span className='bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent'>
            MERN Chat
          </span>
        </h1>

        <form>
          <div>
            <label className='label p-2 '>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              type='text'
              placeholder='Enter username'
              className='w-full input input-bordered h-10'
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              className='w-full input input-bordered h-10'
            />
          </div>
          <Link
            to='/signup'
            className='text-sm  hover:underline text-white hover:text-blue-800 mt-2 inline-block'
          >
            {"Don't"} have an account? Sign Up
          </Link>

          <div>
            <button className='btn btn-block btn-sm mt-2'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Login
