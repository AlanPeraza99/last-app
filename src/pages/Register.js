import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { db } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import firestoreResponses from '../utils/firestore-responses'
import { useState } from 'react'
import Spin from '../components/Spin'

const Register = () => {
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()
  const usersRef = collection(db, 'usuarios')
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true
  })

  const onSubmit = async data => {
    setLoading(true)
    signup(data.email, data.password)
      .then(async () => {
        await addDoc(usersRef, { ...data })
        navigate('/')
      })
      .catch(firestoreResponses)
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <p className='text-stone-900 text-5xl text-center font-bold py-10'>
        ¡Bienvenido a LAST APP MUSIC!
      </p>
      <div className='w-full rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 bg-stone-900 mx-auto'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8 mx-auto'>
          <h1 className='text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            Llena los datos para registrarte
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
                Nombre
              </label>
              <input
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-shadow'
                placeholder='Nombre de usuario'
                {...register('name', {
                  required: 'Por favor ingrese el nombre.',
                  minLength: 8,
                  maxLength: 20
                })}
              />
            </div>
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
            <div>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Contraseña
              </label>
              <input
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-shadow'
                type='password'
                placeholder='••••••••'
                {...register('password', {
                  required: 'Por favor ingrese el password.',
                  minLength: 8
                })}
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full text-white bg-primary-600 transition  hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
            >
              {loading ? <Spin /> : 'Registrarme'}
            </button>
            <div className='flex justify-center'>
              <Link
                to='/login'
                className='text-sm text-center text-zinc-200 hover:underline hover:text-zinc-100 transition'
              >
                Ya tengo una cuenta
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
