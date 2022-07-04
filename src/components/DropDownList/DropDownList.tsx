import { useAppDispatch, useAppSelector } from "hooks";
import { useCallback, useEffect, useState } from "react";
import { selectDropDown, setDropDown } from "store/DropDownSlice";
import { Container, Elem } from "./style";
import Text from "components/Text/Text";

const DropDownList: React.FC = () => {
  const dispatch = useAppDispatch();
  const DropDown = useAppSelector(selectDropDown);
  const [List, setList] = useState<HTMLDivElement>();

  const callb = useCallback((node: HTMLDivElement) => {
    setList(node);
  }, []);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const detectSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowSize]);

  useEffect(() => {
    if (DropDown.elems.length != 0) List?.focus();
  }, [position]);

  useEffect(() => {
    let pos = DropDown.position;
    let objrect = List?.getBoundingClientRect();
    if (!objrect) return;
    let rect = {
      top: pos.y,
      left: pos.x,
      bottom: pos.y + objrect.height,
      right: pos.x + objrect.width,
    };
    let x = rect.left;
    let y = rect.top;

    if (rect.right > windowSize.width)
      x = windowSize.width - objrect.width - 10;
    else if (rect.left < 0) x = 0;

    if (rect.bottom > windowSize.height)
      y = windowSize.height - objrect.height - 10;
    else if (rect.top < 0) y = 0;

    setPosition({ x: x, y: y });
  }, [DropDown.position, windowSize]);

  const elems = DropDown.elems.map(({ name, callback }, index) => {
    return (
      <Elem key={index} onClick={() => callback(index)}>
        <Text>{name}</Text>
      </Elem>
    );
  });

  return (
    <Container
      onBlur={(e) => {
        dispatch(setDropDown([]));
        setPosition({ x: 0, y: -100 });
      }}
      ref={callb}
      style={{ top: position.y, left: position.x }}
      tabIndex={0}
    >
      {elems}
    </Container>
  );
};

export default DropDownList;
