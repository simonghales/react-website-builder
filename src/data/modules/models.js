// @flow

import type { MappedDataBlockModel, MappedDataBlocks, SitePageDataBlocks } from '../blocks/models';

export type DataModule = {
  key: string,
  groupKey: string,
  name: string,
  blocks: SitePageDataBlocks,
  rootBlock: string,
};

export type MappedDataModule = {
  key: string,
  blocks: MappedDataBlocks,
  rootBlock: string,
};

export type DataModules = {
  [string]: DataModule,
};
