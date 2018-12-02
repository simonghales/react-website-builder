// @flow
import React, { Component } from 'react';
import styled from 'react-emotion';
import { cx } from 'emotion';
import styles from './styles';
import { buttonize } from '../../../../utils/form';

const Grid = styled('div')`
  ${styles.containerClass};
  grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr);`};
`;

export type RadioSelectorOptionModel = {
  key: string,
  value: string,
  icon: any,
};

type Props = {
  value: string,
  inheritedValue: string,
  options: Array<RadioSelectorOptionModel>,
  onChange: (value: string) => void,
};

type State = {
  selectedValue: string,
};

class RadioSelector extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedValue: props.value,
    };
  }

  handleSelectOption = (value: string) => {
    const { onChange } = this.props;
    const { selectedValue } = this.state;
    const newValue = selectedValue === value ? '' : value;
    this.setState({
      selectedValue: newValue,
    });
    onChange(newValue);
  };

  getDisplayValue() {
    const { selectedValue } = this.state;
    const { inheritedValue } = this.props;
    return selectedValue === '' ? inheritedValue : selectedValue;
  }

  render() {
    const { options } = this.props;
    const selectedValue = this.getDisplayValue();
    return (
      <Grid columns={options.length}>
        {options.map((option: RadioSelectorOptionModel, index: number) => {
          const handleSelect = () => this.handleSelectOption(option.value);
          return (
            <div className={styles.optionWrapperClass} key={option.key}>
              <div
                {...buttonize(handleSelect)}
                tabIndex={0}
                role="button"
                className={cx(styles.optionClass, {
                  [styles.selectedOptionClass]: selectedValue === option.value,
                })}
              >
                {option.icon && option.icon}
              </div>
            </div>
          );
        })}
      </Grid>
    );
  }
}

export default RadioSelector;
