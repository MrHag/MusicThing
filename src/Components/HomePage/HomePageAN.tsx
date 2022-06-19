import styled from "styled-components";
import HomeHeader from "../HomeHeader/HomeHeader";

const RightC = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  user-select: none;
`;

function RightContainerAN() {
  return (
    <RightC>
      <HomeHeader></HomeHeader>
    </RightC>
  );
}

export default RightContainerAN;
