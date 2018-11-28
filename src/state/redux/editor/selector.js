// @flow

import { createSelector } from 'reselect';
import type { ReduxState } from '../store';
import { getSelectedModule } from './state';
import type { DataModule, DataModules } from '../../../data/modules/models';
import {
  doesModuleChildrenContainModule,
  getModuleFromModules,
  getModuleKeyFromModule,
  getModuleParentModules,
  getSelectedBlockFromModule,
  getSelectedBlockKeyFromModule,
} from '../../../data/modules/state';
import type { SitePageDataBlocks } from '../../../data/blocks/models';
import { getBlockFromDataBlock } from '../../../blocks/blocks';
import { getBlockChildrenKeys } from '../../../data/blocks/state';

export type BlocksKeys = {
  key: string,
  childrenEnabled: boolean,
  children: Array<BlocksKeys>,
  selected: boolean,
};

function getDataBlocksKeys(
  blockKey: string,
  blocks: SitePageDataBlocks,
  selectedBlockKey: string
): BlocksKeys {
  const dataBlock = blocks[blockKey];
  const block = getBlockFromDataBlock(dataBlock);
  const blockChildren = getBlockChildrenKeys(dataBlock);
  return {
    key: blockKey,
    childrenEnabled: block.childrenAllowed,
    children: blockChildren.map(childKey => getDataBlocksKeys(childKey, blocks, selectedBlockKey)),
    selected: blockKey === selectedBlockKey,
  };
}

const getModule = (state: ReduxState) => getSelectedModule(state.editor);

export const getEditorSidebarBlocks = createSelector(
  [getModule],
  (module: DataModule) => {
    const { blocks, rootBlock } = module;
    const selectedBlockKey = getSelectedBlockKeyFromModule(module);
    return getDataBlocksKeys(rootBlock, blocks, selectedBlockKey);
  }
);

export const getSelectedBlockKey = createSelector(
  [getModule],
  (module: DataModule) => {
    const selectedBlockKey = getSelectedBlockKeyFromModule(module);
    return selectedBlockKey;
  }
);

export const getCurrentModuleKey = createSelector(
  [getModule],
  (module: DataModule) => module.key
);

const getPreviousModules = (state: ReduxState) => state.editor.selectedModulesHistory;
const getModules = (state: ReduxState) => state.editor.modules;

export const getPreviousModulesKeys = createSelector(
  [getPreviousModules],
  (modulesKeys: Array<string>) => modulesKeys
);

export const getPreviousModule = createSelector(
  [getPreviousModules, getModules],
  (modulesKeys: Array<string>, modules: DataModules) => {
    if (modulesKeys.length > 0) {
      const previousModuleKey = modulesKeys[modulesKeys.length - 1];
      return getModuleFromModules(previousModuleKey, modules);
    }
    return null;
  }
);

export const getParentModules = createSelector(
  [getModule, getModules],
  (module: DataModule, modules: DataModules) => {
    const moduleKeyToMatch = getModuleKeyFromModule(module);
    return getModuleParentModules(moduleKeyToMatch, modules);
  }
);

export const getAddableModules = createSelector(
  [getModules],
  (modules: DataModules) =>
    Object.keys(modules)
      .map(moduleKey => modules[moduleKey])
      .filter(module => module.isTemplate)
);

export const getSelectedBlock = createSelector(
  [getModule],
  (module: DataModule) => {
    const block = getSelectedBlockFromModule(module);
    return block;
  }
);

export const getSelectedBlockBlock = createSelector(
  [getModule],
  (module: DataModule) => {
    const dataBlock = getSelectedBlockFromModule(module);
    return getBlockFromDataBlock(dataBlock);
  }
);
