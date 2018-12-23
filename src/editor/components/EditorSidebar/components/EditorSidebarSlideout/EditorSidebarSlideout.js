// @flow
import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import enhanceWithClickOutside from 'react-click-outside';
import { sidebarSlideoutTransitionClassName } from '../../../../../styles/shared/sidebar';
import styles from './styles';

const SlideOut = ({ children, visible }: { children: any, visible: boolean }) => (
  <CSSTransition
    in={visible}
    timeout={300}
    classNames={sidebarSlideoutTransitionClassName}
    unmountOnExit
  >
    {children}
  </CSSTransition>
);

type Props = {
  children: any,
  visible: boolean,
  close: () => void,
};

class EditorSidebarSlideout extends Component<Props> {
  handleClickOutside = (event: any) => {
    const { target } = event;
    const preventOffclickAttribute = target.getAttribute('data-prevent-offclick');
    if (preventOffclickAttribute && preventOffclickAttribute === 'true') {
      return;
    }
    const { close } = this.props;
    close();
  };

  render() {
    const { children, visible } = this.props;
    return (
      <SlideOut visible={visible}>
        <div className={styles.slideoutClass}>{children}</div>
      </SlideOut>
    );
  }
}

export default enhanceWithClickOutside(EditorSidebarSlideout);
