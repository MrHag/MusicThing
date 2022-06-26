import styled from "styled-components";
import Text from "components/Text/Text";

export const BaseHeaderImage = styled.img`
  height: 80%;
`;

export const BaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  user-select: none;
  overflow-y: scroll;
`;

export const BaseHeaderContainer = styled.div`
  display: flex;
  background-color: var(--light-bg-color);
  width: 100%;
  min-height: 150px;
  max-height: 150px;
  margin: 0 auto;
`;

export const BaseHeaderInnerContainer = styled.div`
  display: flex;
  width: 70%;
  align-items: center;
  margin: 0 auto;
`;

export const BaseBodyContainer = styled.div`
  display: flex;
  padding: 10px 0;
  width: 100%;
  height: 100%;
`;

export const BaseBodyInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
`;

export const BaseTitleText = styled(Text)`
  font-size: 34px;
  margin-bottom: 20px;
`;

export const BaseText = styled(Text)`
  font-size: 24px;
`;
