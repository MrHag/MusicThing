import { useState } from "react";
import NavElem from "./NavElem";
import { PlaylistPanelContainer } from "./styles";

interface Props {
  onNavClick: (param: number) => void;
  elements: {
    id: number;
    name: string;
  }[];
}

const PlaylistNavPanel: React.FC<Props> = ({
  onNavClick: navClick,
  elements,
}) => {
  const [activeElem, setactiveElem] = useState(0);

  const NavElems = elements.map((attr, index) => {
    return (
      <NavElem
        active={activeElem === index}
        key={index}
        text={attr.name}
        onClick={() => {
          setactiveElem(index);
          navClick(attr.id);
        }}
      />
    );
  });

  return <PlaylistPanelContainer>{NavElems}</PlaylistPanelContainer>;
};

export default PlaylistNavPanel;
