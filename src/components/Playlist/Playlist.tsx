import Track from "./Track/Track";
import Text from "../Text/Text";
import { PlaylistContainer, GridHeader } from "./style";
import { DragEvent, useRef } from "react";

import { selectPlaylist } from "../../store/PlaylistSlice";
import { useAppSelector } from "hooks";
import { useDrag } from "./useDrag";

const Playlist: React.FC = () => {
  const playlist = useAppSelector(selectPlaylist);

  const selfRef = useRef<HTMLDivElement>(null);

  const { onDragEnter, onDragEnd, onDragStart, onDrop, onDragOver } =
    useDrag(selfRef);

  return (
    <PlaylistContainer
      ref={selfRef}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <GridHeader>
        <Text>#</Text>
        <Text>Title</Text>
        <Text>Album</Text>
        <Text>Duration</Text>
      </GridHeader>
      {playlist?.tracks.map((track, index) => (
        <Track key={index} track={track} position={index + 1} />
      ))}
    </PlaylistContainer>
  );
};

export default Playlist;
