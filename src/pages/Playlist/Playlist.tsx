import Body from "./Body";
import Header from "./Header";
import { PageContainer } from "./style";
import { playlists } from "layout/fakeData";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "hooks";
import { setPlaylist } from "store/PlaylistSlice";
import { useEffect } from "react";

const PlaylistPage: React.FC = () => {
  let { id } = useParams();
  const playlist = playlists[Number(id)];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPlaylist(playlist));
  });

  return (
    <PageContainer>
      <Header />
      <Body />
    </PageContainer>
  );
};

export default PlaylistPage;
