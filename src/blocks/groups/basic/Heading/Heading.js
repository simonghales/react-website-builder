// @flow

import type { BlockModel } from '../../../models';
import HeadingComponent from './component';
import { headingDefaultProps, headingPropsConfig } from './props';
import config from './config';
import dataBlock from './dataBlock';
import { blockGroups } from '../../../config';

const headingBlock: BlockModel = {
  key: config.key,
  groupKey: blockGroups.Basic,
  component: HeadingComponent,
  defaultProps: headingDefaultProps,
  propsConfig: headingPropsConfig,
  childrenAllowed: false,
  propsEnabled: false,
  stylesEnabled: true,
  htmlEnabled: true,
  dataBlock,
};

export default headingBlock;
