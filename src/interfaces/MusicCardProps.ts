export interface MusicCardProps {
    playSong: (song: { title: string }) => void;
    title: string;
    image: string;
    height?: string;
    spaceBetween?: boolean;
  }