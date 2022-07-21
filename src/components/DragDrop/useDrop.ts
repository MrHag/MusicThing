import { Dispatch, SetStateAction, useEffect, useState } from "react";
import TransferIO from "./TransferIO";
import "./style.css";
import { lazy, lazyCall, onDragEvent } from "./lib";

export type IsAcceptEvent = (
  elem: HTMLElement,
  e: DragEvent,
  tio: TransferIO
) => boolean;

interface State {
  isOver: boolean;
  onDrop: (e: onDragEvent) => void;
  onDragOver: (e: onDragEvent) => void;
  onDragEnter: (e: onDragEvent) => void;
  onDragLeave: (e: onDragEvent) => void;
  onIsAccept: (e: IsAcceptEvent) => void;
}

const useDrop = (): [
  State,
  HTMLElement | undefined,
  Dispatch<SetStateAction<HTMLElement | undefined>>,
  Dispatch<SetStateAction<string>>
] => {
  const [drop, setDrop] = useState<HTMLElement>();
  const [tag, setTag] = useState<string>(" ");
  const [dropEvent, setDropEvent] = useState<onDragEvent>();
  const [dragOverEvent, setDragOverEvent] = useState<onDragEvent>();
  const [dragEnterEvent, setDragEnterEvent] = useState<onDragEvent>();
  const [dragLeaveEvent, setDragLeaveEvent] = useState<onDragEvent>();
  const [isAcceptEvent, setIsAcceptEvent] = useState<IsAcceptEvent>(
    lazy(() => true)
  );

  const [state, setState] = useState<State>({
    isOver: false,
    onDrop: lazyCall(setDropEvent),
    onDragOver: lazyCall(setDragOverEvent),
    onDragEnter: lazyCall(setDragEnterEvent),
    onDragLeave: lazyCall(setDragLeaveEvent),
    onIsAccept: lazyCall(setIsAcceptEvent),
  });

  const onDrop = (e: DragEvent) => {
    if (!e.dataTransfer) return;

    setState({ ...state, isOver: false });
    const target = e.currentTarget as HTMLElement;

    dropEvent?.(target, e, TransferIO.from(e.dataTransfer));
  };

  const onDragOver = (e: DragEvent) => {
    if (!e.dataTransfer) return;

    const target = e.currentTarget as HTMLElement;

    const tio = TransferIO.from(e.dataTransfer);
    if (tio.hasValue("tag", tag) && isAcceptEvent(target, e, tio))
      e.preventDefault();

    dragOverEvent?.(target, e, tio);
  };

  const onDragEnter = (e: DragEvent) => {
    if (!e.dataTransfer) return;

    const target = e.currentTarget as HTMLElement;

    const tio = TransferIO.from(e.dataTransfer);

    if (tio.hasValue("tag", tag) && isAcceptEvent(target, e, tio)) {
      e.preventDefault();
      setState({ ...state, isOver: true });
    }

    dragEnterEvent?.(target, e, tio);
  };

  const onDragLeave = (e: DragEvent) => {
    setState({ ...state, isOver: false });
    if (!e.dataTransfer || !drop) return;

    const target = e.currentTarget as HTMLElement;

    dragLeaveEvent?.(target, e, TransferIO.from(e.dataTransfer));
  };

  useEffect(() => {
    if (!drop) return;
    drop.draggable = true;

    if (state.isOver) drop.classList.add("LockPointerEvents");
    else drop.classList.remove("LockPointerEvents");

    drop.addEventListener("dragenter", onDragEnter);
    drop.addEventListener("dragleave", onDragLeave);
    drop.addEventListener("dragover", onDragOver);
    drop.addEventListener("drop", onDrop);
    return () => {
      drop.draggable = false;
      drop.classList.remove("Drag");
      drop.removeEventListener("dragenter", onDragEnter);
      drop.removeEventListener("dragleave", onDragLeave);
      drop.removeEventListener("dragover", onDragOver);
      drop.removeEventListener("drop", onDrop);
    };
  });

  return [state, drop, setDrop, setTag];
};

export default useDrop;
