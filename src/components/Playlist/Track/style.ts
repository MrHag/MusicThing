import styled from "styled-components";
import { GridTemplate } from "../style";
import Text from "components/Text/Text";
import { OptionIcon } from "./icons";

export const Image = styled.img`
  max-width: 40px;
  max-height: 40px;
  width: auto;
  height: auto;
  margin-right: 10px;
`;

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  max-height: 50px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const OptButton = styled(OptionIcon)`
  font-size: 18pt;
  color: var(--unactive-text-color);
  &:hover {
    color: inherit;
  }
`;

export const IconText = styled(Text)`
  font-size: 0;
  display: none;
`;

export const LastBlock = styled.div`
  display: grid;
  column-gap: 10px;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`;

export const Container = styled(GridTemplate)`
  display: grid;
  height: 40px;
  align-items: center;
  padding: 10px 0;

  &:hover {
    background-color: var(--light-bg-color);
  }

  & > .index,
  .index-icon {
    text-align: center;
  }

  & > .index-icon {
    display: none;
  }

  &:hover > .index {
    display: none;
  }

  &:hover > .index-icon,
  &:hover ${IconText} {
    display: block;
  }
`;
