// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import type { MappedDataBlocks } from '../../../data/blocks/models';
import type { ReduxState } from '../../../state/redux/store';
import { getEditorMappedBlocks, getSelectedBlockKey } from '../../../state/redux/editor/state';
import { setSelectedBlock, updateBlockOrder } from '../../../state/redux/editor/reducer';
import BlocksList from './components/BlocksList/BlocksList';

type Props = {
  blocks: MappedDataBlocks,
  selectBlock: (blockKey: string) => void,
  selectedBlock: string,
  updateBlocks: (
    targetKey: string,
    destinationKey: string,
    destinationIndex: number,
    sourceKey: string
  ) => void,
};

class EditorSidebar extends Component<Props> {
  render() {
    const { blocks, selectBlock, selectedBlock } = this.props;
    return (
      <div className={styles.containerClass}>
        <BlocksList blocks={blocks} selectBlock={selectBlock} selectedBlock={selectedBlock} />
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  blocks: getEditorMappedBlocks(state.editor),
  selectedBlock: getSelectedBlockKey(state.editor),
});

const mapDispatchToProps = {
  selectBlock: (blockKey: string) => setSelectedBlock(blockKey),
  updateBlocks: (
    targetKey: string,
    destinationKey: string,
    destinationIndex: number,
    sourceKey: string
  ) => updateBlockOrder(targetKey, destinationKey, destinationIndex, sourceKey),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorSidebar);
