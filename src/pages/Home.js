import React from 'react'
import rock from '../images/rock.jpeg'
import rock2 from '../images/rock2.jpeg'
import peso_pluma from '../images/peso_pluma2.jpeg'
import shakira from '../images/shakira.webp'
import pop from '../images/pop.jpeg'
import disc from '../images/disc.webp'
import IA from '../images/IA.jpeg'
import weekendmp3 from '../music/WEEKEND.mp3'
import weekend from '../images/weekend.webp'
import megadeth from '../music/MEGADETH.mp3'
import guns from '../music/GUNS.mp3'
import queen from '../music/QUEEN.mp3'
import plumaMP3 from '../music/PLUMA.mp3'
import shakiraMP3 from '../music/SHAKIRA.mp3'
import IAimage1 from '../images/IA/image1.jpeg'
import IAimage2 from '../images/IA/image2.jpg'
import IAimage3 from '../images/IA/image3.jpg'
import iaCover1 from '../music/IA_COVERS/IACOVER1.mp3'
import iaCover2 from '../music/IA_COVERS/IACOVER2.mp3'
import iaCover3 from '../music/IA_COVERS/IACOVER3.mp3'
import ReactAudioPlayer from 'react-audio-player'
import ModalTemplate from '../components/Modal'
import MusicCard from '../components/MusicCard'

const Home = () => {
  const [openModal, setOpenModal] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [music, setMusic] = React.useState('')
  const [image, setImage] = React.useState('')
  const iaCovers = [
    {
      artist: 'Rick Sanchez - La noche mas linda del mundo',
      image: IAimage1,
      song: iaCover1
    },
    { artist: 'Michael Jackson - Atrevete', image: IAimage2, song: iaCover2 },
    { artist: 'AMLO - Vete ya', image: IAimage3, song: iaCover3 }
  ]

  const playSong = artist => {
    setTitle(artist)
    switch (artist) {
      case 'MEGADETH':
        setMusic(megadeth)
        setImage(rock)
        break
      case 'QUEEN':
        setMusic(queen)
        setImage(pop)
        break
      case 'GUNS':
        setMusic(guns)
        setImage(rock2)
        break
      case 'WEEKEND':
        setMusic(weekendmp3)
        setImage(weekend)
        break
      case 'PLUMA':
        setMusic(plumaMP3)
        setImage(peso_pluma)
        break
      case 'SHAKIRA':
        setMusic(shakiraMP3)
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
    <div class='p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 h-full'>
      <ModalTemplate
        openModal={openModal}
        setOpenModal={setOpenModal}
        content={
          <div className='relative w-full mx-auto text-center space-y-4 '>
            <p className='font-bold text-2xl'>{title}</p>
            <img
              alt=''
              src={disc}
              className='animate-spin mx-auto h-40 w-40 py-auto'
            />
            <img
              alt=''
              src={image}
              className='object-cover mx-auto h-40 w-40 py-auto'
            />
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
      <div class='grid grid-cols-3 gap-4 mb-4'>
        <MusicCard
          title={'MEGADETH'}
          image={rock}
          playSong={() => playSong('MEGADETH')}
        />
        <MusicCard
          title={'QUEEN'}
          image={pop}
          playSong={() => playSong('QUEEN')}
        />
        <MusicCard
          title={'GUNS'}
          image={rock2}
          playSong={() => playSong('GUNS')}
        />
      </div>

      <MusicCard
        title={'WEEKEND'}
        height={'h-48'}
        image={weekend}
        playSong={() => playSong('WEEKEND')}
      />

      <div class='grid grid-cols-2 gap-4 mb-4'>
        <MusicCard
          title={'PLUMA'}
          height={'h-28'}
          image={peso_pluma}
          playSong={() => playSong('PLUMA')}
        />
        <MusicCard
          title={'SHAKIRA'}
          height={'h-28'}
          image={shakira}
          playSong={() => playSong('SHAKIRA')}
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
