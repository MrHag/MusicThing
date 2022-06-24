import { Track } from "../../App";
import React, { useEffect, useRef, useState } from "react";
import {
  VolumeContainer,
  PlayerContainer,
  AudioContainer,
  Time,
  VolumeSlider,
  SeekSlider,
} from "./style";
import PlayButton from "./PlayButton";
import ClassicInput from "../ClassicInput/ClassicInput";
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

  const audioCont = useRef<HTMLDivElement>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const seekSlider = useRef<ClassicInput>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [trackDuration, setTrackDuration] = useState(0);
  const [seek, setSeek] = useState(0);
  const [volume, setVolume] = useState(100);

  const play = () => {
    if (!audio.current) return;

    if (isPlaying) {
      pause();
    }

    audio.current.play();
    raf.current = requestAnimationFrame(whilePlaying);

    setIsPlaying(true);
  };

  const pause = () => {
    if (audio.current) {
      audio.current.pause();
      cancelAnimationFrame(raf.current);
      setIsPlaying(false);
    }
  };

  const onMuteBtnClick = () => setIsMuted(!isMuted);

  const whilePlaying = () => {
    if (!audio.current) return;
    setSeek(Math.floor(audio.current.currentTime));
    raf.current = requestAnimationFrame(whilePlaying);
  };

  const displayBufferedAmount = () => {
    if (audio.current && audioCont.current) {
      const buff = audio.current.buffered;
      const bufferedAmount = Math.floor(buff.end(buff.length - 1));
      audioCont.current.style.setProperty(
        "--buffered-width",
        `${(bufferedAmount / trackDuration) * 100}%`
      );
    }
  };

  const onMetaDataLoaded = () => {
    play();
    if (audio.current) {
      setTrackDuration(audio.current.duration);
    }
    displayBufferedAmount();
  };

  const onAudioProgress = () => displayBufferedAmount();

  const onSeekSliderInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeek(Number(e.target.value));
    cancelAnimationFrame(raf.current);
  };

  const onSeekSliderChange = (e: Event) => {
    if (e.currentTarget && e.currentTarget instanceof HTMLInputElement) {
      const value = Number(e.currentTarget.value);
      if (audio.current != null) audio.current.currentTime = value;
      setSeek(value);
      raf.current = requestAnimationFrame(whilePlaying);
    }
  };

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (audio.current != null) audio.current.volume = value / 100;
    setVolume(value);
  };

  useEffect(() => {
    if (audioCont.current) {
      audioCont.current.style.setProperty(
        "--seek-before-width",
        `${(seek / trackDuration) * 100}%`
      );
    }
  }, [seek, trackDuration]);

  const maxVolume = 100;
  useEffect(() => {
    if (audioCont.current) {
      audioCont.current.style.setProperty(
        "--volume-before-width",
        `${(volume / maxVolume) * 100}%`
      );
    }
  }, [volume, audioCont]);

  return (
    <AudioContainer ref={audioCont} id="audio-player-container">
      <PlayerContainer>
        <audio
          onProgress={onAudioProgress}
          ref={audio}
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
          ref={seekSlider}
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
        <MuteButton onClick={onMuteBtnClick} isMuted={isMuted}></MuteButton>
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
