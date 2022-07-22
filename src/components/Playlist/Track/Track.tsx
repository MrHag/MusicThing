import Text from "components/Text/Text";
import { useAppDispatch } from "hooks";
import { DragEvent } from "react";
import { setDropDown, setPosition } from "store/DropDownSlice";
import { setTrack } from "store/PlayerSlice";
import { Track as TrackType } from "types";
import { DropDownHandler } from "./DropDownHandler";
import { OptionIcon } from "./icons";
import {
  Container,
  MainContainer,
  TextContainer,
  Image,
  OptButton,
  LastBlock,
} from "./style";

interface Props {
  track: TrackType;
  position: number;
}

const Track: React.FC<Props> = ({ track, position }) => {
  const dispatch = useAppDispatch();

  const onContext = (e: React.MouseEvent) => {
    dispatch(setDropDown(DropDownHandler));
    dispatch(setPosition({ x: e.pageX, y: e.pageY }));
    e.preventDefault();
  };

  return (
    <Container
      data-track="value"
      data-track-id={track.id}
      onContextMenu={onContext}
      draggable
    >
      <Text className="index">{position}</Text>
      <Text onClick={() => dispatch(setTrack(track))} className="index-icon">
        ▷
      </Text>
      <MainContainer>
        <Image src={track.image} />
        <TextContainer>
          <Text>{track.name}</Text>
          <Text>{track.author}</Text>
        </TextContainer>
      </MainContainer>
      <Text>{track.album}</Text>
      <LastBlock>
        <Text>{track.duration}</Text>
        <OptButton onClick={onContext}>
          <OptionIcon />
        </OptButton>
      </LastBlock>
    </Container>
  );
};

export default Track;
