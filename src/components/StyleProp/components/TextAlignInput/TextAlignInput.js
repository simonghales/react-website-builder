// @flow
import React, { Component } from 'react';
import {
  MdFormatAlignCenter,
  MdFormatAlignJustify,
  MdFormatAlignLeft,
  MdFormatAlignRight,
} from 'react-icons/md';
import styles from './styles';
import SelectableOption from './components/SelectableOption/SelectableOption';
import type { StylePropInputProps } from '../models';

type Option = {
  key: string,
  icon: any,
};

const leftOption: Option = {
  key: 'left',
  icon: <MdFormatAlignLeft />,
};

const centerOption: Option = {
  key: 'center',
  icon: <MdFormatAlignCenter />,
};

const rightOption: Option = {
  key: 'right',
  icon: <MdFormatAlignRight />,
};

const justifyOption: Option = {
  key: 'justify',
  icon: <MdFormatAlignJustify />,
};

const options: Array<Option> = [leftOption, centerOption, rightOption, justifyOption];

type Props = StylePropInputProps & {};

type State = {
  selectedOption: string,
};

class TextAlignInput extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedOption: props.styleValue,
    };
  }

  componentWillReceiveProps(nextProps: Props): void {
    const { inheritedValue } = this.props;
    const { selectedOption } = this.state;
    if (nextProps.inheritedValue !== inheritedValue && selectedOption === inheritedValue) {
      this.setState({
        selectedOption: nextProps.inheritedValue,
      });
    }
  }

  handleSelectOption = (value: string) => {
    const { selectedOption } = this.state;
    const { updateStyle, inheritedValue } = this.props;
    const newValue = selectedOption === value ? '' : value;
    const displayedValue = newValue === '' ? inheritedValue : newValue;
    this.setState({
      selectedOption: displayedValue,
    });
    updateStyle(newValue);
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <div className={styles.containerClass}>
        {options.map(option => (
          <SelectableOption
            title={option.key}
            selected={selectedOption === option.key}
            content={option.icon}
            key={option.key}
            onSelect={() => {
              this.handleSelectOption(option.key);
            }}
          />
        ))}
      </div>
    );
  }
}

export default TextAlignInput;
