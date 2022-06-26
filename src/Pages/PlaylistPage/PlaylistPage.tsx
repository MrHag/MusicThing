import { Playlist } from "types";
import Body from "./Body";
import Header from "./Header";
import { PageContainer } from "./style";

interface Props {
  playlist: Playlist;
  onTrackClick: (id: number) => void;
}

const PlaylistPage: React.FC<Props> = ({ playlist, onTrackClick }) => {
  return (
    <PageContainer>
      <Header playlist={playlist}></Header>
      <Body onTrackClick={onTrackClick} playlist={playlist}></Body>
    </PageContainer>
  );
};

export default PlaylistPage;
