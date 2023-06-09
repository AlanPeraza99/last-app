import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/authContext'
import { ProtectedRouters } from './components/ProtectedRoutes'
import Dashboard from './pages/Dashboard'
import Searcher from './pages/Searcher'
import UserLogin from './pages/Login'
import Home from './pages/Home'
import Layout from './pages/Layout/Layout'
import Register from './pages/Register'
import NoMatch from './pages/NoMatch'

export default function App () {
  return (
    <div className='bg-primary'>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route
              path='/dashboard'
              element={
                <ProtectedRouters>
                  <Dashboard />
                </ProtectedRouters>
              }
            ></Route>
            <Route
              path='searcher'
              element={
                <ProtectedRouters>
                  <Searcher/>
                </ProtectedRouters>
              }
            ></Route>
            <Route path='/' element={<Home />} />
            <Route path='registro' element={<Register />} />
            <Route path='login' element={<UserLogin />} />
            <Route path='*' element={<NoMatch />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  )
}
