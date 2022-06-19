import React, { useState } from "react";
import "./App.css";
import LeftContainer from "./Components/LeftContainer/LeftContainer";
import { Pages } from "./Components/LeftContainer/LeftContainer";
import styled from "styled-components";
import Body from "./Components/Body/Body";
import MainContainer from "./Components/MainContainer/MainContainer";
import Footer from "./Components/Footer/Footer";
import TopContainer from "./Components/TopContainer/TopContainer";
import BottomContainer from "./Components/BottomContainer/BottomContainer";
import HomePage from "./Components/HomePage/HomePage";
import HomePageAN from "./Components/HomePage/HomePageAN";
import { type } from "@testing-library/user-event/dist/type";
import logo from "./logo.svg";
import logo1 from "./logo1.jpeg";
import logo2 from "./logo2.jpeg";
import PlayListPage from "./Components/PlayListPage/PlayListPage";

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
    1: <HomePageAN />,
    2: <HomePage />,
  };

  const [Page, SetPage] = useState(pages[Pages.Home]);

  const TracksDB: { [id: number]: Track } = {
    0: {
      id: 0,
      name: "track1",
      author: "author1",
      image: logo,
      album: "album1",
      track:
        "https://archive.org/download/darling-in-the-franxx-part-1-ost/CD%20Vol%2001/02.%20Vanquish.mp3",
      duration: 400,
    },
    1: {
      id: 1,
      name: "track2",
      author: "author2",
      image: logo1,
      album: "album2",
      track:
        "https://archive.org/download/darling-in-the-franxx-part-1-ost/CD%20Vol%2001/03.%20Odds%20and%20ends.mp3",
      duration: 400,
    },
    2: {
      id: 2,
      name: "track3",
      author: "author3",
      image: logo,
      album: "album3",
      track: "track3",
      duration: 400,
    },
    3: {
      id: 3,
      name: "track4",
      author: "author4",
      image: logo1,
      album: "album4",
      track: "track4",
      duration: 400,
    },
    4: {
      id: 4,
      name: "track5",
      author: "author5",
      image: logo2,
      album: "album5",
      track: "track5",
      duration: 400,
    },
    5: {
      id: 5,
      name: "track8",
      author: "author8",
      image: logo2,
      album: "album8",
      track: "track8",
      duration: 400,
    },
    6: {
      id: 6,
      name: "track9",
      author: "author9",
      image: logo2,
      album: "album9",
      track: "track9",
      duration: 400,
    },
    7: {
      id: 7,
      name: "track10",
      author: "author10",
      image: logo1,
      album: "album10",
      track: "track10",
      duration: 400,
    },
  };

  const [Tracks, SetTrack] = useState(TracksDB);

  const list1: number[] = [0, 1, 2, 3, 4];

  const list2: number[] = [0, 1, 4];

  const list3: number[] = [5, 6, 7];

  const extractTracks = (tracks: number[]) => {
    return tracks.map((id) => Tracks[id]);
  };

  const playlists: { [id: number]: PlayList } = {
    0: { id: 0, name: "playlist1", image: logo, tracks: extractTracks(list1) },
    1: { id: 1, name: "playlist2", image: logo, tracks: extractTracks(list2) },
    2: { id: 2, name: "playlist3", image: logo, tracks: extractTracks(list3) },
  };

  const [PlayLists, SetPlaylists] = useState(playlists);

  const [curTrack, setcurTrack] = useState<Track>();

  let playlistarr = Object.values(PlayLists).map((pl) => {
    return { id: pl.id, name: pl.name };
  });

  return (
    <Body>
      <TopContainer>
        <LeftContainer
          playLists={playlistarr}
          playlistClick={(id) => {
            const pl = playlists[id];
            SetPage(
              <PlayListPage
                onTrackClick={(id) => {
                  setcurTrack(Tracks[id]);
                }}
                playList={pl}
              ></PlayListPage>
            );
          }}
          navClick={(page) => {
            SetPage(pages[page]);
          }}
        ></LeftContainer>
        <MainContainer>{Page}</MainContainer>
      </TopContainer>
      <BottomContainer>
        <Footer track={curTrack}></Footer>
      </BottomContainer>
    </Body>
  );
}

export default App;
