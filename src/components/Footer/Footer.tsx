import styled from "styled-components";
import { Track } from "types";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

const Container = styled.footer`
  display: flex;
  border-top: 1px solid var(--hblue-bg-color);
  background-color: var(--light-bg-color);
  width: 100%;
`;

interface Props {
  track?: Track;
}

const Footer: React.FC<Props> = ({ track }) => {
  return (
    <Container>
      <AudioPlayer track={track} />
    </Container>
  );
};

export default Footer;
