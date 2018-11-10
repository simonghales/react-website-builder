// @flow

import type { DataBlockModel, MappedDataBlocks } from '../../../data/blocks/models';
import type { EditorReduxState } from './reducer';
import { getBlockFromBlocks, getMappedDataBlocks } from '../../../data/blocks/models';

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

export function getEditorMappedBlocks(state: EditorReduxState): MappedDataBlocks {
  const { blocks, rootBlocks } = state;
  return getMappedDataBlocks(rootBlocks, blocks);
}
