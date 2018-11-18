// @flow

import type {
  DataBlockModel,
  MappedDataBlocks,
  SitePageDataBlocks,
} from '../../../data/blocks/models';
import type { EditorReduxState } from './reducer';
import { getBlockFromBlocks, getMappedDataBlocks } from '../../../data/blocks/models';
import type { BlockStyles } from '../../../data/styles/models';
import { getBlockStyles } from '../../../data/styles/state';
import type { DataModule, DataModules } from '../../../data/modules/models';
import {
  getBlockFromModuleBlocks,
  getModuleFromModules,
  getSelectedBlockFromModule,
  getSelectedBlockKeyFromModule,
} from '../../../data/modules/state';
import { getDataBlockMappedMixins, getDataBlockMixins } from '../../../data/blocks/state';
import type { MixinModel, MixinsModel } from '../../../data/mixins/models';
import { getBlockMixinsStyles } from '../../../data/mixins/state';
import type { ModuleTemplates } from '../../../data/moduleTemplates/models';
import { getModuleTemplateModuleKey } from '../../../data/moduleTemplates/state';

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

function getMixinsFromState(state: EditorReduxState): MixinsModel {
  return state.mixinStyles;
}

export function getSelectedBlockMixinsStyles(state: EditorReduxState): Array<MixinModel> {
  const mixins = getMixinsFromState(state);
  const selectedBlock = getSelectedModuleSelectedBlock(state);
  const { mixinStyles = [] } = selectedBlock;
  return getBlockMixinsStyles(mixinStyles, mixins);
}

export function getEditorMappedBlocks(state: EditorReduxState): MappedDataBlocks {
  const { modules, moduleTemplates, mixinStyles } = state;
  const selectedModule = getSelectedModule(state);
  const { blocks, rootBlock } = selectedModule;
  const mappedBlocks = getMappedDataBlocks(
    rootBlock,
    blocks,
    false,
    modules,
    moduleTemplates,
    mixinStyles
  );
  return mappedBlocks;
}

export function getPreviewMappedBlocks(state: EditorReduxState): MappedDataBlocks {
  const { modules, moduleTemplates, mixinStyles } = state;
  const selectedModule = getSelectedModule(state);
  const { blocks, rootBlock } = selectedModule;
  const mappedBlocks = getMappedDataBlocks(
    rootBlock,
    blocks,
    true,
    modules,
    moduleTemplates,
    mixinStyles
  );
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

export function getAddableModuleTemplates(state: EditorReduxState): Array<DataModule> {
  const moduleTemplates = getModuleTemplatesFromState(state);
  const modules = getModulesFromState(state);
  const addableModules: Array<DataModule> = [];
  Object.keys(moduleTemplates).forEach(moduleTemplateKey => {
    const moduleTemplate = moduleTemplates[moduleTemplateKey];
    const moduleKey = getModuleTemplateModuleKey(moduleTemplate);
    const module = getModuleFromModules(moduleKey, modules);
    addableModules.push(module);
  });
  return addableModules;
}
