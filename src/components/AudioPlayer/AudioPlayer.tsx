import { Track } from "types";
import React, { useEffect, useRef, useState } from "react";
import {
  VolumeContainer,
  PlayerContainer,
  AudioContainer,
  Output,
  VolumeSlider,
  SeekSlider,
} from "./style";
import PlayButton from "./PlayButton";
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

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [trackDuration, setTrackDuration] = useState(0);
  const [seek, setSeek] = useState(0);
  const [volume, setVolume] = useState(100);

  const play = () => {
    if (!audio.current) return;

    audio.current.play();
    raf.current = requestAnimationFrame(whilePlaying);
    setIsPlaying(true);
  };

  const pause = () => {
    if (!audio.current) return;

    audio.current.pause();
    cancelAnimationFrame(raf.current);
    setIsPlaying(false);
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

  const onCanPlay = () => {
    play();
    displayBufferedAmount();
  };

  const onDurationChange = () => {
    if (audio.current) {
      setTrackDuration(audio.current.duration);
    }
  };

  const onAudioProgress = () => displayBufferedAmount();

  const onSeekSliderInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeek(Number(e.target.value));
    cancelAnimationFrame(raf.current);
  };

  const onClick = () => {
    cancelAnimationFrame(raf.current);
  };

  let onSeekSliderChange = (e: Event) => {
    if (e.currentTarget && e.currentTarget instanceof HTMLInputElement) {
      const value = Number(e.currentTarget.value);
      if (audio.current != null) audio.current.currentTime = value;
      setSeek(value);
      if (isPlaying) {
        raf.current = requestAnimationFrame(whilePlaying);
      }
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
        `${trackDuration && (seek / trackDuration) * 100}%`
      );
    }
  }, [seek, trackDuration]);

  const maxVolume = 100;
  useEffect(() => {
    if (audioCont.current) {
      audioCont.current.style.setProperty(
        "--volume-before-width",
        `${maxVolume && (volume / maxVolume) * 100}%`
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
          onCanPlay={onCanPlay}
          onDurationChange={onDurationChange}
          onEnded={pause}
          src={trackLink}
          preload="metadata"
        ></audio>
        <PlayButton
          onPlay={play}
          onPause={pause}
          isPlaying={isPlaying}
          disabled={trackLink === ""}
        />
        <Output>{calculateTime(seek)}</Output>
        <SeekSlider
          onChange={onSeekSliderChange}
          onInput={onSeekSliderInput}
          onClick={onClick}
          disabled={trackLink === ""}
          type="range"
          value={seek}
          max={Math.floor(trackDuration)}
        />
        <Output>{calculateTime(trackDuration)}</Output>
      </PlayerContainer>
      <VolumeContainer>
        <MuteButton onClick={onMuteBtnClick} isMuted={isMuted} />
        <VolumeSlider
          onInput={onVolumeChange}
          value={volume}
          type="range"
          max={maxVolume}
        />
        <Output>{volume}</Output>
      </VolumeContainer>
    </AudioContainer>
  );
};

export default AudioPlayer;
