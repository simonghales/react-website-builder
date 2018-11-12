// @flow

import type { DataBlockModel } from '../../../data/blocks/models';
import type { BlockStyles } from '../../../data/styles/models';

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
  blockStyle: BlockStyles | null,
  modifier: string,
  section: string,
  cssKey: string,
  value: string
): BlockStyles | null {
  if (!blockStyle) return null;
  return {
    ...blockStyle,
    styles: {
      [modifier]: {
        ...blockStyle.styles[modifier],
        [section]: {
          ...blockStyle.styles[modifier][section],
          [cssKey]: value,
        },
      },
    },
  };
}
