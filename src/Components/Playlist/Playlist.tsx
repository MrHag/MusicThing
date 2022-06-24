import { Playlist as PlaylistType } from "../../App";
import PlaylistElem from "./PlaylistElem/PlaylistElem";
import Text from "../Text/Text";
import { PlaylistContainer, GridHeader } from "./style";

interface Props {
  playlist: PlaylistType;
  onTrackClick: (id: number) => void;
}

const Playlist: React.FC<Props> = ({ playlist, onTrackClick }) => {
  return (
    <PlaylistContainer>
      <GridHeader>
        <Text>#</Text>
        <Text>Title</Text>
        <Text>Album</Text>
        <Text>Duration</Text>
      </GridHeader>
      {playlist.tracks.map((track, index) => (
        <PlaylistElem
          onTrackClick={onTrackClick}
          key={index}
          track={track}
          position={index + 1}
        ></PlaylistElem>
      ))}
    </PlaylistContainer>
  );
};

export default Playlist;
