// @flow
import React from 'react';
import { css } from 'emotion';
import type { ElementProps } from './props';

function renderChildren(content, children) {
  return (
    <React.Fragment>
      {content && content}
      {children && children}
    </React.Fragment>
  );
}

const ElementComponent = (props: ElementProps) => {
  const { element, content, children, customStyles, ...otherProps } = props;
  return (
    <props.element className={css(customStyles)} {...otherProps}>
      {renderChildren(content, children)}
    </props.element>
  );
};

export default ElementComponent;
