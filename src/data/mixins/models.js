// @flow

import type { BlockModifierStyles } from '../styles/models';
import type { DataBlockMixinStylesModel } from '../blocks/models';

export type MixinModel = {
  key: string,
  groupKey: string,
  name: string,
  styles: {
    [string]: BlockModifierStyles,
  },
  mixins?: DataBlockMixinStylesModel,
};

export type MixinsModel = {
  [string]: MixinModel,
};

export type AddMixinModel = {
  key: string,
  name: string,
  disabled: boolean,
};

export type AddMixinGroupModel = {
  key: string,
  name: string,
  mixins: Array<AddMixinModel>,
};

export type AddMixinGroupsModel = {
  [string]: AddMixinGroupModel,
};

export function getAddMixinGroups(
  mixins: MixinsModel,
  addedMixins: Array<string>
): AddMixinGroupsModel {
  const groups = {};
  Object.keys(mixins).forEach(mixinKey => {
    const mixin = mixins[mixinKey];
    const addMixin = {
      key: mixinKey,
      name: mixin.name,
      disabled: addedMixins.includes(mixinKey),
    };
    if (groups[mixin.groupKey]) {
      const group = groups[mixin.groupKey];
      groups[mixin.groupKey] = {
        ...group,
        mixins: group.mixins.concat([addMixin]),
      };
    } else {
      groups[mixin.groupKey] = {
        key: mixin.groupKey,
        name: mixin.groupKey,
        mixins: [addMixin],
      };
    }
  });
  return groups;
}
