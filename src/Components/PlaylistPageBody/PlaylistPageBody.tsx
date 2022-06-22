import styled from "styled-components";
import { Playlist } from "../../App";
import PlayList from "../PlayList/PlayList";

interface Props {
  playlist: Playlist;
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
        <PlayList onTrackClick={onTrackClick} playList={playlist} />
      </BodyContainer>
    </BodyMainContainer>
  );
};

export default PlaylistPageBody;
