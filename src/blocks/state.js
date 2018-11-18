// @flow

import type {
  AddableBlockGroups,
  AddBlockGroupModel,
  AddBlockModel,
  BlockGroupModel,
  BlockModel,
} from './models';
import { addableBlocks, getBlock, getBlockGroup } from './blocks';
import type { DataModule } from '../data/modules/models';
import type { DataBlockModel } from '../data/blocks/models';

function mapBlockToAddableBlock(block: BlockModel): AddBlockModel {
  return {
    key: block.key,
    label: block.key,
    icon: '', // todo
    isModule: false,
  };
}

function mapBlockGroupToAddableBlockGroup(blockGroup: BlockGroupModel): AddBlockGroupModel {
  const mappedBlocks = {};
  Object.keys(blockGroup.blocks).forEach(blockKey => {
    mappedBlocks[blockKey] = mapBlockToAddableBlock(blockGroup.blocks[blockKey]);
  });
  return {
    key: blockGroup.key,
    label: blockGroup.key,
    blocks: mappedBlocks,
  };
}

function mapModuleToAddableBlock(module: DataModule): AddBlockModel {
  return {
    key: module.key,
    label: module.name,
    icon: '',
    isModule: true,
  };
}

function mapModulesToAddableBlockGroup(
  groupKey: string,
  label: string,
  modules: Array<DataModule>
): AddBlockGroupModel {
  const mappedBlocks = {};
  modules.forEach(module => {
    mappedBlocks[module.key] = mapModuleToAddableBlock(module);
  });
  return {
    key: groupKey,
    label,
    blocks: mappedBlocks,
  };
}

function mapAllModulesToAddableBlockGroups(modules: Array<DataModule>): AddableBlockGroups {
  const moduleGroups: {
    [string]: Array<DataModule>,
  } = {};
  modules.forEach(module => {
    if (moduleGroups[module.groupKey]) {
      moduleGroups[module.groupKey] = moduleGroups[module.groupKey].concat([module]);
    } else {
      moduleGroups[module.groupKey] = [module];
    }
  });
  const mappedModuleGroups = {};
  Object.keys(moduleGroups).forEach(groupKey => {
    mappedModuleGroups[groupKey] = mapModulesToAddableBlockGroup(
      groupKey,
      groupKey,
      moduleGroups[groupKey]
    );
  });
  return mappedModuleGroups;
}

export function getAddableBlockGroups(modules: Array<DataModule>): AddableBlockGroups {
  const addableBlockGroups = {};
  Object.keys(addableBlocks).forEach(groupKey => {
    addableBlockGroups[groupKey] = mapBlockGroupToAddableBlockGroup(addableBlocks[groupKey]);
  });
  const addableModulesBlockGroups = mapAllModulesToAddableBlockGroups(modules);
  return {
    ...addableModulesBlockGroups,
    ...addableBlockGroups,
  };
}

export function getBlockDefaultDataBlock(groupKey: string, blockKey: string): DataBlockModel {
  const group = getBlockGroup(groupKey);
  if (!group) {
    throw new Error(`Group ${groupKey} could not be matched.`);
  }
  const block = getBlock(group, blockKey);
  if (!block) {
    throw new Error(`Block ${blockKey} could not be matched.`);
  }
  const { dataBlock } = block;
  return dataBlock();
}
