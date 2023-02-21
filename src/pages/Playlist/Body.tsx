import Playlist from "components/Playlist/Playlist";
import { BodyContainer, BodyInnerContainer } from "./style";

const Body: React.FC = () => {
  return (
    <BodyContainer>
      <BodyInnerContainer>
        <Playlist />
      </BodyInnerContainer>
    </BodyContainer>
  );
};

export default Body;
