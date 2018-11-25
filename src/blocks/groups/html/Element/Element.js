// @flow

import type { BlockModel } from '../../../models';
import ElementComponent from './component';
import { elementDefaultProps, elementPropsConfig } from './props';
import config from './config';
import dataBlock from './dataBlock';

const elementBlock: BlockModel = {
  component: ElementComponent,
  key: config.key,
  defaultProps: elementDefaultProps,
  propsConfig: elementPropsConfig,
  childrenAllowed: true,
  stylesEnabled: true,
  htmlEnabled: true,
  dataBlock,
};

export default elementBlock;
