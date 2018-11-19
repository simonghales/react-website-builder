// @flow
import React from 'react';
import { connect } from 'react-redux';
import { cx } from 'emotion';
import styles from './styles';
import EditorSidebar from '../../components/EditorSidebar/EditorSidebar';
import EditorBlockView from '../EditorBlockView/EditorBlockView';
import type { ReduxState } from '../../../state/redux/store';
import { getAddingBlock } from '../../../state/redux/ui/state';
import { setAddingBlock } from '../../../state/redux/ui/reducer';
import Tooltip from '../../../components/Tooltip/Tooltip';

type Props = {
  addingBlock: boolean,
  completeAddingBlock: () => void,
};

const EditorView = ({ addingBlock, completeAddingBlock }: Props) => (
  <div className={styles.containerClass}>
    <Tooltip />
    <header className={styles.headerClass}>header..</header>
    <main className={styles.mainClass}>
      <div className={styles.editorClass}>
        <EditorSidebar />
      </div>
      <div className={styles.previewClass}>
        <div
          className={cx(styles.previewContentClass, {
            [styles.previewContentDisabledClass]: addingBlock,
          })}
        >
          <EditorBlockView />
        </div>
        {addingBlock && (
          <div className={styles.previewBlockerClass} onClick={completeAddingBlock} />
        )}
      </div>
    </main>
  </div>
);

const mapStateToProps = (state: ReduxState) => ({
  addingBlock: getAddingBlock(state.ui),
});

const mapDispatchToProps = {
  completeAddingBlock: () => setAddingBlock(false),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorView);
