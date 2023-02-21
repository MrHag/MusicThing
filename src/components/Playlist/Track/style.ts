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

interface Props {
  DropOver: boolean;
  isDragging: boolean;
  DragTop: boolean;
}

export const Container = styled(GridTemplate)<Props>`
  display: grid;
  height: 40px;
  align-items: center;
  padding: 10px 0;
  border-style: solid;
  border-color: var(--hblue-bg-color);

  ${({ DropOver, isDragging, DragTop }) => ({
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: DropOver ? "var(--some-violet)" : "unset",
    borderWidth: `${DragTop && DropOver ? 10 : 0}px 0 ${
      !DragTop && DropOver ? 10 : 0
    }px 0`,
  })}

  &:hover {
    background-color: var(--some-gray);
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
