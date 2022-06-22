import styled from "styled-components";
import { GridTemplate } from "../style";

export const PlayListElem = styled(GridTemplate)`
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

  &:hover > .index-icon {
    display: block;
  }
`;

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
