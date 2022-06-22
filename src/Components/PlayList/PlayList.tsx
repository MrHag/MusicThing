import { Playlist as PlayListType } from "../../App";
import PlayListElem from "./PlayListElem/PlayListElem";
import Text from "../Text/Text";
import { PlayListContainer, GridHeader } from "./style";

interface Props {
  playList: PlayListType;
  onTrackClick: (id: number) => void;
}

const PlayList: React.FC<Props> = ({ playList, onTrackClick }) => {
  return (
    <PlayListContainer>
      <GridHeader>
        <Text>#</Text>
        <Text>Title</Text>
        <Text>Album</Text>
        <Text>Duration</Text>
      </GridHeader>
      {playList.tracks.map((track, index) => (
        <PlayListElem
          onTrackClick={onTrackClick}
          key={index}
          track={track}
          position={index + 1}
        ></PlayListElem>
      ))}
    </PlayListContainer>
  );
};

export default PlayList;
