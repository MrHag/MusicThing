import styled from "styled-components";
import { Track } from "../../App";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

interface FnProps {
  track?: Track;
}

const FContainer = styled.div`
  display: flex;
  border-top: 1px solid var(--hblue-bg-color);
  background-color: var(--light-bg-color);
  min-height: 80px;
  width: 100%;
`;

function Footer(props: FnProps) {
  const track = props.track;
  return (
    <FContainer>
      <AudioPlayer track={track}></AudioPlayer>
    </FContainer>
  );
}

export default Footer;
