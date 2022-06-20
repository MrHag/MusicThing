import styled from "styled-components";
import Text from "../Text/Text";

interface AudioContainerProps {
  seekBeforeWidth: number;
  volumeBeforeWidth: number;
}

export const AudioContainer = styled.div<AudioContainerProps>`
  --seek-before-width: ${({ seekBeforeWidth }) => seekBeforeWidth}%;
  --volume-before-width: ${({ volumeBeforeWidth }) => volumeBeforeWidth}%;
  --buffered-width: 0%;
  width: 95%;
  max-width: 500px;
  /* background: var(--ultra-light-bg-color); */
  color: var(--secondary-text-color);

  display: flex;
  align-items: center;

  & button {
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    outline: none;
    width: 40px;
    height: 40px;
    float: left;
  }

  #play-icon {
    margin: 0 10px;
  }

  & output {
    display: inline-block;
    width: 32px;
    text-align: center;
    font-size: 20px;
    margin: 0 10px;
    float: left;
    clear: left;
  }

  #mute-icon {
    margin: 0 10px;
  }
  & input[type="range"] {
    background-color: unset;
  }
  & input[type="range"] {
    position: relative;
    -webkit-appearance: none;
    width: 48%;
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
    width: var(--seek-before-width);
    height: 3px;
    background-color: var(--hblue-bg-color);
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

export const PlayIcon = styled(Text)`
  font-size: 30px;
`;

export const StopIcon = styled(Text)`
  font-size: 25px;
`;

export const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const PlayerContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Time = styled.span`
  display: inline-block;
  width: 37px;
  text-align: center;
  font-size: 20px;
  margin: 0 10px;
  float: left;
`;

export const VolumeSlider = styled.input`
  margin: 0 10px;
  width: 58%;

  &::-webkit-slider-runnable-track {
    background: var(--blue-bg-color);
  }

  &::-moz-range-track {
    background: var(--blue-bg-color);
  }

  &::-ms-fill-upper {
    background: var(--blue-bg-color);
  }

  &::before {
    width: var(--volume-before-width);
`;
