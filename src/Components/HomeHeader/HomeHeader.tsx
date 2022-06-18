import { Component, HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import NavPanel from '../NavPanel/NavPanel';
import Image from '../Image/Image';
import logo from '../../logo.svg';

const HeaderImage = styled(Image)`
    width: 20%;
    min-width: 150px;
`;

const HomeContainer = styled(Container)`
    width: 70%;
    margin: 0 auto;
`;

function FHomeHeader(props: HTMLAttributes<typeof Container>) {
    return (
        <Container className={props.className}>
            <HomeContainer>
                <HeaderImage src={logo}></HeaderImage>
                <Logo></Logo>
            </HomeContainer>
        </Container>
    );
}

const HomeHeader = styled(FHomeHeader)`
    background-color: var(--light-bg-color);
    width: 100%;
    height: 180px;
    margin: 0 auto;
`;

export default HomeHeader;


