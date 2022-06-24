import LeftContainer from "../components/LeftContainer/LeftContainer";
import { Pages } from "../components/LeftContainer/LeftContainer";
import { useState } from "react";
import Footer from "../components/Footer/Footer";
import HomePage from "../components/HomePage/HomePage";
import PlaylistPage from "../components/PlaylistPage/PlaylistPage";
import AddMusicPage from "../components/AddMusicPage/AddMusicPage";
import { Track } from "../types";
import { Body, MainContainer, TopContainer, BottomContainer } from "./style";
import { playlistArr, playlists, TracksDB } from "./fakeData";

const pages: { [key in Pages]: JSX.Element } = {
  0: <HomePage />,
  1: <HomePage />,
  2: <AddMusicPage />,
};

const Layout: React.FC = () => {
  const [page, setPage] = useState(pages[Pages.Home]);
  const [curTrack, setCurrentTrack] = useState<Track>();

  const onPlaylistClick = (id: number) => {
    const pl = playlists[id];
    setPage(
      <PlaylistPage
        onTrackClick={(id) => {
          setCurrentTrack(TracksDB[id]);
        }}
        playlist={pl}
      ></PlaylistPage>
    );
  };

  const onNavClick = (page: Pages) => {
    setPage(pages[page]);
  };

  return (
    <Body>
      <TopContainer>
        <LeftContainer
          playlists={playlistArr}
          onPlaylistClick={onPlaylistClick}
          onNavClick={onNavClick}
        ></LeftContainer>
        <MainContainer>{page}</MainContainer>
      </TopContainer>
      <BottomContainer>
        <Footer track={curTrack}></Footer>
      </BottomContainer>
    </Body>
  );
};

export default Layout;
