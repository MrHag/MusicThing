import Text from "components/Text/Text";
import { useAppDispatch } from "hooks";
import { setTrack } from "store/PlayerSlice";
import { Track as TrackType } from "types";
import { Container, MainContainer, TextContainer, Image } from "./style";

interface Props {
  track: TrackType;
  position: number;
}

const Track: React.FC<Props> = ({ track, position }) => {
  const dispatch = useAppDispatch();

  return (
    <Container onClick={() => dispatch(setTrack(track))}>
      <Text className="index">{position}</Text>
      <Text className="index-icon">▷</Text>
      <MainContainer>
        <Image src={track.image} />
        <TextContainer>
          <Text>{track.name}</Text>
          <Text>{track.author}</Text>
        </TextContainer>
      </MainContainer>
      <Text>{track.album}</Text>
      <Text>{track.duration}</Text>
    </Container>
  );
};

export default Track;
