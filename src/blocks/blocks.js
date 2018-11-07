// @flow

import type { BlockGroupModel, BlockModel } from './models';
import Heading from './Heading/Heading';

export const basicBlocks: BlockGroupModel = {
  key: 'Basic',
  blocks: {
    [Heading.key]: Heading,
  },
};

type AllBlocksModel = {
  [string]: BlockGroupModel,
};

export const allBlocks: AllBlocksModel = {
  [basicBlocks.key]: basicBlocks,
};

export function getBlockGroup(groupKey: string): BlockGroupModel | null {
  return allBlocks[groupKey] ? allBlocks[groupKey] : null;
}

export function getBlock(blockGroup: BlockGroupModel, blockKey: string): BlockModel | null {
  return blockGroup.blocks[blockKey] ? blockGroup.blocks[blockKey] : null;
}
