// @flow

import type { BlockModel } from '../models';
import ContainerComponent from './component';
import { containerDefaultProps } from './props';

const containerBlock: BlockModel = {
  component: ContainerComponent,
  key: `Container`,
  defaultProps: containerDefaultProps,
};

export default containerBlock;
