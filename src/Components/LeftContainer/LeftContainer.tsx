import styled from "styled-components";
import Logo from "../Logo/Logo";
import NavPanel from "../NavPanel/NavPanel";

interface FnProps {
  navClick: (message: Pages) => void;
}

const LeftC = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--primary-bg-color);
  min-width: 350px;
  height: 100%;
  padding-left: 30px;
  user-select: none;
`;

export enum Pages {
  Home,
  Search,
  AddMusic,
}

function LeftContainer(props: FnProps) {
  const elements = [
    { text: "Home", param: Pages.Home },
    { text: "Search", param: Pages.Search },
    { text: "Add Music", param: Pages.AddMusic },
  ];

  return (
    <LeftC>
      <Logo></Logo>
      <NavPanel navClick={props.navClick} elements={elements}></NavPanel>
    </LeftC>
  );
}

export default LeftContainer;
