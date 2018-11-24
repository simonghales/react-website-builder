// @flow
import React, { Component } from 'react';
import { css } from 'emotion';
import type { HeadingProps } from './props';
import { withBlockHighlighter } from '../../../../preview/components/BlockHighlighterWrapper/BlockHighlighterWrapper';

class HeadingComponent extends Component<HeadingProps> {
  render() {
    const { element, text, customStyles } = this.props;
    // eslint-disable-next-line no-unused-vars,prefer-destructuring
    const props = this.props;
    return (
      <props.element element={element} className={css(customStyles)}>
        {text}
      </props.element>
    );
  }
}

export default withBlockHighlighter(HeadingComponent);
