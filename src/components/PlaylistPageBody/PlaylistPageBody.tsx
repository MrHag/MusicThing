import styled from "styled-components";
import { Playlist as PlaylistType } from "types";
import Playlist from "../Playlist/Playlist";

interface Props {
  playlist: PlaylistType;
  onTrackClick: (id: number) => void;
}

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

const PlaylistPageBody: React.FC<Props> = ({ playlist, onTrackClick }) => {
  return (
    <BodyMainContainer>
      <BodyContainer>
        <Playlist onTrackClick={onTrackClick} playlist={playlist} />
      </BodyContainer>
    </BodyMainContainer>
  );
};

export default PlaylistPageBody;
