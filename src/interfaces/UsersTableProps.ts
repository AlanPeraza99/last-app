import { UserCrud } from './User'

export interface UsersTableProps {
  users: UserCrud[]
  editUser: (id: string) => void
  deleteUser: (id: string) => void

}
