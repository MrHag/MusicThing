import IconContainer from "../IconContainer/IconContainer";
import { VolumeIcon, MuteVolumeIcon } from "./icons";

interface Props {
  onClick: () => void;
  isMuted: boolean;
}

const MuteButton: React.FC<Props> = ({ onClick, isMuted }) => {
  return isMuted ? (
    <IconContainer onClick={onClick} disabled={true}>
      <MuteVolumeIcon />
    </IconContainer>
  ) : (
    <IconContainer onClick={onClick} disabled={false}>
      <VolumeIcon />
    </IconContainer>
  );
};

export default MuteButton;
