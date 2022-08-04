export const Placeholder = document.createElement("div");
Placeholder.style.backgroundColor = "black";
Placeholder.style.width = "256px";
Placeholder.style.height = "64px";
Placeholder.style.zIndex = "999999";
Placeholder.style.top = "-999999px";
Placeholder.style.position = "absolute";
Placeholder.style.padding = "5px 10px";
Placeholder.style.color = "var(--primary-text-color)";
Placeholder.style.pointerEvents = "none";
Placeholder.style.fontSize = "14pt";

export const movePlaceholderToPos = (x: number, y: number) => {
  const top = y - Placeholder.clientHeight / 2;
  const left = x + 16;
  Placeholder.style.top = top.toString() + "px";
  Placeholder.style.left = left.toString() + "px";
};

export const hidePlaceholder = () => {
  Placeholder.style.top = "-9999999px";
};
