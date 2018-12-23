// @flow

import type { BlockModel } from '../../../models';
import RepeaterComponent from './component';
import config from './config';
import { repeaterDefaultProps, repeaterPropsConfig } from './props';
import dataBlock from './dataBlock';
import { blockGroups } from '../../../config';

const repeaterBlock: BlockModel = {
  key: config.key,
  groupKey: blockGroups.Basic,
  component: RepeaterComponent,
  defaultProps: repeaterDefaultProps,
  propsConfig: repeaterPropsConfig,
  childrenAllowed: false,
  propsEnabled: true,
  stylesEnabled: false,
  htmlEnabled: false,
  dataBlock,
};

export default repeaterBlock;
