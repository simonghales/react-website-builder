// @flow

import type { BlockModel } from '../../models';
import ElementComponent from './component';
import { elementDefaultProps, elementPropsConfig } from './props';

const elementBlock: BlockModel = {
  component: ElementComponent,
  key: `Element`,
  defaultProps: elementDefaultProps,
  propsConfig: elementPropsConfig,
};

export default elementBlock;
