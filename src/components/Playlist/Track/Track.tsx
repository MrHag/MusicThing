import useDrag from "components/DragDrop/useDrag";
import useDrop from "components/DragDrop/useDrop";
import TransferIO from "components/DragDrop/TransferIO";
import Text from "components/Text/Text";
import { useAppDispatch } from "hooks";
import { useEffect, useRef, useState } from "react";
import { setDropDown, setPosition } from "store/DropDownSlice";
import { setTrack } from "store/PlayerSlice";
import { moveTrack } from "store/PlaylistSlice";
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
  index: number;
}

const Track: React.FC<Props> = ({ track, index }) => {
  const dispatch = useAppDispatch();
  let refTrack = useRef<HTMLDivElement>(null);

  const onContext = (e: React.MouseEvent) => {
    dispatch(setDropDown(DropDownHandler));
    dispatch(setPosition({ x: e.pageX, y: e.pageY }));
    e.preventDefault();
  };

  let [dragTop, setDragTop] = useState(true);

  const [{ isDragging, onDragStart }, , setDrag, setDragTag] = useDrag();
  const [{ isOver, onDragOver, onDrop, onIsAccept }, , setDrop, setDropTag] =
    useDrop();

  useEffect(() => {
    if (!refTrack.current) return;
    let ref = refTrack.current;
    setDrag(ref);
    setDrop(ref);

    setDragTag("track");
    setDropTag("track");

    onDragOver((_a: any, e: DragEvent, _b: any) => calc(e));
    onDragStart((_a: any, e: DragEvent, tio: TransferIO) => {
      tio.add("trackindex", index.toString());
    });
    onIsAccept((_a: any, e: DragEvent, tio: TransferIO) => {
      const fromInd = Number.parseInt(tio.get("trackindex")[0]);
      return index !== fromInd;
    });
  }, []);

  useEffect(() => {
    onDrop((_a: any, e: DragEvent, tio: TransferIO) => {
      const fromIndex = Number.parseInt(tio.get("trackindex")[0]);
      const toIndex = dragTop ? index : index + 1;
      console.log(dragTop);
      console.log(fromIndex, toIndex);
      dispatch(moveTrack({ fromIndex, toIndex }));
    });
  }, [dragTop]);

  const calc = (e: DragEvent | undefined) => {
    if (!e) return;
    if (!refTrack.current) return;
    let cur = refTrack.current;
    let rect = cur.getBoundingClientRect();
    let top = e.pageY - rect.top;
    let bottom = rect.bottom - e.pageY;
    setDragTop(top < bottom);
  };

  return (
    <>
      <Container
        DropOver={isOver}
        isDragging={isDragging}
        DragTop={dragTop}
        ref={refTrack}
        onContextMenu={onContext}
      >
        <Text className="index">{index + 1}</Text>
        <Text onClick={() => dispatch(setTrack(track))} className="index-icon">
          ▷
        </Text>
        <MainContainer>
          <Image src={track.image} draggable={false} />
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
    </>
  );
};

export default Track;
