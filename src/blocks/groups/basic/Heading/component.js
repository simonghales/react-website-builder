// @flow
import React, { Component } from 'react';
import { css } from 'emotion';
import type { HeadingProps } from './props';
import { withBlockHighlighter } from '../../../../preview/components/BlockHighlighterWrapper/BlockHighlighterWrapper';

class HeadingComponent extends Component<HeadingProps> {
  render() {
    const { text, customStyles } = this.props;
    return <h3 className={css(customStyles)}>{text}</h3>;
  }
}

export default withBlockHighlighter(HeadingComponent);
