import styled from "styled-components";
import HomeBody from "../HomeBody/HomeBody";
import HomeHeader from "../HomeHeader/HomeHeader";

const HomeC = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  user-select: none;
  overflow-y: scroll;
`;

function HomePage() {
  return (
    <HomeC>
      <HomeHeader></HomeHeader>
      <HomeBody></HomeBody>
    </HomeC>
  );
}

export default HomePage;
