// @flow
import React, { Component } from 'react';
import { css } from 'emotion';
import type { ElementProps } from './props';
import { withBlockHighlighter } from '../../../../preview/components/BlockHighlighterWrapper/BlockHighlighterWrapper';

function renderChildren(content, children) {
  return (
    <React.Fragment>
      {content && content}
      {children && children}
    </React.Fragment>
  );
}

export class ElementComponentRaw extends Component<ElementProps> {
  render() {
    const { element, content, children, customStyles, ...otherProps } = this.props;
    // eslint-disable-next-line prefer-destructuring
    const props = this.props;
    return (
      <props.element className={css(customStyles)} {...otherProps}>
        {renderChildren(content, children)}
      </props.element>
    );
  }
}

export default withBlockHighlighter(ElementComponentRaw);
