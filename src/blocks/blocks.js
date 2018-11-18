// @flow

import type {BlockGroupModel, BlockModel} from './models';
import Heading from './basic/Heading/Heading';
import Container from './basic/Container/Container';
import Module from './module/Module/Module';
import ModuleImport from './module/ModuleImport/ModuleImport';
import Element from './html/Element/Element';
import type {DataBlockModel} from '../data/blocks/models';
import {blockGroups} from './config';

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
    [ModuleImport.key]: ModuleImport,
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

export const addableBlocks: AllBlocksModel = {
  [basicBlocks.key]: basicBlocks,
};

export function getBlockGroup(groupKey: string): BlockGroupModel | null {
  return allBlocks[groupKey] ? allBlocks[groupKey] : null;
}

export function getBlock(blockGroup: BlockGroupModel, blockKey: string): BlockModel | null {
  return blockGroup.blocks[blockKey] ? blockGroup.blocks[blockKey] : null;
}

export function getBlockFromDataBlock(dataBlock: DataBlockModel): BlockModel {
  const blockGroup = getBlockGroup(dataBlock.groupKey);
  if (!blockGroup) {
    throw new Error(`Couldn't match block group.`);
  }
  const block = getBlock(blockGroup, dataBlock.blockKey);
  if (!block) {
    throw new Error(`Couldn't match block.`);
  }
  return block;
}
