import { UsersTableProps } from '../interfaces/UsersTableProps'
import { UserCrud } from '../interfaces/User'
const UsersTable: React.FC<UsersTableProps> = ({
  users,
  editUser,
  deleteUser
}) => {
  return (
    <div className='relative overflow-x-auto'>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Nombre de usuario
            </th>
            <th scope='col' className='px-6 py-3'>
              Editar
            </th>
            <th scope='col' className='px-6 py-3'>
              Eliminar
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: UserCrud) => (
            <tr
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
              key={user.id}
            >
             
              <th
                scope='row'
                className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
              >
                <span>{user.name} </span>
              </th>
              <td className='px-6 py-4'>
                <button onClick={() => editUser(user.id)}>Editar</button>
              </td>
              <td className='px-6 py-4'>
                <button onClick={() => deleteUser(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default UsersTable
