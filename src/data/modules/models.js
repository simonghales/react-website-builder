// @flow

import type { MappedDataBlocks, SitePageDataBlocks } from '../blocks/models';

export type DataModule = {
  key: string,
  groupKey: string,
  moduleTemplateKey?: string,
  name: string,
  blocks: SitePageDataBlocks,
  rootBlock: string,
  selectedBlock: string,
  isTemplate: boolean,
};

export type MappedDataModule = {
  key: string,
  blocks: MappedDataBlocks,
  rootBlock: string,
};

export type DataModules = {
  [string]: DataModule,
};
