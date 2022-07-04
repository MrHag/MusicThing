import { Playlist, Track } from "types";
import logo from "assets/logos/logo.svg";
import logo1 from "assets/logos/logo1.jpeg";
import logo2 from "assets/logos/logo2.jpeg";

const tracks: Track[] = [
  {
    id: 0,
    name: "Vanquish",
    author: "author",
    image: logo,
    album: "DA",
    track:
      "https://archive.org/download/darling-in-the-franxx-part-1-ost/CD%20Vol%2001/02.%20Vanquish.mp3",
    duration: 400,
  },
  {
    id: 1,
    name: "Odds",
    author: "author",
    image: logo1,
    album: "DA",
    track:
      "https://archive.org/download/darling-in-the-franxx-part-1-ost/CD%20Vol%2001/03.%20Odds%20and%20ends.mp3",
    duration: 400,
  },
  {
    id: 2,
    name: "Beast",
    author: "author",
    image: logo,
    album: "album3",
    track:
      "https://archive.org/download/darling-in-the-franxx-part-1-ost/CD%20Vol%2001/06.%20BEAST.mp3",
    duration: 400,
  },
  {
    id: 3,
    name: "Nuance",
    author: "author",
    image: logo1,
    album: "DA",
    track:
      "https://archive.org/download/darling-in-the-franxx-part-1-ost/CD%20Vol%2001/16.%20Nuance.mp3",
    duration: 400,
  },
  {
    id: 4,
    name: "Dropping",
    author: "author",
    image: logo2,
    album: "DA",
    track:
      "https://archive.org/download/darling-in-the-franxx-part-1-ost/CD%20Vol%2001/18.%20Dropping.mp3",
    duration: 400,
  },
  {
    id: 5,
    name: "escape",
    author: "XX:me",
    image: logo2,
    album: "DA",
    track:
      "https://archive.org/download/darling-in-the-franxx-part-1-ost/E%20vol.2%EF%BC%8FXX%EF%BC%9Ame%20%28flac%2824bits%29%29/02.%20escape.mp3",
    duration: 400,
  },
  {
    id: 6,
    name: "Trente",
    author: "author",
    image: logo2,
    album: "DA",
    track:
      "https://archive.org/download/darling-in-the-franxx-part-1-ost/CD%20Vol%2001/11.%20Trente.mp3",
    duration: 400,
  },
  {
    id: 7,
    name: "Distopia",
    author: "author",
    image: logo1,
    album: "DA",
    track:
      "https://archive.org/download/darling-in-the-franxx-part-1-ost/CD%20Vol%2001/12.%20Distopia.mp3",
    duration: 400,
  },
];

export const TracksDB: { [id: number]: Track } = Object.assign(
  {},
  ...tracks.map((tr) => ({
    [tr.id]: tr,
  }))
);

const list1: number[] = [0, 1, 2, 3, 4];
const list2: number[] = [0, 1, 4];
const list3: number[] = [5, 6, 7];

const extractTracks = (tracksNumbers: number[]) => {
  return tracksNumbers.map((id) => TracksDB[id]);
};

export const playlists: { [id: number]: Playlist } = {
  0: { id: 0, name: "MyPlayList", image: logo, tracks: extractTracks(list1) },
  1: { id: 1, name: "Secrets", image: logo, tracks: extractTracks(list2) },
  2: { id: 2, name: "Best", image: logo, tracks: extractTracks(list3) },
};

export let playlistArr = Object.values(playlists).map((pl) => {
  return pl;
});
