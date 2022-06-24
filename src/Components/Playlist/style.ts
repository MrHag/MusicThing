import styled from "styled-components";

export const GridTemplate = styled.div`
  grid-template-columns: 34px 4fr 6fr [last] minmax(120px, 1fr);
`;

export const GridHeader = styled(GridTemplate)`
  display: grid;
  padding: 14px 0;

  & > :first-child {
    text-align: center;
  }
`;

export const PlaylistContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
