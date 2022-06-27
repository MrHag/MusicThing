import {
  BodyContainer,
  BodyInnerContainer,
  ContentText,
  TitleText,
} from "./style";

const Body: React.FC = () => {
  return (
    <BodyContainer>
      <BodyInnerContainer>
        <TitleText>Wellcome to MusicThings</TitleText>
        <ContentText>
          MusicThings - is the platform to listen and share music.
        </ContentText>
      </BodyInnerContainer>
    </BodyContainer>
  );
};

export default Body;
