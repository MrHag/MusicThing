import Text from "components/Text/Text";
import Routes from "constants/Routes";
import { generatePath } from "react-router-dom";
import { Playlists, NavLink } from "./styles";

interface Props {
  elements: { id: number; name: string }[];
}

const PlaylistNavPanel: React.FC<Props> = ({ elements }) => {
  const links = elements.map(({ id, name }) => {
    const path = generatePath(Routes.playlist, {
      id: id.toString(),
    });
    return (
      <NavLink key={id} to={path}>
        <Text>{name}</Text>
      </NavLink>
    );
  });

  return <Playlists>{links}</Playlists>;
};

export default PlaylistNavPanel;
