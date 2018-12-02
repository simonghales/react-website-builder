// @flow
import React from 'react';
import type {
  DataBlockPropsModel,
  MappedDataBlockModel,
  MappedDataBlocks,
} from '../data/blocks/models';
import { getBlock, getBlockGroup } from '../blocks/blocks';
import type { BlockModel } from '../blocks/models';
import { parsePropValue } from './props';
import type { MappedDataModule } from '../data/modules/models';
import { isBlockModuleBlock, isBlockModuleImportBlock } from '../blocks/state';
import { blockPropsConfigTypes } from '../blocks/props';

export function geSplitPropsKeys(
  props: DataBlockPropsModel,
  block: BlockModel,
  blockData: MappedDataBlockModel
): [Array<string>, Array<string>] {
  const nonChildPropKeys = [];
  const childPropKeys = [];
  Object.keys(props).forEach(propKey => {
    const sourcePropConfig = block.propsConfig[propKey] ? block.propsConfig[propKey] : {};
    const dataPropConfig = blockData.propsConfig[propKey] ? blockData.propsConfig[propKey] : {};
    const propConfig = {
      ...sourcePropConfig,
      ...dataPropConfig,
    };
    if (
      (propConfig.type && propConfig.type === blockPropsConfigTypes.blocks) ||
      (propConfig.type && propConfig.type === blockPropsConfigTypes.module)
    ) {
      childPropKeys.push(propKey);
    } else {
      nonChildPropKeys.push(propKey);
    }
  });
  return [nonChildPropKeys, childPropKeys];
}

function getParsedProps(
  block: BlockModel,
  blockData: MappedDataBlockModel,
  hoveredBlockKey: string,
  propKeys: Array<string>,
  props: DataBlockPropsModel,
  passedProps: DataBlockPropsModel = {},
  isModule?: boolean = false
): {
  [string]: any,
} {
  const parsedProps = {};
  propKeys.forEach(propKey => {
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
      hoveredBlockKey,
      passedProps,
      isModule
    );
  });
  return parsedProps;
}

function getProps(
  block: BlockModel,
  blockData: MappedDataBlockModel,
  hoveredBlockKey: string,
  moduleProps: DataBlockPropsModel = {}
): {
  [string]: any,
} {
  const props = {
    ...block.defaultProps,
    ...blockData.props,
  };
  const [nonChildPropsKeys, childPropsKeys] = geSplitPropsKeys(props, block, blockData);

  const isModule = isBlockModuleBlock(block);
  const isModuleImport = isBlockModuleImportBlock(block);

  const nonChildProps = getParsedProps(
    block,
    blockData,
    hoveredBlockKey,
    nonChildPropsKeys,
    props,
    moduleProps,
    isModule
  );

  const passedProps = isModule || isModuleImport ? nonChildProps : moduleProps;

  const childProps = getParsedProps(
    block,
    blockData,
    hoveredBlockKey,
    childPropsKeys,
    props,
    passedProps
  );

  const parsedProps = {
    ...nonChildProps,
    ...childProps,
  };

  const customStyles = blockData.styles ? blockData.styles : {};
  parsedProps.customStyles = customStyles;
  return parsedProps;
}

function renderBlock(
  blockData: MappedDataBlockModel,
  hoveredBlockKey: string,
  passedProps?: DataBlockPropsModel
) {
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
  const props = getProps(block, blockData, hoveredBlockKey, passedProps);
  // return h(block.component, {
  //   ...props,
  //   blockHighlighterKey: blockData.key,
  //   blockHighlighterHovered: blockData.key === hoveredBlockKey,
  //   key: blockData.key,
  // });

  if (!isBlockModuleBlock(block)) {
    console.log('dont return a component');
  }

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

export function previewBlocksParser(
  blocks: MappedDataBlocks,
  hoveredBlockKey: string,
  passedProps?: DataBlockPropsModel
) {
  return blocks.map(block => renderBlock(block, hoveredBlockKey, passedProps));
}

export function previewModuleParser(
  module: MappedDataModule,
  hoveredBlockKey: string,
  passedProps?: DataBlockPropsModel
) {
  const { blocks } = module;
  return previewBlocksParser(blocks, hoveredBlockKey, passedProps);
}
