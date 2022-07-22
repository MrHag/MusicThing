import { Dispatch, SetStateAction, useEffect, useState } from "react";
import TransferIO from "./TransferIO";
import "./style.css";
import { onDragEvent } from "./lib";

export type IsAcceptEvent = (
  elem: HTMLElement,
  e: DragEvent,
  tio: TransferIO
) => boolean;

interface State {
  isOver: boolean;
}

interface Events {
  dropEvent?: onDragEvent;
  dragOverEvent?: onDragEvent;
  dragEnterEvent?: onDragEvent;
  dragLeaveEvent?: onDragEvent;
  isAcceptEvent?: IsAcceptEvent;
}

const useDrop = (
  events: Events
): [
  State,
  HTMLElement | undefined,
  Dispatch<SetStateAction<HTMLElement | undefined>>,
  Dispatch<SetStateAction<string>>
] => {
  if (!events.isAcceptEvent) events.isAcceptEvent = () => true;

  let {
    dropEvent,
    dragOverEvent,
    dragEnterEvent,
    dragLeaveEvent,
    isAcceptEvent,
  } = events;

  const [drop, setDrop] = useState<HTMLElement>();
  const [tag, setTag] = useState<string>(" ");

  const [state, setState] = useState<State>({
    isOver: false,
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
