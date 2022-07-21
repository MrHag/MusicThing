import TransferIO from "./TransferIO";

export type onDragEvent = (
  elem: HTMLElement,
  e: DragEvent,
  tio: TransferIO
) => void;

export function lazy<T>(fn: T) {
  return () => fn;
}

export function lazyCall<T extends CallableFunction, B>(fn: T) {
  return (arg: B) => fn(lazy(arg));
}
