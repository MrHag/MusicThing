import styled from "styled-components";
import Text from "../Text/Text";

const LogoText = styled(Text)`
  font-size: 40pt;
  font-family: "Gill Sans", sans-serif;
`;

const Container = styled.div`
  display: flex;
  margin: 20px 0;
  align-items: center;
`;

const Logo: React.FC = () => {
  return (
    <Container>
      <LogoText>MusicThing</LogoText>
    </Container>
  );
};

export default Logo;
