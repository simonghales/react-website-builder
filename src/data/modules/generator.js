// @flow
import Module from 'blocks/module/Module/Module';
import type { SitePageDataBlocks } from '../blocks/models';
import type { DataModule } from './models';
import { getBlockUniqueId } from '../../blocks/utils';

export function generateNewModule(
  blocks: SitePageDataBlocks,
  rootBlockKey: string,
  name: string
): DataModule {
  const moduleBlock = Module.dataBlock({
    rootBlockKey,
    label: name,
  });
  return {
    key: getBlockUniqueId(),
    groupKey: 'Site',
    name,
    blocks: {
      ...blocks,
      [moduleBlock.key]: moduleBlock,
    },
    rootBlock: moduleBlock.key,
    selectedBlock: moduleBlock.key,
  };
}
