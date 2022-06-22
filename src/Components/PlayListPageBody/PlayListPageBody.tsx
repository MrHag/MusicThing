import styled from "styled-components";
import { PlayList as PlayListType } from "../../App";
import PlayList from "../PlayList/PlayList";

interface FnProps {
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

function PlayListPageBody(props: FnProps) {
  return (
    <BodyMainContainer>
      <BodyContainer>
        <PlayList onTrackClick={props.onTrackClick} playList={props.playList} />
      </BodyContainer>
    </BodyMainContainer>
  );
}

export default PlayListPageBody;
