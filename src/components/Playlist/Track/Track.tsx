import useDrag from "components/DragDrop/Drag";
import useDrop from "components/DragDrop/Drop";
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
  let RefTrack = useRef<HTMLDivElement>(null);

  const onContext = (e: React.MouseEvent) => {
    dispatch(setDropDown(DropDownHandler));
    dispatch(setPosition({ x: e.pageX, y: e.pageY }));
    e.preventDefault();
  };

  let [DragTop, setDragTop] = useState(true);

  const [{ isDragging, onDragStart }, , SetDrag, setDragTag] = useDrag();
  const [
    { isOver, onDragOver, onDrop, onIsAccept: IsAccept },
    ,
    SetDrop,
    setDropTag,
  ] = useDrop();

  useEffect(() => {
    if (!RefTrack.current) return;
    let ref = RefTrack.current;
    SetDrag(ref);
    SetDrop(ref);

    setDragTag("track");
    setDropTag("track");

    onDragOver((_a: any, e: DragEvent, _b: any) => Calc(e));
    onDragStart((_a: any, e: DragEvent, tio: TransferIO) => {
      tio.add("trackindex", index.toString());
    });
    IsAccept((_a: any, e: DragEvent, tio: TransferIO) => {
      const fromInd = Number.parseInt(tio.get("trackindex")[0]);
      return index !== fromInd;
    });
  }, []);

  useEffect(() => {
    onDrop((_a: any, e: DragEvent, tio: TransferIO) => {
      const fromInd = Number.parseInt(tio.get("trackindex")[0]);
      const toInd = DragTop ? index : index + 1;
      console.log(DragTop);
      console.log(fromInd, toInd);
      dispatch(moveTrack({ from_index: fromInd, to_index: toInd }));
    });
  }, [DragTop]);

  const Calc = (e: DragEvent | undefined) => {
    if (!e) return;
    if (!RefTrack.current) return;
    let cur = RefTrack.current;
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
        DragTop={DragTop}
        ref={RefTrack}
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
