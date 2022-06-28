import Logo from "../Logo/Logo";
import NavPanel from "./NavPanel";
import Playlists from "./Playlists";
import { Container } from "./styles";

const Navbar: React.FC = () => {
  return (
    <Container>
      <Logo />
      <NavPanel />
      <Playlists />
    </Container>
  );
};

export default Navbar;
