import { useAppDispatch, useAppSelector } from "hooks";
import { useCallback, useEffect, useState } from "react";
import { selectDropDown, setDropDown } from "store/DropDownSlice";
import { Container, Elem } from "./style";
import Text from "components/Text/Text";

const DropDownList: React.FC = () => {
  const dispatch = useAppDispatch();
  const dropDown = useAppSelector(selectDropDown);
  const [list, setList] = useState<HTMLDivElement>();
  const [show, setShow] = useState(false);

  const listCallback = useCallback((node: HTMLDivElement) => {
    setList(node);
  }, []);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const onWindowResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, [windowSize]);

  useEffect(() => {
    if (dropDown.elems.length != 0) setShow(true);
  }, [dropDown.position]);

  useEffect(() => {
    if (show) list?.focus();
  }, [show]);

  useEffect(() => {
    let pos = dropDown.position;
    let rect = list?.getBoundingClientRect();
    if (!rect) return;
    let newrect = {
      top: pos.y,
      left: pos.x,
      bottom: pos.y + rect.height,
      right: pos.x + rect.width,
    };
    let x = newrect.left;
    let y = newrect.top;

    if (newrect.right > windowSize.width) x = windowSize.width - rect.width;
    else if (newrect.left < 0) x = 0;

    if (newrect.bottom > windowSize.height) y = windowSize.height - rect.height;
    else if (newrect.top < 0) y = 0;

    setPosition({ x: x, y: y });
  }, [show, windowSize]);

  const elems = dropDown.elems.map(({ name, callback }, index) => {
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
        setShow(false);
      }}
      show={show}
      ref={listCallback}
      style={{ top: position.y, left: position.x }}
      tabIndex={0}
    >
      {elems}
    </Container>
  );
};

export default DropDownList;
