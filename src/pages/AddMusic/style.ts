import {
  BaseBodyContainer,
  BaseBodyInnerContainer,
  BaseContainer,
  BaseHeaderContainer,
  BaseHeaderImage,
  BaseHeaderInnerContainer,
  BaseText,
  BaseTitleText,
} from "pages/styles";
import styled from "styled-components";

export const HeaderImage = styled(BaseHeaderImage)``;

export const PageContainer = styled(BaseContainer)``;

export const HeaderContainer = styled(BaseHeaderContainer)``;
export const HeaderInnerContainer = styled(BaseHeaderInnerContainer)``;

export const BodyContainer = styled(BaseBodyContainer)``;
export const BodyInnerContainer = styled(BaseBodyInnerContainer)`
  width: 50%;
  max-width: 400px;
`;

export const TitleText = styled(BaseTitleText)``;

export const ContentText = styled(BaseText)``;

export const Label = styled.label`
  color: var(--primary-text-color);
  size: 14pt;
  margin: 0;
`;

export const Input = styled.input``;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

export const HorInputContainer = styled(InputContainer)`
  flex-direction: row;
`;
