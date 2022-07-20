import { useAppDispatch, useAppSelector } from "hooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { selectPlaceholder, setPlaceholder } from "store/PlaceholderSlice";
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
  const [Drag, SetDrag] = useState<HTMLElement>();
  const [OuterDragStart, setOuterDragStart] = useState<onDragEvent>();
  const [OuterDragEnd, setOuterDragEnd] = useState<onDragEvent>();
  const [OuterDrag, setOuterDrag] = useState<onDragEvent>();
  const [Tag, setTag] = useState<string>(" ");

  const dispatch = useAppDispatch();
  const Placeholder = useAppSelector(selectPlaceholder);

  const [State, SetState] = useState<State>({
    isDragging: false,
    isOver: false,
    onDragStart: lazyCall(setOuterDragStart),
    onDrag: lazyCall(setOuterDrag),
    onDragEnd: lazyCall(setOuterDragEnd),
  });

  const onDragStart = (e: DragEvent) => {
    SetState({ ...State, isDragging: true });
    const target = e.target as HTMLElement;

    // dispatch(
    //   setPlaceholder({
    //     ...Placeholder,
    //     position: { x: e.pageX, y: e.pageY },
    //     text: "TEXT",
    //   })
    // );

    // const el = document.getElementById("placeholder");
    const el = document.createElement("div");
    if (!e.dataTransfer || !Tag) return;
    e.dataTransfer.setDragImage(el, 0, 0);

    const tio = TransferIO.from(e.dataTransfer);
    tio.add("tag", Tag);
    //e.dataTransfer?.setData("text", "textdata");

    OuterDragStart?.call(this, target, e, tio);
  };

  const onDragEnd = (e: DragEvent) => {
    if (!e.dataTransfer) return;
    SetState({ ...State, isDragging: false });
    // dispatch(setPlaceholder({ ...Placeholder, text: "" }));
    const target = e.currentTarget as HTMLElement;
    OuterDragEnd?.call(this, target, e, TransferIO.from(e.dataTransfer));
  };

  const onDrag = (e: DragEvent) => {
    if (!e.dataTransfer) return;
    // dispatch(
    //   setPlaceholder({
    //     ...Placeholder,
    //     position: { x: e.pageX, y: e.pageY },
    //   })
    // );
    const target = e.currentTarget as HTMLElement;
    OuterDrag?.call(this, target, e, TransferIO.from(e.dataTransfer));
  };

  useEffect(() => {
    if (!Drag) return;
    Drag.draggable = true;
    Drag.addEventListener("dragstart", onDragStart);
    Drag.addEventListener("dragend", onDragEnd);
    Drag.addEventListener("drag", onDrag);
    return () => {
      Drag.draggable = false;
      Drag.removeEventListener("dragstart", onDragStart);
      Drag.removeEventListener("dragend", onDragEnd);
      Drag.removeEventListener("drag", onDrag);
    };
  });

  return [State, Drag, SetDrag, setTag];
};

export default useDrag;
