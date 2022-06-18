import { Component, HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import NavPanel from '../NavPanel/NavPanel';


function FFooter(props: HTMLAttributes<typeof Container>) {
    return (
        <Container className={props.className}></Container>
    );
}

const Footer = styled(FFooter)`
    border-top: 1px solid var(--hblue-bg-color);
    background-color: var(--light-bg-color);
    min-height: 80px;
    width: 100%;
`;

export default Footer;


