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
    const Element = element;
    return React.createElement(
      Element,
      {
        ...otherProps,
        className: css(customStyles),
      },
      renderChildren(content, children)
    );
    // return (
    //   <props.element className={css(customStyles)} {...otherProps}>
    //     {renderChildren(content, children)}
    //   </props.element>
    // );
  }
}

export default withBlockHighlighter(ElementComponentRaw);
