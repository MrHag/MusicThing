import Text from "../Text/Text";
import { NavContainer } from "../NavElem/NavElem";

interface Props {
  text: string;
  active: boolean;
  onNavClick: () => void;
}

const PlaylistNavElem: React.FC<Props> = ({ active, onNavClick, text }) => {
  return (
    <NavContainer active={active} onClick={onNavClick}>
      <Text>{text}</Text>
    </NavContainer>
  );
};

export default PlaylistNavElem;
