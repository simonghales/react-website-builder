// @flow

import React, { Component } from 'react';
import { MdAdd, MdClose, MdKeyboardBackspace } from 'react-icons/md';
import { connect } from 'react-redux';
import { cx } from 'emotion';
import { CSSTransition } from 'react-transition-group';
import styles from './styles';
import BlocksManager from './components/BlocksManager/BlocksManager';
import AddBlockSlideout from './components/AddBlockSlideout/AddBlockSlideout';
import type { ReduxState } from '../../../state/redux/store';
import { getAddingBlock } from '../../../state/redux/ui/state';
import { setAddingBlock } from '../../../state/redux/ui/reducer';
import { returnToPreviousSelectedModule } from '../../../state/redux/editor/reducer';
import { getPreviousModule } from '../../../state/redux/editor/state';
import type { DataModule } from '../../../data/modules/models';

type Props = {
  addingBlock: boolean,
  previousModule: DataModule | null,
  startAddingBlock: () => void,
  completeAddingBlock: () => void,
  returnToPreviousModule: () => void,
};

type State = {};

const SlideOutContainer = ({ children, visible }: { children: any, visible: boolean }) => (
  <CSSTransition
    in={visible}
    timeout={300}
    classNames={styles.classNames.slideoutTransition}
    unmountOnExit
  >
    <div className={styles.slideoutClass}>{children}</div>
  </CSSTransition>
);

class EditorSidebar extends Component<Props, State> {
  handleStartAddingBlock = () => {
    const { addingBlock, startAddingBlock, completeAddingBlock } = this.props;
    if (addingBlock) {
      completeAddingBlock();
    } else {
      startAddingBlock();
    }
  };

  render() {
    const { addingBlock, previousModule, returnToPreviousModule } = this.props;
    return (
      <div className={styles.wrapperClass}>
        <div
          className={cx(styles.containerClass, {
            [styles.containerRaisedClass]: addingBlock,
          })}
        >
          <div className={styles.addBlockSectionClass}>
            <div className={styles.returnToWrapperClass}>
              {previousModule && (
                <div className={styles.returnToClass} onClick={returnToPreviousModule}>
                  <MdKeyboardBackspace size={18} />
                  <div>{previousModule.name}</div>
                </div>
              )}
            </div>
            <div
              className={styles.addBlockToggleClass}
              onClick={this.handleStartAddingBlock}
              data-tip={addingBlock ? 'Close' : 'Add a block'}
            >
              {addingBlock ? <MdClose size={20} /> : <MdAdd size={20} />}
            </div>
          </div>
          <div>
            <BlocksManager />
          </div>
          <div>save changes</div>
        </div>
        <SlideOutContainer visible={addingBlock}>
          <AddBlockSlideout />
        </SlideOutContainer>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  addingBlock: getAddingBlock(state.ui),
  previousModule: getPreviousModule(state.editor),
});

const mapDispatchToProps = {
  startAddingBlock: () => setAddingBlock(true),
  completeAddingBlock: () => setAddingBlock(false),
  returnToPreviousModule: () => returnToPreviousSelectedModule(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorSidebar);
