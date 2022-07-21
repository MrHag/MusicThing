import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { lazyCall, onDragEvent } from "./lib";
import TransferIO from "./TransferIO";

interface State {
  isDragging: boolean;
  isOver: boolean;
  onDragStart: (e: onDragEvent) => void;
  onDragEnd: (e: onDragEvent) => void;
  onDrag: (e: onDragEvent) => void;
}

const useDrag = (): [
  State,
  HTMLElement | undefined,
  Dispatch<SetStateAction<HTMLElement | undefined>>,
  Dispatch<SetStateAction<string>>
] => {
  const [dragElem, setDragElem] = useState<HTMLElement>();
  const [dragStartEvent, setDragStartEvent] = useState<onDragEvent>();
  const [dragEndEvent, setDragEndEvent] = useState<onDragEvent>();
  const [dragEvent, setDragEvent] = useState<onDragEvent>();
  const [tag, setTag] = useState<string>(" ");

  const [state, setState] = useState<State>({
    isDragging: false,
    isOver: false,
    onDragStart: lazyCall(setDragStartEvent),
    onDrag: lazyCall(setDragEvent),
    onDragEnd: lazyCall(setDragEndEvent),
  });

  const onDragStart = (e: DragEvent) => {
    setState({ ...state, isDragging: true });
    const target = e.target as HTMLElement;

    const el = document.createElement("div");
    if (!e.dataTransfer || !tag) return;
    e.dataTransfer.setDragImage(el, 0, 0);

    const tio = TransferIO.from(e.dataTransfer);
    tio.add("tag", tag);

    dragStartEvent?.call(this, target, e, tio);
  };

  const onDragEnd = (e: DragEvent) => {
    setState({ ...state, isDragging: false });

    const target = e.currentTarget as HTMLElement;

    if (!e.dataTransfer) return;
    dragEndEvent?.call(this, target, e, TransferIO.from(e.dataTransfer));
  };

  const onDrag = (e: DragEvent) => {
    const target = e.currentTarget as HTMLElement;

    if (!e.dataTransfer) return;
    dragEvent?.call(this, target, e, TransferIO.from(e.dataTransfer));
  };

  useEffect(() => {
    if (!dragElem) return;
    dragElem.draggable = true;
    dragElem.addEventListener("dragstart", onDragStart);
    dragElem.addEventListener("dragend", onDragEnd);
    dragElem.addEventListener("drag", onDrag);
    return () => {
      dragElem.draggable = false;
      dragElem.removeEventListener("dragstart", onDragStart);
      dragElem.removeEventListener("dragend", onDragEnd);
      dragElem.removeEventListener("drag", onDrag);
    };
  });

  return [state, dragElem, setDragElem, setTag];
};

export default useDrag;
