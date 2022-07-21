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
  const [DragElem, SetDragElem] = useState<HTMLElement>();
  const [DragStartEvent, setDragStartEvent] = useState<onDragEvent>();
  const [DragEndEvent, setDragEndEvent] = useState<onDragEvent>();
  const [DragEvent, setDragEvent] = useState<onDragEvent>();
  const [Tag, setTag] = useState<string>(" ");

  const [State, SetState] = useState<State>({
    isDragging: false,
    isOver: false,
    onDragStart: lazyCall(setDragStartEvent),
    onDrag: lazyCall(setDragEvent),
    onDragEnd: lazyCall(setDragEndEvent),
  });

  const onDragStart = (e: DragEvent) => {
    SetState({ ...State, isDragging: true });
    const target = e.target as HTMLElement;

    const el = document.createElement("div");
    if (!e.dataTransfer || !Tag) return;
    e.dataTransfer.setDragImage(el, 0, 0);

    const tio = TransferIO.from(e.dataTransfer);
    tio.add("tag", Tag);

    DragStartEvent?.call(this, target, e, tio);
  };

  const onDragEnd = (e: DragEvent) => {
    SetState({ ...State, isDragging: false });

    const target = e.currentTarget as HTMLElement;

    if (!e.dataTransfer) return;
    DragEndEvent?.call(this, target, e, TransferIO.from(e.dataTransfer));
  };

  const onDrag = (e: DragEvent) => {
    const target = e.currentTarget as HTMLElement;

    if (!e.dataTransfer) return;
    DragEvent?.call(this, target, e, TransferIO.from(e.dataTransfer));
  };

  useEffect(() => {
    if (!DragElem) return;
    DragElem.draggable = true;
    DragElem.addEventListener("dragstart", onDragStart);
    DragElem.addEventListener("dragend", onDragEnd);
    DragElem.addEventListener("drag", onDrag);
    return () => {
      DragElem.draggable = false;
      DragElem.removeEventListener("dragstart", onDragStart);
      DragElem.removeEventListener("dragend", onDragEnd);
      DragElem.removeEventListener("drag", onDrag);
    };
  });

  return [State, DragElem, SetDragElem, setTag];
};

export default useDrag;
