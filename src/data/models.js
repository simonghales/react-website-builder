// @flow

export type SitePageDataBlockModel = {
  key: string,
  groupKey: string,
  blockKey: string,
  props: {
    [string]: any,
  },
};

export type SitePageDataBlocks = Array<SitePageDataBlockModel>;

export type SitePageDataModel = {
  blocks: SitePageDataBlocks,
};
