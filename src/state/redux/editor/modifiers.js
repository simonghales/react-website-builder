// @flow
import arrayMove from 'array-move';
import type { DataBlockModel, SitePageDataBlocks } from '../../../data/blocks/models';
import type { BlockStyles } from '../../../data/styles/models';
import { getBlockStyles } from '../../../data/styles/state';

export function updateBlockProp(
  block: DataBlockModel,
  propKey: string,
  value: any
): DataBlockModel {
  return {
    ...block,
    props: {
      ...block.props,
      [propKey]: value,
    },
  };
}

export function updateBlockStyle(
  block: DataBlockModel,
  modifier: string,
  section: string,
  cssKey: string,
  value: string
): BlockStyles {
  const blockStyles = getBlockStyles(block);
  return {
    ...blockStyles,
    styles: {
      [modifier]: {
        ...blockStyles.styles[modifier],
        [section]: {
          ...blockStyles.styles[modifier][section],
          [cssKey]: value,
        },
      },
    },
  };
}

function removeBlockFromBlockChildren(block: DataBlockModel, blockKey: string): DataBlockModel {
  const blockIndex = block.blockChildrenKeys.indexOf(blockKey);
  const updatedBlockChildrenKeys = block.blockChildrenKeys.slice();
  updatedBlockChildrenKeys.splice(blockIndex, 1);
  return {
    ...block,
    blockChildrenKeys: updatedBlockChildrenKeys,
  };
}

function addBlockToBlockChildren(
  block: DataBlockModel,
  blockKey: string,
  targetIndex: number
): DataBlockModel {
  const updatedBlockChildrenKeys = block.blockChildrenKeys.slice();
  updatedBlockChildrenKeys.splice(targetIndex, 0, blockKey);
  return {
    ...block,
    blockChildrenKeys: updatedBlockChildrenKeys,
  };
}

function reorderBlockInBlockChildren(
  block: DataBlockModel,
  blockKey: string,
  targetIndex: number
): DataBlockModel {
  const blockIndex = block.blockChildrenKeys.indexOf(blockKey);
  let updatedBlockChildrenKeys = block.blockChildrenKeys.slice();
  console.log('from blockIndex', blockIndex);
  console.log('to targetIndex', targetIndex);
  console.log('updatedBlockChildrenKeys', updatedBlockChildrenKeys.join(','));
  updatedBlockChildrenKeys = arrayMove(updatedBlockChildrenKeys, blockIndex, targetIndex);
  console.log('updatedBlockChildrenKeys', updatedBlockChildrenKeys.join(','));
  return {
    ...block,
    blockChildrenKeys: updatedBlockChildrenKeys,
  };
}

export function updateBlocksOrder(
  targetKey: string,
  destinationKey: string,
  destinationIndex: number,
  sourceKey: string,
  blocks: SitePageDataBlocks
): SitePageDataBlocks {
  if (destinationKey === sourceKey) {
    return {
      ...blocks,
      [destinationKey]: reorderBlockInBlockChildren(
        blocks[destinationKey],
        targetKey,
        destinationIndex
      ),
    };
  }

  return {
    ...blocks,
    [sourceKey]: removeBlockFromBlockChildren(blocks[sourceKey], targetKey),
    [destinationKey]: addBlockToBlockChildren(blocks[destinationKey], targetKey, destinationIndex),
  };
}
