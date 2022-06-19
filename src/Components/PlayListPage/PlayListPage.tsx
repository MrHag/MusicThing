import styled from "styled-components";
import { PlayList } from "../../App";
import HomeBody from "../HomeBody/HomeBody";
import HomeHeader from "../HomeHeader/HomeHeader";
import PlayListPageBody from "../PlayListPageBody/PlayListPageBody";
import PlayListPageHeader from "../PlayListPageHeader/PlayListPageHeader";

interface FnProps {
  playList: PlayList;
}

const PlayListC = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  user-select: none;
  overflow-y: scroll;
`;

function PlayListPage(props: FnProps) {
  return (
    <PlayListC>
      <PlayListPageHeader playList={props.playList}></PlayListPageHeader>
      <PlayListPageBody playList={props.playList}></PlayListPageBody>
    </PlayListC>
  );
}

export default PlayListPage;
