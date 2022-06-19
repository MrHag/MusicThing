import { useState } from "react";
import styled from "styled-components";
import { PanelContainer } from "../NavPanel/NavPanel";
import PlaylistNavElem from "../PlaylistNavElem/PlaylistNavElem";

interface FnProps {
  navClick: (param: number) => void;
  elements: {
    id: number;
    name: string;
  }[];
}

const PanelC = styled(PanelContainer)`
  border-top: unset;
`;

function PlaylistNavPanel(props: FnProps) {
  const [activeElem, setactiveElem] = useState(0);

  const NavElems = props.elements.map((attr, index) => {
    return (
      <PlaylistNavElem
        active={activeElem === index}
        key={index}
        text={attr.name}
        navClick={() => {
          setactiveElem(index);
          props.navClick(attr.id);
        }}
      />
    );
  });

  return <PanelC>{NavElems}</PanelC>;
}

export default PlaylistNavPanel;
