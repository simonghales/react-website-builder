// @flow

import type { BlockModel } from '../../../models';
import ModuleImportComponent from './component';
import { moduleImportDefaultProps, moduleImportPropsConfig } from './props';
import dataBlock from './dataBlock';
import config from './config';
import { blockGroups } from '../../../config';

const moduleImportBlock: BlockModel = {
  key: config.key,
  groupKey: blockGroups.Module,
  component: ModuleImportComponent,
  defaultProps: moduleImportDefaultProps,
  propsConfig: moduleImportPropsConfig,
  childrenAllowed: false, // todo - make this flexible
  propsEnabled: false,
  stylesEnabled: false,
  htmlEnabled: false,
  dataBlock,
};

export default moduleImportBlock;
