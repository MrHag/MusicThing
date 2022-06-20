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
  const SeekSlid = useRef<HTMLInputElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [trackDuration, setTrackDuration] = useState(0);
  const [seek, setSeek] = useState(0);
  const [volume, setVolume] = useState(100);

  const play = () => {
    if (Audio.current == null) return;

    if (isPlaying) {
      pause();
    }

    Audio.current.play();
    raf.current = requestAnimationFrame(whilePlaying);

    setIsPlaying(true);
  };

  const pause = () => {
    if (Audio.current != null) {
      Audio.current.pause();
      cancelAnimationFrame(raf.current);
      setIsPlaying(false);
    }
  };
  const onMute = () => setIsMuted(!isMuted);

  const whilePlaying = () => {
    if (Audio.current == null) {
      return;
    }
    setSeek(Math.floor(Audio.current.currentTime));
    raf.current = requestAnimationFrame(whilePlaying);
  };

  const displayBufferedAmount = () => {
    if (Audio.current == null || AudioCont.current == null) return;

    const buff = Audio.current.buffered;
    const bufferedAmount = Math.floor(buff.end(buff.length - 1));
    AudioCont.current.style.setProperty(
      "--buffered-width",
      `${(bufferedAmount / trackDuration) * 100}%`
    );
  };

  const onMetaDataLoaded = () => {
    play();
    if (Audio.current != null) {
      setTrackDuration(Audio.current.duration);
    }
    displayBufferedAmount();
  };

  const onAudioProgress = () => displayBufferedAmount();
  const onSeekSliderInput = (e: any) => setSeek(e.target.value);

  const onSeekSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (Audio.current != null) Audio.current.currentTime = value;
    setSeek(value);
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
        <PlayButton onPlay={play} onPause={pause} isPlaying={isPlaying} />
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
        <output>{volume}</output>
        <VolumeSlider
          onInput={onVolumeChange}
          value={volume}
          type="range"
          max={maxVolume}
        />
        <button onClick={onMute} id="mute-icon"></button>
      </VolumeContainer>
    </AudioContainer>
  );
};

export default AudioPlayer;
