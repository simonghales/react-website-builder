// @flow

import { get } from 'lodash';
import type {
  DataBlockMappedMixinsModel,
  DataBlockMixinStylesModel,
  DataBlockModel,
  DataBlockPropsConfigModel,
  SitePageDataBlocks,
} from './models';
import { getBlockFromDataBlock, functionalBlocks, moduleBlocks } from '../../blocks/blocks';
import {
  getDataBlockBlockKey,
  getDataBlockFromBlocks,
  getDataBlockGroupKey,
  getDataBlockType,
} from './models';
import ModuleImport from '../../blocks/groups/module/ModuleImport/ModuleImport';
import type { DataModules } from '../modules/models';
import type { MixinModel, MixinsModel } from '../mixins/models';
import { getMixinFromMixins } from '../mixins/state';
import { blockGroups, blockTypes } from '../../blocks/config';
import {
  getDataBlockCombinedProps,
  getDataBlockCombinedPropsConfig,
  getDataBlockPropsConfig,
} from '../../editor/components/EditorContent/components/EditorFields/state';
import { blockPropsConfigTypes } from '../../blocks/props';
import Module from '../../blocks/groups/module/Module/Module';
import Page from '../../blocks/groups/module/Page/Page';
import Repeater from '../../blocks/groups/functional/Repeater/Repeater';

export function doesBlockAllowStyles(dataBlock: DataBlockModel): boolean {
  const block = getBlockFromDataBlock(dataBlock);
  return block.stylesEnabled;
}

export function doesBlockAllowHtml(dataBlock: DataBlockModel): boolean {
  const block = getBlockFromDataBlock(dataBlock);
  return block.htmlEnabled;
}

export function getBlockLabel(dataBlock: DataBlockModel, modules: DataModules): string {
  if (dataBlock.groupKey === blockGroups.Module && dataBlock.blockKey === ModuleImport.key) {
    // if (dataBlock.linkedModuleKey) {
    //   const moduleTemplate = getModuleTemplateFromModuleTemplates(
    //     dataBlock.linkedModuleKey,
    //     moduleTemplates
    //   );
    //   const moduleKey = getModuleTemplateModuleKey(moduleTemplate);
    //   const module = getModuleFromModules(moduleKey, modules);
    //   return `${module.groupKey}.${module.name}`;
    // }
    return `Custom Module`;
  }
  return getDataBlockType(dataBlock);
}

export function isBlockModuleBlock(dataBlock: DataBlockModel): boolean {
  return (
    dataBlock.groupKey === blockGroups.Module &&
    (!!dataBlock.moduleKey || !!dataBlock.linkedModuleKey)
  );
}

export function getDataBlockMappedMixins(
  dataBlock: DataBlockModel,
  mixins: MixinsModel
): DataBlockMappedMixinsModel {
  const { mixinStyles } = dataBlock;
  if (!mixinStyles) return [];
  return mixinStyles.map(blockMixin => {
    const mixin = getMixinFromMixins(blockMixin.key, mixins);
    return {
      key: blockMixin.key,
      name: mixin.name,
      groupKey: mixin.groupKey,
    };
  });
}

export function getDataBlockMixins(
  dataBlock: DataBlockModel,
  mixins: MixinsModel
): Array<MixinModel> {
  const { mixinStyles } = dataBlock;
  if (!mixinStyles) return [];
  return mixinStyles.map(blockMixin => {
    const mixin = getMixinFromMixins(blockMixin.key, mixins);
    return mixin;
  });
}

export function doesBlockChildrenContainBlockKey(
  dataBlock: DataBlockModel,
  blockKey: string
): boolean {
  const { blockChildrenKeys = [] } = dataBlock;
  return blockChildrenKeys.includes(blockKey);
}

export function getBlockParentKey(blockToMatchKey: string, blocks: SitePageDataBlocks): string {
  let parentKey = '';
  Object.keys(blocks).forEach(blockKey => {
    const block = blocks[blockKey];
    if (doesBlockChildrenContainBlockKey(block, blockToMatchKey)) {
      parentKey = block.key;
    }
  });
  return parentKey;
}

export function removeBlockKeyFromBlockChildrenKeys(
  blockKey: string,
  blockChildrenKeys: Array<string>
): Array<string> {
  const blockIndex = blockChildrenKeys.indexOf(blockKey);
  const updatedBlockChildrenKeys = blockChildrenKeys.slice();
  updatedBlockChildrenKeys.splice(blockIndex, 1);
  return updatedBlockChildrenKeys;
}

export function getBlockChildrenKeys(block: DataBlockModel): Array<string> {
  const { blockChildrenKeys = [] } = block;
  return blockChildrenKeys;
}

export function getBlockBlocks(blockKey: string, blocks: SitePageDataBlocks): SitePageDataBlocks {
  const block = getDataBlockFromBlocks(blocks, blockKey);
  const blockBlocks = {
    [blockKey]: block,
  };
  const blockChildrenKeys = getBlockChildrenKeys(block);
  blockChildrenKeys.forEach(childBlockKey => {
    blockBlocks[childBlockKey] = getDataBlockFromBlocks(blocks, childBlockKey);
  });
  return blockBlocks;
}

export function getBlockIndexWithinBlock(block: DataBlockModel, blockKey: string): number {
  const childrenKeys = getBlockChildrenKeys(block);
  return childrenKeys.indexOf(blockKey);
}

export function isDataBlockAModuleTemplate(dataBlock: DataBlockModel): boolean {
  return (
    dataBlock.blockType === blockTypes.module &&
    dataBlock.groupKey === blockGroups.Module &&
    (Object.prototype.hasOwnProperty.call(dataBlock, 'linkedModuleKey') ||
      Object.prototype.hasOwnProperty.call(dataBlock, 'moduleKey'))
  );
}

