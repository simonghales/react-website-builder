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
import type { DataModule } from '../../../data/modules/models';
import {
  getBlockFromModuleBlocks,
  getSelectedBlockFromModule,
  getSelectedBlockKeyFromModule,
} from '../../../data/modules/state';
import { getDataBlockMappedMixins } from '../../../data/blocks/state';

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

export function getSelectedModuleSelectedBlockMixins(state: EditorReduxState) {
  const { mixinStyles } = state;
  const selectedModule = getSelectedModule(state);
  const selectedBlock = getSelectedBlockFromModule(selectedModule);
  return getDataBlockMappedMixins(selectedBlock, mixinStyles);
}
