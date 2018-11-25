// @flow
import React, { Component } from 'react';
import type { ModuleImportProps } from './props';
import { withBlockHighlighter } from '../../../../preview/components/BlockHighlighterWrapper/BlockHighlighterWrapper';

class ModuleImportComponent extends Component<ModuleImportProps> {
  render() {
    const { children, module } = this.props;
    return (
      <React.Fragment>
        {module}
        {children}
      </React.Fragment>
    );
  }
}

export default withBlockHighlighter(ModuleImportComponent);
