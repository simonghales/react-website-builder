// @flow

import type { DataBlockModelMapped } from '../data/blocks/models';
import { blockPropsConfigTypes } from '../data/blocks/models';
import { previewBlocksParser } from './parser';
import type { BlockModelPropsConfig } from '../blocks/models';

export function parsePropValue(
  blockData: DataBlockModelMapped,
  propKey: string,
  propValue: any,
  propConfig: BlockModelPropsConfig
) {
  if (propConfig.type && propConfig.type === blockPropsConfigTypes.blocks) {
    const blockChildren = blockData.blockChildren ? blockData.blockChildren : [];
    return previewBlocksParser(blockChildren);
  }
  return propValue;
}
