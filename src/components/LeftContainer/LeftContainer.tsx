import Logo from "../Logo/Logo";
import NavPanel from "./NavPanel";
import PlaylistNavPanel from "./PlaylistNavPanel";
import { Container } from "./styles";

export enum Pages {
  Home,
  Search,
  AddMusic,
}

interface Props {
  onNavClick: (message: Pages) => void;
  onPlaylistClick: (id: number) => void;
  playlists: {
    id: number;
    name: string;
  }[];
}

const LeftContainer: React.FC<Props> = ({
  onNavClick,
  onPlaylistClick,
  playlists,
}) => {
  const elements = [
    { text: "Home", param: Pages.Home },
    { text: "Search", param: Pages.Search },
    { text: "Add Music", param: Pages.AddMusic },
  ];

  return (
    <Container>
      <Logo />
      <NavPanel onNavClick={onNavClick} elements={elements} />
      <PlaylistNavPanel onNavClick={onPlaylistClick} elements={playlists} />
    </Container>
  );
};

export default LeftContainer;
