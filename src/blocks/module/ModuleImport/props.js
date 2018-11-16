// @flow

export type ModuleImportProps = {
  children: any,
  module: any,
};

export const moduleImportDefaultProps = {
  children: undefined,
  module: undefined,
};

export const moduleImportPropsConfig = {
  children: {
    hidden: true,
    type: 'blocks',
  },
  module: {
    hidden: true,
    type: 'module',
  },
};
