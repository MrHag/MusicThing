import { Pages } from "layout/Layout";
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
  const elements = [
    { text: "Home", param: Pages.Home },
    { text: "Search", param: Pages.Search },
    { text: "Add Music", param: Pages.AddMusic },
  ];

  return (
    <Container>
      <Logo />
      <NavPanel elements={elements} route={""} />
      <PlaylistNavPanel elements={playlists} route={Pages.PlayList} />
    </Container>
  );
};

export default LeftContainer;
