import { useState } from 'react'
import ReactAudioPlayer from 'react-audio-player'
import ModalTemplate from '../components/Modal'
import MusicCard from '../components/MusicCard'
import rock from '../images/rock.jpeg'
import rock2 from '../images/rock2.jpeg'
import peso_pluma from '../images/peso_pluma2.jpeg'
import shakira from '../images/shakira.webp'
import pop from '../images/pop.jpeg'
import disc from '../images/disc.webp'
import IA from '../images/IA.jpeg'
import weekend from '../images/weekend.webp'
import IAimage1 from '../images/IA/image1.jpeg'
import IAimage2 from '../images/IA/image2.jpg'
import IAimage3 from '../images/IA/image3.jpg'

const Home = () => {
  const [openModal, setOpenModal] = useState(false)
  const [title, setTitle] = useState<string>('')
  const [music, setMusic] = useState<string>('')
  const [image, setImage] = useState<string>('')

  const artistsMusic = {
    MEGADETH: 'Megadeth',
    QUEEN: 'Queen',
    WEEKEND: 'Weekend',
    GUNS: 'Guns',
    PLUMA: 'Pluma',
    SHAKIRA: 'Shakira'
  }

  const iaCovers = [
    {
      artist: 'Rick Sanchez - La noche mas linda del mundo',
      image: IAimage1,
      song: '../music/IA_COVERS/IACOVER1.mp3'
    },
    {
      artist: 'Michael Jackson - Atrevete',
      image: IAimage2,
      song: '../music/IA_COVERS/IACOVER2.mp3'
    },
    {
      artist: 'AMLO - Vete ya',
      image: IAimage3,
      song: '../music/IA_COVERS/IACOVER3.mp3'
    }
  ]

  const playSong = (artist: string) => {
    setTitle(artist)
    switch (artist) {
      case artistsMusic.MEGADETH:
        setMusic('../music/MEGADETH.mp3')
        setImage(rock)
        break
      case artistsMusic.QUEEN:
        setMusic('../music/QUEEN.mp3')
        setImage(pop)
        break
      case artistsMusic.GUNS:
        setMusic('../music/GUNS.mp3')
        setImage(rock2)
        break
      case artistsMusic.WEEKEND:
        setMusic('../music/WEEKEND.mp3')
        setImage(weekend)
        break
      case artistsMusic.PLUMA:
        setMusic('../music/PLUMA.mp3')
        setImage(peso_pluma)
        break
      case artistsMusic.SHAKIRA:
        setMusic('../music/SHAKIRA.mp3')
        setImage(shakira)
        break
      default:
        let item = iaCovers[Math.floor(Math.random() * iaCovers.length)]
        setMusic(item.song)
        setTitle(item.artist)
        setImage(item.image)
        break
    }
    setOpenModal(true)
  }

  return (
    <div className='p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 h-full'>
      <ModalTemplate
        openModal={openModal}
        setOpenModal={() => {
          setOpenModal(false)
        }}
        content={
          <div className='relative w-full mx-auto text-center space-y-4 '>
            <p className='font-bold text-2xl'>{title}</p>
            <img
              alt=''
              src={disc}
              className='animate-spin mx-auto h-40 w-40 py-auto'
            />
            <img alt='' src={image} className='object-cover mx-auto h-40' />
            <div className='mx-auto'>
              <ReactAudioPlayer
                className='mx-auto'
                src={music}
                autoPlay
                controls
              />
            </div>
          </div>
        }
      />
      <div className='grid grid-cols-3 gap-4 mb-4'>
        <MusicCard
          title={'Megadeth'}
          image={rock}
          playSong={() => playSong('Megadeth')}
        />
        <MusicCard
          title={'Queen'}
          image={pop}
          playSong={() => playSong('Queen')}
        />
        <MusicCard
          title={'Guns'}
          image={rock2}
          playSong={() => playSong('Guns')}
        />
      </div>

      <MusicCard
        title={'Weekend'}
        height={'h-48'}
        image={weekend}
        playSong={() => playSong('Weekend')}
      />

      <div className='grid grid-cols-2 gap-4 mb-4'>
        <MusicCard
          title={'Pluma'}
          height={'h-28'}
          image={peso_pluma}
          playSong={() => playSong('Pluma')}
        />
        <MusicCard
          title={'Shakira'}
          height={'h-28'}
          image={shakira}
          playSong={() => playSong('Shakira')}
        />
      </div>

      <MusicCard
        title={'IA'}
        height={'h-48'}
        image={IA}
        playSong={() => playSong('IA')}
      />
    </div>
  )
}

export default Home
