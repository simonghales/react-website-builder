// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import type { MappedDataBlocks } from '../../../../../data/blocks/models';
import type { ReduxState } from '../../../../../state/redux/store';
import {
  setBlocksOrder,
  setSelectedBlock,
  setSelectedModule,
} from '../../../../../state/redux/editor/reducer';
import NestList from '../NestList/NestList';
import type { CondensedNestItem } from '../NestList/NestList';
import type { BlocksOrder } from '../../../../../state/redux/editor/modifiers';
import RootBlock from '../RootBlock/RootBlock';
import { setHoveredBlockKey } from '../../../../../state/redux/ui/reducer';
import type { BlocksKeys } from '../../../../../state/redux/editor/selector';
import {
  getCurrentModuleKey,
  getEditorSidebarBlocks,
  getSelectedBlockKey,
} from '../../../../../state/redux/editor/selector';

function mapBlocksOrder(items: Array<CondensedNestItem>) {
  let blocks = {};
  items.forEach(item => {
    blocks[item.blockKey] = {
      children: item.children.map((childItem: CondensedNestItem) => childItem.blockKey),
    };
    const childBlocks = mapBlocksOrder(item.children);
    blocks = {
      ...blocks,
      ...childBlocks,
    };
  });
  return blocks;
}

function mapRootBlocksOrder(items: Array<CondensedNestItem>): Array<string> {
  return items.map(item => item.blockKey);
}

type Props = {
  blocksKeys: BlocksKeys,
  selectedBlock: string,
  currentModuleKey: string,
  setHoveredBlock: (blockKey: string) => void,
  updateBlocksOrder: (blocksOrder: BlocksOrder, rootBlocksOrder: Array<string>) => void,
};

class BlocksManager extends Component<Props> {
  handleChange = (items: Array<CondensedNestItem>) => {
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
    const { blocksKeys, selectedBlock, currentModuleKey } = this.props;
    const rootBlockKey = blocksKeys.key;
    return (
      <div className={styles.containerClass} onMouseLeave={this.handleMouseLeave}>
        <RootBlock blockKey={rootBlockKey} selected={rootBlockKey === selectedBlock}>
          <NestList
            blocksKeys={blocksKeys.children}
            onChange={this.handleChange}
            currentModuleKey={currentModuleKey}
          />
        </RootBlock>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  blocksKeys: getEditorSidebarBlocks(state),
  selectedBlock: getSelectedBlockKey(state),
  currentModuleKey: getCurrentModuleKey(state),
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
