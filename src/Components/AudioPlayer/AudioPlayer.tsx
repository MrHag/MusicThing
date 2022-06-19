import styled from "styled-components";
import Text from "../Text/Text";
import { Track } from "../../App";
import { FormEvent, useEffect, useRef, useState } from "react";

interface FnProps {
  track?: Track;
}

const AudioContainer = styled.div`
  --seek-before-width: 0%;
  --volume-before-width: 100%;
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
  & .time {
    display: inline-block;
    width: 37px;
    text-align: center;
    font-size: 20px;
    margin: 0 10px;
    float: left;
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
  #volume-slider {
    margin: 0 10px;
    width: 58%;
  }
  #volume-slider::-webkit-slider-runnable-track {
    background: var(--blue-bg-color);
  }
  #volume-slider::-moz-range-track {
    background: var(--blue-bg-color);
  }
  #volume-slider::-ms-fill-upper {
    background: var(--blue-bg-color);
  }
  #volume-slider::before {
    width: var(--volume-before-width);
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

const PlayIcon = styled(Text)`
  font-size: 30px;
`;
const StopIcon = styled(Text)`
  font-size: 25px;
`;

const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PlayerContainer = styled.div`
  display: flex;
  align-items: center;
`;

function AudioPlayer(props: FnProps) {
  const track = props.track ? props.track.track : "";
  /** Implementation of the presentation of the audio player */

  let raf: number = 0;

  const AudioCont = useRef<HTMLDivElement>(null);
  const Audio = useRef<HTMLAudioElement>(null);
  const VolumeOutput = useRef<HTMLOutputElement>(null);
  const CurrentTime = useRef<HTMLSpanElement>(null);
  const VolumeSlider = useRef<HTMLInputElement>(null);
  const SeekSlider = useRef<HTMLInputElement>(null);
  const DurationContainer = useRef<HTMLSpanElement>(null);

  let play = false;
  let mute = false;

  const Play = () => {
    if (Audio.current == null) return;

    if (play) {
      Audio.current.pause();
      cancelAnimationFrame(raf);
    } else {
      Audio.current.play();
      raf = requestAnimationFrame(whilePlaying);
    }

    play = !play;
  };

  const Mute = () => {
    if (Audio.current == null) return;

    mute = !mute;
    Audio.current.muted = mute;
  };

  useEffect(() => {
    if (SeekSlider.current != null) SeekSlider.current.value = "0";
    if (VolumeSlider.current != null) VolumeSlider.current.value = "100";
  });

  const showRangeProgress = (rangeInput: any) => {
    if (SeekSlider.current == null || AudioCont.current == null) return;

    if (rangeInput === SeekSlider.current)
      AudioCont.current.style.setProperty(
        "--seek-before-width",
        (rangeInput.value / rangeInput.max) * 100 + "%"
      );
    else
      AudioCont.current.style.setProperty(
        "--volume-before-width",
        (rangeInput.value / rangeInput.max) * 100 + "%"
      );
  };

  const whilePlaying = () => {
    if (
      SeekSlider.current == null ||
      Audio.current == null ||
      CurrentTime.current == null ||
      AudioCont.current == null
    )
      return;
    SeekSlider.current.value = Math.floor(Audio.current.currentTime).toString();
    CurrentTime.current.textContent = calculateTime(
      Number.parseFloat(SeekSlider.current.value)
    );
    AudioCont.current.style.setProperty(
      "--seek-before-width",
      `${
        (Number.parseFloat(SeekSlider.current.value) /
          Number.parseFloat(SeekSlider.current.max)) *
        100
      }%`
    );
    raf = requestAnimationFrame(whilePlaying);
  };

  const calculateTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  };

  const displayBufferedAmount = () => {
    if (
      Audio.current == null ||
      AudioCont.current == null ||
      SeekSlider.current == null
    )
      return;

    const buff = Audio.current.buffered;
    const bufferedAmount = Math.floor(buff.end(buff.length - 1));
    AudioCont.current.style.setProperty(
      "--buffered-width",
      `${(bufferedAmount / Number.parseFloat(SeekSlider.current.max)) * 100}%`
    );
  };

  const displayDuration = () => {
    if (Audio.current != null && DurationContainer.current != null)
      DurationContainer.current.textContent = calculateTime(
        Audio.current.duration
      );
  };

  const setSliderMax = () => {
    if (Audio.current != null && SeekSlider.current != null)
      SeekSlider.current.max = Math.floor(Audio.current.duration).toString();
  };

  const LoadedMetaData = () => {
    Play();
    displayDuration();
    setSliderMax();
    displayBufferedAmount();
  };

  const AudioProgress = () => {
    displayBufferedAmount();
  };

  const SeekSliderInput = (e: any) => {
    const value = calculateTime(e.target.value);
    if (CurrentTime.current != null) CurrentTime.current.textContent = value;
    showRangeProgress(e.target);
  };

  const SeekSliderChange = (e: any) => {
    const value = e.target.value;
    if (Audio.current != null) Audio.current.currentTime = value;
  };

  const VolumeSliderInput = (e: any) => {
    const value = e.target.value;
    if (Audio.current != null) Audio.current.volume = value / 100;
    if (VolumeOutput.current != null) VolumeOutput.current.textContent = value;
    showRangeProgress(e.target);
  };

  return (
    <AudioContainer ref={AudioCont} id="audio-player-container">
      <PlayerContainer>
        <audio
          onProgress={AudioProgress}
          ref={Audio}
          onLoadedMetadata={LoadedMetaData}
          src={track}
          preload="metadata"
          loop
        ></audio>
        <button onClick={Play} id="play-icon">
          <PlayIcon>▷</PlayIcon>
        </button>
        <span ref={CurrentTime} id="current-time" className="time">
          0:00
        </span>
        <input
          ref={SeekSlider}
          onChange={SeekSliderChange}
          onInput={SeekSliderInput}
          type="range"
          id="seek-slider"
          max="100"
        />
        <span ref={DurationContainer} id="duration" className="time">
          0:00
        </span>
      </PlayerContainer>
      <VolumeContainer>
        <output ref={VolumeOutput} id="volume-output">
          100
        </output>
        <input
          ref={VolumeSlider}
          onInput={VolumeSliderInput}
          type="range"
          id="volume-slider"
          max="100"
        />
        <button onClick={Mute} id="mute-icon"></button>
      </VolumeContainer>
    </AudioContainer>
  );
}

export default AudioPlayer;
