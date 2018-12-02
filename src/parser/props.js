// @flow

import type { DataBlockPropsModel, MappedDataBlockModel } from '../data/blocks/models';
import { blockPropsConfigTypes } from '../blocks/props';
import { previewBlocksParser, previewModuleParser } from './parser';
import type { BlockModelPropsConfig } from '../blocks/models';

export function getPropReferenceValue(propKey: string, passedProps: DataBlockPropsModel): string {
  const propValue = passedProps[propKey];
  if (typeof propValue !== 'undefined') {
    return propValue;
  }
  console.warn(`propKey "${propKey}" not found within passedProps`);
  return '';
}

export function isValidPropValue(value?: string) {
  return typeof value !== 'undefined' && value !== '';
}

export function parsePropValue(
  blockData: MappedDataBlockModel,
  propKey: string,
  propValue: any,
  propConfig: BlockModelPropsConfig,
  hoveredBlockKey: string,
  passedProps: DataBlockPropsModel,
  isModule: boolean
) {
  if (isModule && isValidPropValue(passedProps[propKey])) {
    return passedProps[propKey];
  }
  if (propConfig.propReference) {
    return getPropReferenceValue(propValue, passedProps);
  }
  if (propConfig.type && propConfig.type === blockPropsConfigTypes.blocks) {
    const blockChildren = blockData.blockChildren ? blockData.blockChildren : [];
    return previewBlocksParser(blockChildren, hoveredBlockKey, passedProps);
  }
  if (propConfig.type && propConfig.type === blockPropsConfigTypes.module) {
    const { module } = blockData;
    if (module) {
      console.log('passedProps', passedProps);
      return previewModuleParser(module, hoveredBlockKey, passedProps);
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
