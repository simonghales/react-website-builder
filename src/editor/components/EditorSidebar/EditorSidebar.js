// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
import { getPreviousModulesKeys } from '../../../state/redux/editor/selector';
import { goToModule } from '../../routing';

type Props = {
  addingBlock: boolean,
  previousModulesKeys: Array<string>,
  previousModule: DataModule | null,
  startAddingBlock: () => void,
  completeAddingBlock: () => void,
  returnToPreviousModule: () => void,
  history: any,
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

  handleReturnToPreviousModule = () => {
    const { previousModule, previousModulesKeys, history } = this.props;
    const copyOfPreviousModulesKeys = previousModulesKeys.slice();
    const moduleKey = copyOfPreviousModulesKeys.pop();
    const previousModuleKey =
      copyOfPreviousModulesKeys.length > 0 ? copyOfPreviousModulesKeys.pop() : '';
    console.log('previousModule', previousModule);
    console.log('moduleKey', moduleKey, 'previousModuleKey', previousModuleKey);
    goToModule(moduleKey, previousModuleKey, history);
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
                <div className={styles.returnToClass} onClick={this.handleReturnToPreviousModule}>
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
  previousModulesKeys: getPreviousModulesKeys(state),
});

const mapDispatchToProps = {
  startAddingBlock: () => setAddingBlock(true),
  completeAddingBlock: () => setAddingBlock(false),
  returnToPreviousModule: () => returnToPreviousSelectedModule(),
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditorSidebar)
);
