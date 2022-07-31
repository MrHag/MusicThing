import { DragEvent, useRef } from "react";

/*
 * TODO:
 * 1. Disable drop outside PlaylistContainer
 * 2. Think about drag and drop handler for entire
 *    window and not only this component
 *  3. dragImage transparency issue...
 */

const TrackAttrName = "data-track";
type DragEv = DragEvent<HTMLDivElement>;

const Placeholder = document.createElement("div");
Placeholder.style.backgroundColor = "yellow";
Placeholder.style.width = "256px";
Placeholder.style.height = "64px";
Placeholder.style.opacity = "1";
Placeholder.style.top = "-999999px";
Placeholder.style.position = "absolute";
Placeholder.style.padding = "5px 10px";
Placeholder.style.color = "var(--primary-text-color)";
Placeholder.style.fontSize = "14pt";
document.body.appendChild(Placeholder);

export const useDrag = (selfRef: React.RefObject<HTMLElement>) => {
  const draggingTrackRef = useRef<HTMLElement>();
  const overTrackRef = useRef<HTMLElement>();
  const markerRef = useRef<HTMLElement>();

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
  };

  const onDragStart = (e: DragEv) => {
    const { target } = e;

    if (target instanceof HTMLElement) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setDragImage(Placeholder, 0, 0);

      target.style.opacity = "0.3";
      draggingTrackRef.current = target;
      target.draggable = false;
    }
  };

  const updateMarkerPosition = (cursorY: number, trackHeight: number) => {
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
  };

  const createMarker = (
    parent: HTMLElement,
    cursorY: number,
    trackHeight: number
  ) => {
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
  };

  const removeMarker = () => {
    if (markerRef.current !== undefined) {
      markerRef.current.remove();
      markerRef.current = undefined;
    }
  };

  const getMetrics = (el: HTMLElement, e: DragEvent<HTMLElement>) => {
    const rect = el.getBoundingClientRect();
    return {
      cursorY: e.clientY - rect.top,
      trackHeight: rect.height,
    };
  };

  const onDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();

    const { target } = e;
    if (target instanceof HTMLElement) {
      if (overTrackRef.current) {
        e.dataTransfer.dropEffect = "move";
        const { cursorY, trackHeight } = getMetrics(overTrackRef.current, e);

        if (markerRef.current) {
          updateMarkerPosition(cursorY, trackHeight);
        } else {
          createMarker(overTrackRef.current, cursorY, trackHeight);
        }
        return;
      }

      if (selfRef.current && selfRef.current.contains(target)) {
        e.dataTransfer.dropEffect = "none";
        return;
      }
    }
    e.dataTransfer.dropEffect = "none";
  };

  const onDrop = (e: DragEv) => {
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
  };

  const onDragEnd = (e: DragEv) => {
    const draggingEl = draggingTrackRef.current;

    if (draggingEl) {
      draggingEl.style.background = "none";
      draggingEl.draggable = true;
      draggingEl.style.opacity = "1";
      draggingTrackRef.current = undefined;
    }

    overTrackRef.current = undefined;

    if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = undefined;
    }
  };

  return {
    onDragEnd,
    onDragStart,
    onDrop,
    onDragOver,
    onDragEnter,
  };
};
