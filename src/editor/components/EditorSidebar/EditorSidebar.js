// @flow

import React, { Component } from 'react';
import { MdAdd } from 'react-icons/md';
import { connect } from 'react-redux';
import { cx } from 'emotion';
import styles from './styles';
import BlocksManager from './components/BlocksManager/BlocksManager';
import AddBlockSlideout from './components/AddBlockSlideout/AddBlockSlideout';
import type { ReduxState } from '../../../state/redux/store';
import { getAddingBlock } from '../../../state/redux/ui/state';

type Props = {
  addingBlock: boolean,
};

type State = {};

class EditorSidebar extends Component<Props, State> {
  handleStartAddingBlock = () => {};

  render() {
    const { addingBlock } = this.props;
    return (
      <div className={styles.wrapperClass}>
        <div
          className={cx(styles.containerClass, {
            [styles.containerRaisedClass]: addingBlock,
          })}
        >
          <div>
            <div onClick={this.handleStartAddingBlock}>
              <MdAdd />
            </div>
          </div>
          <div>
            <BlocksManager />
          </div>
          <div>save changes</div>
        </div>
        <div className={styles.slideoutClass}>
          <AddBlockSlideout />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  addingBlock: getAddingBlock(state.ui),
});

export default connect(mapStateToProps)(EditorSidebar);
