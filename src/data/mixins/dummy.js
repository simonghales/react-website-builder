// @flow

import type { MixinModel, MixinsModel } from './models';
import { blockStylesModifiers } from '../styles/models';

export const DUMMY_MIXIN_CENTERED: MixinModel = {
  key: 'DUMMY_MIXIN_CENTERED',
  groupKey: 'General',
  name: 'Centered Large Text',
  styles: {
    [blockStylesModifiers.default]: {
      editor: {
        textAlign: 'center',
        fontSize: '30px',
      },
    },
  },
};

export const DUMMY_MIXINS: MixinsModel = {
  [DUMMY_MIXIN_CENTERED.key]: DUMMY_MIXIN_CENTERED,
};
