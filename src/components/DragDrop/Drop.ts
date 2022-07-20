import { Dispatch, SetStateAction, useEffect, useState } from "react";
import TransferIO from "./TransferIO";
import "./DragDrop.css";
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
  IsAccept: (e: IsAcceptEvent) => void;
}

const useDrop = (): [
  State,
  HTMLElement | undefined,
  Dispatch<SetStateAction<HTMLElement | undefined>>,
  Dispatch<SetStateAction<string>>
] => {
  const [Drop, setDrop] = useState<HTMLElement>();
  const [Tag, setTag] = useState<string>(" ");
  const [OuterDrop, setOuterDrop] = useState<onDragEvent>();
  const [OuterDragOver, setOuterDragOver] = useState<onDragEvent>();
  const [OuterDragEnter, setOuterDragEnter] = useState<onDragEvent>();
  const [OuterDragLeave, setOuterDragLeave] = useState<onDragEvent>();
  const [IsAccept, setIsAccept] = useState<IsAcceptEvent>(lazy(() => true));

  const [State, SetState] = useState<State>({
    isOver: false,
    onDrop: lazyCall(setOuterDrop),
    onDragOver: lazyCall(setOuterDragOver),
    onDragEnter: lazyCall(setOuterDragEnter),
    onDragLeave: lazyCall(setOuterDragLeave),
    IsAccept: lazyCall(setIsAccept),
  });

  const onDrop = (e: DragEvent) => {
    if (!e.dataTransfer) return;

    SetState({ ...State, isOver: false });
    const target = e.currentTarget as HTMLElement;

    OuterDrop?.call(this, target, e, TransferIO.from(e.dataTransfer));
  };

  const onDragOver = (e: DragEvent) => {
    if (!e.dataTransfer) return;

    const target = e.currentTarget as HTMLElement;

    const tio = TransferIO.from(e.dataTransfer);
    if (tio.hasValue("tag", Tag) && IsAccept(target, e, tio))
      e.preventDefault();

    OuterDragOver?.call(this, target, e, tio);
  };

  const onDragEnter = (e: DragEvent) => {
    if (!e.dataTransfer) return;

    const target = e.currentTarget as HTMLElement;

    const tio = TransferIO.from(e.dataTransfer);

    if (tio.hasValue("tag", Tag) && IsAccept(target, e, tio)) {
      e.preventDefault();
      SetState({ ...State, isOver: true });
    }

    OuterDragEnter?.call(this, target, e, tio);
  };

  const onDragLeave = (e: DragEvent) => {
    SetState({ ...State, isOver: false });
    if (!e.dataTransfer || !Drop) return;

    const target = e.currentTarget as HTMLElement;

    OuterDragLeave?.call(this, target, e, TransferIO.from(e.dataTransfer));
  };

  useEffect(() => {
    if (!Drop) return;
    Drop.draggable = true;
    // const elems = Drop.getElementsByTagName("*");
    // for (const key in elems) {
    //   const elem = elems[key];
    //   for (const ev of Object.values(mouseEvents)) {
    //     elem.hasPointerCapture
    //   }
    // }
    if (State.isOver) Drop.classList.add("Drag");
    else Drop.classList.remove("Drag");

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
