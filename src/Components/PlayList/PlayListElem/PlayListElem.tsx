import Text from "../../Text/Text";
import { Track } from "../../../App";
import { PlayListElem, MainContainer, TextContainer, Image } from "./style";

interface FnProps {
  track: Track;
  position: number;
  onTrackClick: (id: number) => void;
}

function PlayListGridElem(props: FnProps) {
  const track = props.track;
  return (
    <PlayListElem onClick={() => props.onTrackClick(props.track.id)}>
      <Text className="index">{props.position}</Text>
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
    </PlayListElem>
  );
}

export default PlayListGridElem;
