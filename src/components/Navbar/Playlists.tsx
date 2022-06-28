import Text from "components/Text/Text";
import Routes from "constants/Routes";
import { useAppSelector } from "hooks";
import { generatePath } from "react-router-dom";
import { selectNavPlaylists } from "store/NavPlaylistsSlice";
import { PlaylistsContainer, NavLink } from "./styles";

const Playlists: React.FC = () => {
  const playlists = useAppSelector(selectNavPlaylists);

  const links = playlists.map(({ id, name }) => {
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
