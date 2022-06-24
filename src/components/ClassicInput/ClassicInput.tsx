import { Component, InputHTMLAttributes } from "react";

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

class ClassicInput extends Component<
  Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & OnChangeInputProps
> {
  private readonly registerCallbacks = (element: HTMLInputElement | null) => {
    if (element && this.props.onChange) {
      element.onchange = this.props.onChange;
    }
  };

  public render() {
    const { onChange, ...newProps } = this.props;
    return <input ref={this.registerCallbacks} {...newProps} />;
  }
}

export default ClassicInput;
