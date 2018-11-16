// @flow
import React from 'react';
import type { DataBlockModel, MappedDataBlockModel, MappedDataBlocks } from '../data/blocks/models';
import { getBlock, getBlockGroup } from '../blocks/blocks';
import type { BlockModel } from '../blocks/models';
import { parsePropValue } from './props';
import type { DataModules, MappedDataModule } from '../data/modules/models';
import { getModuleFromModules } from '../data/modules/state';

function getProps(
  block: BlockModel,
  blockData: MappedDataBlockModel
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
    parsedProps[propKey] = parsePropValue(blockData, propKey, props[propKey], combinedPropConfig);
  });
  const customStyles = blockData.styles ? blockData.styles : {};
  parsedProps.customStyles = customStyles;
  return parsedProps;
}

function renderBlock(blockData: MappedDataBlockModel) {
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

export function previewModuleParser(module: MappedDataModule) {
  const { blocks } = module;
  return previewBlocksParser(blocks);
}
