import { useState } from "react";
import styled from "styled-components";
import NavElem from "../NavElem/NavElem";

interface FnProps<T> {
  onNavClick: (param: T) => void;
  elements: { text: string; param: T }[];
}

export const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px 0;
  text-align: center;
  border-top: 1px solid var(--blue-bg-color);
  border-bottom: 1px solid var(--blue-bg-color);
`;

function NavPanel<T>(props: FnProps<T>) {
  const [activeElem, setactiveElem] = useState(0);

  const NavElems = props.elements.map((attr, index) => {
    return (
      <NavElem
        active={activeElem === index}
        key={index}
        text={attr.text}
        onClick={() => {
          setactiveElem(index);
          props.onNavClick(attr.param);
        }}
      />
    );
  });

  return <PanelContainer>{NavElems}</PanelContainer>;
}

export default NavPanel;
