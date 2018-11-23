// @flow
import React, { Component } from 'react';
import { css } from 'emotion';
import type { ContainerProps } from './props';
import { withBlockHighlighter } from '../../../preview/components/BlockHighlighterWrapper/BlockHighlighterWrapper';

class ContainerComponent extends Component<ContainerProps> {
  render() {
    const { children, customStyles } = this.props;
    return <div className={css(customStyles)}>{children}</div>;
  }
}

export default withBlockHighlighter(ContainerComponent);
