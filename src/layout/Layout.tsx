import Navbar from "components/Navbar/Navbar";
import { useState } from "react";
import Footer from "components/Footer/Footer";
import Home from "pages/Home/Home";
import Playlist from "pages/Playlist/Playlist";
import AddMusic from "pages/AddMusic/AddMusic";
import { Track } from "types";
import { Body, MainContainer, TopContainer, BottomContainer } from "./style";
import { playlistArr } from "./fakeData";
import { Routes, Route } from "react-router-dom";
import RoutesList from "constants/Routes";
import Search from "pages/Search/Search";

const Layout: React.FC = () => {
  const [curTrack, setCurrentTrack] = useState<Track>();

  return (
    <Body>
      <TopContainer>
        <Navbar playlists={playlistArr} />
        <MainContainer>
          <Routes>
            <Route path={RoutesList.home} element={<Home />} />
            <Route path={RoutesList.search} element={<Search />} />
            <Route path={RoutesList.addMusic} element={<AddMusic />} />
            <Route
              path={RoutesList.playlist}
              element={<Playlist onTrackClick={setCurrentTrack} />}
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
