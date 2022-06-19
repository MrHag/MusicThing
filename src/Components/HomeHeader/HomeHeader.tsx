import styled from "styled-components";
import Logo from "../Logo/Logo";
import logo from "../../logo.svg";

const HeaderImage = styled.img`
  width: 20%;
  min-width: 150px;
`;

const HomeContainer = styled.div`
  display: flex;
  width: 70%;
  margin: 0 auto;
`;

const HomeMainContainer = styled.div`
  display: flex;
  background-color: var(--light-bg-color);
  width: 100%;
  height: 180px;
  margin: 0 auto;
`;

function HomeHeader() {
  return (
    <HomeMainContainer>
      <HomeContainer>
        <HeaderImage src={logo}></HeaderImage>
        <Logo></Logo>
      </HomeContainer>
    </HomeMainContainer>
  );
}

export default HomeHeader;
