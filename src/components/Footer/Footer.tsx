import styled from "styled-components";
import { Track } from "types";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

const Container = styled.footer`
  display: flex;
  border-top: 1px solid var(--hblue-bg-color);
  background-color: var(--light-bg-color);
  width: 100%;
`;

const Footer: React.FC = () => {
  return (
    <Container>
      <AudioPlayer />
    </Container>
  );
};

export default Footer;
