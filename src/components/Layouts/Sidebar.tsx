import { useAuth } from '../../context/authContext'
import { Link, useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const { user, logout } = useAuth()
  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }
  const navigate = useNavigate()

  return (
    <aside
      id='default-sidebar'
      className='fixed top-0s left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0'
      aria-label='Sidebar'
    >
      <div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
        <ul className='space-y-2 font-medium'>
          <li>
            <Link
              to='/'
              className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
                className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
              >
                <path d='M12 19.75V14.75C12 14.3358 12.3358 14 12.75 14H17V19.75C17 20.1642 16.6642 20.5 16.25 20.5H7.75C7.33579 20.5 7 20.1642 7 19.75V14H11.25C11.6642 14 12 14.3358 12 14.75V19.75Z'></path>
                <path d='M19 13.75L12 8.75L5 13.75'></path>
                <line x1='12' y1='8.75' x2='12' y2='14.75'></line>
              </svg>
              <span className='ml-3'>Inicio</span>
            </Link>
          </li>
          {user && (
            <li>
              <Link
                to='/searcher'
                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                >
                  <circle cx='11' cy='11' r='8'></circle>
                  <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
                </svg>
                <span className='ml-3'>Buscar</span>
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link
                to='/dashboard'
                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              >
                <svg
                  aria-hidden='true'
                  className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
                <span className='flex-1 ml-3 whitespace-nowrap'>Usuarios</span>
              </Link>
            </li>
          )}

          {!user && (
            <li>
              <Link
                to='/login'
                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              >
                <svg
                  aria-hidden='true'
                  className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
                <span className='flex-1 ml-3 whitespace-nowrap'>
                  Iniciar sesion
                </span>
              </Link>
            </li>
          )}

          {!user && (
            <li>
              <Link
                to='/registro'
                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              >
                <svg
                  aria-hidden='true'
                  className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
                <span className='flex-1 ml-3 whitespace-nowrap'>Registro</span>
              </Link>
            </li>
          )}
          {user && (
            <li>
              <button
                onClick={() => handleLogout()}
               
                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              >
                <svg
                  aria-hidden='true'
                  className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
                <span className='flex-1 ml-3 whitespace-nowrap'>Cerrar sesion</span>
              </button>
            </li>
          )}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
