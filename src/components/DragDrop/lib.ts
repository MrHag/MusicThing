import TransferIO from "./TransferIO";

export type onDragEvent = (
  elem: HTMLElement,
  e: DragEvent,
  tio: TransferIO
) => void;
