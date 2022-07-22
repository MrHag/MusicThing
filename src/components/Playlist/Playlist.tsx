import Track from "./Track/Track";
import Text from "../Text/Text";
import { PlaylistContainer, GridHeader } from "./style";
import { DragEvent, useEffect, useRef } from "react";

import { selectPlaylist } from "../../store/PlaylistSlice";
import { useAppSelector } from "hooks";

const TrackAttrName = "data-track";

const Playlist: React.FC = () => {
  const playlist = useAppSelector(selectPlaylist);
  const selfRef = useRef<HTMLDivElement>(null);

  const findParentTrackEl = (target: HTMLElement): HTMLElement | null => {
    let el: HTMLElement | null = target;
    while (el) {
      if (el.hasAttribute(TrackAttrName)) {
        return el;
      }

      if (selfRef.current === el) {
        return null;
      }

      el = el.parentElement;
    }
    return null;
  };

  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    const { target } = e;
    if (target instanceof HTMLElement) {
      let trackItem = findParentTrackEl(target);
      if (trackItem) {
        trackItem.style.background = "red";
      }
    }
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    const { target } = e;
    if (target instanceof HTMLElement && target.hasAttribute(TrackAttrName)) {
      target.style.background = "none";
    }
  };

  return (
    <PlaylistContainer
      ref={selfRef}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
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
