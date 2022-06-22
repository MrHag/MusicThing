import styled from "styled-components";

export interface StyleProps {
  disabled: boolean;
}

const IconContainer = styled.div<StyleProps>`
  height: 100%;
  & svg {
    height: 100%;
    width: 30px;
    color: ${(props) =>
      props.disabled ? "var(--unactive-text-color)" : "unset"};
  }
`;

export default IconContainer;
