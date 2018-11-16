// @flow

import type { MixinModel, MixinsModel } from './models';

export function getMixinFromMixins(mixinKey: string, mixins: MixinsModel): MixinModel {
  const mixin = mixins[mixinKey];
  if (!mixin) {
    throw new Error(`Mixin ${mixinKey} could not be matched.`);
  }
  return mixin;
}
