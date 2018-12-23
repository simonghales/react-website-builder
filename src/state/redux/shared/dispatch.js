// @flow

import { generateNewModuleTemplateBlock } from '../../../data/blocks/generator';
import { generateNewEmptyModule, generateNewModule } from '../../../data/modules/generator';
import {
  getBlockFromModuleBlocks,
  getModuleBlocks,
  getModuleFromModules,
  getModuleRootBlock,
  getModuleRootBlockKey,
} from '../../../data/modules/state';
import {
  getAvailableDataBlockPropsDetails,
  getBlockBlocks,
  getBlockParentKey,
  getDataBlockPropsDetails,
} from '../../../data/blocks/state';
import {
  addNewModule,
  addNewPageReducer,
  createNewModuleFromSelectedBlock,
  removeBlockFromModule,
  wrapBlockWithNewBlockRedux,
} from '../editor/reducer';
import type { DataModule, DataModules } from '../../../data/modules/models';
import { setCreatingPageRedux, setModuleSelectedBlockKey } from '../ui/reducer';
import { getBlockFromModule } from '../../../blocks/state';
import { generateNewPage } from '../../../data/pages/generator';
import type { PageDataModel } from '../../../data/pages/models';
import Repeater from '../../../blocks/groups/functional/Repeater/Repeater';

export function dispatchCreateNewModuleFromSelectedBlock(
  moduleKey: string,
  blockKey: string,
  selectedModule: DataModule,
  dispatch: any
) {
  const selectedBlock = getBlockFromModuleBlocks(blockKey, selectedModule);
  const blocks = getModuleBlocks(selectedModule);
  const newModuleBlocks = getBlockBlocks(selectedBlock.key, blocks);
  const allAvailablePropsDetails = getAvailableDataBlockPropsDetails(selectedBlock.key, blocks);

  const newModule = generateNewModule(
    newModuleBlocks,
    selectedBlock.key,
    selectedBlock.label,
    selectedBlock,
    allAvailablePropsDetails
  );

  const newBlock = generateNewModuleTemplateBlock(
    newModule.key,
    selectedBlock.label,
    selectedBlock,
    allAvailablePropsDetails
  );

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

export function dispatchCreateNewPage(name: string, slug: string, dispatch: any): PageDataModel {
  const emptyModule = generateNewEmptyModule(name);
  const page = generateNewPage(name, slug, emptyModule.key);
  dispatch(addNewPageReducer(page, emptyModule));
  dispatch(setCreatingPageRedux(false));
  return page;
}

export function dispatchWrapSelectedBlockWithRepeaterBlock(
  blockKey: string,
  moduleKey: string,
  dispatch: any
) {
  const newBlock = Repeater.dataBlock({
    blockKey,
  });
  dispatch(wrapBlockWithNewBlockRedux(blockKey, newBlock, moduleKey));
  dispatch(setModuleSelectedBlockKey(moduleKey, newBlock.key));
}
