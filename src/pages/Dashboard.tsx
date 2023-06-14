import { useAuth } from '../context/authContext'
import { useState, useEffect } from 'react'
import * as React from 'react'
import 'firebase/firestore'
import {
  doc,
  deleteDoc,
  setDoc,
  addDoc,
  getDocs,
  getDoc
} from 'firebase/firestore'
import { db } from '../firebase'
import { collection } from 'firebase/firestore'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ModalTemplate from '../components/Modal'
import LoginRegistrationForm from '../components/LoginRegistrationForm'
import Swal from 'sweetalert2'
import firestoreResponses from '../utils/firestore-responses'
import UsersTable from '../components/UsersTable'
import Spin from '../components/Spin'

const Dashboard = () => {
  const { signup } = useAuth()
  const [loading, setLoading] = useState(true)
  const usersRef = collection(db, 'usuarios')
  const [users, setUsers] = useState([])
  const [userEdit, setUserEdit] = useState({
    id: '',
    name: '',
    email: '',
    password: ''
  })
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const [modalIsOpenEdit, setIsOpenEdit] = React.useState(false)
  const swalWithBootstrapButtons = Swal.mixin({})

  const handleSubmit = (data: any) => {
    signup(data.email, data.password)
      .then(async () => {
        await addDoc(usersRef, {
          name: data.name,
          password: data.password,
          email: data.email
        })
        toast.success('Se ha agregado un nuevo usuario.')
        getAllUsers()
        setIsOpen(false)
      })
      .catch(firestoreResponses)
  }

  const handleSubmitEdit = (data: any) => {
    setDoc(doc(db, 'usuarios', userEdit.id), {
      name: data.name,
      password: data.password,
      email: data.email
    })
      .then(async () => {
        getAllUsers()
        setIsOpenEdit(false)
        toast.success('Se ha editado el usuario.')
      })
      .catch(firestoreResponses)
  }

  const getAllUsers = () => {
    setLoading(true)
    getDocs(usersRef)
      .then(response => {
        let users: any = []
        response.forEach(doc => {
          users.push({
            id: doc.id,
            name: doc.data().name
          })
        })
        setUsers(users)
      })
      .catch(firestoreResponses)
      .finally(() => {
        setLoading(false)
      })
  }

  const editUser = async (userId: string) => {
    getDoc(doc(db, 'usuarios', userId))
      .then(response => {
        if (!response.exists())
          return toast.warning('El usuario a consultar no existe.')
        setUserEdit({
          id: userId,
          name: response.data().name,
          email: response.data().email,
          password: response.data().password
        })
        setIsOpenEdit(true)
      })
      .catch(firestoreResponses)
  }

  const deleteUser = async (userId: string) => {
    console.log(userId)
    const result = await swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: 'Este usuario se eliminará',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, elimínalo.',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    })

    if (result.isConfirmed) {
      deleteDoc(doc(db, 'usuarios', userId))
        .then(() => {
          getAllUsers()
          toast.success('Se ha eliminado el usuario.')
        })
        .catch(firestoreResponses)
    }
  }

  useEffect(() => {
    getAllUsers() // eslint-disable-next-line
  }, [])

  return (
    <div>
      <div>
        <div></div>
        <ModalTemplate
          openModal={modalIsOpen}
          setOpenModal={() => setIsOpen(true)}
          content={<LoginRegistrationForm handleSubmitData={handleSubmit} />}
        />
        <ModalTemplate
          openModal={modalIsOpenEdit}
          setOpenModal={() => setIsOpenEdit(true)}
          content={
            <LoginRegistrationForm
              edit
              user={userEdit}
              handleSubmitData={handleSubmitEdit}
            />
          }
        />
      </div>
      <div className='flex justify-end'>
        <button
          className='p-2 bg-gray-900 border-radius my-2 text-zinc-100 hover:bg-gray-800'
          onClick={() => setIsOpen(true)}
        >
          Nuevo usuario
        </button>
      </div>

      {users.length > 0 ? (
        <UsersTable
          users={users}
          editUser={id => editUser(id)}
          deleteUser={id => deleteUser(id)}
        />
      ) : loading ? (
        <Spin width='40' />
      ) : (
        <div className='text-center text-4xl'>
          No se han encontrado usuarios...
        </div>
      )}
    </div>
  )
}

export default Dashboard
