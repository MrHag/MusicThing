import { InputHTMLAttributes } from "react";

export interface OnChangeInputProps {
  onChange?: (event: Event) => void;
}

/**
 * This component restores the 'onChange' behavior of JavaScript.
 *
 * See:
 * - https://reactjs.org/docs/dom-elements.html#onchange
 * - https://github.com/facebook/react/issues/3964
 * - https://github.com/facebook/react/issues/9657
 * - https://github.com/facebook/react/issues/14857
 */

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> &
  OnChangeInputProps;

const ClassicInput: React.FC<Props> = ({ onChange, ...props }) => {
  const registerCallback = (element: HTMLInputElement | null) => {
    if (element && onChange) {
      element.onchange = onChange;
    }
  };
  return <input ref={registerCallback} {...props} />;
};

export default ClassicInput;
