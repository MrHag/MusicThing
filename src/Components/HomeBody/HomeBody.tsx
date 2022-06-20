import styled from "styled-components";
import Text from "../Text/Text";

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 0 auto;
  /* TODO: How to fix this? */
  height: 0;
`;

const TitleText = styled(Text)`
  font-size: 34px;
  margin-bottom: 20px;
`;

const BodyText = styled(Text)`
  font-size: 24px;
`;

const BodyMainContainer = styled.div`
  display: flex;
  padding: 30px 0;
  width: 100%;
  height: 100%;
`;

function HomeBody() {
  return (
    <BodyMainContainer>
      <BodyContainer>
        <TitleText>Wellcome to MusicThings</TitleText>
        <BodyText>
          MusicThings - is the platform to listen and share music.
        </BodyText>
      </BodyContainer>
    </BodyMainContainer>
  );
}

export default HomeBody;
