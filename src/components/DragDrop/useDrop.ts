import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import TransferIO from "./TransferIO";
import "./style.css";
import { onDragEvent } from "./lib";
import { DragDropContext } from "./DragDropContext";

export type IsAcceptEvent = (
  elem: EventTarget,
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

  const [firstdragdrop, dragdrop] = useContext(DragDropContext);

  const [drop, setDrop] = useState<HTMLElement>();
  const [tag, setTag] = useState<string>(" ");

  const [state, setState] = useState<State>({
    isOver: false,
  });

  const onDrop = (e: DragEvent) => {
    if (!e.dataTransfer) return;
    if (!e.currentTarget) return;

    setState({ ...state, isOver: false });

    firstdragdrop.isEnter = false;
    firstdragdrop.cachedEvent = null;

    dropEvent?.(e.currentTarget, e, TransferIO.from(e.dataTransfer));
  };

  const onDragOver = (e: DragEvent) => {
    if (!e.dataTransfer) return;
    if (!e.currentTarget) return;

    const tio = TransferIO.from(e.dataTransfer);
    if (tio.hasValue("tag", tag) && isAcceptEvent(e.currentTarget, e, tio))
      e.preventDefault();

    dragOverEvent?.(e.currentTarget, e, tio);
  };

  const onDragEnter = (e: DragEvent) => {
    if (!e.dataTransfer) return;
    if (!e.target) return;
    const tio = TransferIO.from(e.dataTransfer);

    if (firstdragdrop.isEnter) {
      firstdragdrop.cachedEvent = e;
      firstdragdrop.DragEnterEvent = onDragEnter;
      return;
    } else {
      firstdragdrop.isEnter = true;
    }

    if (
      tio.hasValue("tag", tag) &&
      isAcceptEvent(drop as EventTarget, e, tio)
    ) {
      e.preventDefault();
      setState({ ...state, isOver: true });
    }

    dragEnterEvent?.(drop as EventTarget, e, tio);
  };

  const onDragLeave = (e: DragEvent) => {
    if (!e.dataTransfer || !drop) return;
    if (!e.currentTarget) return;

    setState({ ...state, isOver: false });

    firstdragdrop.isEnter = false;

    dragLeaveEvent?.(e.currentTarget, e, TransferIO.from(e.dataTransfer));

    if (firstdragdrop.cachedEvent !== null) {
      const ce = firstdragdrop.cachedEvent;

      firstdragdrop.DragEnterEvent(ce);

      firstdragdrop.cachedEvent = null;
    }
  };

  useEffect(() => {
    if (!drop) return;

    if (dragdrop.isDragging) drop.classList.add("LockPointerEvents");
    else drop.classList.remove("LockPointerEvents");

    drop.addEventListener("dragenter", onDragEnter);
    drop.addEventListener("dragleave", onDragLeave);
    drop.addEventListener("dragover", onDragOver);
    drop.addEventListener("drop", onDrop);
    return () => {
      drop.removeEventListener("dragenter", onDragEnter);
      drop.removeEventListener("dragleave", onDragLeave);
      drop.removeEventListener("dragover", onDragOver);
      drop.removeEventListener("drop", onDrop);
    };
  });

  return [state, drop, setDrop, setTag];
};

export default useDrop;
