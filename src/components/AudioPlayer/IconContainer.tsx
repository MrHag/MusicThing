import styled from "styled-components";

export interface Props {
  disabled: boolean;
}

const IconContainer = styled.div<Props>`
  height: 100%;
  & svg {
    height: 100%;
    width: 100%;
    color: ${(props) =>
      props.disabled ? "var(--unactive-text-color)" : "unset"};
  }
`;

export default IconContainer;
