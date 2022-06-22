import styled from "styled-components";
import { GridTemplate } from "./sharedstyle";

export const GridHeader = styled(GridTemplate)`
  display: grid;
  padding: 14px 0;

  & > :first-child{
    text-align: center;
  }
`;

export const PlayListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;