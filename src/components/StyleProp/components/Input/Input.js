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
  inheritedValue?: string,
  onChange: (value: string) => void,
};

type State = {
  text: string,
};

class Input extends Component<Props, State> {
  static defaultProps = {
    inheritedValue: '',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      text: props.value ? props.value : '',
    };
  }

  handleInputChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    const inputValue = event.target.value.toString();
    this.setState({
      text: inputValue,
    });
    onChange(inputValue); // todo - debounce
  };

  getDisplayValue(): string {
    const { text } = this.state;
    const { inheritedValue = '' } = this.props;
    return text !== '' ? text : inheritedValue;
  }

  render() {
    const { styleType } = this.props;
    return (
      <input
        className={cx(styles.inputClass, {
          [styles.darkInputClass]: styleType === inputStyleTypes.dark,
        })}
        type="text"
        value={this.getDisplayValue()}
        onChange={this.handleInputChange}
      />
    );
  }
}

export default Input;
