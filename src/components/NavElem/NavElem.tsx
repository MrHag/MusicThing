import styled from "styled-components";
import Text from "../Text/Text";

interface ContainerProps {
  active: boolean;
}

export const NavContainer = styled.div<ContainerProps>`
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

interface NavElemProps extends ContainerProps {
  text: string;
  onClick: () => void;
}

const NavElem: React.FC<NavElemProps> = ({ active, onClick, text }) => {
  return (
    <NavContainer active={active} onClick={onClick}>
      <Text>{text}</Text>
    </NavContainer>
  );
};

export default NavElem;
