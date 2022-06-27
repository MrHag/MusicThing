import LeftContainer from "components/LeftContainer/LeftContainer";
import { useState } from "react";
import Footer from "components/Footer/Footer";
import HomePage from "Pages/HomePage/HomePage";
import PlaylistPage from "Pages/PlaylistPage/PlaylistPage";
import AddMusicPage from "Pages/AddMusicPage/AddMusicPage";
import { Track } from "types";
import { Body, MainContainer, TopContainer, BottomContainer } from "./style";
import { playlistArr, playlists, TracksDB } from "./fakeData";

import { Routes, Route, useParams } from "react-router-dom";

export enum Pages {
  Home = "",
  Search = "search",
  AddMusic = "addmusic",
  PlayList = "playlist",
}

const Layout: React.FC = () => {
  const [curTrack, setCurrentTrack] = useState<Track>();

  function PlayListWrap() {
    let { id } = useParams();
    const pl = playlists[Number(id)];
    return (
      <PlaylistPage
        onTrackClick={(id) => {
          setCurrentTrack(TracksDB[id]);
        }}
        playlist={pl}
      ></PlaylistPage>
    );
  }

  return (
    <Body>
      <TopContainer>
        <LeftContainer playlists={playlistArr}></LeftContainer>
        <MainContainer>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="search" element={<HomePage />} />
            <Route path="addmusic" element={<AddMusicPage />} />
            <Route path="playlist/:id" element={<PlayListWrap />} />
          </Routes>
        </MainContainer>
      </TopContainer>
      <BottomContainer>
        <Footer track={curTrack}></Footer>
      </BottomContainer>
    </Body>
  );
};

export default Layout;
