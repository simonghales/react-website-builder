// @flow
import React, { Component } from 'react';
import { css } from 'emotion';
import type { ContainerProps } from './props';
import { withBlockHighlighter } from '../../../../preview/components/BlockHighlighterWrapper/BlockHighlighterWrapper';

class ContainerComponent extends Component<ContainerProps> {
  render() {
    const { children, customStyles } = this.props;
    // eslint-disable-next-line no-unused-vars,prefer-destructuring
    const props = this.props;
    return <props.element className={css(customStyles)}>{children}</props.element>;
  }
}

export default withBlockHighlighter(ContainerComponent);
