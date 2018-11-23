// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import type { MappedDataBlocks } from '../../../../../data/blocks/models';
import type { ReduxState } from '../../../../../state/redux/store';
import {
  getEditorMappedBlocks,
  getSelectedModuleSelectedBlockKey,
} from '../../../../../state/redux/editor/state';
import {
  setBlocksOrder,
  setHoveredBlockKey,
  setSelectedBlock,
  setSelectedModule,
} from '../../../../../state/redux/editor/reducer';
import NestList from '../NestList/NestList';
import type { NestItem } from '../NestList/NestList';
import type { BlocksOrder } from '../../../../../state/redux/editor/modifiers';
import RootBlock from '../RootBlock/RootBlock';

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
  selectModule: (moduleKey: string) => void,
  selectedBlock: string,
  setHoveredBlock: (blockKey: string) => void,
  updateBlocksOrder: (blocksOrder: BlocksOrder, rootBlocksOrder: Array<string>) => void,
};

class BlocksManager extends Component<Props> {
  handleChange = (items: Array<NestItem>) => {
    const { updateBlocksOrder } = this.props;
    const blocksOrder = mapBlocksOrder(items);
    const rootBlocksOrder = mapRootBlocksOrder(items);
    updateBlocksOrder(blocksOrder, rootBlocksOrder);
  };

  handleMouseLeave = () => {
    const { setHoveredBlock } = this.props;
    setHoveredBlock('');
  };

  render() {
    const { blocks, selectBlock, selectModule, selectedBlock, setHoveredBlock } = this.props;
    const rootBlock = blocks[0];
    const nestBlocks = rootBlock.blockChildren ? rootBlock.blockChildren : [];
    return (
      <div className={styles.containerClass} onMouseLeave={this.handleMouseLeave}>
        <RootBlock
          block={rootBlock}
          selectBlock={selectBlock}
          selectedBlock={selectedBlock}
          setHoveredBlock={setHoveredBlock}
        >
          <NestList
            blocks={nestBlocks}
            onChange={this.handleChange}
            selectBlock={selectBlock}
            selectModule={selectModule}
            selectedBlock={selectedBlock}
            setHoveredBlock={setHoveredBlock}
          />
        </RootBlock>
        {/* <BlocksList blocks={blocks} selectBlock={selectBlock} selectedBlock={selectedBlock} /> */}
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  blocks: getEditorMappedBlocks(state.editor),
  selectedBlock: getSelectedModuleSelectedBlockKey(state.editor),
});

const mapDispatchToProps = {
  setHoveredBlock: (blockKey: string) => setHoveredBlockKey(blockKey),
  selectBlock: (blockKey: string) => setSelectedBlock(blockKey),
  selectModule: (moduleKey: string) => setSelectedModule(moduleKey),
  updateBlocksOrder: (blocksOrder: BlocksOrder, rootBlocksOrder: Array<string>) =>
    setBlocksOrder(blocksOrder, rootBlocksOrder),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlocksManager);
