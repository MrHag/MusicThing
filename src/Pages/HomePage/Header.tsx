import Logo from "components/Logo/Logo";
import logo from "assets/logos/logo.svg";
import { HeaderContainer, HeaderInnerContainer, HeaderImage } from "./style";

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderInnerContainer>
        <HeaderImage src={logo}></HeaderImage>
        <Logo></Logo>
      </HeaderInnerContainer>
    </HeaderContainer>
  );
};

export default Header;
