// @flow
import React, { Component } from 'react';
import { cx } from 'emotion';
import styles from './styles';

export const inputStyleTypes = {
  dark: 'dark',
};

type InputStyleTypes = $Keys<typeof inputStyleTypes>;

type Props = {
  styleType: InputStyleTypes,
  value: string,
  inheritedValue: string,
  onChange: (value: string) => void,
};

type State = {
  text: string,
};

class Input extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      text: props.value ? props.value : '',
    };
  }

  handleInputChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { onChange, inheritedValue } = this.props;
    const inputValue = event.target.value.toString();
    const newValue = inputValue === '' ? inheritedValue : inputValue;
    this.setState({
      text: newValue,
    });
    onChange(inputValue); // todo - debounce
  };

  render() {
    const { styleType } = this.props;
    const { text } = this.state;
    return (
      <input
        className={cx(styles.inputClass, {
          [styles.darkInputClass]: styleType === inputStyleTypes.dark,
        })}
        type="text"
        value={text}
        onChange={this.handleInputChange}
      />
    );
  }
}

export default Input;
