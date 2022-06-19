import styled from "styled-components";
import { PlayList } from "../../App";
import PlayListGrid from "../PlayListGrid/PlayListGrid";
import Text from "../Text/Text";

interface FnProps {
  playList: PlayList;
}

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  /* TODO: How to fix this? */
  height: 0;
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
        <PlayListGrid playList={props.playList} />
      </BodyContainer>
    </BodyMainContainer>
  );
}

export default PlayListPageBody;
