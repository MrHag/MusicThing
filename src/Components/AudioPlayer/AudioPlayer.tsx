import { Track } from "../../App";
import React, { useEffect, useRef, useState } from "react";
import {
  PlayIcon,
  VolumeContainer,
  PlayerContainer,
  AudioContainer,
  Time,
  VolumeSlider,
} from "./style";

interface Props {
  track?: Track;
}

const AudioPlayer: React.FC<Props> = ({ track }) => {
  const trackLink = track ? track.track : "";

  let raf: number = 0;

  const AudioCont = useRef<HTMLDivElement>(null);
  const Audio = useRef<HTMLAudioElement>(null);
  const VolumeOutput = useRef<HTMLOutputElement>(null);
  const CurrentTime = useRef<HTMLSpanElement>(null);
  const volumeSlider = useRef<HTMLInputElement>(null);
  const SeekSlider = useRef<HTMLInputElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [trackDuration, setTrackDuration] = useState(0);
  const [seek, setSeek] = useState(0);
  const [volume, setVolume] = useState(100);

  const Play = () => {
    if (Audio.current == null) return;

    if (isPlaying) {
      Audio.current.pause();
      cancelAnimationFrame(raf);
    } else {
      Audio.current.play();
      raf = requestAnimationFrame(whilePlaying);
    }

    setIsPlaying(!isPlaying);
  };

  const Mute = () => {
    if (Audio.current == null) return;
    Audio.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  /*useEffect(() => {
    if (SeekSlider.current != null) SeekSlider.current.value = "0";
    if (VolumeSlider.current != null) VolumeSlider.current.value = "100";
  });*/

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

  const LoadedMetaData = () => {
    Play();
    if (Audio.current != null) {
      setTrackDuration(Audio.current.duration);
    }
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

  const SeekSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (Audio.current != null) Audio.current.currentTime = value;
    setSeek(value);
  };

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (Audio.current != null) Audio.current.volume = value / 100;
    setVolume(value);

    const rangeMax = e.target.max;

    /*AudioCont.current.style.setProperty(
        "--volume-before-width",
        (rangeInput.value / rangeInput.max) * 100 + "%"
      );*/
    showRangeProgress(e.target);
  };

  return (
    <AudioContainer ref={AudioCont} id="audio-player-container">
      <PlayerContainer>
        <audio
          onProgress={AudioProgress}
          ref={Audio}
          onLoadedMetadata={LoadedMetaData}
          src={trackLink}
          preload="metadata"
          loop
        ></audio>
        <button onClick={Play} id="play-icon">
          <PlayIcon>▷</PlayIcon>
        </button>
        <Time ref={CurrentTime}>{calculateTime(seek)}</Time>
        <input
          ref={SeekSlider}
          onChange={SeekSliderChange}
          onInput={SeekSliderInput}
          disabled={trackLink === ""}
          type="range"
          id="seek-slider"
          max={trackDuration}
        />
        <Time>{calculateTime(trackDuration)}</Time>
      </PlayerContainer>
      <VolumeContainer>
        <output ref={VolumeOutput} id="volume-output">
          {volume}
        </output>
        <VolumeSlider
          ref={volumeSlider}
          onInput={onVolumeChange}
          value={volume}
          type="range"
          id="volume-slider"
          max="100"
        />
        <button onClick={Mute} id="mute-icon"></button>
      </VolumeContainer>
    </AudioContainer>
  );
};

export default AudioPlayer;