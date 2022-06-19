import styled from "styled-components";
import { PlayList } from "../../App";
import PlayListGridElem from "../PlayListGridElem/PlayListGridElem";
import Text from "../Text/Text";

interface FnProps {
  playList: PlayList;
  onTrackClick: (id: number) => void;
}

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

function PlayListGrid(props: FnProps) {
  const pl = props.playList;
  return (
    <MainContainer>
      <Grid>
        <Text className="index">#</Text>
        <Text>Title</Text>
        <Text>Album</Text>
        <Text>Duration</Text>
      </Grid>
      {pl.tracks.map((track, index) => (
        <PlayListGridElem
          onTrackClick={props.onTrackClick}
          key={index}
          track={track}
          position={index + 1}
        ></PlayListGridElem>
      ))}
    </MainContainer>
  );
}

export default PlayListGrid;
