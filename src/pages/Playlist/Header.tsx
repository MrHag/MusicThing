import Text from "components/Text/Text";
import { useAppSelector } from "hooks";
import { selectPlaylist } from "store/PlaylistSlice";
import {
  HeaderContainer,
  HeaderInnerContainer,
  Poster,
  TextContainer,
  HeadText,
} from "./style";

const Header: React.FC = () => {
  const playlist = useAppSelector(selectPlaylist);

  return (
    <HeaderContainer>
      <HeaderInnerContainer>
        <Poster src={playlist?.image} />
        <TextContainer>
          <HeadText>{playlist?.name}</HeadText>
          <Text>{playlist?.tracks.length} tracks</Text>
        </TextContainer>
      </HeaderInnerContainer>
    </HeaderContainer>
  );
};

export default Header;
