import { useRef, useEffect, useCallback } from "react";
import { Track } from "types";
import {
  Placeholder,
  movePlaceholderToPos,
  hidePlaceholder,
} from "./placeholder";
import { createMarker, removeMarker } from "./marker";

/*
 * TODO:
 * 1. Disable drop outside PlaylistContainer DONE
 * An user gets a message that s/he can't do drop here...
 *
 *************************************************************
 *
 * 2. This code must be refactored after some time
 *
 *************************************************************
 *
 * 3. Scrolled overflow when drag on document's border
 *
 *************************************************************
 */

const TrackIDAttributeName = "data-track-id";
// Depends on src/components/Playlist/Track/Track.tsx
const PlaylistItemAttrName = "data-playlist-name";

const DummyImage = document.createElement("div");

export const useDrag = (
  playlistRef: React.RefObject<HTMLElement>,
  tracks: Track[]
) => {
  const draggingTrackRef = useRef<HTMLElement>();
  const overTrackRef = useRef<HTMLElement>();

  const findParentTrackEl = useCallback(
    (target: HTMLElement, borderEl: HTMLElement | null): HTMLElement | null => {
      let el: HTMLElement | null = target;
      while (el && el !== borderEl) {
        if (el.hasAttribute(TrackIDAttributeName)) {
          return el;
        }

        el = el.parentElement;
      }
      return null;
    },
    []
  );

  const findParentPlaylistItemEl = useCallback((target: HTMLElement) => {
    let el: HTMLElement | null = target;
    while (el) {
      if (el.hasAttribute(PlaylistItemAttrName)) {
        return el;
      }
      el = el.parentElement;
    }
    return null;
  }, []);

  const getMetrics = useCallback((el: HTMLElement, e: DragEvent) => {
    const rect = el.getBoundingClientRect();
    return {
      cursorY: e.clientY - rect.top,
      trackHeight: rect.height,
    };
  }, []);

  const onDragEnter = useCallback(
    (e: DragEvent) => {
      const { target } = e;
      e.preventDefault();

      if (target instanceof HTMLElement) {
        let currentTrackEl = findParentTrackEl(target, playlistRef.current);
        const isOverDraggingTrack = currentTrackEl === draggingTrackRef.current;
        if (currentTrackEl === null || isOverDraggingTrack) {
          return;
        }

        const isOverNewTrack =
          overTrackRef.current && currentTrackEl !== overTrackRef.current;
        if (overTrackRef.current && isOverNewTrack) {
          removeMarker();
          const { cursorY, trackHeight } = getMetrics(currentTrackEl, e);
          createMarker(currentTrackEl, cursorY, trackHeight);
        }

        overTrackRef.current = currentTrackEl;
      }
    },
    [getMetrics, findParentTrackEl, playlistRef]
  );

  const setPlaceholderInsertText = useCallback(() => {
    // TODO: Can i prove that findTrackById always will return some element
    // Also if i can then i should use some better syntax which will show
    // That findTrackById always return Track element
    if (draggingTrackRef.current) {
      const idAttr = draggingTrackRef.current.getAttribute(
        TrackIDAttributeName
      ) as string;
      const id = Number(idAttr);
      const track = tracks.find((track) => track.id === id) as Track;
      Placeholder.innerText = `Insert ${track.name}`;
    }
  }, [tracks]);

  const onDragStart = useCallback(
    (e: DragEvent) => {
      const { target } = e;

      if (target instanceof HTMLElement && e.dataTransfer) {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setDragImage(DummyImage, 0, 0);

        movePlaceholderToPos(e.clientX, e.clientY);

        target.style.opacity = "0.3";
        draggingTrackRef.current = target;

        setPlaceholderInsertText();

        target.draggable = false;
      }
    },
    [setPlaceholderInsertText]
  );

  const handleOverPlaylistItem = useCallback(
    (target: HTMLElement) => {
      const playlistItemEl = findParentPlaylistItemEl(target);
      if (playlistItemEl) {
        const playlistName = playlistItemEl.getAttribute(PlaylistItemAttrName);
        Placeholder.innerText = `Move to ${playlistName}`;
        removeMarker();
        return true;
      }
      return false;
    },
    [findParentPlaylistItemEl]
  );

  const handleOutsidePlaylist = useCallback(
    (target: HTMLElement) => {
      const isInsidePlaylist =
        playlistRef.current && playlistRef.current.contains(target);
      if (!isInsidePlaylist) {
        Placeholder.innerText = "You can't do this!";
        removeMarker();
        return true;
      }
      return false;
    },
    [playlistRef]
  );

  const handleOverTrack = useCallback(
    (target: HTMLElement, e: DragEvent) => {
      if (e.dataTransfer && overTrackRef.current) {
        e.dataTransfer.dropEffect = "move";
        const { cursorY, trackHeight } = getMetrics(overTrackRef.current, e);

        setPlaceholderInsertText();

        createMarker(overTrackRef.current, cursorY, trackHeight);
      }
    },
    [getMetrics, setPlaceholderInsertText]
  );

  const onDragOver = useCallback(
    (e: DragEvent) => {
      e.preventDefault();

      const { target } = e;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      movePlaceholderToPos(e.clientX, e.clientY);

      if (handleOverPlaylistItem(target)) {
        return;
      }

      if (handleOutsidePlaylist(target)) {
        return;
      }

      handleOverTrack(target, e);
    },
    [handleOutsidePlaylist, handleOverPlaylistItem, handleOverTrack]
  );

  const onDrop = useCallback(
    (e: DragEvent) => {
      const { target } = e;
      if (target instanceof HTMLElement) {
        const overTrack = overTrackRef.current;
        console.log("onDropHandler!");
        if (overTrack) {
          const { cursorY, trackHeight } = getMetrics(overTrack, e);
          const isTop = cursorY <= trackHeight / 2;
          console.log("isTop = ", isTop);
          console.log("onDrop trackEl = ", overTrack);
        }
      }
    },
    [getMetrics]
  );

  const onDragEnd = useCallback((e: DragEvent) => {
    const draggingEl = draggingTrackRef.current;

    if (draggingEl) {
      draggingEl.style.background = "none";
      draggingEl.draggable = true;
      draggingEl.style.opacity = "1";
      draggingTrackRef.current = undefined;
    }

    overTrackRef.current = undefined;
    hidePlaceholder();
    removeMarker();
  }, []);

  useEffect(() => {
    document.body.appendChild(Placeholder);

    document.addEventListener("dragstart", onDragStart);
    document.addEventListener("dragend", onDragEnd);
    document.addEventListener("dragover", onDragOver);
    document.addEventListener("drop", onDrop);
    document.addEventListener("dragenter", onDragEnter);

    return () => {
      document.body.removeChild(Placeholder);

      document.removeEventListener("dragstart", onDragStart);
      document.removeEventListener("dragend", onDragEnd);
      document.removeEventListener("dragover", onDragOver);
      document.removeEventListener("drop", onDrop);
      document.removeEventListener("dragenter", onDragEnter);
    };
  }, [onDragStart, onDragEnd, onDragOver, onDrop, onDragEnter]);
};
