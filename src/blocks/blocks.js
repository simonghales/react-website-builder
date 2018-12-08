// @flow

import type { BlockGroupModel, BlockModel, BlockPropsConfigModel } from './models';
import Heading from './groups/basic/Heading/Heading';
import Container from './groups/basic/Container/Container';
import Module from './groups/module/Module/Module';
import ModuleImport from './groups/module/ModuleImport/ModuleImport';
import Page from './groups/module/Page/Page';
import Element from './groups/html/Element/Element';
import type { DataBlockModel } from '../data/blocks/models';
import { blockGroups } from './config';
import type { DataModule, DataModules } from '../data/modules/models';
import { isBlockModuleImportBlock } from './state';
import { getModuleFromModules, getModuleRootBlock } from '../data/modules/state';
import { getDataBlockPropsConfig } from '../editor/components/EditorContent/components/EditorFields/state';

export const basicBlocks: BlockGroupModel = {
  key: blockGroups.Basic,
  blocks: {
    [Heading.key]: Heading,
    [Container.key]: Container,
  },
};

export const moduleBlocks: BlockGroupModel = {
  key: blockGroups.Module,
  blocks: {
    [Module.key]: Module,
    [ModuleImport.key]: ModuleImport,
    [Page.key]: Page,
  },
};

export const htmlBlocks: BlockGroupModel = {
  key: blockGroups.HTML,
  blocks: {
    [Element.key]: Element,
  },
};

type AllBlocksModel = {
  [string]: BlockGroupModel,
};

export const allBlocks: AllBlocksModel = {
  [basicBlocks.key]: basicBlocks,
  [moduleBlocks.key]: moduleBlocks,
  [htmlBlocks.key]: htmlBlocks,
};

export const addableBlocks: AllBlocksModel = {
  [basicBlocks.key]: basicBlocks,
  [htmlBlocks.key]: htmlBlocks,
};

export function getBlockGroup(groupKey: string): BlockGroupModel | null {
  return allBlocks[groupKey] ? allBlocks[groupKey] : null;
}

export function getBlock(blockGroup: BlockGroupModel, blockKey: string): BlockModel | null {
  return blockGroup.blocks[blockKey] ? blockGroup.blocks[blockKey] : null;
}

export function getBlockFromDataBlock(dataBlock: DataBlockModel): BlockModel {
  const blockGroup = getBlockGroup(dataBlock.groupKey);
  if (!blockGroup) {
    throw new Error(`Couldn't match block group.`);
  }
  const block = getBlock(blockGroup, dataBlock.blockKey);
  if (!block) {
    throw new Error(`Couldn't match block.`);
  }
  return block;
}

export function getDataBlockModuleKey(dataBlock: DataBlockModel): string {
  console.log('dataBlock', dataBlock);
  const { moduleKey } = dataBlock;
  if (!moduleKey) {
    throw new Error(`No moduleKey found within provided dataBlock.`);
  }
  return moduleKey;
}

export function getDataBlockModuleImportModule(
  dataBlock: DataBlockModel,
  modules: DataModules
): DataModule {
  const moduleKey = getDataBlockModuleKey(dataBlock);
  return getModuleFromModules(moduleKey, modules);
}

export function getDataBlockModuleProps(
  dataBlock: DataBlockModel,
  modules: DataModules
): BlockPropsConfigModel {
  const block = getBlockFromDataBlock(dataBlock);
  if (!isBlockModuleImportBlock(block)) {
    return {};
  }
  const module = getDataBlockModuleImportModule(dataBlock, modules);
  const rootBlock = getModuleRootBlock(module);
  return getDataBlockPropsConfig(rootBlock);
}
