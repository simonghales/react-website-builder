// @flow

import React, { Component } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';
import { connect } from 'react-redux';
import { cx } from 'emotion';
import { CSSTransition } from 'react-transition-group';
import styles from './styles';
import BlocksManager from './components/BlocksManager/BlocksManager';
import AddBlockSlideout from './components/AddBlockSlideout/AddBlockSlideout';
import type { ReduxState } from '../../../../../state/redux/store';
import { getAddingBlockFromUIState } from '../../../../../state/redux/ui/state';
import { setAddingBlock } from '../../../../../state/redux/ui/reducer';
import ReturnToModule from './components/ReturnToModule/ReturnToModule';
import IconButton from '../../../../../components/IconButton/IconButton';
import EditorSidebarSlideout from '../EditorSidebarSlideout/EditorSidebarSlideout';

type Props = {
  addingBlock: boolean,
  startAddingBlock: () => void,
  completeAddingBlock: () => void,
};

type State = {};

class EditorSidebarModule extends Component<Props, State> {
  handleStartAddingBlock = () => {
    const { addingBlock, startAddingBlock, completeAddingBlock } = this.props;
    if (addingBlock) {
      completeAddingBlock();
    } else {
      startAddingBlock();
    }
  };

  render() {
    const { addingBlock, completeAddingBlock } = this.props;
    return (
      <div className={styles.wrapperClass}>
        <div
          className={cx(styles.containerClass, {
            [styles.containerRaisedClass]: addingBlock,
          })}
        >
          <div className={styles.addBlockSectionClass}>
            <div className={styles.returnToWrapperClass}>
              <ReturnToModule />
            </div>
            <IconButton
              addPreventOffclick
              tooltip={addingBlock ? 'Close' : 'Add a block'}
              icon={addingBlock ? <MdClose size={18} /> : <MdAdd size={18} />}
              onClick={this.handleStartAddingBlock}
            />
          </div>
          <div className={styles.blocksSectionClass}>
            <BlocksManager />
          </div>
        </div>
        <EditorSidebarSlideout visible={addingBlock} close={completeAddingBlock}>
          <AddBlockSlideout />
        </EditorSidebarSlideout>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  addingBlock: getAddingBlockFromUIState(state.ui),
});

const mapDispatchToProps = {
  startAddingBlock: () => setAddingBlock(true),
  completeAddingBlock: () => setAddingBlock(false),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorSidebarModule);
