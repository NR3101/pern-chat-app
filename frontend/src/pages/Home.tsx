import MessageContainer from '../components/messages/MessageContainer'
import Sidebar from '../components/sidebar/Sidebar'

const Home = () => {
  return (
    <div className='flex h-[80vh] w-full md:max-w-screen-md md:h-[550px] rounded-lg overflow-hidden bg-purple-600 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 border border-transparent shadow-xl'>
      <Sidebar />
      <MessageContainer />
    </div>
  )
}
export default Home
