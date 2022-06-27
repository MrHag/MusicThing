import Logo from "../Logo/Logo";
import NavPanel from "./NavPanel";
import PlaylistNavPanel from "./PlaylistNavPanel";
import { Container } from "./styles";

interface Props {
  playlists: {
    id: number;
    name: string;
  }[];
}

const LeftContainer: React.FC<Props> = ({ playlists }) => {
  return (
    <Container>
      <Logo />
      <NavPanel />
      <PlaylistNavPanel elements={playlists} />
    </Container>
  );
};

export default LeftContainer;
