import {  toast } from 'react-toastify'

const firestoreResponses = (error) => {
    switch (error.code) {
        case 'auth/user-not-found':
          return toast.error('El usuario no existe.')
        case 'auth/wrong-password':
          return toast.error('La contraseña es incorrecta.')
        case 'auth/weak-password':
          return toast.error(
            'La contraseña debe tener un mínimo de 6 caracteres.'
          )
        case 'auth/email-already-in-use':
          return toast.error(
            'El correo que has intentado registrar ya está siendo utilizado.'
          )
        default:
          return toast.error(
            'Ha ocurrido un error, por favor intente más tarde.'
          )
      }
}

export default firestoreResponses
