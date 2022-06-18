import { HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import Container from '../Container/Container';
import NavElem from '../NavElem/NavElem';

interface FnProps<T> extends HTMLAttributes<T> {
    navClick: (message: string) => void;
}

function NPanel(props: FnProps<HTMLDivElement>) {
    return (
        <Container className={props.className}>
            <NavElem text="Buttn" navClick={() => { props.navClick("1") }}></NavElem>
            <NavElem text="Buttn" navClick={() => { props.navClick("2") }}></NavElem>
            <NavElem text="Buttn" navClick={() => { props.navClick("3") }}></NavElem>
        </Container>
    );
}

const NavPanel = styled(NPanel)`
    flex-direction: column;
    width: 100%;
    padding: 8px 0;
    text-align: center;
    border-top: 1px solid var(--blue-bg-color);
    border-bottom: 1px solid var(--blue-bg-color);
`;

export default NavPanel;
