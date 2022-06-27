import Text from "../Text/Text";
import { NavContainer } from "./styles";

interface NavElemProps {
  route: string;
  text: string;
}

const NavElem: React.FC<NavElemProps> = ({ route, text }) => {
  return (
    <NavContainer to={route}>
      <Text>{text}</Text>
    </NavContainer>
  );
};

export default NavElem;
