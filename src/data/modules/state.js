// @flow

import type { DataModule, DataModules, MappedDataModule } from './models';
import type { DataBlockModel, SitePageDataBlocks } from '../blocks/models';
import { getBlockFromBlocks, getMappedDataBlocks } from '../blocks/models';
import type { MixinsModel } from '../mixins/models';
import { isDataBlockAModuleTemplate } from '../blocks/state';

export function getModuleRootBlockKey(module: DataModule): string {
  const { rootBlock } = module;
  return rootBlock;
}

export function getSelectedBlockKeyFromModule(module: DataModule): string {
  const { selectedBlock } = module;
  return selectedBlock;
}

export function getModuleBlocks(module: DataModule): SitePageDataBlocks {
  const { blocks } = module;
  return blocks;
}

export function getModuleRootBlock(module: DataModule): DataBlockModel {
  const { rootBlock: rootBlockKey } = module;
  const blocks = getModuleBlocks(module);
  const rootBlock = getBlockFromBlocks(blocks, rootBlockKey);
  if (!rootBlock) {
    throw new Error(`No root block found within module.`);
  }
  return rootBlock;
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
  const module = modules[moduleKey];
  if (!module) {
    throw new Error(`Couldn't match ${moduleKey} in modules.`);
  }
  return module;
}

export function getMappedDataModule(
  moduleKey: string,
  modules: DataModules,
  mixins: MixinsModel
): MappedDataModule {
  const module = getModuleFromModules(moduleKey, modules);
  const rootBlockKey = getModuleRootBlockKey(module);
  const blocks = getModuleBlocks(module);
  return {
    key: module.key,
    rootBlock: rootBlockKey,
    blocks: getMappedDataBlocks(rootBlockKey, blocks, true, modules, mixins),
  };
}

function addModuleKeyToKeys(
  moduleKey: string,
  moduleKeys: { [string]: number },
  amount: number
): { [string]: number } {
  const updatedModuleKeys = {
    ...moduleKeys,
  };
  if (updatedModuleKeys[moduleKey]) {
    updatedModuleKeys[moduleKey] = updatedModuleKeys[moduleKey] + amount;
  } else {
    updatedModuleKeys[moduleKey] = amount;
  }
  return updatedModuleKeys;
}

export function recursivelyGetAllModuleChildModules(module: DataModule, modules: DataModules) {
  let childModulesKeys = {};

  const rootBlockKey = getModuleRootBlockKey(module);
  const { blocks } = module;

  Object.keys(blocks).forEach(blockKey => {
    const block = blocks[blockKey];

    if (isDataBlockAModuleTemplate(block) && blockKey !== rootBlockKey) {
      let moduleKey = '';

      if (block.moduleKey) {
        // eslint-disable-next-line prefer-destructuring
        moduleKey = block.moduleKey;
      } else {
        throw new Error(`Block is missing moduleKey.`);
      }
      childModulesKeys = addModuleKeyToKeys(moduleKey, childModulesKeys, 1);
      const blockModule = getModuleFromModules(moduleKey, modules);
      const blockModuleChildModuleKeys = recursivelyGetAllModuleChildModules(blockModule, modules);
      Object.keys(blockModuleChildModuleKeys).forEach(childModuleKey => {
        childModulesKeys = addModuleKeyToKeys(
          childModuleKey,
          childModulesKeys,
          blockModuleChildModuleKeys[childModuleKey]
        );
      });
    }
  });

  return childModulesKeys;
}

export function doesModuleChildrenContainModule(
  moduleKeyToCheck: string,
  module: DataModule,
  modules: DataModules
): boolean {
  const allChildModules = recursivelyGetAllModuleChildModules(module, modules);
  return !!allChildModules[moduleKeyToCheck];
}

export function moduleKeyIsChildOfModule(moduleKeyToCheck: string, module: DataModule): boolean {
  let isChild = false;
  Object.keys(module.blocks).forEach(blockKey => {
    const block = module.blocks[blockKey];
    if (block.moduleKey && block.moduleKey === moduleKeyToCheck) {
      isChild = true;
    }
  });
  return isChild;
}

export function getModuleKeyFromModule(module: DataModule): string {
  return module.key;
}

export function getModuleParentModules(
  moduleKeyToMatch: string,
  modules: DataModules
): Array<DataModule> {
  const parentModules = [];
  Object.keys(modules).forEach(moduleKey => {
    const module = modules[moduleKey];
    if (moduleKeyIsChildOfModule(moduleKeyToMatch, module)) {
      parentModules.push(module);
    }
  });
  return parentModules;
}

export function getDataBlocksFromModule(module: DataModule): SitePageDataBlocks {
  return module.blocks;
}

export function getDataBlockFromModule(module: DataModule, blockKey: string): DataBlockModel {
  const blocks = getDataBlocksFromModule(module);
  const block = blocks[blockKey];
  if (!block) {
    throw new Error(`Block "${blockKey}" not found within module blocks.`);
  }
  return block;
}
