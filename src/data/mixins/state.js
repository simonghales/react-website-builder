// @flow

import type { MixinModel, MixinsModel } from './models';
import type { DataBlockMixinStylesModel } from '../blocks/models';

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
