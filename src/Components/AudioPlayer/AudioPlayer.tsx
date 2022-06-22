import { Track } from "../../App";
import React, { useRef, useState } from "react";
import {
  VolumeContainer,
  PlayerContainer,
  AudioContainer,
  Time,
  VolumeSlider,
  SeekSlider,
} from "./style";
import PlayButton from "./PlayButton";
import { ClassicInput } from "../ClassicInput/ClassicInput";
import MuteButton from "./MuteButton";

const calculateTime = (secs: number) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
};

interface Props {
  track?: Track;
}

const AudioPlayer: React.FC<Props> = ({ track }) => {
  const trackLink = track ? track.track : "";

  const raf = useRef(0);

  const AudioCont = useRef<HTMLDivElement>(null);
  const Audio = useRef<HTMLAudioElement>(null);
  const SeekSlid = useRef<ClassicInput>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [trackDuration, setTrackDuration] = useState(0);
  const [seek, setSeek] = useState(0);
  const [volume, setVolume] = useState(100);

  const play = () => {
    if (!Audio.current) return;

    if (isPlaying) {
      pause();
    }

    Audio.current.play();
    raf.current = requestAnimationFrame(whilePlaying);

    setIsPlaying(true);
  };

  const pause = () => {
    if (Audio.current) {
      Audio.current.pause();
      cancelAnimationFrame(raf.current);
      setIsPlaying(false);
    }
  };
  const onMute = () => setIsMuted(true);
  const onUnMute = () => setIsMuted(false);

  const whilePlaying = () => {
    if (!Audio.current) return;
    setSeek(Math.floor(Audio.current.currentTime));
    raf.current = requestAnimationFrame(whilePlaying);
  };

  const displayBufferedAmount = () => {
    if (!Audio.current || !AudioCont.current) return;

    const buff = Audio.current.buffered;
    const bufferedAmount = Math.floor(buff.end(buff.length - 1));
    AudioCont.current.style.setProperty(
      "--buffered-width",
      `${(bufferedAmount / trackDuration) * 100}%`
    );
  };

  const onMetaDataLoaded = () => {
    play();
    if (Audio.current) {
      setTrackDuration(Audio.current.duration);
    }
    displayBufferedAmount();
  };

  const onAudioProgress = () => displayBufferedAmount();

  const onSeekSliderInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeek(Number(e.target.value));
    cancelAnimationFrame(raf.current);
  };

  const onSeekSliderChange = (e: Event) => {
    if (!e.currentTarget) return;
    const value = Number((e.currentTarget as any).value);
    if (Audio.current != null) Audio.current.currentTime = value;
    setSeek(value);
    raf.current = requestAnimationFrame(whilePlaying);
  };

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (Audio.current != null) Audio.current.volume = value / 100;
    setVolume(value);
  };

  const maxVolume = 100;
  const seekBeforeWidth = (seek / trackDuration) * 100;
  const volumeBeforeWidth = (volume / maxVolume) * 100;

  return (
    <AudioContainer
      ref={AudioCont}
      id="audio-player-container"
      seekBeforeWidth={seekBeforeWidth}
      volumeBeforeWidth={volumeBeforeWidth}
    >
      <PlayerContainer>
        <audio
          onProgress={onAudioProgress}
          ref={Audio}
          muted={isMuted}
          onLoadedMetadata={onMetaDataLoaded}
          src={trackLink}
          preload="metadata"
          loop
        ></audio>
        <PlayButton
          onPlay={play}
          onPause={pause}
          isPlaying={isPlaying}
          disabled={trackLink === ""}
        />
        <Time>{calculateTime(seek)}</Time>
        <SeekSlider
          ref={SeekSlid}
          onChange={onSeekSliderChange}
          onInput={onSeekSliderInput}
          disabled={trackLink === ""}
          type="range"
          value={seek}
          max={trackDuration}
        />
        <Time>{calculateTime(trackDuration)}</Time>
      </PlayerContainer>
      <VolumeContainer>
        <MuteButton
          onMute={onMute}
          onUnMute={onUnMute}
          isMuted={isMuted}
        ></MuteButton>
        <VolumeSlider
          onInput={onVolumeChange}
          value={volume}
          type="range"
          max={maxVolume}
        />
        <output>{volume}</output>
      </VolumeContainer>
    </AudioContainer>
  );
};

export default AudioPlayer;
