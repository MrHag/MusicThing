import { useState } from "react";
import "./App.css";
import LeftContainer from "./Components/LeftContainer/LeftContainer";
import { Pages } from "./Components/LeftContainer/LeftContainer";
import Body from "./Components/Body/Body";
import MainContainer from "./Components/MainContainer/MainContainer";
import Footer from "./Components/Footer/Footer";
import TopContainer from "./Components/TopContainer/TopContainer";
import BottomContainer from "./Components/BottomContainer/BottomContainer";
import HomePage from "./Components/HomePage/HomePage";
import logo from "./logo.svg";
import logo1 from "./logo1.jpeg";
import logo2 from "./logo2.jpeg";
import PlaylistPage from "./Components/PlaylistPage/PlaylistPage";
import AddMusicPage from "./Components/AddMusicPage/AddMusicPage";

export type Track = {
  id: number;
  name: string;
  author: string;
  image: string;
  album: string;
  track: string;
  duration: number;
};

export type PlayList = {
  id: number;
  name: string;
  image: string;
  tracks: Track[];
};

function App() {
  const pages: { [key in Pages]: JSX.Element } = {
    0: <HomePage />,
    1: <HomePage />,
    2: <AddMusicPage />,
  };

  const [page, setPage] = useState(pages[Pages.Home]);

  const TracksDB: { [id: number]: Track } = {
    0: {
      id: 0,
      name: "Vanquish",
      author: "author",
      image: logo,
      album: "DA",
      track:
        "https://archive.org/download/darling-in-the-franxx-part-1-ost/CD%20Vol%2001/02.%20Vanquish.mp3",
      duration: 400,
    },
    1: {
      id: 1,
      name: "Odds",
      author: "author",
      image: logo1,
      album: "DA",
      track:
        "https://archive.org/download/darling-in-the-franxx-part-1-ost/CD%20Vol%2001/03.%20Odds%20and%20ends.mp3",
      duration: 400,
    },
    2: {
      id: 2,
      name: "Beast",
      author: "author",
      image: logo,
      album: "album3",
      track:
        "https://archive.org/download/darling-in-the-franxx-part-1-ost/CD%20Vol%2001/06.%20BEAST.mp3",
      duration: 400,
    },
    3: {
      id: 3,
      name: "Nuance",
      author: "author",
      image: logo1,
      album: "DA",
      track:
        "https://archive.org/download/darling-in-the-franxx-part-1-ost/CD%20Vol%2001/16.%20Nuance.mp3",
      duration: 400,
    },
    4: {
      id: 4,
      name: "Dropping",
      author: "author",
      image: logo2,
      album: "DA",
      track:
        "https://archive.org/download/darling-in-the-franxx-part-1-ost/CD%20Vol%2001/18.%20Dropping.mp3",
      duration: 400,
    },
    5: {
      id: 5,
      name: "escape",
      author: "XX:me",
      image: logo2,
      album: "DA",
      track:
        "https://archive.org/download/darling-in-the-franxx-part-1-ost/E%20vol.2%EF%BC%8FXX%EF%BC%9Ame%20%28flac%2824bits%29%29/02.%20escape.mp3",
      duration: 400,
    },
    6: {
      id: 6,
      name: "Trente",
      author: "author",
      image: logo2,
      album: "DA",
      track:
        "https://archive.org/download/darling-in-the-franxx-part-1-ost/CD%20Vol%2001/11.%20Trente.mp3",
      duration: 400,
    },
    7: {
      id: 7,
      name: "Distopia",
      author: "author",
      image: logo1,
      album: "DA",
      track:
        "https://archive.org/download/darling-in-the-franxx-part-1-ost/CD%20Vol%2001/12.%20Distopia.mp3",
      duration: 400,
    },
  };

  const list1: number[] = [0, 1, 2, 3, 4];
  const list2: number[] = [0, 1, 4];
  const list3: number[] = [5, 6, 7];

  const extractTracks = (tracksNumbers: number[]) => {
    return tracksNumbers.map((id) => TracksDB[id]);
  };

  const playlists: { [id: number]: PlayList } = {
    0: { id: 0, name: "MyPlayList", image: logo, tracks: extractTracks(list1) },
    1: { id: 1, name: "Secrets", image: logo, tracks: extractTracks(list2) },
    2: { id: 2, name: "Best", image: logo, tracks: extractTracks(list3) },
  };

  const [curTrack, setCurrentTrack] = useState<Track>();

  let playlistarr = Object.values(playlists).map((pl) => {
    return { id: pl.id, name: pl.name };
  });

  return (
    <Body>
      <TopContainer>
        <LeftContainer
          playlists={playlistarr}
          onPlaylistClick={(id) => {
            const pl = playlists[id];
            setPage(
              <PlaylistPage
                onTrackClick={(id) => {
                  setCurrentTrack(TracksDB[id]);
                }}
                playlist={pl}
              ></PlaylistPage>
            );
          }}
          onNavClick={(page) => {
            setPage(pages[page]);
          }}
        ></LeftContainer>
        <MainContainer>{page}</MainContainer>
      </TopContainer>
      <BottomContainer>
        <Footer track={curTrack}></Footer>
      </BottomContainer>
    </Body>
  );
}

export default App;
