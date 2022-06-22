import styled from "styled-components";
import AddMusicPageBody from "../AddMusicPageBody/AddMusicPageBody";
import HomeHeader from "../HomeHeader/HomeHeader";

const PlaylistContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  user-select: none;
  overflow-y: scroll;
`;

const AddMusicPage: React.FC = () => {
  return (
    <PlaylistContainer>
      <HomeHeader></HomeHeader>
      <AddMusicPageBody></AddMusicPageBody>
    </PlaylistContainer>
  );
};

export default AddMusicPage;
