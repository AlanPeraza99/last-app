import { Link } from 'react-router-dom'

const NoMatch = () => {
  return (
    <div className='text-5xl text-center font-bold'>
      <h2>404</h2>
      <h2>No se ha encontrado el sitio</h2>
      <p className='py-10'>
        <Link className='cursor-pointer bg-red-500 rounded-md px-5 text-zinc-100 hover:bg-red-600 transition' to='/'>Volver a Home</Link>
      </p>
    </div>
  )
}

export default NoMatch
