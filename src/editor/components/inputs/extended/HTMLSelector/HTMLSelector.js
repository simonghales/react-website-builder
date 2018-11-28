// @flow
import htmlTags from 'html-tags';
import React, { Component } from 'react';
import Container from 'blocks/groups/basic/Container/Container';
import Heading from 'blocks/groups/basic/Heading/Heading';
import Element from 'blocks/groups/html/Element/Element';
import SelectInput from '../../SelectInput/SelectInput';
import type { BlockModel } from '../../../../../blocks/models';
import { blockGroups } from '../../../../../blocks/config';
import { elementDefaultProps } from '../../../../../blocks/groups/html/Element/props';
import { containerDefaultProps } from '../../../../../blocks/groups/basic/Container/props';
import { headingDefaultProps } from '../../../../../blocks/groups/basic/Heading/props';

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

const mappedOptions = {
  [blockGroups.HTML]: {
    [Element.key]: {
      options: htmlSelectorOptions.all,
      defaultElement: elementDefaultProps.element,
    },
  },
  [blockGroups.Basic]: {
    [Container.key]: {
      options: htmlSelectorOptions.container,
      defaultElement: containerDefaultProps.element,
    },
    [Heading.key]: {
      options: htmlSelectorOptions.heading,
      defaultElement: headingDefaultProps.element,
    },
  },
};

const getOptions = (options: Array<SelectOption>, block?: BlockModel): Array<SelectOption> => {
  if (options && options.length > 0) {
    return options;
  }

  if (!block) {
    return htmlSelectorOptions.all;
  }

  if (mappedOptions[block.groupKey]) {
    if (mappedOptions[block.groupKey][block.key]) {
      return mappedOptions[block.groupKey][block.key].options;
    }
  }

  return htmlSelectorOptions.all;
};

const getDefaultHtmlElement = (defaultHtmlElement: string, block?: BlockModel): string => {
  if (defaultHtmlElement) {
    return defaultHtmlElement;
  }

  if (block) {
    if (mappedOptions[block.groupKey]) {
      if (mappedOptions[block.groupKey][block.key]) {
        return mappedOptions[block.groupKey][block.key].defaultElement;
      }
    }
  }

  return elementDefaultProps.element;
};

type Props = {
  defaultHtmlElement?: string,
  value: string,
  onChange: (value: string) => void,
  options?: Array<SelectOption>,
  block?: BlockModel,
};

class HTMLSelector extends Component<Props> {
  render() {
    const { defaultHtmlElement, options, block, value, onChange } = this.props;
    return (
      <SelectInput
        isCreatable={false}
        isMulti={false}
        noOptionsMessage=""
        options={getOptions(options, block)}
        styleValue={value}
        inheritedValue={getDefaultHtmlElement(defaultHtmlElement, block)}
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

HTMLSelector.defaultProps = {
  defaultHtmlElement: '',
  options: [],
  block: undefined,
};

export default HTMLSelector;
