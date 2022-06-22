import styled from "styled-components";
import { PlayList as PlayListType } from "../../App";
import PlayList from "../PlayList/PlayList";

interface Props {
  playList: PlayListType;
  onTrackClick: (id: number) => void;
}

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
`;

const BodyMainContainer = styled.div`
  display: flex;
  padding: 10px 0;
  width: 100%;
  height: 100%;
`;

const PlaylistPageBody: React.FC<Props> = ({ playList, onTrackClick }) => {
  return (
    <BodyMainContainer>
      <BodyContainer>
        <PlayList onTrackClick={onTrackClick} playList={playList} />
      </BodyContainer>
    </BodyMainContainer>
  );
};

export default PlaylistPageBody;
