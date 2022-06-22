import IconContainer from "./IconContainer";
import { VolumeIcon, MuteVolumeIcon } from "./icons";

interface Props {
  onMute: () => void;
  onUnMute: () => void;
  isMuted: boolean;
}

const MuteButton: React.FC<Props> = ({ onMute, onUnMute, isMuted }) => {
  return isMuted ? (
    <IconContainer onClick={onUnMute} disabled={true}>
      <MuteVolumeIcon />
    </IconContainer>
  ) : (
    <IconContainer onClick={onMute} disabled={false}>
      <VolumeIcon />
    </IconContainer>
  );
};

export default MuteButton;
