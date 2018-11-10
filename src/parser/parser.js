// @flow
import React from 'react';
import type { DataBlockModel, DataBlockModelMapped, MappedDataBlocks } from '../data/blocks/models';
import { getBlock, getBlockGroup } from '../blocks/blocks';
import type { BlockModel } from '../blocks/models';
import { parsePropValue } from './props';

function getProps(
  block: BlockModel,
  blockData: DataBlockModelMapped
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
    parsedProps[propKey] = parsePropValue(blockData, propKey, props[propKey], propConfig);
  });
  return parsedProps;
}

function renderHTMLBlock(blockData: DataBlockModel) {
  return <blockData.blockKey {...blockData.props} key={blockData.key} />;
}

function renderBlock(blockData: DataBlockModelMapped) {
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

export function previewBlocksParser(blocks: MappedDataBlocks) {
  return blocks.map(renderBlock);
}
