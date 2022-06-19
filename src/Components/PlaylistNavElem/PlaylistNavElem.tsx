import styled from "styled-components";
import Text from "../Text/Text";
import { NavContainer } from "../NavElem/NavElem";

interface Props {
  active: Boolean;
}

interface FnProps extends Props {
  text: string;
  navClick: () => void;
}

const NavC = styled(NavContainer)``;

function PlaylistNavElem(props: FnProps) {
  return (
    <NavC active={props.active} onClick={props.navClick}>
      <Text>{props.text}</Text>
    </NavC>
  );
}

export default PlaylistNavElem;
