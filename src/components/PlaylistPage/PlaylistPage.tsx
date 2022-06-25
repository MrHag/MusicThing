import styled from "styled-components";
import { Playlist } from "types";
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
  playlist: Playlist;
  onTrackClick: (id: number) => void;
}

const PlaylistPage: React.FC<Props> = ({ playlist, onTrackClick }) => {
  return (
    <PlaylistContainer>
      <PlaylistPageHeader playlist={playlist}></PlaylistPageHeader>
      <PlaylistPageBody
        onTrackClick={onTrackClick}
        playlist={playlist}
      ></PlaylistPageBody>
    </PlaylistContainer>
  );
};

export default PlaylistPage;
