// @flow
import React from 'react';
import { DUMMY_PAGE_DATA } from '../data/dummy';
import type { SitePageDataBlockModel, SitePageDataBlocks } from '../data/models';
import { getBlock, getBlockGroup } from '../blocks/blocks';
import type { BlockModel } from '../blocks/models';

function getProps(
  block: BlockModel,
  blockData: SitePageDataBlockModel
): {
  [string]: any,
} {
  return {
    ...block.defaultProps,
    ...blockData.props,
  };
}

function renderBlock(blockData: SitePageDataBlockModel) {
  const blockGroup = getBlockGroup(blockData.groupKey);
  if (!blockGroup) {
    console.warn(`Unable to match block groupKey "${blockData.groupKey}"`);
    return null;
  }
  const block = getBlock(blockGroup, blockData.blockKey);
  if (!block) {
    console.warn(`Unable to match block blockKey "${blockData.blockKey}"`);
    return null;
  }
  const props = getProps(block, blockData);
  return <block.component {...props} key={blockData.key} />;
}

export function previewBlocksParser(blocks: SitePageDataBlocks) {
  return <React.Fragment>{blocks.map(renderBlock)}</React.Fragment>;
}
