import styled from "styled-components";
import HomeBody from "../HomeBody/HomeBody";
import HomeHeader from "../HomeHeader/HomeHeader";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  user-select: none;
  overflow-y: scroll;
`;

const HomePage: React.FC = () => {
  return (
    <Container>
      <HomeHeader></HomeHeader>
      <HomeBody></HomeBody>
    </Container>
  );
};

export default HomePage;
