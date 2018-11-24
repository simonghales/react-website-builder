// @flow

import type { BlockModel } from '../../../models';
import HeadingComponent from './component';
import { headingDefaultProps, headingPropsConfig } from './props';
import config from './config';
import dataBlock from './dataBlock';

const headingBlock: BlockModel = {
  component: HeadingComponent,
  key: config.key,
  defaultProps: headingDefaultProps,
  propsConfig: headingPropsConfig,
  childrenAllowed: false,
  stylesEnabled: true,
  dataBlock,
};

export default headingBlock;
