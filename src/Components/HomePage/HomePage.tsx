import styled from "styled-components";
import HomeBody from "../HomeBody/HomeBody";
import HomeHeader from "../HomeHeader/HomeHeader";

const RightC = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  user-select: none;
`;

function RightContainer() {
  return (
    <RightC>
      <HomeHeader></HomeHeader>
      <HomeBody></HomeBody>
    </RightC>
  );
}

export default RightContainer;
