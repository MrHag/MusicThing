import { Container } from "./style";
import Text from "components/Text/Text";
import { useAppSelector } from "hooks";
import { selectPlaceholder, setPlaceholder } from "store/PlaceholderSlice";
import { useIntWindow } from "components/IntWindow/IntWindow";
import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";

const Placeholder: React.FC = () => {
  const placeholder = useAppSelector(selectPlaceholder);
  const [Window, setWindow, Position, setPosition, deps] = useIntWindow();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setPosition(placeholder.position);
  }, [placeholder.position]);

  useEffect(() => {
    setShow(placeholder.text !== "");
  }, [placeholder.text]);

  const refCallback = useCallback((node: HTMLDivElement) => {
    setWindow(node);
  }, []);

  return (
    <Container
      show={show}
      style={{ top: Position.y, left: Position.x }}
      ref={refCallback}
      id="placeholder"
    >
      <Text>{placeholder.text}</Text>
    </Container>
  );
};

export default Placeholder;
