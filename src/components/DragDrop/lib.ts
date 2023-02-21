import TransferIO from "./TransferIO";

export type onDragEvent = (
  elem: EventTarget,
  e: DragEvent,
  tio: TransferIO
) => void;
