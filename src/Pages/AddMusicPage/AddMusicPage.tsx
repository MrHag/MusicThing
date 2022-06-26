import AddMusicPageBody from "./Body";
import HomeHeader from "./Header";
import { PageContainer } from "./style";

const AddMusicPage: React.FC = () => {
  return (
    <PageContainer>
      <HomeHeader></HomeHeader>
      <AddMusicPageBody></AddMusicPageBody>
    </PageContainer>
  );
};

export default AddMusicPage;
