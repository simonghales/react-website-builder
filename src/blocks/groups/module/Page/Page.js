// @flow

import type { BlockModel } from '../../../models';
import PageComponent from './component';
import { pageDefaultProps, pagePropsConfig } from './props';
import config from './config';
import dataBlock from './dataBlock';
import { blockGroups } from '../../../config';

const moduleBlock: BlockModel = {
  key: config.key,
  groupKey: blockGroups.Module,
  component: PageComponent,
  defaultProps: pageDefaultProps,
  propsConfig: pagePropsConfig,
  childrenAllowed: true,
  propsEnabled: true,
  stylesEnabled: false,
  htmlEnabled: false,
  dataBlock,
};

export default moduleBlock;
