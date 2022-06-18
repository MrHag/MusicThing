import { HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import Container from '../Container/Container';
import Text from '../Text/Text';

interface FnProps<T> extends HTMLAttributes<T> {
    text: string
    navClick: () => void
}

function NElem(props: FnProps<HTMLDivElement>) {
    return (
        <Container onClick={props.navClick} className={props.className}>
            <Text>{props.text}</Text>
        </Container>
    );
}

const NavElem = styled(NElem)`
    width: 100%;
    padding: 8px 0;

    &:hover * {
        color: var(--active-text-color);
    }
`;

export default NavElem;
