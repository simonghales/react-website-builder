// @flow

import type { BlockModelPropsConfig } from '../../blocks/models';
import { blockTypes } from '../../blocks/blocks';
import type { BlockStyles, MappedStyleModel } from '../styles/models';
import { getMappedBlockStyles } from '../styles/state';

export const blockPropsConfigTypes = {
  blocks: 'blocks',
  string: 'string',
};

export type BlockPropsConfigTypes = $Keys<typeof blockPropsConfigTypes>;

export type DataBlockModel = {
  key: string,
  groupKey: string,
  blockKey: string,
  blockType: string,
  label: string,
  props: {
    [string]: any,
  },
  propsConfig: {
    [string]: BlockModelPropsConfig,
  },
  blockChildrenKeys: Array<string>,
  isParentModule: boolean,
  styleKey?: string,
  rawStyles: BlockStyles,
};

export type DataBlockModelMapped = DataBlockModel & {
  blockChildren?: Array<DataBlockModelMapped>,
  styles: MappedStyleModel,
};

export type MappedDataBlocks = Array<DataBlockModelMapped>;

export type SitePageDataBlocks = {
  [string]: DataBlockModel,
};

export function getBlockFromBlocks(blocks: SitePageDataBlocks, key: string): DataBlockModel {
  const block = blocks[key];
  if (!block) {
    throw new Error(`Block "${key}" not found within blocks.`);
  }
  return block;
}

function mapDataBlock(blockKey: string, blocks: SitePageDataBlocks): DataBlockModelMapped {
  const block = getBlockFromBlocks(blocks, blockKey);
  return {
    ...block,
    blockChildren: block.blockChildrenKeys.map((childBlockKey: string) =>
      mapDataBlock(childBlockKey, blocks)
    ),
    styles: getMappedBlockStyles(block),
  };
}

export function getMappedDataBlocks(
  rootBlock: string,
  blocks: SitePageDataBlocks
): MappedDataBlocks {
  return [mapDataBlock(rootBlock, blocks)];
}

export function getDataBlockGroupKey(data: DataBlockModel): string {
  return data.groupKey;
}

export function getDataBlockBlockKey(data: DataBlockModel): string {
  if (data.blockType === blockTypes.html) {
    if (data.props.element) {
      return `<${data.props.element}>`;
    }
  }
  return data.blockKey;
}

export function getDataBlockType(data: DataBlockModel): string {
  return `${getDataBlockGroupKey(data)}.${getDataBlockBlockKey(data)}`;
}

export function getDataBlockLabel(data: DataBlockModel): string {
  return data.label;
}

export function getBlockPropLabel(propKey: string, propConfig: BlockModelPropsConfig): string {
  return propConfig && propConfig.label ? propConfig.label : propKey;
}
