import styled from "styled-components";

export const Body = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  font-family: "Gill Sans", sans-serif;
`;

export const MainContainer = styled.div`
  display: flex;
  background-color: var(--secondary-bg-color);
  width: 100%;
  height: 100%;
`;

export const TopContainer = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
`;

export const BottomContainer = styled.div`
  display: flex;
  min-height: 80px;
  height: 80px;
`;
