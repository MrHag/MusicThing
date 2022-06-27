import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--primary-bg-color);
  min-width: 230px;
  height: 100%;
  padding: 0 30px;
  user-select: none;
`;

export const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px 0;
  text-align: center;
  border-top: 1px solid var(--blue-bg-color);
  border-bottom: 1px solid var(--blue-bg-color);
`;

export const PlaylistPanelContainer = styled(PanelContainer)`
  border-top: unset;
`;

export const NavContainer = styled(NavLink)`
  display: flex;
  width: 100%;
  padding: 8px 0;
  text-decoration: none;

  &.active * {
    color: var(--active-text-color);
  }

  &:hover * {
    color: var(--active-text-color);
  }
`;
