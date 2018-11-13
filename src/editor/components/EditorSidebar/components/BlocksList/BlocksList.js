// @flow

import React from 'react';
import type { DataBlockModelMapped, MappedDataBlocks } from '../../../../../data/blocks/models';
import { getDataBlockLabel, getDataBlockType } from '../../../../../data/blocks/models';
import BlockPreview from '../BlockPreview/BlockPreview';

function getBlockBlockChildren(block: DataBlockModelMapped): Array<DataBlockModelMapped> {
  return block.blockChildren ? block.blockChildren : [];
}

type BlocksListProps = {
  blocks: MappedDataBlocks,
  selectBlock: (blockKey: string) => void,
  selectedBlock: string,
};

const BlocksList = ({ blocks, selectBlock, selectedBlock }: BlocksListProps) =>
  blocks.map(block => (
    <BlockPreview
      type={getDataBlockType(block)}
      label={getDataBlockLabel(block)}
      blockChildren={getBlockBlockChildren(block)}
      key={block.key}
      blockKey={block.key}
      selected={selectedBlock === block.key}
      selectBlock={selectBlock}
      selectedBlock={selectedBlock}
      isParentModule={block.isParentModule}
    />
  ));

export default BlocksList;
