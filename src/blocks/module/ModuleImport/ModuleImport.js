// @flow

import type { BlockModel } from '../../models';
import ModuleImportComponent from './component';
import { moduleImportDefaultProps, moduleImportPropsConfig } from './props';

const moduleImportBlock: BlockModel = {
  component: ModuleImportComponent,
  key: `ModuleImport`,
  defaultProps: moduleImportDefaultProps,
  propsConfig: moduleImportPropsConfig,
  childrenAllowed: false, // todo - make this flexible
  stylesEnabled: false,
};

export default moduleImportBlock;
