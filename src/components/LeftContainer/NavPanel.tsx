import { useState } from "react";
import NavElem from "./NavElem";
import { PanelContainer } from "./styles";

interface Props<T> {
  onNavClick: (param: T) => void;
  elements: { text: string; param: T }[];
}

function NavPanel<T>(props: Props<T>) {
  const [activeElem, setActiveElem] = useState(0);

  const NavElems = props.elements.map((attr, index) => {
    return (
      <NavElem
        active={activeElem === index}
        key={index}
        text={attr.text}
        onClick={() => {
          setActiveElem(index);
          props.onNavClick(attr.param);
        }}
      />
    );
  });

  return <PanelContainer>{NavElems}</PanelContainer>;
}

export default NavPanel;
