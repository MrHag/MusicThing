import styled from "styled-components";
import Text from "../Text/Text";

const LogoText = styled(Text)`
  font-size: 26pt;
  font-family: "Gill Sans", sans-serif;
`;

const LogoContainer = styled.div`
  display: flex;
  margin: 20px 0;
  align-items: center;
`;

function Logo() {
  return (
    <LogoContainer>
      <LogoText>MusicThing</LogoText>
    </LogoContainer>
  );
}

export default Logo;
