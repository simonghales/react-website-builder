// @flow

import { generateNewModuleTemplateBlock } from '../../../data/blocks/generator';
import { generateNewModule } from '../../../data/modules/generator';
import {
  getBlockFromModuleBlocks,
  getModuleBlocks,
  getModuleFromModules,
  getModuleRootBlock,
  getModuleRootBlockKey,
} from '../../../data/modules/state';
import {
  getBlockBlocks,
  getBlockParentKey,
  getDataBlockPropsDetails,
} from '../../../data/blocks/state';
import {
  addNewModule,
  createNewModuleFromSelectedBlock,
  removeBlockFromModule,
} from '../editor/reducer';
import type { DataModule, DataModules } from '../../../data/modules/models';
import { setModuleSelectedBlockKey } from '../ui/reducer';
import { getBlockFromModule } from '../../../blocks/state';

export function dispatchCreateNewModuleFromSelectedBlock(
  moduleKey: string,
  blockKey: string,
  selectedModule: DataModule,
  dispatch: any
) {
  const selectedBlock = getBlockFromModuleBlocks(blockKey, selectedModule);
  const blocks = getModuleBlocks(selectedModule);
  const newModuleBlocks = getBlockBlocks(selectedBlock.key, blocks);
  const selectedModulePropsDetails = getDataBlockPropsDetails(getModuleRootBlock(selectedModule));

  const newModule = generateNewModule(
    newModuleBlocks,
    selectedBlock.key,
    selectedBlock.label,
    selectedBlock,
    selectedModulePropsDetails
  );

  const newBlock = generateNewModuleTemplateBlock(
    newModule.key,
    selectedBlock.label,
    selectedBlock,
    selectedModulePropsDetails
  );
  console.log('newModule', newModule);
  console.log('newBlock', newBlock);

  dispatch(createNewModuleFromSelectedBlock(moduleKey, blockKey, newModule, newBlock));
  dispatch(setModuleSelectedBlockKey(moduleKey, newBlock.key));
}

export function dispatchAddNewModule(
  newModuleKey: string,
  moduleKey: string,
  modules: DataModules,
  selectedBlockKey: string,
  dispatch: any
) {
  const newModule = getModuleFromModules(newModuleKey, modules);

  const dataBlock = getBlockFromModule(newModule);

  dispatch(addNewModule(moduleKey, dataBlock, selectedBlockKey));
  dispatch(setModuleSelectedBlockKey(moduleKey, dataBlock.key));
}

export function dispatchRemoveBlockFromModule(
  blockKey: string,
  moduleKey: string,
  selectedModule: DataModule,
  dispatch: any
) {
  const rootBlockKey = getModuleRootBlockKey(selectedModule);

  if (blockKey === rootBlockKey) {
    console.warn(`Block to be removed is the root block, which cannot be removed.`);
    return;
  }

  const blocks = getModuleBlocks(selectedModule);

  const blockToRemoveParentKey = getBlockParentKey(blockKey, blocks);

  dispatch(removeBlockFromModule(blockKey, moduleKey));
  dispatch(setModuleSelectedBlockKey(moduleKey, blockToRemoveParentKey));
}