export type DataBlockPropDetail = {
  key: string,
  label: string,
  type: string,
  value: string,
  repeaterRootPropKey?: string,
  repeaterPropKey?: string,
};

export type DataBlockPropsDetails = {
  [string]: DataBlockPropDetail,
};

export function getDataBlockRepeaterPropsDetails(
  dataBlockPropsConfig: DataBlockPropsConfigModel,
  propKey: string,
  dataBlockKey: string
): DataBlockPropsDetails {
  const propConfig = dataBlockPropsConfig[propKey];
  const propsDetails = {};
  if (propConfig.repeaterDataModel) {
    Object.keys(propConfig.repeaterDataModel).forEach(repeaterPropKey => {
      const repeaterProp = propConfig.repeaterDataModel[repeaterPropKey];
      const key = `${dataBlockKey}.${propKey}.${repeaterPropKey}`;
      propsDetails[key] = {
        key,
        label: repeaterProp.label,
        type: repeaterProp.type,
        value: '',
        repeaterRootPropKey: propKey,
        repeaterPropKey,
      };
    });
  }
  return propsDetails;
}

export function getDataBlockPropsDetails(dataBlock: DataBlockModel): DataBlockPropsDetails {
  let propsDetails = {};
  const combinedProps = getDataBlockCombinedProps(dataBlock);
  const combinedPropsConfig = getDataBlockCombinedPropsConfig(dataBlock);
  const dataBlockPropsConfig = getDataBlockPropsConfig(dataBlock);
  Object.keys(dataBlockPropsConfig).forEach(propKey => {
    const key = `${dataBlock.key}.${propKey}`;
    const label = combinedPropsConfig[propKey].label ? combinedPropsConfig[propKey].label : propKey;
    let type = blockPropsConfigTypes.string;
    if (combinedPropsConfig[propKey].type) {
      // eslint-disable-next-line prefer-destructuring
      type = combinedPropsConfig[propKey].type;
    } else {
      console.warn(`No type found within combinedPropsConfig for ${propKey}`);
    }
    if (type === blockPropsConfigTypes.repeaterData) {
      const repeaterPropsDetails = getDataBlockRepeaterPropsDetails(
        dataBlockPropsConfig,
        propKey,
        dataBlock.key
      );
      propsDetails = {
        ...propsDetails,
        ...repeaterPropsDetails,
      };
    } else {
      propsDetails[key] = {
        key,
        label,
        type,
        value: combinedProps[propKey],
      };
    }
  });
  return propsDetails;
}

export type DataBlockPropsDetailsGroup = {
  key: string,
  label: string,
  props: DataBlockPropsDetails,
};

export type AvailableDataBlockPropsDetails = {
  [string]: DataBlockPropsDetailsGroup,
};

export function isDataBlockSuitableForPropsReference(dataBlock: DataBlockModel): boolean {
  const groupKey = getDataBlockGroupKey(dataBlock);
  const blockKey = getDataBlockBlockKey(dataBlock);
  if (groupKey === moduleBlocks.key) {
    if (blockKey === Module.key || blockKey === Page.key) {
      return true;
    }
  }
  if (groupKey === functionalBlocks.key || blockKey === Repeater.key) {
    return true;
  }
  return false;
}

export function getAvailableDataBlockPropsDetails(
  targetBlockKey: string,
  blocks: SitePageDataBlocks
): AvailableDataBlockPropsDetails {
  const dataBlock = getDataBlockFromBlocks(blocks, targetBlockKey);
  let propsDetails = {};
  if (isDataBlockSuitableForPropsReference(dataBlock)) {
    const customProps = getDataBlockPropsDetails(dataBlock);
    if (Object.keys(customProps).length > 0) {
      propsDetails[targetBlockKey] = {
        key: targetBlockKey,
        label: dataBlock.label,
        props: customProps,
      };
    }
  }
  const parentBlockKey = getBlockParentKey(targetBlockKey, blocks);
  if (parentBlockKey) {
    const parentBlockPropsDetails = getAvailableDataBlockPropsDetails(parentBlockKey, blocks);
    propsDetails = {
      ...propsDetails,
      ...parentBlockPropsDetails,
    };
  }
  return propsDetails;
}

export function getPropDisplayValueFromAllPropsDetails(
  allPropsDetails: AvailableDataBlockPropsDetails,
  propKey: string
): string {
  if (!propKey) return '';
  const dataBlockKey = propKey.split('.')[0];
  const dataBlockProps = get(allPropsDetails, `${dataBlockKey}.props`, null);
  if (!dataBlockProps) {
    console.warn(`Couldn't match dataBlockKey "${dataBlockKey}" to allPropsDetails.`);
  }
  const displayValue = get(dataBlockProps, propKey, undefined);
  if (typeof displayValue === 'undefined') {
    console.warn(`Couldn't match propKey "${propKey}" to dataBlockProps`);
    return '';
  }
  return displayValue.label;
}

export function getPropDisplayLabelFromAllPropsDetails(
  allPropsDetails: AvailableDataBlockPropsDetails,
  propKey: string
): string {
  return getPropDisplayValueFromAllPropsDetails(allPropsDetails, propKey);
}

export function getPropLabelFromDataBlocksPropsDetails(
  propKey: string,
  propsDetails: DataBlockPropsDetails
): string {
  if (propsDetails[propKey]) {
    return propsDetails[propKey].label;
  }
  console.warn(`Couldn't match "${propKey}" within data block's props details.`, propsDetails);
  return propKey;
}

export function getDataBlockMixinStyles(dataBlock: DataBlockModel): DataBlockMixinStylesModel {
  const { mixinStyles = [] } = dataBlock;
  return mixinStyles;
}
