import styled from "styled-components";
import { Playlist } from "../../App";
import PlaylistGrid from "../PlaylistGrid/PlaylistGrid";

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
`;

const BodyMainContainer = styled.div`
  display: flex;
  padding: 10px 0;
  width: 100%;
  height: 100%;
`;

interface Props {
  playlist: Playlist;
  onTrackClick: (id: number) => void;
}

const PlaylistPageBody: React.FC<Props> = ({ playlist, onTrackClick }) => {
  return (
    <BodyMainContainer>
      <BodyContainer>
        <PlaylistGrid onTrackClick={onTrackClick} playlist={playlist} />
      </BodyContainer>
    </BodyMainContainer>
  );
};

export default PlaylistPageBody;
