export const Marker = document.createElement("div");

Marker.style.width = "100%";
Marker.style.height = "16px";
Marker.style.backgroundColor = "var(--hblue-bg-color)";
Marker.style.position = "absolute";

let isMounted = false;

export const updateMarkerPosition = (cursorY: number, trackHeight: number) => {
  if (cursorY < 0) {
    return;
  }

  cursorY = Math.abs(cursorY);
  if (isMounted) {
    if (cursorY <= trackHeight / 2) {
      Marker.style.top = "0";
      Marker.style.bottom = "unset";
    } else {
      Marker.style.top = "unset";
      Marker.style.bottom = "0";
    }
  }
};

export const createMarker = (
  parent: HTMLElement,
  cursorY: number,
  trackHeight: number
) => {
  if (!isMounted) {
    parent.appendChild(Marker);
    isMounted = true;
  }

  updateMarkerPosition(cursorY, trackHeight);
};

export const removeMarker = () => {
  Marker.remove();
  isMounted = false;
};
