import Navbar from "components/Navbar/Navbar";
import { useEffect } from "react";
import Footer from "components/Footer/Footer";
import Home from "pages/Home/Home";
import Playlist from "pages/Playlist/Playlist";
import AddMusic from "pages/AddMusic/AddMusic";
import { Body, MainContainer, TopContainer, BottomContainer } from "./style";
import { playlistArr } from "./fakeData";
import { Routes, Route } from "react-router-dom";
import RoutesList from "constants/Routes";
import Search from "pages/Search/Search";
import { useAppDispatch } from "hooks";
import { setNavPlaylists } from "store/NavPlaylistsSlice";

const Layout: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setNavPlaylists(playlistArr));
  });

  return (
    <Body>
      <TopContainer>
        <Navbar />
        <MainContainer>
          <Routes>
            <Route path={RoutesList.home} element={<Home />} />
            <Route path={RoutesList.search} element={<Search />} />
            <Route path={RoutesList.addMusic} element={<AddMusic />} />
            <Route path={RoutesList.playlist} element={<Playlist />} />
          </Routes>
        </MainContainer>
      </TopContainer>
      <BottomContainer>
        <Footer />
      </BottomContainer>
    </Body>
  );
};

export default Layout;
