// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nestable from 'react-nestable';
import styles from './styles';
import type { DataBlockModelMapped, MappedDataBlocks } from '../../../data/blocks/models';
import type { ReduxState } from '../../../state/redux/store';
import { getEditorMappedBlocks, getSelectedBlockKey } from '../../../state/redux/editor/state';
import {
  setBlocksOrder,
  setSelectedBlock,
  updateBlockOrder,
} from '../../../state/redux/editor/reducer';
import BlocksList from './components/BlocksList/BlocksList';
import type { BlocksOrder } from '../../../state/redux/editor/modifiers';

type NestItem = {
  id: string,
  block: DataBlockModelMapped,
  children: Array<NestItem>,
};

function mapBlocksToNestItems(blocks: Array<DataBlockModelMapped>): Array<NestItem> {
  return blocks.map((block: DataBlockModelMapped) => {
    const item: NestItem = {
      id: block.key,
      block,
      children: [],
    };
    if (block.blockChildren) {
      item.children = mapBlocksToNestItems(block.blockChildren);
    }
    return item;
  });
}

function renderNestItem({ item }: { item: NestItem }) {
  return <div>{item.block.key}</div>;
}

function mapBlocksOrder(items: Array<NestItem>) {
  let blocks = {};
  items.forEach(item => {
    blocks[item.block.key] = {
      children: item.children.map((childItem: NestItem) => childItem.block.key),
    };
    const childBlocks = mapBlocksOrder(item.children);
    blocks = {
      ...blocks,
      ...childBlocks,
    };
  });
  return blocks;
}

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
  updateBlocksOrder: (blocksOrder: BlocksOrder) => void,
};

class EditorSidebar extends Component<Props> {
  handleChange = (items: Array<NestItem>, item) => {
    const { updateBlocksOrder } = this.props;
    console.log('change', items, item);
    const blocksOrder = mapBlocksOrder(items);
    console.log('blocksOrder', blocksOrder);
    updateBlocksOrder(blocksOrder);
  };

  render() {
    const { blocks, selectBlock, selectedBlock } = this.props;
    return (
      <div className={styles.containerClass}>
        <Nestable
          items={mapBlocksToNestItems(blocks)}
          renderItem={renderNestItem}
          onChange={this.handleChange}
        />
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
  updateBlocksOrder: (blocksOrder: BlocksOrder) => setBlocksOrder(blocksOrder),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorSidebar);
