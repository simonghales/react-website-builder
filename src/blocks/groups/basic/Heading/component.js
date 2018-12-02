// @flow
import React, { Component } from 'react';
import { css } from 'emotion';
import type { HeadingProps } from './props';
import { withBlockHighlighter } from '../../../../preview/components/BlockHighlighterWrapper/BlockHighlighterWrapper';

class HeadingComponent extends Component<HeadingProps> {
  render() {
    const { element, text, customStyles } = this.props;
    const Element = element;
    return React.createElement(
      Element,
      {
        className: css(customStyles),
      },
      text
    );
  }
}

export default withBlockHighlighter(HeadingComponent);
