import { useContext, createContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth'
import { auth } from '../firebase'

export const authContext = createContext()

export const useAuth = () => {
  if (!useContext(authContext)) throw new Error('No existe el contexto')
  return useContext(authContext)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password)
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)
  const logout = () => signOut(auth)

  const listUsers = async () => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:list?key=AIzaSyBWpRo3ImpDfPRDCJOP-u0d5STRKOpHZhQ'
    )
    const data = await response.json()
    return data.users
  }

  useEffect(() =>
    onAuthStateChanged(
      auth,
      currentUser => setUser(currentUser),

      []
    )
  )

  return (
    <authContext.Provider value={{ signup, login, user, logout, listUsers }}>
      {children}
    </authContext.Provider>
  )
}
