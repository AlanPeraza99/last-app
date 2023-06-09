import { useAuth } from '../context/authContext'
import 'firebase/firestore'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import firestoreResponses from '../utils/firestore-responses'
import Spin from '../components/Spin'
import { useState } from 'react'

const Login = () => {
  const { login, user } = useAuth()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true
  })

  const onSubmit = async data => {
    setLoading(true)
    login(data.email, data.password)
      .then(() => {
        navigate('/')
      })
      .catch(firestoreResponses)
      .finally(() => {
        setLoading(false)
      })
  }

  if (user) {
    navigate('/')
  }
  return (
    <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
      <div className='w-full rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 bg-stone-900'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <h1 className='text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            Inicia sesión en tu cuenta
          </h1>
          <form
            className='space-y-4 md:space-y-6'
            action='#'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Correo
              </label>
              <input
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-shadow'
                type='email'
                placeholder='correo@dominio.com'
                {...register('email', {
                  required: 'Por favor ingrese el email.'
                })}
              />
            </div>
            <input
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-shadow'
              type='password'
              placeholder='••••••••'
              {...register('password', {
                required: 'Por favor ingrese el password.',
                minLength: 8
              })}
            />
            <button
              type='submit'
              disabled={loading}
              className='w-full text-white bg-primary-600 transition  hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
            >
              {loading ? <Spin /> : 'Iniciar sesión'}
            </button>
          </form>
          <div className='flex justify-center'>
            <Link
              to='/registro'
              className='text-sm text-center text-zinc-200 hover:underline hover:text-zinc-100 transition'
            >
              No tengo una cuenta
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
