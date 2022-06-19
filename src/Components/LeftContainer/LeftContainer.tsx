import styled from "styled-components";
import Logo from "../Logo/Logo";
import NavPanel from "../NavPanel/NavPanel";

interface FnProps {
  navClick: (message: string) => void;
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

function LeftContainer(props: FnProps) {
  return (
    <LeftC>
      <Logo></Logo>
      <NavPanel navClick={props.navClick}></NavPanel>
    </LeftC>
  );
}

export default LeftContainer;
