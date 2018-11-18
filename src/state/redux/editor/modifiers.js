// @flow
import arrayMove from 'array-move';
import type {
  DataBlockMixinStylesModel,
  DataBlockModel,
  SitePageDataBlocks,
} from '../../../data/blocks/models';
import type { BlockStyles } from '../../../data/styles/models';
import { getBlockStyles } from '../../../data/styles/state';
import { getBlockFromDataBlock } from '../../../blocks/blocks';
import { getBlockFromBlocks } from '../../../data/blocks/models';
import { getBlockParentKey, removeBlockKeyFromBlockChildrenKeys } from '../../../data/blocks/state';

export function updateBlockProp(
  block: DataBlockModel,
  propKey: string,
  value: any
): DataBlockModel {
  const updatedBlock = {
    ...block,
    props: {
      ...block.props,
      [propKey]: value,
    },
  };
  return updatedBlock;
}

export function updateBlockStylesMixinsOrderByKeys(
  dataBlock: DataBlockModel,
  mixinKeys: Array<string>
): DataBlockMixinStylesModel {
  const { mixinStyles = [] } = dataBlock;
  return mixinKeys.map(mixinKey => {
    const mixinIndex = mixinStyles.map(mixin => mixin.key).indexOf(mixinKey);
    return mixinStyles[mixinIndex];
  });
}

export function removeBlockStylesMixinViaKey(
  dataBlock: DataBlockModel,
  mixinKey: string
): DataBlockMixinStylesModel {
  const { mixinStyles = [] } = dataBlock;
  const mixinIndex = mixinStyles.map(mixin => mixin.key).indexOf(mixinKey);
  const updatedMixinStyles = mixinStyles;
  updatedMixinStyles.splice(mixinIndex, 1);
  return updatedMixinStyles;
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

export type BlockOrder = {
  children: Array<string>,
};

export type BlocksOrder = {
  [string]: BlockOrder,
};

function updateBlockOrder(
  block: DataBlockModel,
  blockOrder: BlockOrder,
  rootBlocksOrder: Array<string>
): DataBlockModel {
  const blockChildrenKeys =
    block.isParentModule && !blockOrder ? rootBlocksOrder : blockOrder.children;
  return {
    ...block,
    blockChildrenKeys,
  };
}

export function updateAllBlocksOrder(
  blocksOrder: BlocksOrder,
  blocks: SitePageDataBlocks,
  rootBlocksOrder: Array<string>
): SitePageDataBlocks {
  const updatedBlocks = {};
  Object.keys(blocks).forEach(blockKey => {
    const block = blocks[blockKey];
    updatedBlocks[block.key] = updateBlockOrder(block, blocksOrder[block.key], rootBlocksOrder);
  });
  return {
    ...blocks,
    ...updatedBlocks,
  };
}

export function addNewBlockToBlocks(
  blocks: SitePageDataBlocks,
  rootBlockKey: string,
  newBlock: DataBlockModel,
  selectedBlock: DataBlockModel
): SitePageDataBlocks {
  if (blocks[newBlock.key]) {
    throw new Error(`The key for this new block is already in use.`);
  }
  const selectedBlockBlock = getBlockFromDataBlock(selectedBlock);

  const parentBlock = selectedBlockBlock.childrenAllowed ? selectedBlock : blocks[rootBlockKey];

  const updatedBlocks = {
    ...blocks,
    [newBlock.key]: newBlock,
    [parentBlock.key]: addBlockToBlockChildren(parentBlock, newBlock.key, 0),
  };
  return updatedBlocks;
}

export function removeBlockFromBlocks(
  blocks: SitePageDataBlocks,
  blockToRemoveKey: string
): SitePageDataBlocks {
  const blockToRemove = getBlockFromBlocks(blocks, blockToRemoveKey);
  const blockToRemoveChildren = blockToRemove.blockChildrenKeys
    ? blockToRemove.blockChildrenKeys
    : [];
  const blockToRemoveParentKey = getBlockParentKey(blockToRemoveKey, blocks);
  const updatedBlocks = {};
  Object.keys(blocks).forEach(blockKey => {
    const block = blocks[blockKey];
    if (blockKey === blockToRemoveKey || blockToRemoveChildren.includes(blockKey)) {
      // do nothing
    } else if (blockKey === blockToRemoveParentKey) {
      const { blockChildrenKeys = [] } = block;
      updatedBlocks[blockKey] = {
        ...block,
        blockChildrenKeys: removeBlockKeyFromBlockChildrenKeys(blockToRemoveKey, blockChildrenKeys),
      };
    } else {
      updatedBlocks[blockKey] = block;
    }
  });
  return updatedBlocks;
}
