import styled from "styled-components";
import { Playlist } from "../../App";
import PlaylistGridElem from "../PlaylistGridElem/PlaylistGridElem";
import Text from "../Text/Text";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 24px 4fr 6fr [last] minmax(120px, 1fr);
  padding: 14px 10px;

  & > .index {
    text-align: center;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  playlist: Playlist;
  onTrackClick: (id: number) => void;
}

const PlaylistGrid: React.FC<Props> = ({ playlist, onTrackClick }) => {
  return (
    <MainContainer>
      <Grid>
        <Text className="index">#</Text>
        <Text>Title</Text>
        <Text>Album</Text>
        <Text>Duration</Text>
      </Grid>
      {playlist.tracks.map((track, index) => (
        <PlaylistGridElem
          onTrackClick={onTrackClick}
          key={index}
          track={track}
          position={index + 1}
        ></PlaylistGridElem>
      ))}
    </MainContainer>
  );
};

export default PlaylistGrid;
