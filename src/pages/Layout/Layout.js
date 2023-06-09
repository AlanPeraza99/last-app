import { useAuth } from '../../context/authContext'
import { Outlet, Link } from 'react-router-dom'
import Sidebar from '../../components/Layouts/Sidebar'
import { ToastContainer } from 'react-toastify'

const Layout = () => {
  const { user } = useAuth()
  return (
    <div className='relative w-full text-secondary'>
      <ToastContainer />
      <div class='absolute top-0 -right-2 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply   animate-blob animation-delay-2000 z-index: 10;'></div>
      <div class='absolute -bottom-8 left-20 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply   animate-blob animation-delay-4000 z-index: 10;'></div>
      <div class='absolute -bottom-8 right-20 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply   animate-blob animation-delay-4000 z-index: 10;'></div>
      <div class='absolute top-0right-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply   animate-blob animation-delay-4000 z-index: 10;'></div>
      <div className='relative w-full text-center font-bold text-zinc-100 bg-stone-900 py-5 flex justify-between px-4'>
        {' '}
        <div></div>
        <Link to='/' className='text-4xl'>
          LAST APP MUSIC
        </Link>
        {!user ? (
          <Link
            to={'/login'}
            className='bg-green-500 hover:bg-green-700 transition p-2 text-zinc-200'
          >
            Iniciar sesion
          </Link>
        ) : (
          <div></div>
        )}
      </div>

      <hr />
      {user && <Sidebar />}
      <div class={`p-4 ${user && 'sm:ml-64'}`}>
        <div style={{ position: 'relative' }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
