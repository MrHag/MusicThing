import styled from "styled-components";
import Text from "../Text/Text";
import { PlayList } from "../../App";

interface FnProps {
  playList: PlayList;
}

const PlayListImage = styled.img`
  width: 20%;
  min-width: 150px;
`;

const PlayListContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 auto;
`;

const PlayListMainContainer = styled.div`
  display: flex;
  background-color: var(--light-bg-color);
  width: 100%;
  height: 180px;
  max-height: 180px;
  margin: 0 auto;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const HeadText = styled(Text)`
  font-size: 38pt;
`;

function PlayListPageHeader(props: FnProps) {
  const pl = props.playList;
  return (
    <PlayListMainContainer>
      <PlayListContainer>
        <PlayListImage src={pl.image}></PlayListImage>
        <TextContainer>
          <HeadText>{pl.name}</HeadText>
          <Text>{pl.tracks.length} tracks</Text>
        </TextContainer>
      </PlayListContainer>
    </PlayListMainContainer>
  );
}

export default PlayListPageHeader;
