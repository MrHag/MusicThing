import Track from "./Track/Track";
import Text from "../Text/Text";
import { PlaylistContainer, GridHeader } from "./style";
import { DragEvent, useEffect, useRef } from "react";

import { selectPlaylist } from "../../store/PlaylistSlice";
import { useAppSelector } from "hooks";

const TrackAttrName = "data-track";

type DragEv = DragEvent<HTMLDivElement>;

const Playlist: React.FC = () => {
  const playlist = useAppSelector(selectPlaylist);

  const selfRef = useRef<HTMLDivElement>(null);
  const draggingTrackRef = useRef<HTMLElement>();
  const overTrackRef = useRef<HTMLElement>();

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

  const onDragEnter = (e: DragEv) => {
    const { target } = e;
    if (target instanceof HTMLElement) {
      let trackEl = findParentTrackEl(target);
      if (trackEl && trackEl !== draggingTrackRef.current) {
        trackEl.style.background = "red";

        if (overTrackRef.current && trackEl !== overTrackRef.current) {
          overTrackRef.current.style.background = "none";
        }

        overTrackRef.current = trackEl;
      }
    }
  };

  const onDragLeave = (e: DragEv) => {};

  const onDragStart = (e: DragEv) => {
    const { target } = e;
    if (target instanceof HTMLElement) {
      target.style.opacity = "0.3";
      draggingTrackRef.current = target;
      target.draggable = false;
    }
  };

  /*
   * TODO:
   * 1.Disable drop outside PlaylistContainer
   * 2.Add those markers for top and bottom
   */

  const onDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    const { target } = e;
    if (target instanceof HTMLElement) {
      if (target === selfRef.current) {
        console.log("target === selfRef.current!");
        e.dataTransfer.effectAllowed = "move";
        return;
      }

      if (selfRef.current) {
        if (selfRef.current.contains(target)) {
          console.log("selfRef.current.contains!");
          e.dataTransfer.effectAllowed = "move";
          return;
        }
      }
    }
    e.dataTransfer.effectAllowed = "none";
  };

  const onDrop = (e: DragEv) => {
    const { target } = e;
    if (target instanceof HTMLElement) {
      const trackEl = draggingTrackRef.current;
      if (trackEl) {
        console.log("onDrop trackEl = ", trackEl);
      }

      if (overTrackRef.current) {
        overTrackRef.current.style.background = "none";
      }
    }
  };

  const onDragEnd = (e: DragEv) => {
    const draggingEl = draggingTrackRef.current;
    if (draggingEl) {
      draggingEl.style.background = "none";
      draggingEl.draggable = true;
      draggingEl.style.opacity = "1";
      draggingTrackRef.current = undefined;
    }

    const overEl = overTrackRef.current;
    if (overEl) {
      overEl.style.background = "none";
      overTrackRef.current = undefined;
    }
  };

  return (
    <PlaylistContainer
      ref={selfRef}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
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
