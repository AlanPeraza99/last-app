const MusicCard = ({ playSong, title, image, height, spaceBetween }) => {
  return (
    <div
      class={` ${spaceBetween && 'm-2'} relative bg-stone-900 ${
        height ? height : 'h-24'
      } transition hover:bg-stone-800 cursor-pointer mb-4 rounded-md`}
      onClick={() => playSong({ title })}
    >
      <img
        alt=''
        src={image}
        class='object-cover h-full w-full -top-10  opacity-40'
      />
      <div class='absolute inset-0 flex items-center justify-center'>
        <div
          class={`text-white ${height ? 'text-5xl' : 'text-2xl'} font-bold `}
        >
          {title}
        </div>
      </div>
    </div>
  )
}

export default MusicCard
