// @flow

import type { DataBlockModel, MappedDataBlocks } from '../../../data/blocks/models';
import type { EditorReduxState } from './reducer';
import { getBlockFromBlocks, getMappedDataBlocks } from '../../../data/blocks/models';
import type { BlockStyles } from '../../../data/styles/models';

export function getBlockViaKey(state: EditorReduxState, blockKey: string): DataBlockModel {
  const { blocks } = state;
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

export function getBlockStyleViaKey(state: EditorReduxState, styleKey: string): BlockStyles {
  const { blockStyles } = state;
  return blockStyles[styleKey];
}

export function getSelectedBlockStyle(state: EditorReduxState): BlockStyles | null {
  const selectedBlock = getSelectedBlock(state);
  const { styleKey } = selectedBlock;
  if (!styleKey) return null;
  const blockStyle = getBlockStyleViaKey(state, styleKey);
  return blockStyle;
}

export function getEditorMappedBlocks(state: EditorReduxState): MappedDataBlocks {
  const { blocks, rootBlocks, blockStyles } = state;
  return getMappedDataBlocks(rootBlocks, blocks, blockStyles);
}
