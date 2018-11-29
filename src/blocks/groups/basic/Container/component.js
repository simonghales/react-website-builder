// @flow
import React, { Component } from 'react';
import { css } from 'emotion';
import type { ContainerProps } from './props';
import { withBlockHighlighter } from '../../../../preview/components/BlockHighlighterWrapper/BlockHighlighterWrapper';

class ContainerComponent extends Component<ContainerProps> {
  render() {
    const { element, children, customStyles } = this.props;
    const Element = element;
    return React.createElement(
      Element,
      {
        className: css(customStyles),
      },
      children
    );
  }
}

export default withBlockHighlighter(ContainerComponent);
