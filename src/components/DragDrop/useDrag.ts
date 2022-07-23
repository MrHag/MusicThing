import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { onDragEvent } from "./lib";
import TransferIO from "./TransferIO";

interface State {
  isDragging: boolean;
}

interface Events {
  dragStartEvent?: onDragEvent;
  dragEndEvent?: onDragEvent;
  dragEvent?: onDragEvent;
}

const useDrag = ({
  dragStartEvent,
  dragEndEvent,
  dragEvent,
}: Events): [
  State,
  HTMLElement | undefined,
  Dispatch<SetStateAction<HTMLElement | undefined>>,
  Dispatch<SetStateAction<string>>
] => {
  const [dragElem, setDragElem] = useState<HTMLElement>();
  const [tag, setTag] = useState<string>(" ");

  const [state, setState] = useState<State>({
    isDragging: false,
  });

  const onDragStart = (e: DragEvent) => {
    setState({ ...state, isDragging: true });
    if (!e.target) return;

    const el = document.createElement("div");
    if (!e.dataTransfer || !tag) return;
    e.dataTransfer.setDragImage(el, 0, 0);

    const tio = TransferIO.from(e.dataTransfer);
    tio.add("tag", tag);

    dragStartEvent?.(e.target, e, tio);
  };

  const onDragEnd = (e: DragEvent) => {
    setState({ ...state, isDragging: false });
    if (!e.currentTarget) return;

    if (!e.dataTransfer) return;
    dragEndEvent?.(e.currentTarget, e, TransferIO.from(e.dataTransfer));
  };

  const onDrag = (e: DragEvent) => {
    if (!e.currentTarget) return;

    if (!e.dataTransfer) return;
    dragEvent?.(e.currentTarget, e, TransferIO.from(e.dataTransfer));
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
