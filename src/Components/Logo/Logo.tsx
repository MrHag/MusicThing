import { ReactNode } from 'react';
import styled from 'styled-components';
import Container from '../Container/Container';
import Text from '../Text/Text';

const LogoText = styled(Text)`
    font-size: 40pt;
    font-family: "Gill Sans", sans-serif;
`;

function FLogo(props: any) {
    return (
        <Container className={props.className}>
            <LogoText>MusicThing</LogoText>
        </Container>
    );
}

const Logo = styled(FLogo)`
    margin: 20px 0;
    align-items: center;
`;

export default Logo;
