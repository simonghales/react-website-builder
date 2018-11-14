// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import type { MappedDataBlocks } from '../../../data/blocks/models';
import type { ReduxState } from '../../../state/redux/store';
import { getEditorMappedBlocks, getSelectedBlockKey } from '../../../state/redux/editor/state';
import {
  setBlocksOrder,
  setSelectedBlock,
  updateBlockOrder,
} from '../../../state/redux/editor/reducer';
import NestList from './components/NestList/NestList';
import type { NestItem } from './components/NestList/NestList';
import type { BlocksOrder } from '../../../state/redux/editor/modifiers';
import RootBlock from './components/RootBlock/RootBlock';

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

function mapRootBlocksOrder(items: Array<NestItem>): Array<string> {
  return items.map(item => item.block.key);
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
  updateBlocksOrder: (blocksOrder: BlocksOrder, rootBlocksOrder: Array<string>) => void,
};

class EditorSidebar extends Component<Props> {
  handleChange = (items: Array<NestItem>, item) => {
    const { updateBlocksOrder } = this.props;
    console.log('change', items, item);
    const blocksOrder = mapBlocksOrder(items);
    console.log('blocksOrder', blocksOrder);
    const rootBlocksOrder = mapRootBlocksOrder(items);
    updateBlocksOrder(blocksOrder, rootBlocksOrder);
  };

  render() {
    const { blocks, selectBlock, selectedBlock } = this.props;
    const rootBlock = blocks[0];
    const nestBlocks = rootBlock.blockChildren ? rootBlock.blockChildren : [];
    return (
      <div className={styles.containerClass}>
        <RootBlock block={rootBlock} selectBlock={selectBlock} selectedBlock={selectedBlock}>
          <NestList
            blocks={nestBlocks}
            onChange={this.handleChange}
            selectBlock={selectBlock}
            selectedBlock={selectedBlock}
          />
        </RootBlock>
        {/* <BlocksList blocks={blocks} selectBlock={selectBlock} selectedBlock={selectedBlock} /> */}
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
  updateBlocksOrder: (blocksOrder: BlocksOrder, rootBlocksOrder: Array<string>) =>
    setBlocksOrder(blocksOrder, rootBlocksOrder),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorSidebar);
