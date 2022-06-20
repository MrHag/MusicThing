import styled from "styled-components";
import { PlayList } from "../../App";
import AddMusicPageBody from "../AddMusicPageBody/AddMusicPageBody";
import HomeBody from "../HomeBody/HomeBody";
import HomeHeader from "../HomeHeader/HomeHeader";

const PlayListC = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  user-select: none;
  overflow-y: scroll;
`;

function AddMusicPage() {
  return (
    <PlayListC>
      <HomeHeader></HomeHeader>
      <AddMusicPageBody></AddMusicPageBody>
    </PlayListC>
  );
}

export default AddMusicPage;
