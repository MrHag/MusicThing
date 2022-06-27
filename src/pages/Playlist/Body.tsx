import { Playlist as PlaylistType } from "types";
import Playlist from "components/Playlist/Playlist";
import { BodyContainer, BodyInnerContainer } from "./style";

interface Props {
  playlist: PlaylistType;
  onTrackClick: (id: number) => void;
}

const Body: React.FC<Props> = ({ playlist, onTrackClick }) => {
  return (
    <BodyContainer>
      <BodyInnerContainer>
        <Playlist onTrackClick={onTrackClick} playlist={playlist} />
      </BodyInnerContainer>
    </BodyContainer>
  );
};

export default Body;
