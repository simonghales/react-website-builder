// @flow

import type { BlockGroupModel, BlockModel } from './models';
import Heading from './basic/Heading/Heading';
import Container from './basic/Container/Container';
import Module from './Module/Module';
import Element from './html/Element/Element';

export const blockGroups = {
  Basic: 'Basic',
  Module: 'Module',
  HTML: 'HTML',
};

export const blockTypes = {
  html: 'html',
  module: 'module',
};

export const basicBlocks: BlockGroupModel = {
  key: blockGroups.Basic,
  blocks: {
    [Heading.key]: Heading,
    [Container.key]: Container,
  },
};

export const moduleBlocks: BlockGroupModel = {
  key: blockGroups.Module,
  blocks: {
    [Module.key]: Module,
  },
};

export const htmlBlocks: BlockGroupModel = {
  key: blockGroups.HTML,
  blocks: {
    [Element.key]: Element,
  },
};

type AllBlocksModel = {
  [string]: BlockGroupModel,
};

export const allBlocks: AllBlocksModel = {
  [basicBlocks.key]: basicBlocks,
  [moduleBlocks.key]: moduleBlocks,
  [htmlBlocks.key]: htmlBlocks,
};

export function getBlockGroup(groupKey: string): BlockGroupModel | null {
  return allBlocks[groupKey] ? allBlocks[groupKey] : null;
}

export function getBlock(blockGroup: BlockGroupModel, blockKey: string): BlockModel | null {
  return blockGroup.blocks[blockKey] ? blockGroup.blocks[blockKey] : null;
}
