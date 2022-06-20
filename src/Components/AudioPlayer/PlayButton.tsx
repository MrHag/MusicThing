import { PlayIcon } from "./style";

interface Props {
  onPlay: () => void;
  onPause: () => void;
  isPlaying: boolean;
}

const PlayButton: React.FC<Props> = ({ onPlay, onPause, isPlaying }) => {
  return isPlaying ? (
    <PlayIcon onClick={onPause}>||</PlayIcon>
  ) : (
    <PlayIcon onClick={onPlay}>{"=>"}</PlayIcon>
  );
};

export default PlayButton;
