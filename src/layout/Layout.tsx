import LeftContainer from "components/LeftContainer/LeftContainer";
import { useState } from "react";
import Footer from "components/Footer/Footer";
import HomePage from "Pages/HomePage/HomePage";
import PlaylistPage from "Pages/PlaylistPage/PlaylistPage";
import AddMusic from "Pages/AddMusicPage/AddMusicPage";
import { Track } from "types";
import { Body, MainContainer, TopContainer, BottomContainer } from "./style";
import { playlistArr } from "./fakeData";

import { Routes, Route } from "react-router-dom";
import RoutesList from "constants/Routes";

const Layout: React.FC = () => {
  const [curTrack, setCurrentTrack] = useState<Track>();

  return (
    <Body>
      <TopContainer>
        <LeftContainer playlists={playlistArr} />
        <MainContainer>
          <Routes>
            <Route path={RoutesList.home} element={<HomePage />} />
            <Route path={RoutesList.search} element={<HomePage />} />
            <Route path={RoutesList.addMusic} element={<AddMusic />} />
            <Route
              path={RoutesList.playlist}
              element={<PlaylistPage onTrackClick={setCurrentTrack} />}
            />
          </Routes>
        </MainContainer>
      </TopContainer>
      <BottomContainer>
        <Footer track={curTrack} />
      </BottomContainer>
    </Body>
  );
};

export default Layout;
