// @flow
import React from 'react';
import { getDataBlockLabel, getDataBlockType } from '../../../../../data/blocks/models';
import BlockPreview from '../BlockPreview/BlockPreview';
import type { MappedDataBlockModel } from '../../../../../data/blocks/models';

type Props = {
  children: any,
  block: MappedDataBlockModel,
  selectBlock: (blockKey: string) => void,
  setHoveredBlock: (blockKey: string) => void,
  selectedBlock: string,
};

const RootBlock = ({ children, block, selectBlock, setHoveredBlock, selectedBlock }: Props) => (
  <BlockPreview
    type={block.blockLabel}
    label={getDataBlockLabel(block)}
    blockChildren={[]}
    key={block.key}
    blockKey={block.key}
    selected={selectedBlock === block.key}
    selectBlock={selectBlock}
    selectedBlock={selectedBlock}
    isRootBlock
    isModule={false}
    selectModule={() => {}}
    setHoveredBlock={setHoveredBlock}
  >
    {children}
  </BlockPreview>
);

export default RootBlock;
