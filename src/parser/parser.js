// @flow
import React from 'react';
import type {
  DataBlockPropsModel,
  MappedDataBlockModel,
  MappedDataBlocks,
} from '../data/blocks/models';
import { getBlock, getBlockGroup } from '../blocks/blocks';
import type { BlockModel, BlockModelPropsConfig } from '../blocks/models';
import { parsePropValue } from './props';
import type { MappedDataModule } from '../data/modules/models';
import { isBlockModuleBlock, isBlockModuleImportBlock } from '../blocks/state';
import { BLOCK_REPEATER_DATA_CHILDREN, blockPropsConfigTypes } from '../blocks/props';
import { getDataBlockCombinedPropsConfig } from '../editor/components/EditorContent/components/EditorFields/state';
import type { RepeaterIndexes } from './props';

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
      (propConfig.type && propConfig.type === blockPropsConfigTypes.module) ||
      (propConfig.type && propConfig.type === blockPropsConfigTypes.repeaterData)
    ) {
      childPropKeys.push(propKey);
    } else {
      nonChildPropKeys.push(propKey);
    }
  });
  return [nonChildPropKeys, childPropKeys];
}

export type ParsePropsGrouped = {
  [string]: DataBlockPropsModel,
};

export function isPropRepeaterField(propConfig: BlockModelPropsConfig): boolean {
  return propConfig.type && propConfig.type === blockPropsConfigTypes.repeaterData;
}

function getParsedProps(
  block: BlockModel,
  blockData: MappedDataBlockModel,
  hoveredBlockKey: string,
  propKeys: Array<string>,
  props: DataBlockPropsModel,
  passedProps: DataBlockPropsModel = {},
  combinedProps: ParsePropsGrouped = {},
  isModule: boolean = false,
  repeaterIndexes: RepeaterIndexes
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
    const originalValue = props[propKey];
    const isRepeaterField = isPropRepeaterField(combinedPropConfig);
    if (isRepeaterField) {
      combinedProps = {
        ...combinedProps,
        [blockData.key]: {
          ...combinedProps[blockData.key],
          [propKey]: originalValue,
        },
      };
    }
    const parsedPropValue = parsePropValue(
      blockData,
      propKey,
      originalValue,
      combinedPropConfig,
      hoveredBlockKey,
      passedProps,
      combinedProps,
      isModule,
      repeaterIndexes
    );
    if (!isPropRepeaterField(combinedPropConfig)) {
      parsedProps[propKey] = parsedPropValue;
    } else {
      parsedProps[propKey] = originalValue;
      parsedProps[BLOCK_REPEATER_DATA_CHILDREN] = parsedPropValue;
    }
  });
  return parsedProps;
}

function getProps(
  block: BlockModel,
  blockData: MappedDataBlockModel,
  hoveredBlockKey: string,
  moduleProps: DataBlockPropsModel,
  previousCombinedProps: ParsePropsGrouped,
  repeaterIndexes: RepeaterIndexes
): {
  [string]: any,
} {
  const props = {
    ...block.defaultProps,
    ...blockData.props,
  };

  // get non child and child props keys
  const [nonChildPropsKeys, childPropsKeys] = geSplitPropsKeys(props, block, blockData);

  const isModule = isBlockModuleBlock(block);
  const isModuleImport = isBlockModuleImportBlock(block);

  // console.log('nonChildPropsKeys', nonChildPropsKeys);
  // console.log('childPropsKeys', childPropsKeys);

  // parse the non child props
  const nonChildProps = getParsedProps(
    block,
    blockData,
    hoveredBlockKey,
    nonChildPropsKeys,
    props,
    moduleProps,
    previousCombinedProps,
    isModule,
    repeaterIndexes
  );

  // console.log('moduleProps', moduleProps);

  const combinedProps = {
    ...previousCombinedProps,
    [blockData.key]: nonChildProps,
  };

  const passedProps = isModule || isModuleImport ? nonChildProps : moduleProps;

  // console.log('nonChildProps', nonChildProps);
  // console.log('combinedProps', combinedProps);

  const childProps = getParsedProps(
    block,
    blockData,
    hoveredBlockKey,
    childPropsKeys,
    props,
    passedProps,
    combinedProps,
    false,
    repeaterIndexes
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
  passedProps: DataBlockPropsModel = {},
  combinedProps: ParsePropsGrouped = {},
  repeaterIndexes: RepeaterIndexes = {}
) {
  const blockGroup = getBlockGroup(blockData.groupKey);
  if (!blockGroup) {
    console.warn(`Unable to match block groupKey "${blockData.grougetPropLabelFromDataBlocksPropsDetailspKey}"`);
    return null;
  }
  const block = getBlock(blockGroup, blockData.blockKey);
  if (!block) {
    console.warn(`Unable to match block blockKey "${blockData.blockKey}"`);
    return null;
  }
  const props = getProps(
    block,
    blockData,
    hoveredBlockKey,
    passedProps,
    combinedProps,
    repeaterIndexes
  );
  // return h(block.component, {
  //   ...props,
  //   blockHighlighterKey: blockData.key,
  //   blockHighlighterHovered: blockData.key === hoveredBlockKey,
  //   key: blockData.key,
  // });

  // if (!isBlockModuleBlock(block)) {
  // }

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

export function previewRepeaterBlocksParser(
  blocks: MappedDataBlocks,
  hoveredBlockKey: string,
  passedProps: DataBlockPropsModel,
  combinedProps: ParsePropsGrouped,
  repeaterIndexes: RepeaterIndexes
) {
  return blocks.map(block =>
    renderBlock(block, hoveredBlockKey, passedProps, combinedProps, repeaterIndexes)
  );
}

export function previewBlocksParser(
  blocks: MappedDataBlocks,
  hoveredBlockKey: string,
  passedProps?: DataBlockPropsModel,
  combinedProps?: ParsePropsGrouped,
  repeaterIndexes?: RepeaterIndexes
) {
  return blocks.map(block =>
    renderBlock(block, hoveredBlockKey, passedProps, combinedProps, repeaterIndexes)
  );
}

export function previewModuleParser(
  module: MappedDataModule,
  hoveredBlockKey: string,
  passedProps?: DataBlockPropsModel,
  combinedProps?: ParsePropsGrouped
) {
  const { blocks } = module;
  return previewBlocksParser(blocks, hoveredBlockKey, passedProps, combinedProps);
}
