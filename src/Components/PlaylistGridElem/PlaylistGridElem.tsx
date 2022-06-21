import styled from "styled-components";
import Text from "../Text/Text";
import { Track } from "../../App";

const PlaylistElem = styled.div`
  display: grid;
  grid-template-columns: 24px 4fr 6fr [last] minmax(120px, 1fr);
  height: 40px;
  align-items: center;
  padding: 10px;

  &:hover {
    background-color: var(--light-bg-color);
  }

  & > .index,
  .index-icon {
    text-align: center;
  }

  & > .index-icon {
    display: none;
  }

  &:hover > .index {
    display: none;
  }

  &:hover > .index-icon {
    display: block;
  }
`;

const Image = styled.img`
  max-width: 40px;
  max-height: 40px;
  width: auto;
  height: auto;
  margin: 0 10px;
`;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  max-height: 50px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

interface Props {
  track: Track;
  position: number;
  onTrackClick: (id: number) => void;
}

const PlaylistGridElem: React.FC<Props> = ({
  track,
  position,
  onTrackClick,
}) => {
  return (
    <PlaylistElem onClick={() => onTrackClick(track.id)}>
      <Text className="index">{position}</Text>
      <Text className="index-icon">▷</Text>
      <MainContainer>
        <Image src={track.image}></Image>
        <TextContainer>
          <Text>{track.name}</Text>
          <Text>{track.author}</Text>
        </TextContainer>
      </MainContainer>
      <Text>{track.album}</Text>
      <Text>{track.duration}</Text>
    </PlaylistElem>
  );
};

export default PlaylistGridElem;
