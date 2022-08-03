import Track from "./Track/Track";
import Text from "../Text/Text";
import { PlaylistContainer, GridHeader, List } from "./style";
import { useRef } from "react";

import { selectPlaylist } from "../../store/PlaylistSlice";
import { useAppSelector } from "hooks";
import { useDrag } from "./useDrag";

const Playlist: React.FC = () => {
  const playlist = useAppSelector(selectPlaylist);

  const selfRef = useRef<HTMLDivElement>(null);

  const tracks = playlist?.tracks ?? [];
  useDrag(selfRef, tracks);

  return (
    <PlaylistContainer ref={selfRef}>
      <GridHeader>
        <Text>#</Text>
        <Text>Title</Text>
        <Text>Album</Text>
        <Text>Duration</Text>
      </GridHeader>
      <List ref={selfRef}>
        {playlist?.tracks.map((track, index) => (
          <Track key={index} track={track} position={index + 1} />
        ))}
      </List>
    </PlaylistContainer>
  );
};

export default Playlist;
