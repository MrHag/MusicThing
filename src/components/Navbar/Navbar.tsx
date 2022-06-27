import Logo from "../Logo/Logo";
import NavPanel from "./NavPanel";
import Playlists from "./Playlists";
import { Container } from "./styles";

interface Props {
  playlists: {
    id: number;
    name: string;
  }[];
}

const Navbar: React.FC<Props> = ({ playlists }) => {
  return (
    <Container>
      <Logo />
      <NavPanel />
      <Playlists elements={playlists} />
    </Container>
  );
};

export default Navbar;
