import styled, { css, FlattenSimpleInterpolation } from "styled-components";
import ClassicInput from "../ClassicInput/ClassicInput";

interface SliderProps {
  styles: FlattenSimpleInterpolation;
}

const slider = ({ styles }: SliderProps) => {
  return css`
    background-color: unset;
    -webkit-appearance: none;
    width: 100%;
    margin: 0;

    &::-webkit-slider-runnable-track {
      ${styles}
    }

    &::-moz-range-track {
      ${styles}
    }

    &::-ms-track {
      ${styles}
      background: transparent;
      border: solid transparent;
      color: transparent;
    }
  `;
};

const sliderCSS = css`
  width: 100%;
  height: 3px;
  cursor: pointer;
  background-color: var(--blue-bg-color);
`;

const thumbCSS = css`
  position: relative;
  -webkit-appearance: none;
  box-sizing: content-box;
  border: 1px solid var(--hviolet-bg-color);
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background-color: var(--blue-bg-color);
  cursor: pointer;
  margin: -7px 0 0 0;
`;

const thumbActiveCSS = css`
  transform: scale(1.2);
  background: var(--hviolet-bg-color);
`;

export const AudioContainer = styled.div`
  --buffered-width: 0%;
  --seek-before-width: 0%;

  color: var(--secondary-text-color);

  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  user-select: none;

  & input[type="range"]::-webkit-slider-thumb {
    ${thumbCSS}
  }

  & input[type="range"]::-moz-range-thumb {
    ${thumbCSS}
  }

  & input[type="range"]::-ms-thumb {
    ${thumbCSS}
  }

  & input[type="range"]:active::-webkit-slider-thumb {
    ${thumbActiveCSS}
  }

  & input[type="range"]:active::-moz-range-thumb {
    ${thumbActiveCSS}
  }

  & input[type="range"]:active::-ms-thumb {
    ${thumbActiveCSS}
  }
`;

export const VolumeContainer = styled.div`
  display: grid;
  grid-template-columns: 30px minmax(100px, 2fr) [last] 40px;
  column-gap: 10px;
  align-items: center;
`;

export const PlayerContainer = styled.div`
  display: grid;
  grid-template-columns: 40px 40px minmax(200px, 20vw) [last] 40px;
  column-gap: 10px;
  align-items: center;
`;

export const Output = styled.span`
  font-size: 20px;
`;

export const SeekSlider = styled(ClassicInput)`
  ${slider({
    styles: css`
      ${sliderCSS}
      & {
        background: linear-gradient(
          to right,
          var(--hblue-bg-color) var(--seek-before-width),
          var(--lightblue-bg-color) var(--seek-before-width),
          var(--buffered-width),
          var(--blue-bg-color) 0
        );
      }
    `,
  })}
`;

export const VolumeSlider = styled.input`
  ${slider({
    styles: css`
      ${sliderCSS}
      & {
        background: linear-gradient(
          to right,
          var(--hblue-bg-color) var(--volume-before-width),
          var(--blue-bg-color) 0
        );
      }
    `,
  })}
`;
