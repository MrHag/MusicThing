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
        <TitleText>Search page</TitleText>
        <ContentText>Here you will be able to search some music</ContentText>
      </BodyInnerContainer>
    </BodyContainer>
  );
};

export default Body;
