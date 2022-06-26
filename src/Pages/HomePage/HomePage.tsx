import Body from "./Body";
import Header from "./Header";
import { PageContainer } from "./style";

const HomePage: React.FC = () => {
  return (
    <PageContainer>
      <Header></Header>
      <Body></Body>
    </PageContainer>
  );
};

export default HomePage;
