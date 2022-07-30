import { Container } from "./style";
import Text from "components/Text/Text";
import { useBaseWindow } from "components/AppWindow/useBaseWindow";
import { useCallback, useContext, useEffect, useState } from "react";
import { PlaceholderContext } from "./PlaceholderContext";

const Placeholder: React.FC = () => {
  const [placeholder] = useContext(PlaceholderContext);
  const [, setWindow, Position, setPosition] = useBaseWindow();
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
