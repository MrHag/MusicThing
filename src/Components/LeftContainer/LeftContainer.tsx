import { Component, HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import NavPanel from '../NavPanel/NavPanel';

interface FnProps<T> extends HTMLAttributes<T> {
    navClick: (message: string) => void;
}

function LContainer(props: FnProps<HTMLDivElement>) {
    return (
        <Container className={props.className}>
            <Logo></Logo>
            <NavPanel navClick={props.navClick}></NavPanel>
        </Container>
    );
}

const LeftContainer = styled(LContainer)`
    flex-direction: column;
    background-color: var(--primary-bg-color);
    min-width: 350px;
    height: 100%;
    padding-left: 30px;
    user-select: none;
`;

export default LeftContainer;


