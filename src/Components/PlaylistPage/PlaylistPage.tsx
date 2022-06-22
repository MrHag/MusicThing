import styled from "styled-components";
import { PlayList } from "../../App";
import PlaylistPageBody from "../PlaylistPageBody/PlaylistPageBody";
import PlaylistPageHeader from "../PlaylistPageHeader/PlaylistPageHeader";

const PlaylistContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  user-select: none;
  overflow-y: scroll;
`;

interface Props {
  playlist: PlayList;
  onTrackClick: (id: number) => void;
}

const PlaylistPage: React.FC<Props> = ({ playlist, onTrackClick }) => {
  return (
    <PlaylistContainer>
      <PlaylistPageHeader playlist={playlist}></PlaylistPageHeader>
      <PlaylistPageBody
        onTrackClick={onTrackClick}
        playList={playlist}
      ></PlaylistPageBody>
    </PlaylistContainer>
  );
};

export default PlaylistPage;
