import styled from "styled-components";
import { Track } from "types";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

interface Props {
  track?: Track;
}

const Container = styled.div`
  display: flex;
  border-top: 1px solid var(--hblue-bg-color);
  background-color: var(--light-bg-color);
  width: 100%;
`;

const Footer: React.FC<Props> = ({ track }) => {
  return (
    <Container>
      <AudioPlayer track={track}></AudioPlayer>
    </Container>
  );
};

export default Footer;
