export type Track = {
  id: number;
  name: string;
  author: string;
  image: string;
  album: string;
  track: string;
  duration: number;
};

export type Playlist = {
  id: number;
  name: string;
  image: string;
  tracks: Track[];
};
