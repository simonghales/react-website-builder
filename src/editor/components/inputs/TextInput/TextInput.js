// @flow
import React, { Component } from 'react';
import styles from './styles';

type Props = {
  value: string,
  inheritedValue?: string,
  valueControlled?: boolean,
  onChange: (value: string) => void,
};

type State = {
  inputValue: string,
};

class TextInput extends Component<Props, State> {
  static defaultProps = {
    inheritedValue: '',
    valueControlled: false,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: props.value ? props.value : '',
    };
  }

  componentWillReceiveProps(nextProps: Readonly<Props>): void {
    const { valueControlled, value } = nextProps;
    if (valueControlled) {
      const { inputValue } = this.state;
      if (value !== inputValue) {
        this.setState({
          inputValue: value,
        });
      }
    }
  }

  handleInputChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    const inputValue = event.target.value.toString();
    this.setState({
      inputValue,
    });
    onChange(inputValue); // todo - debounce
  };

  getDisplayValue(): string {
    const { inputValue } = this.state;
    const { inheritedValue = '' } = this.props;
    return inputValue !== '' ? inputValue : inheritedValue;
  }

  render() {
    return (
      <input
        className={styles.inputClass}
        type="text"
        value={this.getDisplayValue()}
        onChange={this.handleInputChange}
      />
    );
  }
}

export default TextInput;
