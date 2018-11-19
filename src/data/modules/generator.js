// @flow

import type { SitePageDataBlocks } from '../blocks/models';
import type { DataModule } from './models';
import { getBlockUniqueId } from '../../blocks/utils';

export function generateNewModule(
  blocks: SitePageDataBlocks,
  rootBlockKey: string,
  name: string
): DataModule {
  return {
    key: getBlockUniqueId(),
    groupKey: 'Site',
    name,
    blocks,
    rootBlock: rootBlockKey,
    selectedBlock: rootBlockKey,
  };
}
