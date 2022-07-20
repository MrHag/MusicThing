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

// export type MouseEvents = {
//   [T in keyof GlobalEventHandlersEventMap]: GlobalEventHandlersEventMap[T] extends MouseEvent
//     ? T
//     : never;
// }[keyof GlobalEventHandlersEventMap];

// export const mouseEvents = () => {
//   const types = [];
//   for (let ev in window) {
//     let eev: MouseEvents = ev as MouseEvents;
//     console.log(eev);
//   }
// };

// export let mouseEvents: { [key in MouseEvents]: key } = {
//   auxclick: "auxclick",
//   click: "click",
//   contextmenu: "contextmenu",
//   dblclick: "dblclick",
//   drag: "drag",
//   dragend: "dragend",
//   dragenter: "dragenter",
//   dragleave: "dragleave",
//   dragover: "dragover",
//   dragstart: "dragstart",
//   drop: "drop",
//   gotpointercapture: "gotpointercapture",
//   lostpointercapture: "lostpointercapture",
//   mousedown: "mousedown",
//   mouseenter: "mouseenter",
//   mouseleave: "mouseleave",
//   mousemove: "mousemove",
//   mouseout: "mouseout",
//   mouseover: "mouseover",
//   mouseup: "mouseup",
//   pointercancel: "pointercancel",
//   pointerdown: "pointerdown",
//   pointerenter: "pointerenter",
//   pointerleave: "pointerleave",
//   pointermove: "pointermove",
//   pointerout: "pointerout",
//   pointerover: "pointerover",
//   pointerup: "pointerup",
//   wheel: "wheel",
// };
