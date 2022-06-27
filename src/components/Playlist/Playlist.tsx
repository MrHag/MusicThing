import { Playlist as PlaylistType } from "types";
import Track from "./Track/Track";
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
        <Track
          onTrackClick={onTrackClick}
          key={index}
          track={track}
          position={index + 1}
        />
      ))}
    </PlaylistContainer>
  );
};

export default Playlist;
