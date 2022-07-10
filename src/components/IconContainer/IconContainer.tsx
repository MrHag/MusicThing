import styled from "styled-components";

export interface Props {
  disabled?: boolean;
}

const IconContainer = styled.div<Props>`
  height: 100%;
  font-size: 24pt;
  & svg {
    height: 100%;
    color: ${(props) =>
      props.disabled ? "var(--unactive-text-color)" : "unset"};
  }

  &:hover {
    cursor: ${(props) => (props.disabled ? "unset" : "pointer")};
  }
`;

export default IconContainer;
