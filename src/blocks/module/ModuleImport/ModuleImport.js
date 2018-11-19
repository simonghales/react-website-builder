// @flow

import type { BlockModel } from '../../models';
import ModuleImportComponent from './component';
import { moduleImportDefaultProps, moduleImportPropsConfig } from './props';
import dataBlock from './dataBlock';

const moduleImportBlock: BlockModel = {
  component: ModuleImportComponent,
  key: `ModuleImport`,
  defaultProps: moduleImportDefaultProps,
  propsConfig: moduleImportPropsConfig,
  childrenAllowed: false, // todo - make this flexible
  stylesEnabled: false,
  dataBlock,
};

export default moduleImportBlock;
