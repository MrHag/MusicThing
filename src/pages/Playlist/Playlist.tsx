import { Track } from "types";
import Body from "./Body";
import Header from "./Header";
import { PageContainer } from "./style";
import { TracksDB, playlists } from "layout/fakeData";
import { useParams } from "react-router-dom";

interface Props {
  onTrackClick: (id: Track) => void;
}

const PlaylistPage: React.FC<Props> = ({ onTrackClick }) => {
  let { id } = useParams();
  const playlist = playlists[Number(id)];

  return (
    <PageContainer>
      <Header playlist={playlist} />
      <Body
        onTrackClick={(id) => onTrackClick(TracksDB[id])}
        playlist={playlist}
      />
    </PageContainer>
  );
};

export default PlaylistPage;
