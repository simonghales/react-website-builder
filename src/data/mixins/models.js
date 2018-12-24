// @flow

import type { BlockModifierStyles } from '../styles/models';
import type { DataBlockMixinModel, DataBlockMixinStylesModel } from '../blocks/models';
import { getMixinFromMixins, getMixinMixins } from './state';

export type MixinStylesModel = {
  [string]: BlockModifierStyles,
};

export type MixinModel = {
  key: string,
  groupKey: string,
  name: string,
  styles: MixinStylesModel,
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

export function doesMixinMixinsContainMixinKey(
  mixinKey: string,
  mixin: MixinModel,
  mixins: MixinsModel
): boolean {
  let containsMixinKey = false;
  const mixinMixins = getMixinMixins(mixin);
  mixinMixins.forEach((mixinRef: DataBlockMixinModel) => {
    if (mixinRef.key === mixinKey) {
      containsMixinKey = true;
      return;
    }
    const mixinRefMixin = getMixinFromMixins(mixinRef.key, mixins);
    if (doesMixinMixinsContainMixinKey(mixinKey, mixinRefMixin, mixins)) {
      containsMixinKey = true;
    }
  });
  return containsMixinKey;
}

export function isMixinDisabled(
  mixin: MixinModel,
  mixins: MixinsModel,
  addedMixins: Array<string>,
  selectedMixinKey?: string
): boolean {
  const mixinKey = mixin.key;
  if (selectedMixinKey && mixinKey === selectedMixinKey) return true;
  if (addedMixins.includes(mixinKey)) return true;
  if (selectedMixinKey) {
    return doesMixinMixinsContainMixinKey(selectedMixinKey, mixin, mixins);
  }
  return false;
}

export function getAddMixinGroups(
  mixins: MixinsModel,
  addedMixins: Array<string>,
  selectedMixinKey?: string
): AddMixinGroupsModel {
  console.log('mixins', mixins);
  const groups = {};
  Object.keys(mixins).forEach(mixinKey => {
    const mixin = mixins[mixinKey];
    const addMixin = {
      key: mixinKey,
      name: mixin.name,
      disabled: isMixinDisabled(mixin, mixins, addedMixins, selectedMixinKey),
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
