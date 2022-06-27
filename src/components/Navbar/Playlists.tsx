import Text from "components/Text/Text";
import Routes from "constants/Routes";
import { generatePath } from "react-router-dom";
import { PlaylistsContainer, NavLink } from "./styles";

interface Props {
  elements: { id: number; name: string }[];
}

const Playlists: React.FC<Props> = ({ elements }) => {
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

  return <PlaylistsContainer>{links}</PlaylistsContainer>;
};

export default Playlists;
