import { useForm } from 'react-hook-form'

const LoginRegistrationForm = ({ user, edit, handleSubmitData }) => {
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true
  })
  return (
    <div className=' mx-auto text-center text-title py-20 border border-red-500 '>
      <p className='py-8 font-bold text-stone-900 text-3xl'>
        {' '}
        {edit ? 'Editar usuario' : 'Agregar un nuevo usuario'}
      </p>
      <form
        className='bg-shadow space-y-4 '
        onSubmit={handleSubmit(handleSubmitData)}
      >
        <div className='w-full space-x-4 '>
          <label htmlFor='email'>Correo</label>
          <input
            className='text-shadow bg-sky-100'
            type='email'
            defaultValue={user && user.email}
            placeholder='correo@dominio.com'
            {...register('email', {
              required: 'Por favor ingrese el email.'
            })}
          />
        </div>
        <div className='w-full space-x-4'>
          <label htmlFor='email'>Nombre</label>
          <input
            className='text-shadow bg-sky-100'
            placeholder='Nombre del usuario'
            defaultValue={user && user.name}
            {...register('name', {
              required: 'Por favor ingrese el nombre.'
            })}
          />
        </div>
        <div className='w-full space-x-4'>
          <label htmlFor='email'>Contraseña</label>
          <input
            className='text-shadow bg-sky-100'
            type='password'
            defaultValue={user && user.password}
            placeholder='••••••••'
            {...register('password', {
              required: 'Por favor ingrese el password.',
              minLength: 8
            })}
          />
        </div>
        <button className='bg-green-600 p-2 rounded-md text-zinc-200 font-bold hover:bg-green-500'>
          {edit ? 'Actualizar' : 'Agregar'}
        </button>
      </form>
    </div>
  )
}
export default LoginRegistrationForm
