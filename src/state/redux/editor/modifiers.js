// @flow

import type { DataBlockModel } from '../../../data/blocks/models';
import type { BlockStyles } from '../../../data/styles/models';
import { getBlockStyles } from '../../../data/styles/state';

export function updateBlockProp(
  block: DataBlockModel,
  propKey: string,
  value: any
): DataBlockModel {
  return {
    ...block,
    props: {
      ...block.props,
      [propKey]: value,
    },
  };
}

export function updateBlockStyle(
  block: DataBlockModel,
  modifier: string,
  section: string,
  cssKey: string,
  value: string
): BlockStyles {
  const blockStyles = getBlockStyles(block);
  return {
    ...blockStyles,
    styles: {
      [modifier]: {
        ...blockStyles.styles[modifier],
        [section]: {
          ...blockStyles.styles[modifier][section],
          [cssKey]: value,
        },
      },
    },
  };
}
