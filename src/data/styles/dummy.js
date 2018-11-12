// @flow

import type { AllBlockStyles, BlockStyles } from './models';

export const DUMMY_STYLE_TEST: BlockStyles = {
  key: 'test',
  styles: {
    default: {
      editor: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '28px',
        textAlign: 'left',
        fontWeight: '700',
      },
      custom: {},
    },
  },
};

export const DUMMY_STYLES: AllBlockStyles = {
  [DUMMY_STYLE_TEST.key]: DUMMY_STYLE_TEST,
};
