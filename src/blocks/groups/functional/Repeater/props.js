// @flow

import { blockPropsConfigTypes } from '../../../props';

export type RepeaterProps = {
  data: Array<any>,
};

export const repeaterDefaultProps = {
  data: {},
};

export const repeaterPropsConfig = {
  data: {
    label: 'Data',
    type: blockPropsConfigTypes.repeaterData,
    repeaterDataModel: {},
  },
};
