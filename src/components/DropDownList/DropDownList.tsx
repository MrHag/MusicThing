import { useAppDispatch, useAppSelector } from "hooks";
import { useCallback, useEffect, useState } from "react";
import { selectDropDown, setDropDown } from "store/DropDownSlice";
import { Container, Elem } from "./style";
import Text from "components/Text/Text";
import { useBaseWindow } from "components/AppWindow/useBaseWindow";

const DropDownList: React.FC = () => {
  const dispatch = useAppDispatch();
  const dropDown = useAppSelector(selectDropDown);
  const [show, setShow] = useState(false);

  const [WindowElem, setWindowElem, Position, setPosition, deps] =
    useBaseWindow();

  const listCallback = useCallback((node: HTMLDivElement) => {
    setWindowElem(node);
  }, []);

  useEffect(() => {
    if (dropDown.elems.length !== 0) setShow(true);
  }, [dropDown.position]);

  useEffect(() => {
    if (show) {
      WindowElem?.focus();
      setPosition(dropDown.position);
    }
  }, [show]);

  useEffect(() => {
    setPosition(dropDown.position);
  }, [deps]);

  const elems = dropDown.elems.map(({ name, callback }, index) => {
    return (
      <Elem key={index} onClick={() => callback(index)}>
        <Text>{name}</Text>
      </Elem>
    );
  });

  return (
    <Container
      onBlur={() => {
        dispatch(setDropDown([]));
        setShow(false);
      }}
      show={show}
      ref={listCallback}
      style={{ top: Position.y, left: Position.x }}
      tabIndex={0}
    >
      {elems}
    </Container>
  );
};

export default DropDownList;
