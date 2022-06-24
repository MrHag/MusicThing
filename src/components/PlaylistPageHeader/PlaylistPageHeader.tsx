import styled from "styled-components";
import Text from "../Text/Text";
import { Playlist } from "../../types";

const PlaylistImage = styled.img`
  width: 20%;
  min-width: 150px;
`;

const PlaylistContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 auto;
`;

const PlaylistMainContainer = styled.div`
  display: flex;
  background-color: var(--light-bg-color);
  width: 100%;
  height: 180px;
  max-height: 180px;
  margin: 0 auto;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const HeadText = styled(Text)`
  font-size: 38pt;
`;

interface Props {
  playlist: Playlist;
}

const PlaylistPageHeader: React.FC<Props> = ({ playlist }) => {
  return (
    <PlaylistMainContainer>
      <PlaylistContainer>
        <PlaylistImage src={playlist.image}></PlaylistImage>
        <TextContainer>
          <HeadText>{playlist.name}</HeadText>
          <Text>{playlist.tracks.length} tracks</Text>
        </TextContainer>
      </PlaylistContainer>
    </PlaylistMainContainer>
  );
};

export default PlaylistPageHeader;
