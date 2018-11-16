// @flow

import type { BlockModifierStyles } from '../styles/models';

export type MixinModel = {
  key: string,
  groupKey: string,
  name: string,
  styles: {
    [string]: BlockModifierStyles,
  },
};

export type MixinsModel = {
  [string]: MixinModel,
};
