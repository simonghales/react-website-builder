// @flow

import type { DataBlockModel, MappedDataBlocks } from '../../../data/blocks/models';
import type { EditorReduxState } from './reducer';
import { getBlockFromBlocks, getMappedDataBlocks } from '../../../data/blocks/models';
import type { BlockStyles } from '../../../data/styles/models';
import { getBlockStyles } from '../../../data/styles/state';
import type { DataModule } from '../../../data/modules/models';

export function getSelectedModule(state: EditorReduxState): DataModule {
  const { modules, selectedModule } = state;
  return modules[selectedModule];
}

export function getSelectedModuleKey(state: EditorReduxState): string {
  const { selectedModule } = state;
  return selectedModule;
}

export function getBlockViaKey(state: EditorReduxState, blockKey: string): DataBlockModel {
  const selectedModule = getSelectedModule(state);
  const { blocks } = selectedModule;
  return getBlockFromBlocks(blocks, blockKey);
}

export function getSelectedBlockKey(state: EditorReduxState): string {
  const { selectedBlock } = state;
  return selectedBlock;
}

export function getSelectedBlock(state: EditorReduxState): DataBlockModel {
  const selectedBlock = getSelectedBlockKey(state);
  return getBlockViaKey(state, selectedBlock);
}

export function getSelectedBlockStyle(state: EditorReduxState): BlockStyles {
  const selectedBlock = getSelectedBlock(state);
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
