import { HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";
import NavElem from "../NavElem/NavElem";

interface FnProps {
  navClick: (message: string) => void;
}

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px 0;
  text-align: center;
  border-top: 1px solid var(--blue-bg-color);
  border-bottom: 1px solid var(--blue-bg-color);
`;

function NavPanel(props: FnProps) {
  return (
    <PanelContainer>
      <NavElem
        text="Buttn"
        navClick={() => {
          props.navClick("1");
        }}
      ></NavElem>
      <NavElem
        text="Buttn"
        navClick={() => {
          props.navClick("2");
        }}
      ></NavElem>
      <NavElem
        text="Buttn"
        navClick={() => {
          props.navClick("3");
        }}
      ></NavElem>
    </PanelContainer>
  );
}

export default NavPanel;
