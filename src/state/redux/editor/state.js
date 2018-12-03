// @flow

import type {
  DataBlockModel,
  MappedDataBlocks,
  SitePageDataBlocks,
} from '../../../data/blocks/models';
import type { EditorReduxState } from './reducer';
import {
  getBlockFromBlocks,
  getDataBlockLabel,
  getMappedDataBlocks,
  mapDataBlockModuleKey,
} from '../../../data/blocks/models';
import type { BlockStyles } from '../../../data/styles/models';
import { getBlockStyles } from '../../../data/styles/state';
import type { DataModule, DataModules } from '../../../data/modules/models';
import {
  getBlockFromModuleBlocks,
  getModuleFromModules,
  getSelectedBlockFromModule,
  getSelectedBlockKeyFromModule,
} from '../../../data/modules/state';
import {
  getBlockChildrenKeys,
  getBlockLabel,
  getDataBlockMappedMixins,
  getDataBlockMixins,
  isBlockModuleBlock,
} from '../../../data/blocks/state';
import type { MixinModel, MixinsModel } from '../../../data/mixins/models';
import { getBlockMixinsStyles } from '../../../data/mixins/state';
import type { ModuleTemplates } from '../../../data/moduleTemplates/models';
import { getModuleTemplateModuleKey } from '../../../data/moduleTemplates/state';
import type { ReduxState } from '../store';
import { getBlockFromDataBlock } from '../../../blocks/blocks';

export function getModuleFromState(state: EditorReduxState, moduleKey: string): DataModule {
  const { modules } = state;
  const module = modules[moduleKey];
  if (!module) {
    throw new Error(`Couldn't find ${moduleKey} in redux state modules.`);
  }
  return module;
}

export function getSelectedModule(state: EditorReduxState): DataModule {
  const { modules, selectedModule } = state;
  return modules[selectedModule];
}

export function getSelectedModuleKey(state: EditorReduxState): string {
  const { selectedModule } = state;
  return selectedModule;
}

export function getSelectedModuleSelectedBlockKey(state: EditorReduxState): string {
  const selectedModule = getSelectedModule(state);
  const selectedBlock = getSelectedBlockKeyFromModule(selectedModule);
  return selectedBlock;
}

export function getSelectedModuleSelectedBlock(state: EditorReduxState): DataBlockModel {
  const selectedModule = getSelectedModule(state);
  const selectedBlock = getSelectedBlockKeyFromModule(selectedModule);
  return getBlockFromModuleBlocks(selectedBlock, selectedModule);
}

export function getSelectedBlockStyle(state: EditorReduxState): BlockStyles {
  const selectedBlock = getSelectedModuleSelectedBlock(state);
  return getBlockStyles(selectedBlock);
}

export function getMixinsFromState(state: EditorReduxState): MixinsModel {
  const { mixinStyles } = state;
  return mixinStyles;
}

export function getSelectedBlockMixinsStyles(state: EditorReduxState): Array<MixinModel> {
  const mixins = getMixinsFromState(state);
  const selectedBlock = getSelectedModuleSelectedBlock(state);
  const { mixinStyles = [] } = selectedBlock;
  return getBlockMixinsStyles(mixinStyles, mixins);
}

// export function getEditorMappedBlocks(state: EditorReduxState): MappedDataBlocks {
//   const { modules, moduleTemplates, mixinStyles } = state;
//   const selectedModule = getSelectedModule(state);
//   const { blocks, rootBlock } = selectedModule;
//   const mappedBlocks = getMappedDataBlocks(
//     rootBlock,
//     blocks,
//     false,
//     modules,
//     moduleTemplates,
//     mixinStyles
//   );
//   return mappedBlocks;
// }

export function getPreviewMappedBlocks(state: EditorReduxState): MappedDataBlocks {
  const { modules, mixinStyles } = state;
  const selectedModule = getSelectedModule(state);
  const { blocks, rootBlock } = selectedModule;
  const mappedBlocks = getMappedDataBlocks(rootBlock, blocks, true, modules, mixinStyles);
  return mappedBlocks;
}

export function getSelectedModuleSelectedBlockMappedMixins(state: EditorReduxState) {
  const { mixinStyles } = state;
  const selectedModule = getSelectedModule(state);
  const selectedBlock = getSelectedBlockFromModule(selectedModule);
  return getDataBlockMappedMixins(selectedBlock, mixinStyles);
}

export function getSelectedModuleSelectedBlockMixins(state: EditorReduxState): Array<MixinModel> {
  const { mixinStyles } = state;
  const selectedModule = getSelectedModule(state);
  const selectedBlock = getSelectedBlockFromModule(selectedModule);
  return getDataBlockMixins(selectedBlock, mixinStyles);
}

export function getModuleTemplatesFromState(state: EditorReduxState): ModuleTemplates {
  return state.moduleTemplates;
}

export function getModulesFromState(state: EditorReduxState): DataModules {
  return state.modules;
}

// export function getAddableModuleTemplates(state: EditorReduxState): Array<DataModule> {
//   const moduleTemplates = getModuleTemplatesFromState(state);
//   const modules = getModulesFromState(state);
//   const addableModules: Array<DataModule> = [];
//   Object.keys(moduleTemplates).forEach(moduleTemplateKey => {
//     const moduleTemplate = moduleTemplates[moduleTemplateKey];
//     const moduleKey = getModuleTemplateModuleKey(moduleTemplate);
//     const module = getModuleFromModules(moduleKey, modules);
//     addableModules.push(module);
//   });
//   return addableModules;
// }

export function getPreviousModule(state: EditorReduxState): DataModule | null {
  const { selectedModulesHistory } = state;
  if (selectedModulesHistory.length === 0) return null;
  const moduleKey = selectedModulesHistory[selectedModulesHistory.length - 1];
  return getModuleFromState(state, moduleKey);
}

export function getCurrentBlockAddedMixins(state: EditorReduxState): Array<string> {
  const currentBlockMixins = getSelectedBlockMixinsStyles(state);
  return currentBlockMixins.map(mixin => mixin.key);
}

export function getBlockFromSelectedModule(
  state: EditorReduxState,
  blockKey: string
): DataBlockModel {
  const module = getSelectedModule(state);
  const block = getBlockFromModuleBlocks(blockKey, module);
  return block;
}

export type DataBlockPreviewProps = {
  type: string,
  label: string,
  isRootBlock: boolean,
  isModule: boolean,
  moduleKey: string,
};

export function getDataBlockPreviewProps(
  state: EditorReduxState,
  blockKey: string
): DataBlockPreviewProps {
  const modules = getModulesFromState(state);
  const dataBlock = getBlockFromSelectedModule(state, blockKey);
  return {
    type: getBlockLabel(dataBlock, modules),
    label: getDataBlockLabel(dataBlock),
    isRootBlock: dataBlock.isParentModule,
    isModule: isBlockModuleBlock(dataBlock),
    moduleKey: mapDataBlockModuleKey(dataBlock),
  };
}

export function getSelectedBlockKeyFromState(state: EditorReduxState): string {
  const module = getSelectedModule(state);
  return getSelectedBlockKeyFromModule(module);
}
