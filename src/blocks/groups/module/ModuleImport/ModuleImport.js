// @flow

import type { BlockModel } from '../../../models';
import ModuleImportComponent from './component';
import { moduleImportDefaultProps, moduleImportPropsConfig } from './props';
import dataBlock from './dataBlock';
import config from './config';

const moduleImportBlock: BlockModel = {
  component: ModuleImportComponent,
  key: config.key,
  defaultProps: moduleImportDefaultProps,
  propsConfig: moduleImportPropsConfig,
  childrenAllowed: false, // todo - make this flexible
  stylesEnabled: false,
  dataBlock,
};

export default moduleImportBlock;
