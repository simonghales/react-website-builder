// @flow

import React from 'react';
import Nestable from 'react-nestable';
import { cx } from 'emotion';
import type { DataBlockModelMapped, MappedDataBlocks } from '../../../../../data/blocks/models';
import { getDataBlockLabel, getDataBlockType } from '../../../../../data/blocks/models';
import BlockPreview from '../BlockPreview/BlockPreview';
import styles from './styles';

export type NestItem = {
  id: string,
  block: DataBlockModelMapped,
  children: Array<NestItem>,
  selectedBlock: string,
  selectBlock: (blockKey: string) => void,
  childrenEnabled: boolean,
  classes: string,
};

function mapBlocksToNestItems(
  blocks: Array<DataBlockModelMapped>,
  selectedBlock: string,
  selectBlock: (blockKey: string) => void
): Array<NestItem> {
  return blocks.map((block: DataBlockModelMapped) => {
    const item: NestItem = {
      id: block.key,
      block,
      children: [],
      selectedBlock,
      selectBlock,
      childrenEnabled: block.childrenAllowed,
      classes: cx({
        [styles.classNames.nestItemSelected]: selectedBlock === block.key,
      }),
    };
    if (block.blockChildren) {
      item.children = mapBlocksToNestItems(block.blockChildren, selectedBlock, selectBlock);
    }
    return item;
  });
}

function renderNestItem({ item }: { item: NestItem }) {
  const { block, selectedBlock, selectBlock } = item;
  return (
    <BlockPreview
      type={getDataBlockType(block)}
      label={getDataBlockLabel(block)}
      blockChildren={[]}
      key={block.key}
      blockKey={block.key}
      selected={selectedBlock === block.key}
      selectBlock={selectBlock}
      selectedBlock={selectedBlock}
      isParentModule={block.isParentModule}
    />
  );
}

type Props = {
  blocks: MappedDataBlocks,
  onChange: (items: Array<NestItem>, item: NestItem) => void,
  selectedBlock: string,
  selectBlock: (blockKey: string) => void,
};

const NestList = ({ blocks, onChange, selectedBlock, selectBlock }: Props) => (
  <div className={styles.containerClass}>
    <Nestable
      items={mapBlocksToNestItems(blocks, selectedBlock, selectBlock)}
      renderItem={renderNestItem}
      onChange={onChange}
      maxDepth={50}
    />
  </div>
);

export default NestList;
