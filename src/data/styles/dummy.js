// @flow

import type { BlockStyles } from './models';

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

export const DUMMY_STYLE_EMPTY: BlockStyles = {
  styles: {
    default: {
      editor: {},
    },
  },
};
