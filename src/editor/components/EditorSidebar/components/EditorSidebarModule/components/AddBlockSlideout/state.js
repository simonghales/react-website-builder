// @flow

import type { AddableBlockGroups } from '../../../../../../../blocks/models';
import { reduxDoesModuleChildrenContainModule } from '../../../../../../../state/redux/state';

export type DisabledBlock = {
  currentModule: boolean,
  recursiveModule: boolean,
};

export type DisabledBlocks = {
  [string]: DisabledBlock,
};

export function getDisabledBlocks(
  addableBlockGroups: AddableBlockGroups,
  moduleKey: string
): DisabledBlocks {
  const disabledBlocks = {};
  Object.keys(addableBlockGroups).forEach(groupKey => {
    const group = addableBlockGroups[groupKey];
    Object.keys(group.blocks).forEach(blockKey => {
      const block = group.blocks[blockKey];
      if (block.isModule) {
        const recursiveModule = reduxDoesModuleChildrenContainModule(moduleKey, blockKey);
        const currentModule = blockKey === moduleKey;
        if (recursiveModule || currentModule) {
          disabledBlocks[blockKey] = {
            currentModule,
            recursiveModule,
          };
        }
      }
    });
  });
  return disabledBlocks;
}
