// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import type { DropResult, ResponderProvided } from 'react-beautiful-dnd';
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
  onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    console.log('drag ended', result, provided);
    const { updateBlocks } = this.props;
    const targetKey = result.draggableId;
    const destinationKey = result.destination ? result.destination.droppableId : '';
    const destinationIndex = result.destination ? result.destination.index : -1;
    const sourceKey = result.source ? result.source.droppableId : '';
    if (targetKey && destinationKey && sourceKey) {
      updateBlocks(targetKey, destinationKey, destinationIndex, sourceKey);
    }
  };

  render() {
    const { blocks, selectBlock, selectedBlock } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className={styles.containerClass}>
          <BlocksList blocks={blocks} selectBlock={selectBlock} selectedBlock={selectedBlock} />
        </div>
      </DragDropContext>
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
