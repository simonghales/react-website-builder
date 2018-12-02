// @flow

import type { DataBlockMappedMixinsModel, DataBlockModel, SitePageDataBlocks } from './models';
import { getBlockFromDataBlock } from '../../blocks/blocks';
import { getBlockFromBlocks, getDataBlockType } from './models';
import ModuleImport from '../../blocks/groups/module/ModuleImport/ModuleImport';
import type { ModuleTemplates } from '../moduleTemplates/models';
import {
  getModuleTemplateFromModuleTemplates,
  getModuleTemplateModuleKey,
} from '../moduleTemplates/state';
import type { DataModules } from '../modules/models';
import { getModuleFromModules } from '../modules/state';
import type { MixinModel, MixinsModel } from '../mixins/models';
import { getMixinFromMixins } from '../mixins/state';
import { blockGroups, blockTypes } from '../../blocks/config';
import {
  getDataBlockCombinedProps,
  getDataBlockPropsConfig,
} from '../../editor/components/EditorContent/components/EditorFields/state';
import { blockPropsConfigTypes } from '../../blocks/props';

export function doesBlockAllowStyles(dataBlock: DataBlockModel): boolean {
  const block = getBlockFromDataBlock(dataBlock);
  return block.stylesEnabled;
}

export function doesBlockAllowHtml(dataBlock: DataBlockModel): boolean {
  const block = getBlockFromDataBlock(dataBlock);
  return block.htmlEnabled;
}

export function getBlockLabel(
  dataBlock: DataBlockModel,
  modules: DataModules,
  moduleTemplates: ModuleTemplates
): string {
  if (dataBlock.groupKey === blockGroups.Module && dataBlock.blockKey === ModuleImport.key) {
    if (dataBlock.linkedModuleKey) {
      const moduleTemplate = getModuleTemplateFromModuleTemplates(
        dataBlock.linkedModuleKey,
        moduleTemplates
      );
      const moduleKey = getModuleTemplateModuleKey(moduleTemplate);
      const module = getModuleFromModules(moduleKey, modules);
      return `${module.groupKey}.${module.name}`;
    }
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
  const block = getBlockFromBlocks(blocks, blockKey);
  const blockBlocks = {
    [blockKey]: block,
  };
  const blockChildrenKeys = getBlockChildrenKeys(block);
  blockChildrenKeys.forEach(childBlockKey => {
    blockBlocks[childBlockKey] = getBlockFromBlocks(blocks, childBlockKey);
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
};

export type DataBlockPropsDetails = {
  [string]: DataBlockPropDetail,
};

export function getDataBlockPropsDetails(dataBlock: DataBlockModel): DataBlockPropsDetails {
  const propsDetails = {};
  const combinedProps = getDataBlockCombinedProps(dataBlock);
  const dataBlockPropsConfig = getDataBlockPropsConfig(dataBlock);
  Object.keys(dataBlockPropsConfig).forEach(propKey => {
    const key = propKey;
    const label = dataBlockPropsConfig[propKey].label
      ? dataBlockPropsConfig[propKey].label
      : propKey;
    let type = blockPropsConfigTypes.string;
    if (dataBlockPropsConfig[propKey].type) {
      // eslint-disable-next-line prefer-destructuring
      type = dataBlockPropsConfig[propKey].type;
    } else {
      console.warn(`No type found within propsConfig for ${propKey}`);
    }
    propsDetails[propKey] = {
      key,
      label,
      type,
      value: combinedProps[propKey],
    };
  });
  return propsDetails;
}

export function getPropLabelFromDataBlocksPropsDetails(
  propKey: string,
  propsDetails: DataBlockPropsDetails
): string {
  if (propsDetails[propKey]) {
    return propsDetails[propKey].label;
  }
  console.warn(`Couldn't match "${propKey}" within data block's props details.`);
  return propKey;
}
