import Track from "./Track/Track";
import Text from "../Text/Text";
import { PlaylistContainer, GridHeader } from "./style";
import { selectPlaylist } from "../../store/PlaylistSlice";
import { useAppSelector } from "hooks";

const Playlist: React.FC = () => {
  const playlist = useAppSelector(selectPlaylist);

  return (
    <PlaylistContainer>
      <GridHeader>
        <Text>#</Text>
        <Text>Title</Text>
        <Text>Album</Text>
        <Text>Duration</Text>
      </GridHeader>
      {playlist?.tracks.map((track, index) => (
        <Track key={index} track={track} index={index} />
      ))}
    </PlaylistContainer>
  );
};

export default Playlist;
