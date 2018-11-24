// @flow

import { createSelector } from 'reselect';
import type { ReduxState } from '../store';
import { getSelectedModule } from './state';
import type { DataModule } from '../../../data/modules/models';
import { getSelectedBlockKeyFromModule } from '../../../data/modules/state';
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
