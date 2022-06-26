import Text from "components/Text/Text";
import { Playlist } from "types";
import {
  HeaderContainer,
  HeaderInnerContainer,
  Poster,
  TextContainer,
  HeadText,
} from "./style";

interface Props {
  playlist: Playlist;
}

const Header: React.FC<Props> = ({ playlist }) => {
  return (
    <HeaderContainer>
      <HeaderInnerContainer>
        <Poster src={playlist.image}></Poster>
        <TextContainer>
          <HeadText>{playlist.name}</HeadText>
          <Text>{playlist.tracks.length} tracks</Text>
        </TextContainer>
      </HeaderInnerContainer>
    </HeaderContainer>
  );
};

export default Header;
