// @flow
import arrayMove from 'array-move';
import type {
  DataBlockMixinStylesModel,
  DataBlockModel,
  DataBlockPropsConfigModel,
  SitePageDataBlocks,
} from '../../../data/blocks/models';
import type { BlockStyles } from '../../../data/styles/models';
import { getBlockStyles } from '../../../data/styles/state';
import { getBlockFromDataBlock } from '../../../blocks/blocks';
import { getDataBlockFromBlocks } from '../../../data/blocks/models';
import {
  getBlockIndexWithinBlock,
  getBlockParentKey,
  removeBlockKeyFromBlockChildrenKeys,
} from '../../../data/blocks/state';
import {
  getDataBlockProps,
  getDataBlockPropsConfig,
} from '../../../editor/components/EditorContent/components/EditorFields/state';
import type { BlockModelPropsConfig } from '../../../blocks/models';
import type { MixinModel } from '../../../data/mixins/models';
import { DUMMY_STYLE_EMPTY } from '../../../data/styles/dummy';

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

export function addNewDataBlockProp(
  dataBlock: DataBlockModel,
  propKey: string,
  propLabel: string,
  propType: string
) {
  const propsConfig = getDataBlockPropsConfig(dataBlock);
  const props = getDataBlockProps(dataBlock);
  return {
    ...dataBlock,
    props: {
      ...props,
      [propKey]: '',
    },
    propsConfig: {
      ...propsConfig,
      [propKey]: {
        label: propLabel,
        type: propType,
      },
    },
  };
}

export function updateDataBlockPropConfig(
  propsConfig: DataBlockPropsConfigModel,
  propKey: string,
  propConfig: BlockModelPropsConfig
): DataBlockPropsConfigModel {
  return {
    ...propsConfig,
    [propKey]: propConfig,
  };
}

export function updateBlockPropIsLinked(
  block: DataBlockModel,
  propKey: string,
  value: any,
  isLinked: boolean
): DataBlockModel {
  const { propsConfig = {} } = block;
  const propConfig = propsConfig[propKey] ? propsConfig[propKey] : {};
  const updatedBlock = {
    ...block,
    props: {
      ...block.props,
      [propKey]: value,
    },
    propsConfig: {
      ...propsConfig,
      [propKey]: {
        ...propConfig,
        propReference: isLinked,
      },
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

export function addMixinToBlockStylesMixins(
  dataBlock: DataBlockModel,
  mixinKey: string
): DataBlockMixinStylesModel {
  const { mixinStyles = [] } = dataBlock;
  return mixinStyles.concat([
    {
      key: mixinKey,
      disabledModifiers: {},
    },
  ]);
}

export function replaceDataBlockStylesWithMixin(
  dataBlock: DataBlockModel,
  mixinKey: string
): DataBlockModel {
  return {
    ...dataBlock,
    rawStyles: {
      ...DUMMY_STYLE_EMPTY,
    },
    mixinStyles: [
      {
        key: mixinKey,
        disabledModifiers: {},
      },
    ],
  };
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
      ...blockStyles.styles,
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

  const parentBlockKey = getBlockParentKey(selectedBlock.key, blocks);

  let parentBlock = blocks[rootBlockKey];
  if (selectedBlockBlock.childrenAllowed) {
    parentBlock = selectedBlock;
  } else if (parentBlockKey !== '') {
    parentBlock = getDataBlockFromBlocks(blocks, parentBlockKey);
  }

  const updatedBlocks = {
    ...blocks,
    [newBlock.key]: newBlock,
    [parentBlock.key]: addBlockToBlockChildren(parentBlock, newBlock.key, 0),
  };
  return updatedBlocks;
}

export function removeBlockFromBlocks(
  blocks: SitePageDataBlocks,
  blockToRemoveKey: string,
  pushChildrenToParent: boolean
): SitePageDataBlocks {
  const blockToRemove = getDataBlockFromBlocks(blocks, blockToRemoveKey);
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

export function wrapBlockWithBlock(
  blocks: SitePageDataBlocks,
  blockToReplaceKey: string,
  newBlock: DataBlockModel
): SitePageDataBlocks {
  const blockToWrapParentKey = getBlockParentKey(blockToReplaceKey, blocks);
  const blockToWrapParent = getDataBlockFromBlocks(blocks, blockToWrapParentKey);
  const blockToWrapWithinParentIndex = getBlockIndexWithinBlock(
    blockToWrapParent,
    blockToReplaceKey
  );
  const finalBlocks = {
    [newBlock.key]: newBlock,
  };
  Object.keys(blocks).forEach(blockKey => {
    const block = blocks[blockKey];
    if (blockKey === blockToWrapParentKey) {
      const updatedChildrenKeys = block.blockChildrenKeys;
      updatedChildrenKeys.splice(blockToWrapWithinParentIndex, 1, newBlock.key);
      block.blockChildrenKeys = updatedChildrenKeys;
    }
    finalBlocks[blockKey] = block;
  });
  return finalBlocks;
}

export function replaceBlocksWithBlock(
  blocks: SitePageDataBlocks,
  blockToReplaceKey: string,
  newBlock: DataBlockModel
): SitePageDataBlocks {
  const blockToReplaceParentKey = getBlockParentKey(blockToReplaceKey, blocks);
  const blockToReplaceParent = getDataBlockFromBlocks(blocks, blockToReplaceParentKey);
  const blockToReplaceWithinParentIndex = getBlockIndexWithinBlock(
    blockToReplaceParent,
    blockToReplaceKey
  );
  const updatedBlocks = removeBlockFromBlocks(blocks, blockToReplaceKey, false);
  const finalBlocks = {
    [newBlock.key]: newBlock,
  };
  Object.keys(updatedBlocks).forEach(blockKey => {
    const block = updatedBlocks[blockKey];
    if (blockKey === blockToReplaceParentKey) {
      const updatedChildrenKeys = block.blockChildrenKeys;
      updatedChildrenKeys.splice(blockToReplaceWithinParentIndex, 0, newBlock.key);
      block.blockChildrenKeys = updatedChildrenKeys;
    }
    finalBlocks[blockKey] = block;
  });
  return finalBlocks;
}

export function updateMixinStyleValue(
  mixin: MixinModel,
  cssKey: string,
  modifier: string,
  section: string,
  value: string
): MixinModel {
  return {
    ...mixin,
    styles: {
      ...mixin.styles,
      [modifier]: {
        ...mixin.styles[modifier],
        [section]: {
          ...mixin.styles[modifier][section],
          [cssKey]: value,
        },
      },
    },
  };
}

export function updateMixinMixinsOrder(mixin: MixinModel, mixinKeys: Array<string>): MixinModel {
  const { mixins = [] } = mixin;
  const updatedMixins = mixinKeys.map(mixinKey =>
    mixins.find(findMixin => findMixin.key === mixinKey)
  );
  return {
    ...mixin,
    mixins: updatedMixins,
  };
}

export function removeMixinFromMixinMixins(
  mixin: MixinModel,
  mixinToRemoveKey: string
): MixinModel {
  const { mixins = [] } = mixin;
  const updatedMixins = mixins.filter(mixinToFilter => mixinToFilter.key !== mixinToRemoveKey);
  return {
    ...mixin,
    mixins: updatedMixins,
  };
}

export function addMixinToMixin(mixin: MixinModel, mixinToAddKey: string): MixinModel {
  const { mixins = [] } = mixin;
  const addedMixin = {
    key: mixinToAddKey,
    disabledModifiers: {},
  };
  const updatedMixins = mixins.slice().concat([addedMixin]);
  return {
    ...mixin,
    mixins: updatedMixins,
  };
}
