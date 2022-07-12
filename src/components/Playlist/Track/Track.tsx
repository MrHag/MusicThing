import Text from "components/Text/Text";
import { useAppDispatch } from "hooks";
import { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { setDropDown, setPosition } from "store/DropDownSlice";
import { setTrack } from "store/PlayerSlice";
import { Track as TrackType } from "types";
import { DropDownHandler } from "./DropDownHandler";
import { OptionIcon } from "./icons";
import { ItemTypes } from "./ItemTypes";
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
  let RefTrack = useRef<HTMLDivElement>(null);

  const onContext = (e: React.MouseEvent) => {
    dispatch(setDropDown(DropDownHandler));
    dispatch(setPosition({ x: e.pageX, y: e.pageY }));
    e.preventDefault();
  };

  let [DragTop, setDragTop] = useState(true);

  const Calc = (e: React.DragEvent<HTMLDivElement>) => {
    if (!RefTrack.current) return;
    let cur = RefTrack.current;
    let rect = cur.getBoundingClientRect();
    let top = e.pageY - rect.top;
    let bottom = rect.bottom - e.pageY;
    setDragTop(top < bottom);
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.Track,
    drop: (i) => console.log(i),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.Track,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );

  useEffect(() => {
    if (!RefTrack.current) return;
    let ref = RefTrack.current;
    drag(ref);
    drop(ref);
  });

  return (
    <Container
      DropOver={isOver}
      isDragging={isDragging}
      DragTop={DragTop}
      ref={RefTrack}
      onDragOver={(e) => Calc(e)}
      onContextMenu={onContext}
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
