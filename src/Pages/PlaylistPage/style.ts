import {
  BaseBodyContainer,
  BaseBodyInnerContainer,
  BaseContainer,
  BaseHeaderContainer,
  BaseHeaderImage,
  BaseHeaderInnerContainer,
  BaseText,
  BaseTitleText,
} from "Pages/styles";
import styled from "styled-components";

export const Poster = styled(BaseHeaderImage)``;

export const PageContainer = styled(BaseContainer)``;

export const HeaderContainer = styled(BaseHeaderContainer)``;
export const HeaderInnerContainer = styled(BaseHeaderInnerContainer)`
  margin: 0;
`;

export const BodyContainer = styled(BaseBodyContainer)``;
export const BodyInnerContainer = styled(BaseBodyInnerContainer)``;

export const TitleText = styled(BaseTitleText)``;

export const ContentText = styled(BaseText)``;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 65%;
`;

export const HeadText = styled(BaseText)`
  font-size: 38pt;
`;
