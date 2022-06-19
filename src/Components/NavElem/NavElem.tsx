import styled from "styled-components";
import Text from "../Text/Text";

interface FnProps {
  text: string;
  navClick: () => void;
}

const NavContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 8px 0;

  &:hover * {
    color: var(--active-text-color);
  }
`;

function NavElem(props: FnProps) {
  return (
    <NavContainer onClick={props.navClick}>
      <Text>{props.text}</Text>
    </NavContainer>
  );
}

export default NavElem;
