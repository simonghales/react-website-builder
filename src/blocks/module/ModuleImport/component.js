// @flow
import React from 'react';
import type { ModuleImportProps } from './props';

const ModuleImportComponent = ({ children, module }: ModuleImportProps) => (
  <React.Fragment>
    {module}
    {children}
  </React.Fragment>
);

export default ModuleImportComponent;
