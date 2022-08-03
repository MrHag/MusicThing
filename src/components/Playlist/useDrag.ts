import { useRef, useEffect, useCallback } from "react";
import { Track } from "types";

/*
 * TODO:
 * 1. Disable drop outside PlaylistContainer DONE
 * An user gets a message that he/she can't do drop here...
 *
 *************************************************************
 *
 * 2. This code must be refactored after some time
 *
 * 2.1 I think it's possible to split this code in some logical blocks, maybe Placeholder
 * Marker classes??? But not sure for now.
 *
 * 2.2 IMPORTANT: You should think about attribute names like data-playlist-name which
 * is used in useDrag.ts and Track.tsx files. Maybe it's a good idea to carry them in some
 * contants.ts file
 *
 *************************************************************
 *
 */

const TrackIDAttributeName = "data-track-id";

const Placeholder = document.createElement("div");
// Placeholder.style.backgroundColor = "yellow";
Placeholder.style.backgroundColor = "black";
Placeholder.style.width = "256px";
Placeholder.style.height = "64px";
Placeholder.style.zIndex = "999999";
Placeholder.style.top = "-999999px";
Placeholder.style.position = "absolute";
Placeholder.style.padding = "5px 10px";
Placeholder.style.color = "var(--primary-text-color)";
Placeholder.style.pointerEvents = "none";
Placeholder.style.fontSize = "14pt";

const DummyImage = document.createElement("div");

export const useDrag = (
  playlistRef: React.RefObject<HTMLElement>,
  tracks: Track[]
) => {
  const draggingTrackRef = useRef<HTMLElement>();
  const overTrackRef = useRef<HTMLElement>();
  const markerRef = useRef<HTMLElement>();

  const findParentTrackEl = useCallback(
    (target: HTMLElement): HTMLElement | null => {
      let el: HTMLElement | null = target;
      while (el) {
        if (el.hasAttribute(TrackIDAttributeName)) {
          return el;
        }

        if (playlistRef.current === el) {
          return null;
        }

        el = el.parentElement;
      }
      return null;
    },
    [playlistRef]
  );

  const findParentPlaylistItemEl = useCallback((target: HTMLElement) => {
    let el: HTMLElement | null = target;
    while (el) {
      if (el.hasAttribute("data-playlist-name")) {
        return el;
      }
      el = el.parentElement;
    }
    return null;
  }, []);

  const movePlaceholderToPos = useCallback((x: number, y: number) => {
    const top = y - Placeholder.clientHeight / 2;
    const left = x + 16;
    Placeholder.style.top = top.toString() + "px";
    Placeholder.style.left = left.toString() + "px";
  }, []);

  const hidePlaceholder = useCallback(() => {
    Placeholder.style.top = "-9999999px";
  }, []);

  const updateMarkerPosition = useCallback(
    (cursorY: number, trackHeight: number) => {
      if (cursorY < 0) {
        return;
      }

      const marker = markerRef.current;
      cursorY = Math.abs(cursorY);
      if (marker) {
        if (cursorY <= trackHeight / 2) {
          marker.style.top = "0";
          marker.style.bottom = "unset";
        } else {
          marker.style.top = "unset";
          marker.style.bottom = "0";
        }
      }
    },
    []
  );

  const removeMarker = useCallback(() => {
    if (markerRef.current !== undefined) {
      markerRef.current.remove();
      markerRef.current = undefined;
    }
  }, []);

  const getMetrics = useCallback((el: HTMLElement, e: DragEvent) => {
    const rect = el.getBoundingClientRect();
    return {
      cursorY: e.clientY - rect.top,
      trackHeight: rect.height,
    };
  }, []);

  const createMarker = useCallback(
    (parent: HTMLElement, cursorY: number, trackHeight: number) => {
      if (markerRef.current === undefined) {
        const marker = document.createElement("div");

        marker.style.width = "100%";
        marker.style.height = "16px";
        marker.style.backgroundColor = "var(--hblue-bg-color)";
        marker.style.position = "absolute";

        markerRef.current = marker;
        updateMarkerPosition(cursorY, trackHeight);

        parent.appendChild(marker);
      } else {
        updateMarkerPosition(cursorY, trackHeight);
      }
    },
    [updateMarkerPosition]
  );

  const onDragEnter = useCallback(
    (e: DragEvent) => {
      const { target } = e;
      e.preventDefault();

      if (target instanceof HTMLElement) {
        let currentTrackEl = findParentTrackEl(target);
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
    [getMetrics, createMarker, removeMarker, findParentTrackEl]
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
    [movePlaceholderToPos, setPlaceholderInsertText]
  );

  const onDragOver = useCallback(
    (e: DragEvent) => {
      e.preventDefault();

      const { target } = e;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      movePlaceholderToPos(e.clientX, e.clientY);

      const playlistItemEl = findParentPlaylistItemEl(target);
      if (playlistItemEl) {
        const playlistName = playlistItemEl.getAttribute("data-playlist-name");
        Placeholder.innerText = `Move to ${playlistName}`;
        return;
      }

      const isInsidePlaylist =
        playlistRef.current && playlistRef.current.contains(target);
      if (!isInsidePlaylist) {
        Placeholder.innerText = "You can't do this!";
        return;
      }

      if (e.dataTransfer) {
        if (overTrackRef.current) {
          e.dataTransfer.dropEffect = "move";
          const { cursorY, trackHeight } = getMetrics(overTrackRef.current, e);

          setPlaceholderInsertText();

          if (markerRef.current) {
            updateMarkerPosition(cursorY, trackHeight);
          } else {
            createMarker(overTrackRef.current, cursorY, trackHeight);
          }

          return;
        }

        e.dataTransfer.dropEffect = "none";
        console.log("THIS BRANCH!");
      }
    },
    [
      movePlaceholderToPos,
      getMetrics,
      createMarker,
      updateMarkerPosition,
      playlistRef,
      setPlaceholderInsertText,
      findParentPlaylistItemEl,
    ]
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

  const onDragEnd = useCallback(
    (e: DragEvent) => {
      const draggingEl = draggingTrackRef.current;

      if (draggingEl) {
        draggingEl.style.background = "none";
        draggingEl.draggable = true;
        draggingEl.style.opacity = "1";
        draggingTrackRef.current = undefined;
      }

      overTrackRef.current = undefined;
      hidePlaceholder();

      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = undefined;
      }
    },
    [hidePlaceholder]
  );

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
