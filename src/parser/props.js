// @flow

import type { MappedDataBlockModel } from '../data/blocks/models';
import { blockPropsConfigTypes } from '../data/blocks/models';
import { previewBlocksParser, previewModuleParser } from './parser';
import type { BlockModelPropsConfig } from '../blocks/models';

export function parsePropValue(
  blockData: MappedDataBlockModel,
  propKey: string,
  propValue: any,
  propConfig: BlockModelPropsConfig
) {
  if (propConfig.type && propConfig.type === blockPropsConfigTypes.blocks) {
    const blockChildren = blockData.blockChildren ? blockData.blockChildren : [];
    return previewBlocksParser(blockChildren);
  }
  if (propConfig.type && propConfig.type === blockPropsConfigTypes.module) {
    const { module } = blockData;
    if (module) {
      return previewModuleParser(module);
    }
    console.warn(
      `module data is missing for ${blockData.key} + ${
        blockData.moduleKey ? blockData.moduleKey : ''
      }`
    );
    return null;
  }
  return propValue;
}
