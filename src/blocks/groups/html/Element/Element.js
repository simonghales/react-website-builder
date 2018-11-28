// @flow

import type { BlockModel } from '../../../models';
import ElementComponent from './component';
import { elementDefaultProps, elementPropsConfig } from './props';
import config from './config';
import dataBlock from './dataBlock';
import { blockGroups } from '../../../config';

const elementBlock: BlockModel = {
  key: config.key,
  groupKey: blockGroups.HTML,
  component: ElementComponent,
  defaultProps: elementDefaultProps,
  propsConfig: elementPropsConfig,
  childrenAllowed: true,
  stylesEnabled: true,
  htmlEnabled: true,
  dataBlock,
};

export default elementBlock;
