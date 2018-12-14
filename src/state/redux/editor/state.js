// @flow

import type { MappedDataBlocks } from '../../../data/blocks/models';
import type { EditorReduxState } from './reducer';
import {
  getDataBlockLabel,
  getMappedDataBlocks,
  mapDataBlockModuleKey,
} from '../../../data/blocks/models';
import type { DataModule, DataModules } from '../../../data/modules/models';
import {
  getBlockFromModuleBlocks,
  getModuleBlocks,
  getModuleRootBlockKey,
} from '../../../data/modules/state';
import {
  getBlockLabel,
  getDataBlockMappedMixins,
  getDataBlockMixins,
  isBlockModuleBlock,
} from '../../../data/blocks/state';
import type { MixinModel, MixinsModel } from '../../../data/mixins/models';
import type { ReduxState } from '../store';
import {
  getCurrentModule,
  getMixins,
  getModules,
  getSelectedBlockKey,
  getSelectedBlockMixinsStyles,
  getSelectedPageSelector,
} from './selector';
import { getPageModuleKey } from '../../../data/pages/state';

export function getModuleFromState(state: EditorReduxState, moduleKey: string): DataModule {
  const { modules } = state;
  const module = modules[moduleKey];
  if (!module) {
    throw new Error(`Couldn't find ${moduleKey} in redux state modules.`);
  }
  return module;
}

export function getMixinsFromState(state: EditorReduxState): MixinsModel {
  const { mixinStyles } = state;
  return mixinStyles;
}

export function getPreviewMappedBlocks(
  module: DataModule,
  modules: DataModules,
  mixins: MixinsModel
): MappedDataBlocks {
  const blocks = getModuleBlocks(module);
  const rootBlockKey = getModuleRootBlockKey(module);
  const mappedBlocks = getMappedDataBlocks(rootBlockKey, blocks, true, modules, mixins);
  return mappedBlocks;
}

export function getPreviewModuleMappedBlocks(state: ReduxState): MappedDataBlocks {
  const modules = getModules(state);
  const mixins = getMixins(state);
  const selectedModule = getCurrentModule(state);
  return getPreviewMappedBlocks(selectedModule, modules, mixins);
}

export function getPagePreviewMappedBlocks(state: ReduxState): MappedDataBlocks {
  const modules = getModules(state);
  const mixins = getMixins(state);
  const selectedPage = getSelectedPageSelector(state);
  const pageModuleKey = getPageModuleKey(selectedPage);
  const pageModule = getModuleFromState(state.editor, pageModuleKey);
  return getPreviewMappedBlocks(pageModule, modules, mixins);
}

export function getSelectedModuleSelectedBlockMappedMixins(state: ReduxState) {
  const mixins = getMixins(state);
  const selectedModule = getCurrentModule(state);
  const selectedBlockKey = getSelectedBlockKey(state);
  const selectedBlock = getBlockFromModuleBlocks(selectedBlockKey, selectedModule);
  return getDataBlockMappedMixins(selectedBlock, mixins);
}

export function getSelectedModuleSelectedBlockMixins(state: ReduxState): Array<MixinModel> {
  const mixins = getMixins(state);
  const selectedModule = getCurrentModule(state);
  const selectedBlockKey = getSelectedBlockKey(state);
  const selectedBlock = getBlockFromModuleBlocks(selectedBlockKey, selectedModule);
  return getDataBlockMixins(selectedBlock, mixins);
}

export function getPagesFromState(state: EditorReduxState): DataModules {
  return state.pages;
}

export function getModulesFromState(state: EditorReduxState): DataModules {
  return state.modules;
}

export function getCurrentBlockAddedMixins(state: ReduxState): Array<string> {
  const currentBlockMixins = getSelectedBlockMixinsStyles(state);
  return currentBlockMixins.map(mixin => mixin.key);
}

export type DataBlockPreviewProps = {
  type: string,
  label: string,
  isRootBlock: boolean,
  isModule: boolean,
  moduleKey: string,
};

export function getDataBlockPreviewProps(
  state: ReduxState,
  blockKey: string
): DataBlockPreviewProps {
  const modules = getModulesFromState(state.editor);
  const selectedModule = getCurrentModule(state);
  const dataBlock = getBlockFromModuleBlocks(blockKey, selectedModule);
  return {
    type: getBlockLabel(dataBlock, modules),
    label: getDataBlockLabel(dataBlock),
    isRootBlock: dataBlock.isParentModule,
    isModule: isBlockModuleBlock(dataBlock),
    moduleKey: mapDataBlockModuleKey(dataBlock),
  };
}

export function getAllPagePathsFromState(state: EditorReduxState): Array<string> {
  const pages = getPagesFromState(state);
  return Object.keys(pages).map(pageKey => pages[pageKey].slug);
}
