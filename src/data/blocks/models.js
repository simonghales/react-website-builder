// @flow

import type { BlockModelPropsConfig } from '../../blocks/models';
import { blockTypes } from '../../blocks/blocks';

export const blockPropsConfigTypes = {
  blocks: 'blocks',
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
};

export type DataBlockModelMapped = DataBlockModel & {
  blockChildren?: Array<DataBlockModelMapped>,
};

export type MappedDataBlocks = Array<DataBlockModelMapped>;

export type SitePageDataBlocks = {
  [string]: DataBlockModel,
};

export type SitePageDataModel = {
  blocks: SitePageDataBlocks,
  rootBlocks: Array<string>,
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
  };
}

export function getMappedDataBlocks(
  rootBlocks: Array<string>,
  blocks: SitePageDataBlocks
): MappedDataBlocks {
  return rootBlocks.map(blockKey => mapDataBlock(blockKey, blocks));
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
