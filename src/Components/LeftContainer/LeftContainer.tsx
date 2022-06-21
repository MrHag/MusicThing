import styled from "styled-components";
import Logo from "../Logo/Logo";
import NavPanel from "../NavPanel/NavPanel";
import PlaylistNavPanel from "../PlaylistNavPanel/PlaylistNavPanel";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--primary-bg-color);
  min-width: 350px;
  height: 100%;
  padding-left: 30px;
  user-select: none;
`;

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
      <Logo></Logo>
      <NavPanel onNavClick={onNavClick} elements={elements}></NavPanel>
      <PlaylistNavPanel
        onNavClick={onPlaylistClick}
        elements={playlists}
      ></PlaylistNavPanel>
    </Container>
  );
};

export default LeftContainer;
