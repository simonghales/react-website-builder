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
  getSelectedBlockFromModule,
} from '../../../data/modules/state';
import {
  getBlockLabel,
  getDataBlockMappedMixins,
  getDataBlockMixins,
  isBlockModuleBlock,
} from '../../../data/blocks/state';
import type { MixinModel, MixinsModel } from '../../../data/mixins/models';
import type { ReduxState } from '../store';
import { getCurrentModule, getMixins, getModules, getSelectedBlockMixinsStyles } from './selector';

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

export function getPreviewMappedBlocks(state: ReduxState): MappedDataBlocks {
  const modules = getModules(state);
  const mixins = getMixins(state);
  const selectedModule = getCurrentModule(state);
  const blocks = getModuleBlocks(selectedModule);
  const rootBlockKey = getModuleRootBlockKey(selectedModule);
  const mappedBlocks = getMappedDataBlocks(rootBlockKey, blocks, true, modules, mixins);
  return mappedBlocks;
}

export function getSelectedModuleSelectedBlockMappedMixins(state: ReduxState) {
  const mixins = getMixins(state);
  const selectedModule = getCurrentModule(state);
  const selectedBlock = getSelectedBlockFromModule(selectedModule);
  return getDataBlockMappedMixins(selectedBlock, mixins);
}

export function getSelectedModuleSelectedBlockMixins(state: ReduxState): Array<MixinModel> {
  const mixins = getMixins(state);
  const selectedModule = getCurrentModule(state);
  const selectedBlock = getSelectedBlockFromModule(selectedModule);
  return getDataBlockMixins(selectedBlock, mixins);
}

export function getModulesFromState(state: EditorReduxState): DataModules {
  return state.modules;
}

export function getCurrentBlockAddedMixins(state: ReduxState): Array<string> {
  const currentBlockMixins = getSelectedBlockMixinsStyles(state.editor);
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
