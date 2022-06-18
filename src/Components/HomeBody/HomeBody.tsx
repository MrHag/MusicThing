import { Component, HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import NavPanel from '../NavPanel/NavPanel';
import Image from '../Image/Image';
import logo from '../../logo.svg';
import Text from '../Text/Text';

const BodyContainer = styled(Container)`
    flex-direction: column;
    width: 70%;
    margin: 0 auto;
`;

const TitleText = styled(Text)`
    font-size: 34px;
`;

function FHomeBody(props: HTMLAttributes<typeof Container>) {
    return (
        <Container className={props.className}>
            <BodyContainer>
                <TitleText>TEXT</TitleText>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tincidunt, magna eu gravida tempus, erat massa dictum justo, vitae accumsan purus leo eu sem. Quisque rhoncus nunc et ipsum elementum, sed lacinia felis aliquet. Quisque ut vestibulum lectus, at pulvinar neque. Mauris sed diam nibh. Phasellus quis venenatis mi. Duis eget hendrerit lectus, at sodales lacus. Nullam convallis, nunc et vulputate sagittis, magna urna tincidunt leo, vel aliquam orci mauris nec turpis. Aenean quis diam faucibus, efficitur lectus ac, luctus nibh. Suspendisse purus libero, interdum sed malesuada eget, scelerisque in libero.</Text>
            </BodyContainer>
        </Container>
    );
}

const HomeBody = styled(FHomeBody)`
    padding: 30px 0;
    width: 100%;
    height: 100%;
`;

export default HomeBody;
