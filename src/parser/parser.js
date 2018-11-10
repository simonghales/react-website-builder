// @flow
import React from 'react';
import { DUMMY_PAGE_DATA } from '../data/blocks/dummy';
import type { SitePageDataBlockModel, SitePageDataBlocks } from '../data/blocks/models';
import { BLOCK_TYPE_HTML, getBlock, getBlockGroup } from '../blocks/blocks';
import type { BlockModel } from '../blocks/models';
import { parsePropValue } from './props';

function getProps(
  block: BlockModel,
  blockData: SitePageDataBlockModel
): {
  [string]: any,
} {
  const props = {
    ...block.defaultProps,
    ...blockData.props,
  };
  const parsedProps = {};
  Object.keys(props).forEach(propKey => {
    const propConfig = blockData.propsConfig[propKey] ? blockData.propsConfig[propKey] : {};
    parsedProps[propKey] = parsePropValue(propKey, props[propKey], propConfig);
  });
  return parsedProps;
}

function renderHTMLBlock(blockData: SitePageDataBlockModel) {
  return <blockData.blockKey {...blockData.props} key={blockData.key} />;
}

function renderBlock(blockData: SitePageDataBlockModel) {
  if (blockData.blockType === BLOCK_TYPE_HTML) {
    return renderHTMLBlock(blockData);
  }
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
  return blocks.map(renderBlock);
}
