// @flow

import type { DataModule, DataModules, MappedDataModule } from './models';
import type { DataBlockModel, SitePageDataBlocks } from '../blocks/models';
import { getMappedDataBlocks } from '../blocks/models';
import type { ModuleTemplates } from '../moduleTemplates/models';

export function getModuleRootBlockKey(module: DataModule): string {
  const { rootBlock } = module;
  return rootBlock;
}

export function getModuleRootBlock(module: DataModule): DataBlockModel {
  const { rootBlock } = module;
  return module[rootBlock];
}

export function getModuleBlocks(module: DataModule): SitePageDataBlocks {
  const { blocks } = module;
  return blocks;
}

export function getModuleFromModules(moduleKey: string, modules: DataModules): DataModule {
  return modules[moduleKey];
}

export function getMappedDataModule(
  moduleKey: string,
  modules: DataModules,
  moduleTemplates: ModuleTemplates
): MappedDataModule {
  const module = getModuleFromModules(moduleKey, modules);
  const rootBlockKey = getModuleRootBlockKey(module);
  const blocks = getModuleBlocks(module);
  return {
    key: module.key,
    rootBlock: rootBlockKey,
    blocks: getMappedDataBlocks(rootBlockKey, blocks, true, modules, moduleTemplates),
  };
}
