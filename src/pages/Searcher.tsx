import { useState } from 'react'
import axios from 'axios'
import song from '../images/song.jpg'
import MusicCard from '../components/MusicCard'
import ModalTemplate from '../components/Modal'
import Spin from '../components/Spin'
import { ToastContainer, toast } from 'react-toastify'

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(
    'Busque alguna canción, artista o album...'
  )
  const [searchResults, setSearchResults] = useState([]);

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<any>('')
  const api = process.env.REACT_APP_LAST_APP_API

  const handleSearch = async () => {
    if (search.length === 0)
      return toast.error('Debe escribir primero en el cuadro de búsqueda.')
    setLoading(true)
    let response
    setSearchResults([])
    let results:any = []
    response = await axios.get(
      `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${search}&api_key=${api}&format=json`
    )
    results = results.concat(response.data.results.trackmatches.track)
    response = await axios.get(
      `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${search}&api_key=${api}&format=json`
    )
    results = results.concat(response.data.results.albummatches.album)
    response = await axios.get(
      `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${search}&api_key=${api}&format=json`
    )
    results = results.concat(response.data.results.artistmatches.artist)
    setSearchResults(results)
    if (results.length === 0) {
      setLoading(false)
      setMessage('No se han encontrado resultados.')
    }
  }

  const openModalContent = (content:any)=> {
    setOpenModal(true)
    setModalContent(content)
  }

  return (
    <div className='w-full h-full'>
      <ToastContainer />

      <ModalTemplate
        openModal={openModal}
        setOpenModal={() => setOpenModal(false)}
        content={modalContent}
        width={'30%'}
        height={'15%'}
      />

      <div className='mx-auto flex justify-center space-x-4 py-4 z-index: 10 w-full bg-black'>
        <h2 className='my-auto font-bold text-white '>Buscar canción</h2>
        <input
          type='text'
          className='text-shadow px-5'
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder='Buscar algo'
        ></input>
        {search.length > 0 && (
          <div
            onClick={() => setSearch('')}
            className='text-white my-auto text-xl hover:text-2xl cursor-pointer'
          >
            X
          </div>
        )}

        <button
          className='bg-stone-100 hover:bg-stone-200 px-5 py-1 z-index: 20; '
          onClick={() => handleSearch()}
        >
          Buscar
        </button>
      </div>
      {searchResults.length > 0 ? (
        <div className=' bg-opacity-100 h-full text-center my-4 '>
          <div className='grid grid-cols-3 gap-4 mb-4'></div>
          <div className='grid grid-cols-3 '>
            {searchResults?.map(function (element:any) {
              return (
                <MusicCard
                  spaceBetween
                  title={element.name}
                  playSong={() =>
                    openModalContent(
                      <div className='text-center space-y-4'>
                        <div className='font-bold'>
                          Artista :{element.artist}
                        </div>
                        <div className='text-blue-500'>
                          Link :{' '}
                          <a
                            className='text-primary'
                            target='_blank'
                            rel='noreferrer'
                            href={element.url}
                          >
                            {element.url}{' '}
                          </a>
                        </div>
                      </div>
                    )
                  }
                  image={song}
                />
              )
            })}
          </div>
        </div>
      ) : (
        <div className='text-center my-10 text-slate-900 text-3xl'>
          {loading ? <Spin width='40' /> : message}
        </div>
      )}
    </div>
  )
}

export default Home
