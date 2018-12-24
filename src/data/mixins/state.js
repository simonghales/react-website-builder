// @flow

import type { MixinModel, MixinsModel } from './models';
import type { DataBlockMixinStylesModel, DataBlockModel } from '../blocks/models';
import type { BlockStyles } from '../styles/models';

export function getMixinFromMixins(mixinKey: string, mixins: MixinsModel): MixinModel {
  const mixin = mixins[mixinKey];
  if (!mixin) {
    throw new Error(`Mixin ${mixinKey} could not be matched.`);
  }
  return mixin;
}

export function getBlockMixinsStyles(
  mixinStyles: DataBlockMixinStylesModel,
  mixins: MixinsModel
): Array<MixinModel> {
  return mixinStyles.map(mixin => getMixinFromMixins(mixin.key, mixins));
}

export function getMixinStyles(mixin: MixinModel): BlockStyles {
  const { styles = {} } = mixin;
  return {
    styles,
  };
}

export function getMixinMixins(mixin: MixinModel) {
  const { mixins = [] } = mixin;
  return mixins;
}

export function getMixinFullMixins(mixin: MixinModel, allMixins: MixinsModel): Array<MixinModel> {
  const mixins = getMixinMixins(mixin);
  return mixins.map(blockMixin => {
    const fullMixin = getMixinFromMixins(blockMixin.key, allMixins);
    return fullMixin;
  });
}
