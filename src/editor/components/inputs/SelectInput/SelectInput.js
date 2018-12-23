// @flow
import React, { Component } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import colors from '../../../../styles/config/colors';
import measurements from '../../../../styles/config/measurements';
import { parseSelectInputStyleValue } from './state';
import { inputStylesConfig } from '../../../../styles/inputs';

const customStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused
      ? inputStylesConfig.backgroundHoverColor
      : inputStylesConfig.backgroundColor,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: state.isFocused
      ? inputStylesConfig.borderFocusedColor
      : inputStylesConfig.backgroundColor,
    boxShadow: 0,
    borderRadius: 3,
    minHeight: `${inputStylesConfig.minHeight}px`,
    transition: '',
    ':hover': {
      borderColor: state.isFocused
        ? inputStylesConfig.borderFocusedColor
        : inputStylesConfig.backgroundHoverColor,
      backgroundColor: inputStylesConfig.backgroundHoverColor,
    },
  }),
  placeholder: baseStyles => ({
    ...baseStyles,
    color: colors.lightFaint,
    fontStyle: 'italic',
  }),
  input: baseStyles => ({
    ...baseStyles,
    color: colors.light,
    fontSize: inputStylesConfig.fontSize,
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
    backgroundColor: colors.blackInactiveBlue,
    margin: 0,
  }),
  menuList: baseStyles => ({
    ...baseStyles,
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? inputStylesConfig.borderFocusedColor : '',
    color: state.isFocused ? colors.light : colors.lightMid,
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

export type SelectGroup = {
  label: string,
  options: Array<SelectOption>,
};

type Props = {
  isCreatable: boolean,
  isMulti: boolean,
  noOptionsMessage?: string,
  options: Array<SelectOption>,
  styleValue: string,
  inheritedValue: string,
  updateStyle: (value: string) => void,
};

type Selected = Array<SelectOption> | SelectOption | null;

type State = {
  selected: Selected,
};

function parseSelectedValue(selectedValue: Selected): string {
  if (!selectedValue) return '';
  if (selectedValue instanceof Array) {
    return selectedValue.map(value => value.value.trim()).join(', ');
  }
  return selectedValue.value;
}

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
    const storedValue = parseSelectedValue(newValue);
    updateStyle(storedValue);
  };

  getDisplayValue() {
    const { selected } = this.state;
    if (!selected || selected.length === 0) {
      const { inheritedValue } = this.props;
      return parseSelectInputStyleValue(inheritedValue);
    }
    return selected;
  }

  render() {
    const { noOptionsMessage, options, isMulti, isCreatable } = this.props;

    const sharedProps = {
      onChange: this.handleChange,
      styles: customStyles,
      value: this.getDisplayValue(),
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
