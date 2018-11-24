// @flow
import htmlTags from 'html-tags';
import React, { Component } from 'react';
import SelectInput from '../../../StyleProp/components/SelectInput/SelectInput';

type Props = {
  value: string,
  onChange: (value: string) => void,
};

const options = htmlTags.map(tag => ({
  value: tag,
  label: tag,
}));

const defaultHtmlElement = 'div';

class HTMLSelector extends Component<Props> {
  render() {
    const { value, onChange } = this.props;
    return (
      <SelectInput
        isCreatable={false}
        isMulti={false}
        noOptionsMessage=""
        options={options}
        styleValue={value}
        inheritedValue={defaultHtmlElement}
        updateStyle={(newValue: string) => {
          if (newValue === '') {
            onChange(defaultHtmlElement);
          } else {
            onChange(newValue);
          }
        }}
      />
    );
  }
}

export default HTMLSelector;
