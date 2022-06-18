import { Component, HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import Container from '../Container/Container';
import HomeBody from '../HomeBody/HomeBody';
import HomeHeader from '../HomeHeader/HomeHeader';
import Logo from '../Logo/Logo';
import NavPanel from '../NavPanel/NavPanel';


function FHomePage(props: HTMLAttributes<typeof Container>) {
    return (
        <Container className={props.className}>
            <HomeHeader></HomeHeader>
        </Container>
    );
}

const HomePage = styled(FHomePage)`
    flex-direction: column;
    width: 100%;
    height: 100%;
    user-select: none;
`;

export default HomePage;


