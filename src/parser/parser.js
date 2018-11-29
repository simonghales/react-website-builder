// @flow
import React from 'react';
import h from 'react-hyperscript';
import type { MappedDataBlockModel, MappedDataBlocks } from '../data/blocks/models';
import { getBlock, getBlockGroup } from '../blocks/blocks';
import type { BlockModel } from '../blocks/models';
import { parsePropValue } from './props';
import type { MappedDataModule } from '../data/modules/models';

function getProps(
  block: BlockModel,
  blockData: MappedDataBlockModel,
  hoveredBlockKey: string
): {
  [string]: any,
} {
  const props = {
    ...block.defaultProps,
    ...blockData.props,
  };
  const parsedProps = {};
  Object.keys(props).forEach(propKey => {
    const sourcePropConfig = block.propsConfig[propKey] ? block.propsConfig[propKey] : {};
    const dataPropConfig = blockData.propsConfig[propKey] ? blockData.propsConfig[propKey] : {};
    const combinedPropConfig = {
      ...sourcePropConfig,
      ...dataPropConfig,
    };
    parsedProps[propKey] = parsePropValue(
      blockData,
      propKey,
      props[propKey],
      combinedPropConfig,
      hoveredBlockKey
    );
  });
  const customStyles = blockData.styles ? blockData.styles : {};
  parsedProps.customStyles = customStyles;
  return parsedProps;
}

function renderBlock(blockData: MappedDataBlockModel, hoveredBlockKey: string) {
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
  const props = getProps(block, blockData, hoveredBlockKey);
  // return h(block.component, {
  //   ...props,
  //   blockHighlighterKey: blockData.key,
  //   blockHighlighterHovered: blockData.key === hoveredBlockKey,
  //   key: blockData.key,
  // });
  const BlockComponent = block.component;
  return (
    <BlockComponent
      {...props}
      blockHighlighterKey={blockData.key}
      blockHighlighterHovered={blockData.key === hoveredBlockKey}
      key={blockData.key}
    />
  );
}

export function previewBlocksParser(blocks: MappedDataBlocks, hoveredBlockKey: string) {
  return blocks.map(block => renderBlock(block, hoveredBlockKey));
}

export function previewModuleParser(module: MappedDataModule, hoveredBlockKey: string) {
  const { blocks } = module;
  return previewBlocksParser(blocks, hoveredBlockKey);
}
