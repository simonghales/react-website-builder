// @flow

import { createSelector } from 'reselect';
import type { ReduxState } from '../store';
import { getMixinsFromState, getModulesFromState, getPagesFromState } from './state';
import type { DataModule, DataModules } from '../../../data/modules/models';
import {
  getDataBlockFromModule,
  getModuleFromModules,
  getModuleKeyFromModule,
  getModuleParentModules,
  getModuleRootBlockKey,
} from '../../../data/modules/state';
import type { DataBlockModel, SitePageDataBlocks } from '../../../data/blocks/models';
import { getBlockFromDataBlock, getDataBlockModuleProps } from '../../../blocks/blocks';
import {
  getBlockChildrenKeys,
  getDataBlockMixinStyles,
  getDataBlockPropsDetails,
} from '../../../data/blocks/state';
import {
  getModuleSelectedBlockKeyFromModulesSelectedBlockKeys,
  getModulesSelectedBlockKeysFromUIState,
  getSelectedModuleKeyFromUIState,
} from '../ui/state';
import type { ModulesSelectedBlockKeys } from '../ui/reducer';
import { getBlockStyles } from '../../../data/styles/state';
import type { MixinsModel } from '../../../data/mixins/models';
import { getBlockMixinsStyles } from '../../../data/mixins/state';
import type { PagesDataModel } from '../../../data/pages/models';

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

export const getPages = (state: ReduxState) => getPagesFromState(state.editor);
export const getModules = (state: ReduxState) => getModulesFromState(state.editor);
export const getMixins = (state: ReduxState) => getMixinsFromState(state.editor);
const getModulesSelectedBlocksKeys = (state: ReduxState) =>
  getModulesSelectedBlockKeysFromUIState(state.ui);
const getSelectedModuleKey = (state: ReduxState) => getSelectedModuleKeyFromUIState(state.ui);

export const getPagesSelector = createSelector(
  [getPages],
  (pages: PagesDataModel) => pages
);

export const getCurrentModuleKey = createSelector(
  [getSelectedModuleKey],
  (moduleKey: string) => moduleKey
);

export const getCurrentModule = createSelector(
  [getCurrentModuleKey, getModules],
  (moduleKey: string, modules: DataModules) => getModuleFromModules(moduleKey, modules)
);

export const getSelectedBlockKey = createSelector(
  [getSelectedModuleKey, getModulesSelectedBlocksKeys, getModules],
  (moduleKey: string, modulesSelectedBlockKeys: ModulesSelectedBlockKeys, modules: DataModules) => {
    const moduleSelectedBlockKey = getModuleSelectedBlockKeyFromModulesSelectedBlockKeys(
      moduleKey,
      modulesSelectedBlockKeys
    );
    if (moduleSelectedBlockKey) {
      return moduleSelectedBlockKey;
    }
    const module = getModuleFromModules(moduleKey, modules);
    const moduleRootBlockKey = getModuleRootBlockKey(module);
    return moduleRootBlockKey;
  }
);

export const getEditorSidebarBlocks = createSelector(
  [getCurrentModule, getSelectedBlockKey],
  (module: DataModule, selectedBlockKey: string) => {
    const { blocks, rootBlock } = module;
    return getDataBlocksKeys(rootBlock, blocks, selectedBlockKey);
  }
);

const getPreviousModules = (state: ReduxState) => state.ui.selectedModulesHistory;

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
  [getCurrentModule, getModules],
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
  [getCurrentModule, getSelectedBlockKey],
  (module: DataModule, selectedBlockKey: string) => {
    const dataBlock = getDataBlockFromModule(module, selectedBlockKey);
    return dataBlock;
  }
);

export const getCurrentModuleRootBlock = createSelector(
  [getCurrentModule],
  (module: DataModule) => {
    const rootBlockKey = getModuleRootBlockKey(module);
    const dataBlock = getDataBlockFromModule(module, rootBlockKey);
    return dataBlock;
  }
);

export const getSelectedBlockBlock = createSelector(
  [getCurrentModule, getSelectedBlock],
  (module: DataModule, dataBlock: DataBlockModel) => getBlockFromDataBlock(dataBlock)
);

export const getSelectedBlockModulePropsConfig = createSelector(
  [getCurrentModule, getModules, getSelectedBlock],
  (module: DataModule, modules: DataModules, dataBlock: DataBlockModel) =>
    getDataBlockModuleProps(dataBlock, modules)
);

export const getModuleBlockPropsDetails = createSelector(
  [getCurrentModule, getCurrentModuleRootBlock],
  (module: DataModule, dataBlock: DataBlockModel) => getDataBlockPropsDetails(dataBlock)
);

export const getSelectedBlockStyle = createSelector(
  [getSelectedBlock],
  (dataBlock: DataBlockModel) => getBlockStyles(dataBlock)
);

export const getSelectedBlockMixinsStyles = createSelector(
  [getSelectedBlock, getMixins],
  (dataBlock: DataBlockModel, mixins: MixinsModel) => {
    const mixinStyles = getDataBlockMixinStyles(dataBlock);
    return getBlockMixinsStyles(mixinStyles, mixins);
  }
);
