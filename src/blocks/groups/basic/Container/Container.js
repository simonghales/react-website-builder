// @flow

import type { BlockModel } from '../../../models';
import ContainerComponent from './component';
import config from './config';
import { containerDefaultProps, containerPropsConfig } from './props';
import dataBlock from './dataBlock';
import { blockGroups } from '../../../config';

const containerBlock: BlockModel = {
  key: config.key,
  groupKey: blockGroups.Basic,
  component: ContainerComponent,
  defaultProps: containerDefaultProps,
  propsConfig: containerPropsConfig,
  childrenAllowed: true,
  propsEnabled: false,
  stylesEnabled: true,
  htmlEnabled: true,
  dataBlock,
};

export default containerBlock;
