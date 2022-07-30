import useDrag from "components/DragDrop/useDrag";
import useDrop from "components/DragDrop/useDrop";
import TransferIO from "components/DragDrop/TransferIO";
import Text from "components/Text/Text";
import { useAppDispatch } from "hooks";
import { useContext, useEffect, useRef, useState } from "react";
import { setDropDown, setPosition } from "store/DropDownSlice";
import { setTrack } from "store/PlayerSlice";
import { moveTrack } from "store/PlaylistSlice";
import { Track as TrackType } from "types";
import { DropDownHandler } from "./DropDownHandler";
import { OptionIcon } from "./icons";
import { v4 as uuid } from "uuid";
import {
  Container,
  MainContainer,
  TextContainer,
  Image,
  OptButton,
  LastBlock,
} from "./style";
import { PlaceholderContext } from "components/Placeholder/PlaceholderContext";
import { DragDropContext } from "components/DragDrop/DragDropContext";

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

  const [placeholder, setPlaceholder] = useContext(PlaceholderContext);

  const [dragdrop] = useContext(DragDropContext);

  const [UUID] = useState(uuid());

  let [dragTop, setDragTop] = useState(true);

  let onDragStart = (_a: any, e: DragEvent, tio: TransferIO) => {
    tio.add("trackindex", index);
    tio.add("trackname", track.name);
  };
  let onDragOver = (_a: any, e: DragEvent, _b: any) => {
    setPlaceholder({ ...placeholder, position: { x: e.pageX, y: e.pageY } });
    calc(e);
  };

  let onIsAccept = (_a: any, e: DragEvent, tio: TransferIO) => {
    const fromInd = Number.parseInt(tio.get("trackindex")[0]);
    return index !== fromInd;
  };
  let onDrop = (_a: any, e: DragEvent, tio: TransferIO) => {
    const fromIndex = Number.parseInt(tio.get("trackindex")[0]);
    const toIndex = dragTop ? index : index + 1;
    dispatch(moveTrack({ fromIndex, toIndex }));
    setPlaceholder({ ...placeholder, text: `` });
  };

  let onDragEnter = (_a: any, e: DragEvent, tio: TransferIO) => {
    const trackName = tio.get("trackname")[0];
    setPlaceholder({ ...placeholder, text: `Insert ${trackName}` });
    dragdrop.id = UUID;
    e.stopPropagation();
  };

  let onDragLeave = (_a: any, e: DragEvent, tio: TransferIO) => {
    if (dragdrop.id === UUID) setPlaceholder({ ...placeholder, text: `` });
  };

  const [{ isDragging }, , setDrag, setDragTag] = useDrag({
    dragStartEvent: onDragStart,
  });
  const [{ isOver }, , setDrop, setDropTag] = useDrop({
    dropEvent: onDrop,
    dragOverEvent: onDragOver,
    dragEnterEvent: onDragEnter,
    dragLeaveEvent: onDragLeave,
    isAcceptEvent: onIsAccept,
  });

  useEffect(() => {
    if (!refTrack.current) return;
    let ref = refTrack.current;
    setDrag(ref);
    setDrop(ref);

    setDragTag("track");
    setDropTag("track");
  }, []);

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
    </>
  );
};

export default Track;
