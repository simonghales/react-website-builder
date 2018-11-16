// @flow

import type { BlockModel } from '../../models';
import HeadingComponent from './component';
import { headingDefaultProps } from './props';

const headingBlock: BlockModel = {
  component: HeadingComponent,
  key: `Heading`,
  defaultProps: headingDefaultProps,
  propsConfig: {},
  childrenAllowed: false,
  stylesEnabled: true,
};

export default headingBlock;
