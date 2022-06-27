import { useState } from "react";
import NavElem from "./NavElem";
import { PanelContainer } from "./styles";

interface Props<T> {
  route: string;
  elements: { text: string; param: T }[];
}

function NavPanel<T>({ route, elements }: Props<T>) {
  const NavElems = elements.map(({ text, param }, index) => {
    return <NavElem route={`${route}/${param}`} key={index} text={text} />;
  });

  return <PanelContainer>{NavElems}</PanelContainer>;
}

export default NavPanel;
