import { useState } from "react";
import styled from "styled-components";
import { PanelContainer } from "../NavPanel/NavPanel";
import PlaylistNavElem from "../PlaylistNavElem/PlaylistNavElem";

const Container = styled(PanelContainer)`
  border-top: unset;
`;

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
      <PlaylistNavElem
        active={activeElem === index}
        key={index}
        text={attr.name}
        onNavClick={() => {
          setactiveElem(index);
          navClick(attr.id);
        }}
      />
    );
  });

  return <Container>{NavElems}</Container>;
};

export default PlaylistNavPanel;
