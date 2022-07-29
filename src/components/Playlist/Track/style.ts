import styled from "styled-components";
import { GridTemplate } from "../style";
import IconContainer from "components/IconContainer/IconContainer";

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

export const OptButton = styled(IconContainer)`
  font-size: 18pt;
  display: none;
  &:hover {
    color: var(--active-text-color);
  }
`;

export const LastBlock = styled.div`
  display: grid;
  column-gap: 10px;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`;

export const Container = styled(GridTemplate)`
  display: grid;
  height: 60px;
  align-items: center;
  position: relative;

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

  & > .index-icon:hover {
    cursor: pointer;
  }

  &:hover > .index-icon,
  &:hover ${OptButton} {
    display: block;
  }
`;
