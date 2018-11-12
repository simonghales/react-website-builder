// @flow
import React, { Component } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import colors from '../../../../styles/config/colors';
import measurements from '../../../../styles/config/measurements';
import { parseSelectInputStyleValue } from './state';

const customStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? colors.darkInputFocused : colors.darkInput,
    border: 0,
    boxShadow: 0,
    borderRadius: 3,
    minHeight: `${measurements.inputHeight}px`,
  }),
  placeholder: baseStyles => ({
    ...baseStyles,
    color: colors.lightFaint,
    fontStyle: 'italic',
  }),
  input: baseStyles => ({
    ...baseStyles,
    color: colors.light,
  }),
  dropdownIndicator: baseStyles => ({
    ...baseStyles,
    color: colors.lightFaint,
    ':hover': {
      color: colors.light,
    },
  }),
  clearIndicator: baseStyles => ({
    ...baseStyles,
    color: colors.lightFaint,
    ':hover': {
      color: colors.light,
    },
  }),
  indicatorSeparator: baseStyles => ({
    ...baseStyles,
    backgroundColor: colors.lightFaint,
  }),
  singleValue: baseStyles => ({
    ...baseStyles,
    color: colors.light,
  }),
  multiValue: baseStyles => ({
    ...baseStyles,
    color: colors.light,
    backgroundColor: colors.lightFaintest,
    border: `1px solid ${colors.lightFaint}`,
  }),
  multiValueLabel: baseStyles => ({
    ...baseStyles,
    color: colors.light,
  }),
  multiValueRemove: baseStyles => ({
    ...baseStyles,
    color: colors.lightMid,
    ':hover': {
      color: colors.light,
      backgroundColor: 'rgba(0,0,0,0.25)',
    },
  }),
  valueContainer: baseStyles => ({
    ...baseStyles,
  }),
  menu: baseStyles => ({
    ...baseStyles,
    backgroundColor: '#000626',
    margin: 0,
  }),
  menuList: baseStyles => ({
    ...baseStyles,
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: '',
    color: colors.lightMid,
    ':hover': {
      color: colors.light,
    },
    ':active': {
      color: colors.light,
    },
  }),
  noOptionsMessage: baseStyles => ({
    ...baseStyles,
    color: colors.lightMid,
  }),
};

function formatCreateLabel(inputValue: string): string {
  return `Add "${inputValue}"`;
}

function formatGroupLabel() {
  return `TODO`;
}

export type SelectOption = {
  value: string,
  label: string,
};

type Props = {
  isCreatable: boolean,
  isMulti: boolean,
  noOptionsMessage?: string,
  options: Array<SelectOption>,
  styleValue: string,
  updateStyle: (value: string) => void,
};

type Selected = Array<SelectOption> | SelectOption | null;

type State = {
  selected: Selected,
};

class SelectInput extends Component<Props, State> {
  static defaultProps = {
    noOptionsMessage: '',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      selected: parseSelectInputStyleValue(props.styleValue),
    };
  }

  handleChange = (newValue: Selected) => {
    const { updateStyle } = this.props;
    this.setState({
      selected: newValue,
    });
    if (!newValue) {
      updateStyle(''); // todo - handle better
    } else if (newValue instanceof Array) {
      updateStyle(newValue.map(value => value.value).join(', '));
    } else {
      updateStyle(newValue.value);
    }
  };

  render() {
    const { selected } = this.state;
    const { noOptionsMessage, options, isMulti, isCreatable } = this.props;

    const sharedProps = {
      onChange: this.handleChange,
      styles: customStyles,
      value: selected,
      options,
      placeholder: '',
      isMulti,
      noOptionsMessage: () => noOptionsMessage,
    };

    if (!isCreatable) {
      return <Select {...sharedProps} />;
    }

    return <CreatableSelect {...sharedProps} formatCreateLabel={formatCreateLabel} />;
  }
}

export default SelectInput;
