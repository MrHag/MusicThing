import styled from "styled-components";

export const Elem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;

  &:hover {
    background-color: #ffffff0a;
  }
`;

export const Container = styled.div<{ show: Boolean }>`
  width: 200px;
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  color: white;
  outline: none;
  border-radius: 2px;
  user-select: none;
  background-color: var(--ultra-light-bg-color);
`;
