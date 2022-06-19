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

function App() {
  const [Page, SetPage] = useState(Pages.Home);

  const pages: { [key in Pages]: JSX.Element } = {
    0: <HomePage />,
    1: <HomePageAN />,
    2: <HomePage />,
  };

  return (
    <Body>
      <TopContainer>
        <LeftContainer
          navClick={(page) => {
            SetPage(page);
          }}
        ></LeftContainer>
        <MainContainer>{pages[Page]}</MainContainer>
      </TopContainer>
      <BottomContainer>
        <Footer></Footer>
      </BottomContainer>
    </Body>
  );
}

export default App;
