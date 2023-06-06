import * as React from "react";
import { Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth, AuthProvider } from './context/authContext'
import { ProtectedRouters } from "./components/ProtectedRoutes";
import axios from 'axios';
import { db } from "./firebase";
import Dashboard from "./pages/Dashboard";
import { doc, deleteDoc, setDoc, addDoc, getDocs, getDoc, collection } from "firebase/firestore";
import Modal from 'react-modal';
export default function App() {
  return (
    <div className="bg-primary">
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <AuthProvider>

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<ProtectedRouters>
              <Home></Home>
            </ProtectedRouters>}>

            </Route>
            <Route path="panel" element={<ProtectedRouters>
              <Dashboard></Dashboard>
            </ProtectedRouters>}>

            </Route>
            <Route path="registro" element={<Register />} />
            <Route path="login" element={<Login />} />


            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            <Route path="*" element={<NoMatch />} />
          </Route>



        </Routes>
      </AuthProvider>

    </div>
  );
}

const Layout = () => {
  const { user, logout } = useAuth()
  const handleLogout = async () => { await logout(); navigate('/login') }
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen  px-12  bg-primary text-secondary">
      <div className="w-full text-center font-bold"> Aplicacion de musica</div>
      <nav className="w-full text-zinc-100 flex justify-between ...">
        {user ? <Link to="/">Home</Link> : <Link to="/registro">Registro</Link>}
        <Link to="/panel">Dashboard</Link>
        {user ? <button className="bg-shadow px-4 my-1 py-1" onClick={handleLogout}>Cerrar sesion</button> : <Link to="/login">Iniciar sesion</Link>}
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

function Home() {
  const [select, setSelect] = React.useState('track');
  const [search, setSearch] = React.useState('');
  const [topArtists, setTopArtists] = React.useState<any>([]);
  const [searchResults, setSearchResults] = React.useState<any>([]);
  const [message, setMessage] = React.useState<string>('');
  const api = "c185bf8e6951bc04635905a8afbc1420";
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState("");

  const handleSearch = async () => {
    let response;
    setMessage('No se han encontrado resultados :(')
    setSearchResults([])
    switch (select) {
      case 'track':
        response = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${search}&api_key=${api}&format=json`);
        setSearchResults(response.data.results.trackmatches.track);
        break;
      case 'album':
        response = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${search}&api_key=${api}&format=json`);
        setSearchResults(response.data.results.albummatches.album);
        break;
      case 'artist':
        response = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${search}&api_key=${api}&format=json`);
        setSearchResults(response.data.results.artistmatches.artist);
        break;
    }

  }

  const getTopArtists = async () => {
    let response;
    try {
      response = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${api}&format=json`);
    } catch (error) {
      console.error(error);
    }
    console.log(response?.data.artists.artist);
    setTopArtists(response?.data.artists.artist)

  }
  const openModal = (content: any) => {

    setIsOpen(true);

    setModalContent(content)
  }

  React.useEffect(() => {
    getTopArtists();
  }, []);

  return (
    <div className="bg-primary w-full h-full">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          content: {
            top: '30%',
            left: '50%',
            right: 'auto',
            width: "600px",
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
        contentLabel="Example Modal"
      >
        <div className="w-full">
          {modalContent}
        </div>
      </Modal>
      <div className="mx-auto flex justify-center space-x-4 mt-4">

        <h2 className="my-auto">Buscar cancion</h2>
        <input type="text" className="text-shadow px-5" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar algo"></input>
        <select className="text-shadow px-4"
          value={select} onChange={(event) => setSelect(event.target.value)}>
          <option value="track">Cancion</option>
          <option value='album'>Album</option>
          <option value='artist'> Artista</option>
        </select>
        <button className="bg-button p-2 px-4" onClick={handleSearch}>Buscar</button>
      </div>
      {searchResults.length > 0 ?
        <div className="text-center my-4 ">Estos son los resultados de busqueda:
          <div className="grid grid-cols-4">
            {
              searchResults.map(function (element: any, index: number) {
                console.log(element);
                return <div className="bg-shadow text-title m-2 p-2 cursor-pointer" key={index} onClick={() => openModal(
                  <div className="text-center space-y-4">
                    <div>Artista :{element.artist}</div>
                    <div >Link : <a className="text-primary" target="_blank" href={element.url}>{element.url} </a></div>
                  </div>

                )}>
                  {element.name}
                </div>
              })

            }
          </div>


        </div>

        : <div className="text-center my-10">{message}</div>
      }


    </div>
  );
}

function Register() {
  const [user, setUser] = React.useState({
    email: "",
    name: "",
    password: "",
  });
  const { signup } = useAuth();
  const navigate = useNavigate();
  const usersRef = collection(db, 'usuarios');

  const handleChange = ({ target: { name, value } }: any) => {
    setUser({ ...user, [name]: value })
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await signup(user.email, user.password);
      await addDoc(usersRef, {
        name: user.name,
        password: user.password,
        email: user.email,
      });
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="bg-red-500 text-zinc-100 w-full h-screen text-center">
      <h2>Bienvenido al formulario de registro</h2>
      <form className="space-y-4 my-10" onSubmit={handleSubmit}>
        <div className="w-full">
          <label htmlFor="email">Correo</label>
          <input type="email" name="email" onChange={handleChange} className="text-shadow" value={user.email} />
        </div>
        <div className="w-full">
          <label htmlFor="email">Nombre</label>
          <input type="name" name="name" onChange={handleChange} className="text-shadow" value={user.name} />
        </div>
        <div className="w-full">
          <label htmlFor="password">Clave</label>
          <input type="password" name="password" onChange={handleChange} className="text-shadow" value={user.password} />
        </div>

        <button
          type="submit"
          className="bg-blue-200 w-full text-zinc-100">

          Registrarse
        </button>
        <label htmlFor=""></label>
        <label htmlFor=""></label>
      </form>
    </div>

  );
}
function Login() {
  const [userLogin, setUser] = React.useState({
    email: "",
    password: "",
  });
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }: any) => {
    setUser({ ...userLogin, [name]: value })
  }
  const handleSubmit = async (e: any) => {
    console.log('es algo')
    e.preventDefault();
    try {
      await login(userLogin.email, userLogin.password);
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  }
  if (user) {
    navigate('/')
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Inicia sesion en tu cuenta
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" onChange={handleChange} value={userLogin.email} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-shadow" placeholder="name@company.com" />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" onChange={handleChange} value={userLogin.password} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-shadow" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                  </div>
                  <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                </div>
              </div>

              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Iniciar sesion</button>

            </form>
          </div>
        </div>
      </div>
    </section>

  );
}

function NoMatch() {
  return (
    <div>
      <h2>No se ha encontrado el sitio</h2>
      <p>
        <Link to="/">Volver a Home</Link>
      </p>
    </div>
  );
}