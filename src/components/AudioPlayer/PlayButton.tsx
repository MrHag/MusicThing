import IconContainer from "../IconContainer/IconContainer";
import { PlayIcon, PauseIcon } from "./icons";

interface Props {
  onPlay: () => void;
  onPause: () => void;
  isPlaying: boolean;
  disabled: boolean;
}

const PlayButton: React.FC<Props> = ({
  onPlay,
  onPause,
  isPlaying,
  disabled,
}) => {
  return isPlaying ? (
    <IconContainer onClick={disabled ? undefined : onPause} disabled={disabled}>
      <PauseIcon />
    </IconContainer>
  ) : (
    <IconContainer onClick={disabled ? undefined : onPlay} disabled={disabled}>
      <PlayIcon />
    </IconContainer>
  );
};

export default PlayButton;
