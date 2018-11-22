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
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        fontSize: '30px',
      },
    },
  },
};

export const DUMMY_MIXIN_HEADING: MixinModel = {
  key: 'DUMMY_MIXIN_HEADING',
  groupKey: 'General',
  name: 'Large Heading',
  styles: {
    [blockStylesModifiers.default]: {
      editor: {
        fontSize: '50px',
      },
    },
  },
};

export const DUMMY_MIXIN_RANDOM: MixinModel = {
  key: 'DUMMY_MIXIN_RANDOM',
  groupKey: 'General',
  name: 'Random',
  styles: {
    [blockStylesModifiers.default]: {
      editor: {
        color: 'red',
      },
    },
  },
};

export const DUMMY_MIXINS: MixinsModel = {
  [DUMMY_MIXIN_CENTERED.key]: DUMMY_MIXIN_CENTERED,
  [DUMMY_MIXIN_HEADING.key]: DUMMY_MIXIN_HEADING,
  [DUMMY_MIXIN_RANDOM.key]: DUMMY_MIXIN_RANDOM,
};
