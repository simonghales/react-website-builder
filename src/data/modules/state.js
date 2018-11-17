// @flow

import type { DataModule, DataModules, MappedDataModule } from './models';
import type { DataBlockModel, SitePageDataBlocks } from '../blocks/models';
import { getMappedDataBlocks } from '../blocks/models';
import type { ModuleTemplates } from '../moduleTemplates/models';
import type { MixinsModel } from '../mixins/models';

export function getModuleRootBlockKey(module: DataModule): string {
  const { rootBlock } = module;
  return rootBlock;
}

export function getSelectedBlockKeyFromModule(module: DataModule): string {
  const { selectedBlock } = module;
  return selectedBlock;
}

export function getModuleRootBlock(module: DataModule): DataBlockModel {
  const { rootBlock } = module;
  return module[rootBlock];
}

export function getModuleBlocks(module: DataModule): SitePageDataBlocks {
  const { blocks } = module;
  return blocks;
}

export function getBlockFromModuleBlocks(blockKey: string, module: DataModule): DataBlockModel {
  const blocks = getModuleBlocks(module);
  const block = blocks[blockKey];
  if (!block) {
    throw new Error(`Block ${blockKey} couldn't be matched to module's blocks.`);
  }
  return block;
}

export function getSelectedBlockFromModule(module: DataModule): DataBlockModel {
  const { selectedBlock } = module;
  return getBlockFromModuleBlocks(selectedBlock, module);
}

export function getModuleFromModules(moduleKey: string, modules: DataModules): DataModule {
  return modules[moduleKey];
}

export function getMappedDataModule(
  moduleKey: string,
  modules: DataModules,
  moduleTemplates: ModuleTemplates,
  mixins: MixinsModel
): MappedDataModule {
  const module = getModuleFromModules(moduleKey, modules);
  const rootBlockKey = getModuleRootBlockKey(module);
  const blocks = getModuleBlocks(module);
  return {
    key: module.key,
    rootBlock: rootBlockKey,
    blocks: getMappedDataBlocks(rootBlockKey, blocks, true, modules, moduleTemplates, mixins),
  };
}
