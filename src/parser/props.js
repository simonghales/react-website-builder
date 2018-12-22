// @flow

import { get } from 'lodash';
import type { DataBlockPropsModel, MappedDataBlockModel } from '../data/blocks/models';
import { blockPropsConfigTypes } from '../blocks/props';
import { previewBlocksParser, previewModuleParser, previewRepeaterBlocksParser } from './parser';
import type { BlockModelPropsConfig } from '../blocks/models';
import type { ParsePropsGrouped } from './parser';
import { isValueArray } from '../utils/validation';
import { getRepeaterDataItemsArray } from '../editor/components/inputs/RepeaterDataInput/components/DataView/DataView';
import type { BlockPropsConfigTypes } from '../blocks/props';

export type RepeaterIndexes = {
  [string]: number,
};

export function getPropReferenceValue(
  propKey: string,
  combinedProps: ParsePropsGrouped,
  repeaterIndexes: RepeaterIndexes
): string {
  let propPath = propKey;
  const splitPropPath = propKey.split('.');
  if (splitPropPath.length > 2) {
    const blockKey = splitPropPath[0];
    let repeaterIndex = repeaterIndexes[blockKey];
    if (typeof repeaterIndex === 'undefined') {
      console.error(`No repeaterIndex matched.`, repeaterIndexes);
      repeaterIndex = 0;
    }
    const propNameKey = splitPropPath[1];
    if (propNameKey === 'data') {
      const dataItems = get(combinedProps, `${blockKey}.${splitPropPath[1]}.items`, {});
      const items = getRepeaterDataItemsArray(dataItems);
      const itemKey = get(items, `[${repeaterIndex}]._key`, undefined);
      propPath = `${blockKey}.${splitPropPath[1]}.items[${itemKey}].${splitPropPath
        .slice(2)
        .join('.')}`;
    } else {
      propPath = `${blockKey}.${splitPropPath[1]}[${repeaterIndex}].${splitPropPath
        .slice(2)
        .join('.')}`;
    }
  }
  const propValue = get(combinedProps, propPath, undefined);
  if (typeof propValue !== 'undefined') {
    return propValue;
  }
  console.warn(`propKey "${propKey}" not found within combinedProps`, combinedProps);
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
  combinedProps: ParsePropsGrouped,
  isModule: boolean,
  repeaterIndexes: RepeaterIndexes
) {
  // console.log('repeaterIndexes', repeaterIndexes);
  // console.log('propValue', propValue);
  // console.log('propConfig', propConfig);
  if (isModule && isValidPropValue(passedProps[propKey])) {
    return passedProps[propKey];
  }
  if (propConfig.propReference) {
    // console.log('propConfig.propReference blockData', blockData);
    return getPropReferenceValue(propValue, combinedProps, repeaterIndexes);
  }
  if (propConfig.type && propConfig.type === blockPropsConfigTypes.blocks) {
    const blockChildren = blockData.blockChildren ? blockData.blockChildren : [];
    return previewBlocksParser(
      blockChildren,
      hoveredBlockKey,
      passedProps,
      combinedProps,
      repeaterIndexes
    );
  }
  if (propConfig.type && propConfig.type === blockPropsConfigTypes.repeaterData) {
    // console.log('is repeater data...???', propValue);
    const items = getRepeaterDataItemsArray(propValue.items);
    if (!isValueArray(items)) {
      console.warn(`Repeater data is not an array.`);
      return null;
    }
    const blockChildren = blockData.blockChildren ? blockData.blockChildren : [];
    return items.map((data, index) =>
      previewRepeaterBlocksParser(blockChildren, hoveredBlockKey, passedProps, combinedProps, {
        ...repeaterIndexes,
        [blockData.key]: index,
      })
    );
  }
  if (propConfig.type && propConfig.type === blockPropsConfigTypes.module) {
    const { module } = blockData;
    if (module) {
      return previewModuleParser(module, hoveredBlockKey, passedProps, combinedProps);
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
