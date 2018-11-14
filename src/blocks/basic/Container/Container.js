// @flow

import type { BlockModel } from '../../models';
import ContainerComponent from './component';
import { containerDefaultProps, containerPropsConfig } from './props';

const containerBlock: BlockModel = {
  component: ContainerComponent,
  key: `Container`,
  defaultProps: containerDefaultProps,
  propsConfig: containerPropsConfig,
  childrenAllowed: true,
};

export default containerBlock;
