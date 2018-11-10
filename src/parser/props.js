// @flow

import type { BlockPropsConfigModel } from '../data/blocks/models';
import { blockPropsConfigTypes } from '../data/blocks/models';
import { previewBlocksParser } from './parser';

export function parsePropValue(propKey: string, propValue: any, propConfig: BlockPropsConfigModel) {
  if (propConfig.type && propConfig.type === blockPropsConfigTypes.blocks) {
    return previewBlocksParser(propValue);
  }
  return propValue;
}
