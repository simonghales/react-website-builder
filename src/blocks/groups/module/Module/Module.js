// @flow

import type { BlockModel } from '../../../models';
import ModuleComponent from './component';
import { moduleDefaultProps, modulePropsConfig } from './props';
import config from './config';
import dataBlock from './dataBlock';
import { blockGroups } from '../../../config';

const moduleBlock: BlockModel = {
  key: config.key,
  groupKey: blockGroups.Module,
  component: ModuleComponent,
  defaultProps: moduleDefaultProps,
  propsConfig: modulePropsConfig,
  childrenAllowed: true,
  stylesEnabled: false,
  htmlEnabled: false,
  dataBlock,
};

export default moduleBlock;
