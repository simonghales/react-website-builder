// @flow

import type { BlockModel } from '../../models';
import ModuleComponent from './component';
import { moduleDefaultProps, modulePropsConfig } from './props';
import config from './config';
import dataBlock from './dataBlock';

const moduleBlock: BlockModel = {
  component: ModuleComponent,
  key: config.key,
  defaultProps: moduleDefaultProps,
  propsConfig: modulePropsConfig,
  childrenAllowed: true,
  stylesEnabled: false,
  dataBlock,
};

export default moduleBlock;
