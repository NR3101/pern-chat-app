import { Link } from 'react-router-dom'
import GenderCheckbox from '../components/GenderCheckbox'

const SignUp = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg overflow-hidden bg-purple-500 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 border border-transparent shadow-xl'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign Up{' '}
          <span className='bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent'>
            MERN Chat
          </span>
        </h1>

        <form>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              type='text'
              placeholder='John Doe'
              className='w-full input input-bordered  h-10'
            />
          </div>

          <div>
            <label className='label p-2 '>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              type='text'
              placeholder='johndoe'
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

          <div>
            <label className='label'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              type='password'
              placeholder='Confirm Password'
              className='w-full input input-bordered h-10'
            />
          </div>

          <GenderCheckbox />

          <Link
            to={'/login'}
            className='text-sm hover:underline mt-2 inline-block text-white hover:text-blue-800'
          >
            Already have an account? Login
          </Link>

          <div>
            <button className='btn btn-block btn-sm mt-2 border border-slate-700'>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default SignUp
