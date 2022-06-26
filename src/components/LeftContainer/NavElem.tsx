import Text from "../Text/Text";
import { ContainerProps, NavContainer } from "./styles";

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
