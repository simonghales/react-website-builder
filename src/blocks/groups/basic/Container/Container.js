// @flow

import type { BlockModel } from '../../../models';
import ContainerComponent from './component';
import config from './config';
import { containerDefaultProps, containerPropsConfig } from './props';
import dataBlock from './dataBlock';

const containerBlock: BlockModel = {
  component: ContainerComponent,
  key: config.key,
  defaultProps: containerDefaultProps,
  propsConfig: containerPropsConfig,
  childrenAllowed: true,
  stylesEnabled: true,
  htmlEnabled: true,
  dataBlock,
};

export default containerBlock;
