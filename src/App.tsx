import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LeftContainer from './Components/LeftContainer/LeftContainer';
import styled from 'styled-components';
import Body from './Components/Body/Body';
import MainContainer from './Components/MainContainer/MainContainer';
import Footer from './Components/Footer/Footer';
import TopContainer from './Components/TopContainer/TopContainer';
import BottomContainer from './Components/BottomContainer/BottomContainer';
import HomePage from './Components/HomePage/HomePage';
import HomePageAN from './Components/HomePage/HomePageAN';

function App() {
const [P, SetP] = useState(true);

  return (
    <Body>
      <TopContainer>
        <LeftContainer navClick={(e)=>{SetP(e == "1")}}></LeftContainer>
        <MainContainer>
          ${P?<HomePage></HomePage>:<HomePageAN></HomePageAN>}
        </MainContainer>
      </TopContainer>
      <BottomContainer>
        <Footer></Footer>
      </BottomContainer>
    </Body>
  );
}

export default App;
