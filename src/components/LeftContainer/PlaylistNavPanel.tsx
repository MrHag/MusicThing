import { useState } from "react";
import NavElem from "./NavElem";
import { PlaylistPanelContainer } from "./styles";

interface Props {
  route: string;
  elements: { id: number; name: string }[];
}

function PlaylistNavPanel({ route, elements }: Props) {
  const NavElems = elements.map(({ id, name }, index) => {
    return <NavElem route={`${route}/${id}`} key={index} text={name} />;
  });

  return <PlaylistPanelContainer>{NavElems}</PlaylistPanelContainer>;
}

export default PlaylistNavPanel;
