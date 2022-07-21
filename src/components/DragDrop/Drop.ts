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
  const [Drop, setDrop] = useState<HTMLElement>();
  const [Tag, setTag] = useState<string>(" ");
  const [DropEvent, setDropEvent] = useState<onDragEvent>();
  const [DragOverEvent, setDragOverEvent] = useState<onDragEvent>();
  const [DragEnterEvent, setDragEnterEvent] = useState<onDragEvent>();
  const [DragLeaveEvent, setDragLeaveEvent] = useState<onDragEvent>();
  const [IsAcceptEvent, setIsAcceptEvent] = useState<IsAcceptEvent>(
    lazy(() => true)
  );

  const [State, SetState] = useState<State>({
    isOver: false,
    onDrop: lazyCall(setDropEvent),
    onDragOver: lazyCall(setDragOverEvent),
    onDragEnter: lazyCall(setDragEnterEvent),
    onDragLeave: lazyCall(setDragLeaveEvent),
    onIsAccept: lazyCall(setIsAcceptEvent),
  });

  const onDrop = (e: DragEvent) => {
    if (!e.dataTransfer) return;

    SetState({ ...State, isOver: false });
    const target = e.currentTarget as HTMLElement;

    DropEvent?.call(this, target, e, TransferIO.from(e.dataTransfer));
  };

  const onDragOver = (e: DragEvent) => {
    if (!e.dataTransfer) return;

    const target = e.currentTarget as HTMLElement;

    const tio = TransferIO.from(e.dataTransfer);
    if (tio.hasValue("tag", Tag) && IsAcceptEvent(target, e, tio))
      e.preventDefault();

    DragOverEvent?.call(this, target, e, tio);
  };

  const onDragEnter = (e: DragEvent) => {
    if (!e.dataTransfer) return;

    const target = e.currentTarget as HTMLElement;

    const tio = TransferIO.from(e.dataTransfer);

    if (tio.hasValue("tag", Tag) && IsAcceptEvent(target, e, tio)) {
      e.preventDefault();
      SetState({ ...State, isOver: true });
    }

    DragEnterEvent?.call(this, target, e, tio);
  };

  const onDragLeave = (e: DragEvent) => {
    SetState({ ...State, isOver: false });
    if (!e.dataTransfer || !Drop) return;

    const target = e.currentTarget as HTMLElement;

    DragLeaveEvent?.call(this, target, e, TransferIO.from(e.dataTransfer));
  };

  useEffect(() => {
    if (!Drop) return;
    Drop.draggable = true;

    if (State.isOver) Drop.classList.add("LockPointerEvents");
    else Drop.classList.remove("LockPointerEvents");

    Drop.addEventListener("dragenter", onDragEnter);
    Drop.addEventListener("dragleave", onDragLeave);
    Drop.addEventListener("dragover", onDragOver);
    Drop.addEventListener("drop", onDrop);
    return () => {
      Drop.draggable = false;
      Drop.classList.remove("Drag");
      Drop.removeEventListener("dragenter", onDragEnter);
      Drop.removeEventListener("dragleave", onDragLeave);
      Drop.removeEventListener("dragover", onDragOver);
      Drop.removeEventListener("drop", onDrop);
    };
  });

  return [State, Drop, setDrop, setTag];
};

export default useDrop;
