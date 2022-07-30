import styled from "styled-components";

export const Container = styled.div<{ show: boolean }>`
  pointer-events: none;
  padding: 5px 10px;
  background-color: gray;
  position: absolute;
  z-index: ${(props) => (props.show ? "9999" : "-9999")};
`;
