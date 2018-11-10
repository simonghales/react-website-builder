// @flow

export const blockPropsConfigTypes = {
  blocks: 'blocks',
};

export type BlockPropsConfigTypes = $Keys<typeof blockPropsConfigTypes>;

export type BlockPropsConfigModel = {
  label?: string,
  type?: BlockPropsConfigTypes,
};

export type SitePageDataBlockModel = {
  key: string,
  groupKey: string,
  blockKey: string,
  blockType: string,
  label: string,
  props: {
    [string]: any,
  },
  propsConfig: {
    [string]: BlockPropsConfigModel,
  },
};

export type SitePageDataBlocks = Array<SitePageDataBlockModel>;

export type SitePageDataModel = {
  blocks: SitePageDataBlocks,
};

export function getDataBlockGroupKey(data: SitePageDataBlockModel): string {
  return data.groupKey;
}

export function getDataBlockBlockKey(data: SitePageDataBlockModel): string {
  return data.blockKey;
}

export function getDataBlockType(data: SitePageDataBlockModel): string {
  return `${getDataBlockGroupKey(data)}.${getDataBlockBlockKey(data)}`;
}

export function getDataBlockLabel(data: SitePageDataBlockModel): string {
  return data.label;
}

export function getBlockPropLabel(propKey: string, propConfig: BlockPropsConfigModel): string {
  return propConfig.label ? propConfig.label : propKey;
}
