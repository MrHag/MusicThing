import AddMusicPageBody from "./Body";
import HomeHeader from "./Header";
import { PageContainer } from "./style";

const AddMusic: React.FC = () => {
  return (
    <PageContainer>
      <HomeHeader />
      <AddMusicPageBody />
    </PageContainer>
  );
};

export default AddMusic;
