// @flow
import htmlTags from 'html-tags';
import React, { Component } from 'react';
import SelectInput from "../SelectInput/SelectInput";

type SelectOption = {
  value: string,
  label: string,
};

const mapHtmlTags = (tags: Array<string>): Array<SelectOption> =>
  tags.map((tag: string) => ({
    value: tag,
    label: tag,
  }));

const allHtmlTags = mapHtmlTags(htmlTags);
const headingHtmlTags = mapHtmlTags(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);
const containerHtmlTags = mapHtmlTags(['div', 'section']);

export const htmlSelectorOptions = {
  all: allHtmlTags,
  heading: headingHtmlTags,
  container: containerHtmlTags,
};

type Props = {
  options: Array<SelectOption>,
  defaultHtmlElement: string,
  value: string,
  onChange: (value: string) => void,
};

class HTMLSelector extends Component<Props> {
  render() {
    const { defaultHtmlElement, options, value, onChange } = this.props;
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
