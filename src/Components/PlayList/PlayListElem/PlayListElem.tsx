import Text from "../../Text/Text";
import { Track } from "../../../App";
import { PlayListElem, MainContainer, TextContainer, Image } from "./style";

interface Props {
  track: Track;
  position: number;
  onTrackClick: (id: number) => void;
}

const PlayListGridElem: React.FC<Props> = ({
  track,
  position,
  onTrackClick,
}) => {
  return (
    <PlayListElem onClick={() => onTrackClick(track.id)}>
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
    </PlayListElem>
  );
};

export default PlayListGridElem;
