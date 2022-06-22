import styled from "styled-components";
import { ClassicInput } from "../ClassicInput/ClassicInput";

interface AudioContainerProps {
  seekBeforeWidth: number;
  volumeBeforeWidth: number;
}

export const AudioContainer = styled.div<AudioContainerProps>`
  --seek-before-width: ${({ seekBeforeWidth }) => seekBeforeWidth}%;
  --volume-before-width: ${({ volumeBeforeWidth }) => volumeBeforeWidth}%;
  --buffered-width: 0%;

  /* background: var(--ultra-light-bg-color); */
  color: var(--secondary-text-color);

  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  user-select: none;

  #play-icon {
    margin: 0 10px;
  }

  & output {
    display: inline-block;
    width: 32px;
    text-align: center;
    font-size: 20px;
    margin: 0 10px;
    clear: left;
  }

  & input[type="range"] {
    background-color: unset;
  }
  & input[type="range"] {
    position: relative;
    -webkit-appearance: none;
    width: 100%;
    margin: 0;
    padding: 0;
    height: 19px;
    margin: 0 10px;
    float: left;
    outline: none;
  }
  & input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    background-color: var(--blue-bg-color);
  }

  & input[type="range"]::before {
    position: absolute;
    content: "";
    top: 8px;
    left: 0;
    height: 3px;
    width: 100%;
    cursor: pointer;
  }

  & input[type="range"]::-webkit-slider-thumb {
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
  }
  & input[type="range"]:active::-webkit-slider-thumb {
    transform: scale(1.2);
    background: var(--hviolet-bg-color);
  }
  & input[type="range"]::-moz-range-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    background-color: var(--blue-bg-color);
  }
  & input[type="range"]::-moz-range-progress {
    background-color: #ff0000;
  }
  & input[type="range"]::-moz-focus-outer {
    border: 0;
  }
  & input[type="range"]::-moz-range-thumb {
    box-sizing: content-box;
    border: 1px solid var(--hviolet-bg-color);
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: var(--blue-bg-color);
    cursor: pointer;
  }
  & input[type="range"]:active::-moz-range-thumb {
    transform: scale(1.2);
    background: var(--hviolet-bg-color);
  }
  & input[type="range"]::-ms-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    background: transparent;
    border: solid transparent;
    color: transparent;
  }
  & input[type="range"]::-ms-fill-lower {
    background-color: #ff0000;
  }
  & input[type="range"]::-ms-fill-upper {
    background-color: var(--blue-bg-color);
  }
  & input[type="range"]::-ms-thumb {
    box-sizing: content-box;
    border: 1px solid var(--hviolet-bg-color);
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: var(--blue-bg-color);
    cursor: pointer;
  }
  & input[type="range"]:active::-ms-thumb {
    transform: scale(1.2);
    background: var(--hviolet-bg-color);
  }
`;

export const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
  height: 33.3%;
  width: 50%;
  max-width: 200px;
  min-width: 150px;
`;

export const PlayerContainer = styled.div`
  display: flex;
  align-items: center;
  height: 33.3%;
  width: 50%;
  max-width: 440px;
  min-width: 250px;
`;

export const Time = styled.span`
  display: inline-block;
  width: 37px;
  text-align: center;
  font-size: 20px;
  margin: 0 10px;
`;

export const SeekSlider = styled(ClassicInput)`
  &::before {
    background: linear-gradient(
      to right,
      var(--hblue-bg-color) var(--seek-before-width),
      var(--lightblue-bg-color) var(--seek-before-width),
      var(--buffered-width),
      transparent 0
    );
  }
`;

export const VolumeSlider = styled.input`
  margin: 0 10px;
  width: 80%;

  &::before {
    background: linear-gradient(
      to right,
      var(--hblue-bg-color) var(--volume-before-width),
      transparent 0
    );
  }

  &::-webkit-slider-runnable-track {
    background: var(--blue-bg-color);
  }

  &::-moz-range-track {
    background: var(--blue-bg-color);
  }

  &::-ms-fill-upper {
    background: var(--blue-bg-color);
  }
`;
