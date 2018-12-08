// @flow

import type { DataModule } from './models';
import {
  DUMMY_BLOCKS,
  DUMMY_BLOCK_MODULE,
  DUMMY_BLOCK_PAGE_INTRO_MODULE,
  DUMMY_BLOCK_PAGE_PARAGRAPH,
  DUMMY_BLOCK_PAGE_MODULE,
  DUMMY_BLOCK_SUB_MODULE,
} from '../blocks/dummy';

export const DUMMY_INTRO_MODULE: DataModule = {
  key: 'DUMMY_INTRO_MODULE',
  groupKey: 'Site',
  name: 'Intro',
  blocks: DUMMY_BLOCKS,
  rootBlock: DUMMY_BLOCK_MODULE.key,
  isTemplate: true,
};

export const DUMMY_PAGE_MODULE: DataModule = {
  key: 'DUMMY_PAGE_MODULE',
  groupKey: 'Page',
  name: 'Home',
  blocks: {
    [DUMMY_BLOCK_PAGE_MODULE.key]: DUMMY_BLOCK_PAGE_MODULE,
    [DUMMY_BLOCK_PAGE_INTRO_MODULE.key]: DUMMY_BLOCK_PAGE_INTRO_MODULE,
    [DUMMY_BLOCK_PAGE_PARAGRAPH.key]: DUMMY_BLOCK_PAGE_PARAGRAPH,
  },
  rootBlock: DUMMY_BLOCK_PAGE_MODULE.key,
  isTemplate: false,
};

export const DUMMY_SUB_MODULE: DataModule = {
  key: 'DUMMY_SUB_MODULE',
  groupKey: 'Site',
  name: 'Sub Module',
  blocks: {
    [DUMMY_BLOCK_SUB_MODULE.key]: DUMMY_BLOCK_SUB_MODULE,
  },
  rootBlock: DUMMY_BLOCK_SUB_MODULE.key,
  isTemplate: true,
};
