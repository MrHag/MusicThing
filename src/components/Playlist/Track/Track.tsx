import useDrag from "components/DragDrop/Drag";
import useDrop from "components/DragDrop/Drop";
import TransferIO from "components/DragDrop/TransferIO";
import Text from "components/Text/Text";
import { useAppDispatch, useAppSelector } from "hooks";
import { useContext, useEffect, useRef, useState } from "react";
import Context from "react-redux/es/components/Context";
import { setDropDown, setPosition } from "store/DropDownSlice";
import { setTrack } from "store/PlayerSlice";
import { moveTrack, selectPlaylist } from "store/PlaylistSlice";
import { Playlist, Track as TrackType } from "types";
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
  let RefPrev = useRef<HTMLDivElement>(null);

  const onContext = (e: React.MouseEvent) => {
    dispatch(setDropDown(DropDownHandler));
    dispatch(setPosition({ x: e.pageX, y: e.pageY }));
    e.preventDefault();
  };

  let [DragTop, setDragTop] = useState(true);
  let [DragImage, setDragImage] = useState("");

  const [{ isDragging, onDragStart }, Drag, SetDrag, setDragTag] = useDrag();
  const [{ isOver, onDragOver, onDrop, IsAccept }, Drop, SetDrop, setDropTag] =
    useDrop();

  useEffect(() => {
    setDropTag("track");
    setDragTag("track");
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

  // const [{ isOver }, drop] = useDrop(() => ({
  //   accept: ItemTypes.Track,
  //   drop: (i) => console.log(i),
  //   collect: (monitor) => ({
  //     isOver: monitor.isOver(),
  //   }),
  // }));

  // const [{ isDragging }, drag, prev] = useDrag(() => ({
  //   type: ItemTypes.Track,
  //   collect: (monitor) => ({
  //     isDragging: monitor.isDragging(),
  //   }),
  // }));

  const Calc = (e: DragEvent | undefined) => {
    if (!e) return;
    if (!RefTrack.current) return;
    let cur = RefTrack.current;
    let rect = cur.getBoundingClientRect();
    let top = e.pageY - rect.top;
    let bottom = rect.bottom - e.pageY;
    setDragTop(top < bottom);
  };

  // useEffect(() => {
  //   if (!RefTrack.current) return;
  //   let ref = RefTrack.current;
  //   drag(ref);
  //   drop(ref);
  // }, []);

  useEffect(() => {
    if (!RefTrack.current) return;
    let ref = RefTrack.current;
    SetDrag(ref);
    SetDrop(ref);
  }, []);

  return (
    <>
      <Container
        DropOver={isOver}
        isDragging={isDragging}
        DragTop={DragTop}
        ref={RefTrack}
        // onDrag={(e) => {
        //   if (!RefTrack.current) return;
        //   let ref = RefTrack.current;
        //   SetDrag(ref);
        // }}
        draggable={true}
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
