import styled from "styled-components";
import Text from "../Text/Text";

interface Props {
  active: Boolean;
}

interface FnProps extends Props {
  text: string;
  navClick: () => void;
}

export const NavContainer = styled.div<Props>`
  display: flex;
  width: 100%;
  padding: 8px 0;

  & * {
    color: ${(props) => (props.active ? "var(--active-text-color)" : "")};
  }

  &:hover * {
    color: var(--active-text-color);
  }
`;

function NavElem(props: FnProps) {
  return (
    <NavContainer active={props.active} onClick={props.navClick}>
      <Text>{props.text}</Text>
    </NavContainer>
  );
}

export default NavElem;
