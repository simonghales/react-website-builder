// @flow

import type { BlockModel } from '../models';
import ModuleComponent from './component';
import { moduleDefaultProps, modulePropsConfig } from './props';

const moduleBlock: BlockModel = {
  component: ModuleComponent,
  key: `Module`,
  defaultProps: moduleDefaultProps,
  propsConfig: modulePropsConfig,
};

export default moduleBlock;
