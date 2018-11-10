// @flow

import type { DataBlockModel } from '../../../data/blocks/models';

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
