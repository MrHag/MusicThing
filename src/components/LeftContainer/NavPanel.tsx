import Text from "components/Text/Text";
import Routes from "constants/Routes";
import { PanelContainer, NavLink } from "./styles";

const NavPanel: React.FC = () => {
  return (
    <PanelContainer>
      <NavLink to={Routes.home}>
        <Text>Home</Text>
      </NavLink>
      <NavLink to={Routes.search}>
        <Text>Search</Text>
      </NavLink>
      <NavLink to={Routes.addMusic}>
        <Text>Add music</Text>
      </NavLink>
    </PanelContainer>
  );
};

export default NavPanel;
